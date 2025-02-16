from flask import Flask
import logging
from flask_cors import CORS
from src.models import db
from flask_migrate import Migrate
from src.routes import init_routes


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

migrate = Migrate()


def create_app(env='local'):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Configure CORS to allow requests from your frontend
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],  # Add your frontend URL
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Default configuration
    app.config.from_object('src.config.Config')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize routes using the init_routes function
    init_routes(app)
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=8000, debug=True)