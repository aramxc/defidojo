import os
from urllib.parse import quote_plus
from dotenv import load_dotenv

load_dotenv()


class Config:
    if os.getenv('ENVIRONMENT') == 'production':
        # Handle Vercel's postgres:// URL format
        db_url = os.getenv('DATABASE_URL')
        if db_url and db_url.startswith('postgres://'):
            SQLALCHEMY_DATABASE_URI = db_url.replace('postgres://', 'postgresql://')
        else:
            SQLALCHEMY_DATABASE_URI = db_url
    else:
        DB_USER = os.getenv('DB_USER', 'dojo_admin')
        DB_PASSWORD = quote_plus(os.getenv('DB_PASSWORD', ''))  
        DB_HOST = os.getenv('DB_HOST', 'host.docker.internal')  
        DB_PORT = os.getenv('DB_PORT', '5432')
        DB_NAME = os.getenv('DB_NAME', 'defidojo')
        
        SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Other configurations
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-please-change-in-production')
