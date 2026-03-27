import os
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

#pwd_context handles bcrypt hashing, gives function to hash password on sign up
# also gives function to verify password when logging in 
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

load_dotenv()
# THIS TAKES THE SECRET KEY FROM .ENV TO SIGN JWT TOKENS
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

class User(SQLModel, table=True):
    username: str = Field(primary_key=True)
    password: str = Field(index=True)

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

@app.post("/users/")
def create_user(user: User, session: SessionDep, response: Response) -> dict:
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
def get_users(session: SessionDep) -> list[User]:
    users = session.exec(select(User)).all()
    return users


# LOGIN ENDPOINT AND CALLS CREATE TOKEN
@app.post("/token")
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: SessionDep,
    response: Response
) -> dict:
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
def get_conversations(session: SessionDep, username: str = Query(...)) -> list[Conversations]:
    conversations = session.exec(select(Conversations).where(
        (Conversations.user1 ==username) | (Conversations.user2 == username)
        )
    ).all()
    return conversations

# GET ALL MESSAGES IN A CONVERSATION
@app.get("/conversations/{conversation_id}/messages")
def get_messages(conversation_id : int, session: SessionDep) -> list[Message]:
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