import os
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
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


@app.get("/users/")
def get_users(session: SessionDep) -> list[User]:
    users = session.exec(select(User)).all()
    return users

@app.get("/")
async def read_root():
    return {"Hello": "World"}