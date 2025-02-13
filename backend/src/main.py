from flask import Flask
import logging
from config import Config
from models import db
from routes import register_routes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def create_app():
    try:
        app = Flask(__name__)
        app.config.from_object(Config)
        
        logger.info("Initializing database...")
        db.init_app(app)
        
        logger.info("Registering routes...")
        register_routes(app)
        
        with app.app_context():
            logger.info("Creating database tables...")
            db.create_all()
        
        return app
    except Exception as e:
        logger.error(f"Error creating app: {str(e)}")
        raise


app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)