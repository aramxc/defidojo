from flask import Flask
import logging
from src.config import Config
from src.database import verify_db_connection
from src.models import db
from flask_migrate import Migrate
from src.routes import init_routes


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

migrate = Migrate()


def create_app():
    try:
        app = Flask(__name__)
        app.config.from_object(Config)
        
        logger.info("Initializing database...")
        db.init_app(app)
        
        logger.info("Initializing migrations...")
        migrate.init_app(app, db)
        
        logger.info("Registering routes...")
        init_routes(app)
        
        with app.app_context():
            logger.info("Verifying database connection...")
            if not verify_db_connection():
                raise Exception("Database connection failed!")
            logger.info("Database connection successful!")
        
        return app
    except Exception as e:
        logger.error(f"Error creating app: {str(e)}")
        raise


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=8000, debug=True)