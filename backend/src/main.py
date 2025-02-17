from flask import Flask
import logging
from flask_cors import CORS
from src.models import db
from flask_migrate import Migrate
from src.routes import init_routes
import os


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

migrate = Migrate()


def create_app(env='local'):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Get CORS settings from environment variables
    cors_origin = os.getenv('CORS_ORIGINS', 'http://localhost:3000')
    cors_origins = cors_origin.split(',')
    
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
    
    # Default configuration
    app.config.from_object('src.config.Config')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize routes
    init_routes(app)
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=8000, debug=True)