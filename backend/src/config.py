import os
from dotenv import load_dotenv
from urllib.parse import quote_plus
import logging

load_dotenv()

logger = logging.getLogger(__name__)

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
    """Get database URL based on environment variables"""
    # For production, always try DATABASE_URL first
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        logger.info("Using DATABASE_URL from environment variables")
        # Convert postgres:// to postgresql:// if necessary
        if database_url.startswith('postgres://'):
            database_url = database_url.replace('postgres://', 'postgresql://', 1)
        return database_url
            
    # If no DATABASE_URL, construct from components
    logger.info("No DATABASE_URL found, attempting to construct from components")
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT', '5432')
    db_name = os.getenv('DB_NAME')
    
    # Check if all required components are present
    required_vars = {
        'DB_USER': db_user,
        'DB_PASSWORD': db_password,
        'DB_HOST': db_host,
        'DB_NAME': db_name
    }
    
    missing_vars = [var for var, value in required_vars.items() if not value]
    
    if missing_vars:
        error_msg = f"Missing required database variables: {', '.join(missing_vars)}"
        logger.error(error_msg)
        if environment == 'production':
            logger.warning("Falling back to dummy database in production")
            return "sqlite:///:memory:"
        raise ValueError(error_msg)
    
    # Construct the URL with proper escaping of special characters
    db_url = f"postgresql://{quote_plus(db_user)}:{quote_plus(db_password)}@{db_host}:{db_port}/{db_name}"
    logger.info(f"Successfully constructed database URL for environment: {environment}")
    return db_url


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
    TESTING = False