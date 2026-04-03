import os
import re
from pydantic import BaseModel, Field as PydanticField
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query, Body, Response, Cookie
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Field, Session, SQLModel, create_engine, select
from datetime import datetime, timedelta
from jose import JWTError, jwt
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
from fastapi import Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# fastapi dev main.py
# .venv\Scripts\Activate.ps1
#Verify the database
# psql -U conami_user -d conami_db
app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
#pwd_context handles bcrypt hashing, gives function to hash password on sign up
# also gives function to verify password when logging in 
USERNAME_REGEX = re.compile(r"^[A-Za-z0-9_]{8,40}$")
PASSWORD_REGEX = re.compile(r"^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,40}$")
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

load_dotenv()
# THIS TAKES THE SECRET KEY FROM .ENV TO SIGN JWT TOKENS
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

class User(SQLModel, table=True):
    username: str = Field(primary_key=True)
    password: str

class Conversations(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user1: str = Field(foreign_key="user.username")
    user2: str = Field(foreign_key="user.username")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Message(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversations.id")
    sender_username: str = Field(foreign_key="user.username")
    content: str = Field()
    created_at: datetime = Field(default_factory=datetime.utcnow)

# This is not a sql table it just combines conversations with their messages
class ConversationWithMessages(SQLModel):
    id: int
    user1: str
    user2: str
    created_at: datetime
    messages: list[Message]

database_url = os.getenv("DATABASE_URL")
engine = create_engine(database_url)


# with creates session with database url puts that into session and then gets called but pauses due to yield session
# We use yield here instead of return to maintain session open for methods when they call this
def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

def get_username_from_cookie(
    access_token: Annotated[str | None, Cookie()] = None
) -> str:
    if access_token is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def check_regexes(username: str, password:str):
    if not USERNAME_REGEX.fullmatch(username):
        raise HTTPException(
            status_code=400,
            detail="Username must be 8-40 characters and only contain letters, numbers and underscores"
        )
    if not PASSWORD_REGEX.fullmatch(password):
        raise HTTPException(
            status_code=400,
            detail="Password must be 8-40 characters and include 1 uppercase letter, 1 number, and 1 special character"
        )

# Creates JWT access token with secret key called by Login and SignUp
def create_access_token(username: str):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data = {"sub": username, "exp": expire}
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def set_auth_cookie(response: Response, username: str) -> None:
    token = create_access_token(username)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/",
    )

# SignUp API. route
@app.post("/users/")
def create_user(user: User, session: SessionDep, response: Response) -> dict:
    check_regexes(user.username,user.password)
    user.password = pwd_context.hash(user.password)
    session.add(user)
    try:
        session.commit()
        session.refresh(user)
        set_auth_cookie(response, user.username)
        return {"ok": True}
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=400, detail="Username already exists")

# This function decodes JWT, extracts username from sub, and returns full user object 
@app.get("/auth/me")
def get_current_user(
    session: SessionDep,
    username: Annotated[str, Depends(get_username_from_cookie)]
) -> dict:
    user = session.get(User,username)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return {"username": user.username}

@app.get("/users/")
def get_users(session: SessionDep) -> list[str]:
    usernames = session.exec(select(User.username)).all()
    return usernames


# LOGIN ENDPOINT AND CALLS CREATE TOKEN
@app.post("/token")
@limiter.limit("5/minute")
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: SessionDep,
    response: Response,
    request: Request
) -> dict:
    check_regexes(form_data.username,form_data.password)
    user = session.get(User, form_data.username)
    if not user or not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    set_auth_cookie(response, user.username)
    return {"ok": True}

# Create Conversations
# This also prevents conversations dupes by alphabetizes users and checking if user1 is already in conversations table
@app.post("/conversations")
def create_conversation(
    session: SessionDep, 
    username: Annotated[str, Depends(get_username_from_cookie)],
    user2: str = Body(...)
    ) -> Conversations:
    if username == user2:
        raise HTTPException(status_code=400, detail="Cannot create conversation with yourself")
    if session.get(User, user2) is None:
        raise HTTPException(status_code=404, detail="User2 not found")
    if username < user2:
        alphabetized_user1 = username
        alphabetized_user2 = user2
    else:
        alphabetized_user1 = user2
        alphabetized_user2 = username
    
    conversation_exists = session.exec(
        select(Conversations).where(
            (Conversations.user1 == alphabetized_user1) &
            (Conversations.user2 == alphabetized_user2)
        )
    ).first()
    if(conversation_exists):
        return conversation_exists
    new_conversation = Conversations(user1=alphabetized_user1,user2=alphabetized_user2)    
    session.add(new_conversation)
    session.commit()
    session.refresh(new_conversation)
    return new_conversation

# GET ALL CONVERSATIONS FOR A USER 
# MIGHT GET RID OF !!!!
@app.get("/conversations")
def get_conversations(session: SessionDep, username: Annotated[str, Depends(get_username_from_cookie)]) -> list[Conversations]:
    user1 = conversations.user1
    user2 = conversations.user2
    conversations = session.exec(select(Conversations).where(
        (user1 ==username) | (user2 == username)
        )
    ).all()
    return conversations

# GET ALL MESSAGES IN A CONVERSATION
@app.get("/conversations/{conversation_id}/messages")
def get_messages(conversation_id : int, session: SessionDep, username: Annotated[str, Depends(get_username_from_cookie)]) -> list[Message]:
    conversation = session.get(Conversations, conversation_id)
    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    if username != conversation.user1 and username != conversation.user2:
        raise HTTPException(status_code=403, detail="Not a participant in this conversation")
    messages = session.exec(select(Message).where(Message.conversation_id == conversation_id)
    ).all()
    return messages

#SEND A MESSAGE
@app.post("/conversations/{conversation_id}/messages")
def send_message(
    conversation_id : int, 
    session: SessionDep,
    username: Annotated[str, Depends(get_username_from_cookie)],
    content: str = Body(...)
    ) -> Message:
    conversation = session.get(Conversations, conversation_id)
    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    if username != conversation.user1 and username != conversation.user2:
        raise HTTPException(status_code=403, detail="Not a participant in this conversation")
    new_message = Message(conversation_id=conversation_id, sender_username=username, content=content)
    session.add(new_message)
    session.commit()
    session.refresh(new_message)
    return new_message
    # we put the conversation id, sender-username and content all in the message table

# Will return conversation with messages list by querying results and messages
@app.get("/conversations/full")
def get_conversations_with_messages(
    session: SessionDep, 
    username: Annotated[str,Depends(get_username_from_cookie)]) -> list[ConversationWithMessages]:
    conversations = session.exec(select(Conversations).where(
        (Conversations.user1 ==username) | (Conversations.user2 == username)
        )
    ).all()
    result = []
    for conversation in conversations:
        messages_ = session.exec(select(Message).where(Message.conversation_id == conversation.id)).all()
        result.append(ConversationWithMessages(
            id = conversation.id,
            user1 = conversation.user1,
            user2 = conversation.user2,
            created_at = conversation.created_at,
            messages = messages_
        ))
    return result