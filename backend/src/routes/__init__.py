from flask import Blueprint, jsonify
from flask_cors import CORS
from .challenge import challenge_routes
from .user import user_routes

# Create a main api Blueprint with url prefix /api
api = Blueprint('api', __name__, url_prefix='/api')

# Enable CORS for all routes
CORS(api, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "https://defidojo.vercel.app"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})


# Add health check and index routes to the main api Blueprint
@api.route('/health')
def health_check():
    return jsonify({"status": "healthy"})


@api.route('/')
def index():
    return jsonify({"message": "Hello, World!"})


def init_routes(app):
    """Initialize all routes with the app"""
    # First register child blueprints with the app
    app.register_blueprint(challenge_routes, url_prefix='/api/challenges')
    app.register_blueprint(user_routes, url_prefix='/api/users')
    
    # Then register the main api Blueprint with the app
    app.register_blueprint(api)