import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv()


def get_database_url(environment='local'):
    """Get database URL based on environment.
    
    Args:
        environment (str): Either 'local' or 'development'
    Returns:
        str: Database URL
    """
    user = os.getenv('DB_USER', 'dojo_admin')
    password = os.getenv('DB_PASSWORD')
    if not password:
        raise ValueError("DB_PASSWORD environment variable is required")
    
    host = os.getenv('DB_HOST', 'localhost')
    port = os.getenv('DB_PORT', '5433')
    db_name = os.getenv('DB_NAME', 'defidojo')
    
    # Properly escape special characters in password
    password = quote_plus(password)
    
    return f'postgresql://{user}:{password}@{host}:{port}/{db_name}'


class Config:
    """Application configuration."""
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-please-change-in-production')
    
    # Use the database URL function
    SQLALCHEMY_DATABASE_URI = get_database_url(os.getenv('FLASK_ENV'))
