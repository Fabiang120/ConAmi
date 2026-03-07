import os
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from datetime import datetime
from sqlalchemy.exc import IntegrityError
# fastapi dev main.py
# .venv\Scripts\Activate.ps1
#Verify the database
# psql -U conami_user -d conami_db
app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(CORSMiddleware,
allow_origins=origins,
allow_methods=["*"],
allow_headers=["*"],
)

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

database_url = "postgresql+psycopg://conami_user:spanishrocks1234@localhost:5432/conami_db"

engine = create_engine(database_url)

def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

# SIGN UP ENDPOINT
@app.post("/users/")
def create_user(user: User ,session: SessionDep) -> User:
    session.add(user)
    try:
        session.commit()
        session.refresh(user)
        return user
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=400, detail="Username already exists")


@app.get("/users/")
def get_users(session: SessionDep) -> list[User]:
    users = session.exec(select(User)).all()
    return users


# LOGIN ENDPOINT
@app.post("/auth/login")
def login(
    session: SessionDep,
    username: str = Body(...),
    password: str = Body(...)
    ):
    user = session.get(User, username)

    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful"}

# Create Conversations
@app.post("/conversations")
def create_conversation(
    session: SessionDep, 
    user1: str = Body(...), 
    user2: str = Body(...)
    ):

    new_conversation = Conversations(user1=user1, user2=user2)
    session.add(new_conversation)
    session.commit()
    session.refresh(new_conversation)
    return new_conversation

# GET ALL CONVERSATIONS FOR A USER
@app.get("/conversations")
def get_conversations(session: SessionDep, username: str = Query(...)):
    conversations = session.exec(select(Conversations).where(
        (Conversations.user1 ==username) | (Conversations.user2 == username)
        )
    ).all()
    return conversations

# GET ALL MESSAGES IN A CONVERSATION
@app.get("/conversations/{conversation_id}/messages")
def get_messages(conversation_id : int, session: SessionDep):
    messages = session.exec(select(Message).where(Message.conversation_id == conversation_id)
    ).all()
    return messages

#SEND A MESSAGE
@app.post("/conversations/{conversation_id}/messages")
def send_message(
    conversation_id : int, 
    session: SessionDep,
    sender_username: str= Body(...),
    content: str = Body(...)
    ):
    new_message = Message(conversation_id=conversation_id, sender_username=sender_username, content=content)
    session.add(new_message)
    session.commit()
    session.refresh(new_message)
    return new_message
    # we put the conversation id, sender-username and content all in the message table
