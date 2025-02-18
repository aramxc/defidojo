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
    
    # Enhanced logging for startup configuration
    logger.info("=== Application Startup ===")
    logger.info(f"Python path: {os.getenv('PYTHONPATH')}")
    logger.info(f"Database URL: {os.getenv('DATABASE_URL', 'Not set')}")
    
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
    
    # Add error handlers
    @app.errorhandler(500)
    def handle_500(error):
        logger.error(f"Internal Server Error: {error}", exc_info=True)
        return {"error": "Internal Server Error", "details": str(error)}, 500

    @app.errorhandler(Exception)
    def handle_exception(error):
        logger.error(f"Unhandled Exception: {error}", exc_info=True)
        return {"error": "Internal Server Error", "details": str(error)}, 500

    return app

# Single handler implementation for both development and production
def handler(request):
    """Handle requests for Vercel serverless functions"""
    try:
        logger.info("=== New Serverless Request ===")
        logger.info(f"Request path: {request.path}")
        logger.info(f"Request method: {request.method}")
        logger.info(f"Request headers: {dict(request.headers)}")
        
        app = create_app('production')
        
        with app.request_context(request):
            try:
                response = app(request)
                logger.info(f"Response status: {response.status_code}")
                return response
            except Exception as e:
                logger.error("Error processing request", exc_info=True)
                return app.make_response(({
                    "error": "Internal Server Error",
                    "details": str(e)
                }, 500))
    except Exception as e:
        logger.error("Critical error in handler", exc_info=True)
        return {
            "statusCode": 500,
            "body": {
                "error": "Critical Server Error",
                "details": str(e)
            }
        }

env = get_environment()

# Local development server only
if __name__ == '__main__' and env != 'production':
    app = create_app()
    app.run(host='0.0.0.0', port=8000, debug=True) 