import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv()

def get_environment():
    """Determine the current environment.
    
    Priority:
    1. Vercel deployment (production)
    2. Explicit ENVIRONMENT variable
    3. Default to development
    
    Returns:
        str: 'local', 'development', or 'production'
    """
    if os.getenv('VERCEL') == '1':
        return 'production'
    return os.getenv('ENVIRONMENT', 'development')

def get_database_url(environment='development'):
    """Get database URL based on environment.
    
    Args:
        environment (str): Either 'local', 'development', or 'production'
    Returns:
        str: Database URL
    """
    # First check if DATABASE_URL is set (for production/deployment)
    database_url = os.getenv('DATABASE_URL')
    if database_url and environment == 'production':
        return database_url
        
    if environment == 'production':
        # Use NeonDB for production
        db_host = os.getenv('NEON_DB_HOST')
        db_user = os.getenv('NEON_DB_USER')
        db_pass = os.getenv('NEON_DB_PASSWORD')
        db_name = os.getenv('NEON_DB_DATABASE')
        if not all([db_host, db_user, db_pass, db_name]):
            raise ValueError("Missing required NeonDB environment variables")
        return f"postgresql://{db_user}:{quote_plus(db_pass)}@{db_host}/{db_name}"
    
    # Development/Local DB configuration
    user = os.getenv('DB_USER', 'dojo_admin')
    password = os.getenv('DB_PASSWORD')
    if not password:
        raise ValueError("DB_PASSWORD environment variable is required")
    
    host = os.getenv('DB_HOST')
    port = os.getenv('DB_PORT')
    db_name = os.getenv('DB_NAME')
    
    return f'postgresql://{user}:{quote_plus(password)}@{host}:{port}/{db_name}'


class Config:
    """Base application configuration."""
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-please-change-in-production')


class DevelopmentConfig(Config):
    """Development configuration."""
    SQLALCHEMY_DATABASE_URI = get_database_url('development')
    DEBUG = True


class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = get_database_url('testing')


class ProductionConfig(Config):
    """Production configuration."""
    SQLALCHEMY_DATABASE_URI = get_database_url('production')
    DEBUG = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'production-key')