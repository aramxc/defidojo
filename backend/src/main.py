from flask import Flask
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
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Enhanced logging for startup configuration
    logger.info("=== Application Startup ===")
    logger.info(f"Database URL: {os.getenv('POSTGRES_URL', 'Not set')}")
    
    env = config_name or get_environment()
    logger.info(f"Starting application in {env} environment")
    
    # Configure CORS
    cors_origin = os.getenv('CORS_ORIGINS', 'http://localhost:3000')
    CORS(app, resources={r"/api/*": {"origins": cors_origin.split(',')}})
    
    # Load environment-specific config
    if env == 'production':
        app.config.from_object('src.config.ProductionConfig')
    else:
        app.config.from_object('src.config.DevelopmentConfig')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize routes
    init_routes(app)
    
    return app

# Create the application instance
app = create_app('production')

# Development server
if __name__ == '__main__':
    dev_app = create_app('development')
    dev_app.run(host='0.0.0.0', port=8000, debug=True) 