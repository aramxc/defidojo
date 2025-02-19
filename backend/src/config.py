import os
from dotenv import load_dotenv
import logging
from urllib.parse import quote_plus

load_dotenv()

logger = logging.getLogger(__name__)

def get_database_url():
    """Get database URL based on environment"""
    # If DATABASE_URL is set (in production), use it
    if os.getenv('DATABASE_URL'):
        database_url = os.getenv('DATABASE_URL')
        # Convert postgres:// to postgresql:// if needed
        if database_url.startswith('postgres://'):
            database_url = database_url.replace('postgres://', 'postgresql://', 1)
        return database_url
    
    # Otherwise, construct URL from individual components (development)
    db_user = os.getenv('DB_USER', 'dojo_admin')
    db_password = quote_plus(os.getenv('DB_PASSWORD'))
    db_host = os.getenv('DB_HOST', 'postgres')
    db_port = os.getenv('DB_PORT', '5432')
    db_name = os.getenv('DB_NAME', 'defidojo')
    
    # Construct URL with encoded password
    return f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"


class Config:
    """Base application configuration."""
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = get_database_url()
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-please-change-in-production')
    DEBUG = os.getenv('ENVIRONMENT') != 'production'


# Use a single config class instead of multiple
DevelopmentConfig = Config
ProductionConfig = Config
TestingConfig = Config