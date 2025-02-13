from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from database import engine
import sys


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Override SQLAlchemy's database URI with our engine
    app.config['SQLALCHEMY_ENGINE'] = engine

    # Initialize extensions
    CORS(app)
    db.init_app(app)

    # Import routes after app is created to avoid circular imports
    from routes import register_routes
    register_routes(app)

    # Create tables
    try:
        with app.app_context():
            db.create_all()
    except Exception as e:
        print(f"Database connection error: {e}")
        if app.debug:
            print("Make sure PostgreSQL is running locally and check your .env file")
        sys.exit(1)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
