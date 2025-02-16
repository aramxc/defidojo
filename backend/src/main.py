from flask import Flask
import logging
from src.models import db
from flask_migrate import Migrate
from src.routes import init_routes


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

migrate = Migrate()


def create_app():
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Default configuration
    app.config.from_object('src.config.Config')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Register routes
    init_routes(app)
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=8000, debug=True)