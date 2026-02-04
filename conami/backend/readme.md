Backend (FastAPI)

For Fast Activation with everything installed and created below (Run Sequentially)
Backend folder
.venv\Scripts\Activate.ps1
fastapi dev main.py
Verify the database
psql -U conami_user -d conami_db

In conami folder
pnpm run dev


Installation Process Below 

Create the virtual environment

From the backend directory:

python -m venv .venv


This creates a virtual environment inside .venv.

Activate the virtual environment

Windows PowerShell

.venv\Scripts\Activate.ps1


macOS / Linux

source .venv/bin/activate


You should see (.venv) in your terminal prompt.

Check the virtual environment is active (optional)

Windows PowerShell

(Get-Command python).Source


If it points to .venv\Scripts\python, it worked.

Upgrade pip (recommended)
python -m pip install --upgrade pip


If pip is missing:

python -m ensurepip --upgrade

Install packages

Install FastAPI using the standard setup:

pip install "fastapi[standard]"


Or, if you have a requirements file:

pip install -r requirements.txt

Then you can run the backend with fastapi dev main.py

Deactivate the virtual environment (when done)
deactivate


Interactive API docs¶
Now go to http://127.0.0.1:8000/docs.

You will see the automatic interactive API documentation (provided by Swagger UI):


Alternative API docs¶
And now, go to http://127.0.0.1:8000/redoc.

You will see the alternative automatic documentation (provided by ReDoc):



Windows

Download PostgreSQL from:
https://www.postgresql.org/download/windows/

Choose Interactive Installer by EDB

Run the installer 

During installation:

Set a password for the postgres superuser

Keep the port set to 5432

Finish the installation

Verify installation

Open PowerShell and run:

psql --version


If psql is not found, add the following to your PATH and restart PowerShell:

C:\Program Files\PostgreSQL\16\bin

macOS
Using Homebrew (recommended)
brew install postgresql@16
brew services start postgresql@16

Or using the official installer

Download from:
https://www.postgresql.org/download/macosx/

Install PostgreSQL

Set the postgres password

Keep the port set to 5432

Verify installation
psql --version


FOR ALL WINDOWS AND MAC

Database Initialization (one-time)

From the backend/ directory, run:

psql -U postgres -f scripts/init_db.sql


This script:

creates the application database user

creates the database

grants the required permissions

You only need to run this once per machine.

Verify the database
psql -U conami_user -d conami_db


Exit with:

\q

Alembic Installation
Pip install alembic
alembic init alembic inside backend folder
open alembic.ini and set
sqlalchemy.url = postgresql+psycopg://conami_user:spanishrocks1234@localhost:5432/conami_db

4) Connect Alembic to SQLModel

Open alembic/env.py

target_metadata = None

replace with

from main import SQLModel
target_metadata = SQLModel.metadata

After any model changes run below
alembic revision --autogenerate -m "initial schema"

Check the generated file in:

alembic/versions/

7) Apply the migration
alembic upgrade head
