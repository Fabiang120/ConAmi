import os
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select

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
    FirstName: str = Field(index=True)

database_url = "postgresql+psycopg://conami_user:spanishrocks1234@localhost:5432/conami_db"

engine = create_engine(database_url)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/users/")
def create_user(user: User ,session: SessionDep) -> User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@app.get("/users/")
def get_users(session: SessionDep) -> list[User]:
    users = session.exec(select(User)).all()
    return users

@app.get("/")
async def read_root():
    return {"Hello": "World"}