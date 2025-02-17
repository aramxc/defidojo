from flask import Blueprint, jsonify
from .challenge import challenge_routes
from .user import user_routes

# Create a main api Blueprint with url prefix /api
api = Blueprint('api', __name__, url_prefix='/api')


# Add health check and index routes to the main api Blueprint
@api.route('/health')
def health_check():
    return jsonify({"status": "healthy"})


@api.route('/')
def index():
    return jsonify({"message": "Hello, World!"})


def init_routes(app):
    """Initialize all routes with the app"""
    challenge_routes.url_prefix = '/challenges'  
    api.register_blueprint(challenge_routes)
  
    user_routes.url_prefix = '/users' 
    api.register_blueprint(user_routes)
    
    # Register the main api Blueprint with the app
    app.register_blueprint(api)