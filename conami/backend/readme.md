Backend (FastAPI)

Requirements

Python 3.9 or higher
pip



Check Python:

python3 --version


Setup

Navigate to the backend directory:
cd backend

Create a virtual environment:
python3 -m venv venv

Activate it:
macOS / Linux
source venv/bin/activate

Windows
venv\Scripts\activate


Install dependencies:
pip install fastapi uvicorn


Run the server
python3 -m uvicorn main:app --reload


The API will be available at:

http://127.0.0.1:8000


Interactive API documentation:

http://127.0.0.1:8000/docs
