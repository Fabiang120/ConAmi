import os
import re
from pydantic import BaseModel, Field as PydanticField
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query, Body, Response, Cookie, Path
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
    "http://localhost:3000",
    "https://con-ami.com",
    "https://www.con-ami.com",
    "https://conami-iota.vercel.app",
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
    email: str | None = Field(default=None, unique=True)
    is_banned: bool = Field(default=False)

class BlockedUser(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    blocker_username: str = Field(foreign_key="user.username")
    blocked_username: str = Field(foreign_key="user.username")

class UsersReported(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    reporter_username: str = Field(foreign_key="user.username")
    reported_username: str = Field(foreign_key="user.username")
    reason: str
    created_at : datetime = Field(default_factory=datetime.utcnow)

class SupportTicket(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(foreign_key="user.username")
    message: str
    is_resolved: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Profile(SQLModel, table=True):
    username: str = Field(primary_key=True, foreign_key="user.username")
    email: str | None = None
    gender: str | None = None
    age: int | None = None
    country: str | None = None
    fluent: str | None = None
    practice: str | None = None
    image: str | None = None

class ProfileCreate(BaseModel):
    email: str | None = None
    gender: str | None = None
    age: int | None = None
    country: str | None = None
    fluent: str | None = None
    practice: str | None = None
    image: str | None = None

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

def check_regexes(username: str | None = None, password: str | None = None):
    if username is not None:
        if not USERNAME_REGEX.fullmatch(username):
            raise HTTPException(
                status_code=400,
                detail="Username must be 8-40 characters and only contain letters, numbers and underscores"
            )
            
    if password is not None:
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

@app.post("/users")
def create_user(user: User, session: SessionDep, response: Response) -> dict:
    check_regexes(user.username, user.password)
    user.password = pwd_context.hash(user.password)

    try:
        session.add(user)
        session.commit()
        session.refresh(user)

        new_profile = Profile(username=user.username)
        session.add(new_profile)
        session.commit()

        set_auth_cookie(response, user.username)
        return {"ok": True}

    except IntegrityError as e:
        session.rollback()
        raise HTTPException(status_code=400, detail=str(e))

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

@app.get("/users")
def get_users(session: SessionDep) -> list[Profile]:
    # Select from the Profile table so we get age, fluent, country, etc.
    profiles = session.exec(select(Profile)).all()
    return profiles

# Profile save
@app.post("/profile")
def create_or_update_profile(data: ProfileCreate, session: SessionDep, username: Annotated[str, Depends(get_username_from_cookie)]):
    profile = session.get(Profile, username)

    if not profile:
        profile = Profile(username=username)

    if data.email is not None:
        profile.email = data.email
    if data.gender is not None:
        profile.gender = data.gender
    if data.age is not None:
        profile.age = data.age
    if data.country is not None:
        profile.country = data.country
    if data.fluent is not None:
        profile.fluent = data.fluent
    if data.practice is not None:
        profile.practice = data.practice
    if data.image is not None:
        profile.image = data.image

    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile

@app.get("/profile")
def get_profile(session: SessionDep, username: Annotated[str, Depends(get_username_from_cookie)]):
    profile = session.get(Profile, username)
    if not profile:
        return{
            "username": username,
            "email": None,
            "gender": None,
            "age": None,
            "country": None,
            "fluent": None,
            "practice": None,
            "image": None,
        }
    return {
        "username": profile.username,
        "email": profile.email,
        "gender": profile.gender,
        "age": profile.age,
        "country": profile.country,
        "fluent": profile.fluent,
        "practice": profile.practice,
        "image": profile.image,
    }

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
    
    # Ban check
    if user.is_banned:
        raise HTTPException(status_code=403, detail="User is banned")

    set_auth_cookie(response, user.username)
    return {"ok": True}

# Create Conversations
# This also prevents conversations dupes by alphabetizes users and checking if user1 is already in conversations table
@app.post("/conversations")
def create_conversation(
    session: SessionDep, 
    username: Annotated[str, Depends(get_username_from_cookie)],
    # Added embed=True so it correctly parses the JSON object from React
    user2: str = Body(..., embed=True) 
) -> Conversations:

    if username == user2:
        raise HTTPException(status_code=400, detail="Cannot create conversation with yourself")
    
    if session.get(User, user2) is None:
        raise HTTPException(status_code=404, detail="User not found")
        
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
    
    if conversation_exists:
        return conversation_exists
        
    new_conversation = Conversations(user1=alphabetized_user1, user2=alphabetized_user2)    
    session.add(new_conversation)
    session.commit()
    session.refresh(new_conversation)
    
    return new_conversation

# GET ALL CONVERSATIONS FOR A USER 
# MIGHT GET RID OF !!!!
@app.get("/conversations")
def get_conversations(session: SessionDep, username: Annotated[str, Depends(get_username_from_cookie)]) -> list[Conversations]:
    user1 = Conversations.user1
    user2 = Conversations.user2
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
    sender = session.get(User, username)
    if sender and sender.is_banned:
        raise HTTPException(status_code=403, detail="You are banned and cannot send messages")
    
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

# Language learning, country, gender, language spoken, (possibly create user info table) post and get

#Profile Picture Upload Route 

# Post Blocked Users Route
@app.post("/users/block/{username_typed}")
def block_user(
    username_typed: Annotated[str, Path(min_length=8, max_length=40)],
    session: SessionDep,
    username: Annotated[str, Depends(get_username_from_cookie)]
) -> BlockedUser:
    #Prevent users from blocking themselves
    if username == username_typed:
        raise HTTPException(status_code=400, detail="You cannot block yourself")

    # Check if the user they are trying to block actually exists
    user_to_block = session.get(User, username_typed)
    if user_to_block is None:
        raise HTTPException(status_code=404, detail="User to block not found")

    # Check if the block already exists so we don't create duplicate rows
    existing_block = session.exec(
        select(BlockedUser).where(
            (BlockedUser.blocker_username == username) & 
            (BlockedUser.blocked_username == username_typed)
        )
    ).first()
    
    if existing_block:
        raise HTTPException(status_code=400, detail="User is already blocked")

    # If all checks pass, create the block
    new_block = BlockedUser(blocker_username=username, blocked_username=username_typed)
    session.add(new_block)
    session.commit()
    session.refresh(new_block)
    
    return new_block

# Unblock blocked users route 
@app.delete("/users/block/{username_typed}")
def unblock_user(username_typed: Annotated[str, Path(min_length=8, max_length=40)], session: SessionDep, username: Annotated[str, Depends(get_username_from_cookie)]):
    if username == username_typed:
        raise HTTPException(status_code=400, detail="You cannot unblock yourself")
    
    blocked_row = session.exec(select(BlockedUser).where(
        BlockedUser.blocker_username == username, BlockedUser.blocked_username == username_typed
        )
    ).first()
    
    if blocked_row is None:
        raise HTTPException(status_code=404, detail="User is not blocked")

    session.delete(blocked_row)
    session.commit()

    return {"message": f"{username_typed} unblocked successfully"}

# Get Blocked Users Route - new db table
@app.get("/users/blocked")
def get_blocked_users(
    session: SessionDep,
    username: Annotated[str, Depends(get_username_from_cookie)]
) -> list[BlockedUser]: 
    blocked_users = session.exec(
        select(BlockedUser).where(BlockedUser.blocker_username == username)
    ).all()
    return blocked_users


# Update Username Route
@app.put("/users/update-username")
def update_username(
    new_username: Annotated[str, Body(..., embed=True)],
    session: SessionDep,
    response: Response,
    username: Annotated[str, Depends(get_username_from_cookie)]
) -> dict:
    check_regexes(username=new_username)

    old_user = session.get(User, username)
    if old_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    existing_user = session.get(User, new_username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    try:
        new_user = User(
            username=new_username,
            password=old_user.password,
            email=old_user.email,
            is_banned=old_user.is_banned,
        )
        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        blocked_as_blocker = session.exec(
            select(BlockedUser).where(BlockedUser.blocker_username == username)
        ).all()
        for row in blocked_as_blocker:
            row.blocker_username = new_username
            session.add(row)

        blocked_as_blocked = session.exec(
            select(BlockedUser).where(BlockedUser.blocked_username == username)
        ).all()
        for row in blocked_as_blocked:
            row.blocked_username = new_username
            session.add(row)

        reports_as_reporter = session.exec(
            select(UsersReported).where(UsersReported.reporter_username == username)
        ).all()
        for row in reports_as_reporter:
            row.reporter_username = new_username
            session.add(row)

        reports_as_reported = session.exec(
            select(UsersReported).where(UsersReported.reported_username == username)
        ).all()
        for row in reports_as_reported:
            row.reported_username = new_username
            session.add(row)

        tickets = session.exec(
            select(SupportTicket).where(SupportTicket.username == username)
        ).all()
        for row in tickets:
            row.username = new_username
            session.add(row)

        conversations_user1 = session.exec(
            select(Conversations).where(Conversations.user1 == username)
        ).all()
        for row in conversations_user1:
            row.user1 = new_username
            session.add(row)

        conversations_user2 = session.exec(
            select(Conversations).where(Conversations.user2 == username)
        ).all()
        for row in conversations_user2:
            row.user2 = new_username
            session.add(row)

        messages = session.exec(
            select(Message).where(Message.sender_username == username)
        ).all()
        for row in messages:
            row.sender_username = new_username
            session.add(row)

        old_profile = session.get(Profile, username)
        if old_profile:
            new_profile = Profile(
                username=new_username,
                email=old_profile.email,
                gender=old_profile.gender,
                age=old_profile.age,
                country=old_profile.country,
                fluent=old_profile.fluent,
                practice=old_profile.practice,
                image=old_profile.image,
            )
            session.add(new_profile)
            session.commit()
            session.refresh(new_profile)

            session.delete(old_profile)

        session.delete(old_user)
        session.commit()

        set_auth_cookie(response, new_username)
        return {"ok": True}

    except IntegrityError as e:
        session.rollback()
        raise HTTPException(status_code=400, detail=str(e))

# Update Password Route
@app.put("/users/update-password")
def update_password(
    new_password: Annotated[str,Body(...,embed=True)],
    session: SessionDep,
    username: Annotated[str, Depends(get_username_from_cookie)]
) -> dict:
    # Only validate the password
    check_regexes(password=new_password) 
    
    user = session.get(User, username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.password = pwd_context.hash(new_password)
    session.add(user)
    session.commit()
    session.refresh(user)
    
    return {"ok": True}


# Update Email Route - Would need to add email to database
@app.put("/users/update-email")
def update_email(
    new_email: Annotated[str, Body(..., embed=True)],
    session: SessionDep,
    username: Annotated[str, Depends(get_username_from_cookie)]
) -> dict:
    user = session.get(User, username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if the new email is already in use by another user
    existing_user = session.exec(select(User).where(User.email == new_email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already in use")

    user.email = new_email
    session.add(user)
    session.commit()
    session.refresh(user)

    return {"ok": True}

# Post Report Users - possibly on first offense show message and on third ban
@app.post("/users/report/{reported_username}")
def report_user(
    reported_username: Annotated[str, Path(min_length=8, max_length=40)],
    reason: Annotated[str, Body(..., embed=True)],
    session: SessionDep,
    username: Annotated[str, Depends(get_username_from_cookie)]
) -> dict:

    if username == reported_username:
        raise HTTPException(status_code=400, detail="You cannot report yourself")

    user_to_report = session.get(User, reported_username)
    if user_to_report is None:
        raise HTTPException(status_code=404, detail="User to report not found")

    existing_report = session.exec(
        select(UsersReported).where(
            (UsersReported.reporter_username == username) & 
            (UsersReported.reported_username == reported_username)
        )
    ).first()
    
    if existing_report:
        raise HTTPException(status_code=400, detail="You have already reported this user")
    new_report = UsersReported(reporter_username=username, reported_username=reported_username, reason=reason)
    session.add(new_report)
    session.commit()
    session.refresh(new_report)
    total_reports = len(session.exec(
        select(UsersReported).where(UsersReported.reported_username == reported_username).all())
    )
    if total_reports >= 3:
        user_to_report.is_banned = True
        session.add(user_to_report)
        session.commit()
        session.refresh(user_to_report)
    
    return {"message" : "Report submitted succesfully."}


# Post support chat textbox 
@app.post("/support/message")
def submit_support_message(
    message: Annotated[str, Body(..., embed=True)],
    session: SessionDep,
    username: Annotated[str, Depends(get_username_from_cookie)]
) -> dict:
    support_ticket = SupportTicket(username=username, message=message)
    session.add(support_ticket)
    session.commit()
    session.refresh(support_ticket)
    return {"message": "Support message submitted successfully."}


# Update 2FA - set up lastly if possible - last edition