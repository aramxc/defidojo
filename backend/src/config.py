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
    if environment == 'production':
        # Use POSTGRES_URL for production
        database_url = os.getenv('POSTGRES_URL')
        if not database_url:
            logger.error("POSTGRES_URL environment variable is not set")
            raise ValueError("POSTGRES_URL environment variable is required for production")
            
        logger.info("Using POSTGRES_URL for database connection")
        # Convert postgres:// to postgresql:// if necessary
        if database_url.startswith('postgres://'):
            database_url = database_url.replace('postgres://', 'postgresql://', 1)
        return database_url
    
    # Development configuration remains unchanged
    return "postgresql://localhost:5432/defidojo"


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