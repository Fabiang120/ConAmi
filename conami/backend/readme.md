Backend (FastAPI)

CCreate the virtual environment

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