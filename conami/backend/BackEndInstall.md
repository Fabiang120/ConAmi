Backend
KEEP IN MIND ON MACOS python commands might run instead with python3 -m venv .venv for example

(EVERYTHING INSTALLED FAST START WINDOWS)
Backend folder
.venv\Scripts\Activate.ps1
fastapi dev main.py
Verify the database
psql -U conami_user -d conami_db

INSTALLATION FOR WINDOWS AND MACOS BELOW

Create the virtual environment - From the backend directory:
1) python -m venv .venv or python3 -m venv .venv


This creates a virtual environment inside .venv - Activate the virtual environment

Windows PowerShell
2) .venv\Scripts\Activate.ps1

macOS / Linux
2) source .venv/bin/activate


You should see (.venv) in your terminal prompt - Start Installing packages
3) pip install -r requirements.txt

Run Backend
4) fastapi dev main.py

Deactivate the virtual environment (when done)
deactivate


Interactive API docs¶
Now go to http://127.0.0.1:8000/docs.

You will see the automatic interactive API documentation (provided by Swagger UI):


Alternative API docs¶
And now, go to http://127.0.0.1:8000/redoc.

You will see the alternative automatic documentation (provided by ReDoc):


POSTGRE SQL INSTALLATION 

WINDOWS
Download PostgreSQL from:
5) https://www.postgresql.org/download/windows/

Choose Interactive Installer by EDB
6) Run the installer 

During installation:
7) Set a password for the postgres superuser - remember this
8) Keep the port set to 5432, keep all settings default

Verify installation
Open PowerShell and run:
9) psql --version

MACOS
Download PostgreSQL from:
5) https://www.postgresql.org/download/macosx/
6) Run the installer

Install PostgreSQL
7) Set a password for the postgres superuser - remember this
8) Keep the port set to 5432, keep all settings default

Verify installation
9) psql --version


FOR ALL WINDOWS AND MAC
Database Initialization (one-time) 
10) psql -U postgres -f scripts/init_db.sql


This script:
creates the application database user / creates the database / grants the required permissions / You only need to run this once per machine.

Verify the database
11) psql -U conami_user -d conami_db


Exit with:
\q

ALEMBIC RELATED THINGS
12) open alembic.ini and check this is correct
sqlalchemy.url = postgresql+psycopg://conami_user:spanishrocks1234@localhost:5432/conami_db

Connect Alembic to SQLModel
13) Open alembic/env.py make sure the below is correct
target_metadata is commented out
Below it should be 
from main import SQLModel
target_metadata = SQLModel.metadata

After any database table changes in backend run below
alembic revision --autogenerate -m "initial schema"

Check the generated file in:
alembic/versions/

Apply the migration
alembic upgrade head
