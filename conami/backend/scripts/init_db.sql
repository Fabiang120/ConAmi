-- Create application user
CREATE USER conami_user WITH PASSWORD 'spanishrocks1234';

-- Create database owned by that user
CREATE DATABASE conami_db OWNER conami_user;

GRANT ALL PRIVILEGES ON DATABASE conami_db TO conami_user;