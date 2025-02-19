from flask import Flask, jsonify, redirect, request
from flask_cors import CORS
from flask_migrate import Migrate
from src.routes import init_routes
from src.config import Config
from src.models import db
import os

def create_app(environment=None):
    """Application factory function
    
    Args:
        environment (str, optional): The environment to run in. Defaults to None.
    """
    app = Flask(__name__)
    
    # Use single config class since we're handling environment in config.py
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    # Configure CORS
    CORS(app, resources={
        r"/*": {
            "origins": [
                "http://localhost:3000",
                "https://defidojo.vercel.app",
                "https://defidojo-backend.vercel.app"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })

    @app.after_request
    def after_request(response):
        origin = request.headers.get('Origin')
        if origin in ["https://defidojo.vercel.app", "http://localhost:3000"]:
            response.headers.add('Access-Control-Allow-Origin', origin)
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    # Initialize routes
    init_routes(app)

    @app.route('/')
    def root():
        return jsonify({"message": "Hello World"})

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Not found", "message": "The requested endpoint does not exist"}), 404

    return app

# Create the app instance
app = create_app()

# Required for Vercel deployment
def wsgi_app(environ, start_response):
    return app(environ, start_response)

# Only run the development server if we're running locally
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True) 