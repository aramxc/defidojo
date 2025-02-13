import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    if os.getenv('ENVIRONMENT') == 'production':
        # Use postgresql+psycopg2 explicitly
        db_url = os.getenv('DATABASE_URL')
        if db_url and db_url.startswith('postgres://'):
            db_url = db_url.replace('postgres://', 'postgresql+psycopg2://', 1)
        SQLALCHEMY_DATABASE_URI = db_url
    else:
        DB_USER = os.getenv('DB_USER', 'dojo_admin')
        DB_PASSWORD = os.getenv('DB_PASSWORD', '')
        DB_HOST = os.getenv('DB_HOST', 'localhost')
        DB_PORT = os.getenv('DB_PORT', '5432')
        DB_NAME = os.getenv('DB_NAME', 'defidojo')
        
        # Only build connection string for local development
        SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Other configurations
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-please-change-in-production')
