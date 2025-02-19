from flask import Flask, request
import logging
from flask_cors import CORS
from src.models import db
from src.routes import init_routes
from flask_migrate import Migrate
from src.config import get_environment
import os
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

migrate = Migrate()

def create_app(config_name=None):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Enhanced logging for startup configuration
    logger.info("=== Application Startup ===")
    logger.info(f"Python path: {os.getenv('PYTHONPATH')}")
    logger.info(f"Database URL: {os.getenv('DATABASE_URL', 'Not set')}")
    
    env = config_name or get_environment()
    logger.info(f"Starting application in {env} environment")
    
    # Configure CORS
    cors_origin = os.getenv('CORS_ORIGINS', 'http://localhost:3000')
    cors_origins = cors_origin.split(',')
    logger.info(f"Configuring CORS for origins: {cors_origins}")
    
    CORS(app, resources={r"/api/*": {"origins": cors_origins}})
    
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

# Create the application instance
app = create_app('production')

# Vercel serverless handler
def handler(event, context):
    """Handle requests in Vercel serverless environment"""
    logger.info("=== Serverless Request ===")
    logger.info(f"Event: {json.dumps(event, default=str)}")
    
    path = event.get('path', '/')
    http_method = event.get('httpMethod', 'GET')
    headers = event.get('headers', {})
    body = event.get('body', '')
    
    with app.test_request_context(
        path=path,
        method=http_method,
        headers=headers,
        data=body
    ):
        try:
            response = app.full_dispatch_request()
            return {
                'statusCode': response.status_code,
                'headers': dict(response.headers),
                'body': response.get_data(as_text=True)
            }
        except Exception as e:
            logger.exception("Error processing request")
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({
                    'error': 'Internal Server Error',
                    'details': str(e)
                })
            }

# Development server
if __name__ == '__main__':
    dev_app = create_app('development')
    dev_app.run(host='0.0.0.0', port=8000, debug=True) 