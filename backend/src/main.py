from flask import Flask, request
import logging
from flask_cors import CORS
from src.models import db
from src.routes import init_routes
from flask_migrate import Migrate
from src.config import get_environment
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

migrate = Migrate()

def create_app(config_name=None):
    """Create and configure the Flask application
    
    Args:
        config_name (str): Override the environment configuration
    """
    app = Flask(__name__)
    
    # Determine environment if not explicitly provided
    env = config_name or get_environment()
    logger.info(f"Starting application in {env} environment")
    
    # Get CORS settings from environment variables
    cors_origin = os.getenv('CORS_ORIGINS', 'http://localhost:3000')
    cors_origins = cors_origin.split(',')
    logger.info(f"Configuring CORS for origins: {cors_origins}")
    
    # Configure CORS
    CORS(app, 
         resources={
             r"/api/*": {
                 "origins": cors_origins,
                 "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                 "allow_headers": ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
                 "supports_credentials": True,
                 "expose_headers": ["Content-Range", "X-Content-Range"],
                 "max_age": 600
             }
         }
    )
    
    # Load environment-specific config
    if env == 'production':
        app.config.from_object('src.config.ProductionConfig')
    elif env == 'testing':
        app.config.from_object('src.config.TestingConfig')
    else:
        app.config.from_object('src.config.DevelopmentConfig')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize routes
    init_routes(app)
    
    return app


env = get_environment()

if env == 'production':
    # Vercel serverless function handler
    def handler(request):
        """Handle requests for Vercel serverless functions"""
        app = create_app('production')  
        with app.request_context(request):
            return app(request)
else:
    # Local development server
    if __name__ == '__main__':
        app = create_app() 
        app.run(host='0.0.0.0', port=8000, debug=True) 