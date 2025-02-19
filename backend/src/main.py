from flask import Flask, jsonify, redirect
from flask_cors import CORS
from src.routes import init_routes
import os

app = Flask(__name__)

# Configure CORS
cors_origin = os.getenv('CORS_ORIGINS', 'http://localhost:3000')
CORS(app, resources={r"/api/*": {"origins": cors_origin.split(',')}})

# Root route handler
@app.route('/')
def root():
    return jsonify({"message": "Hello World"})

# Initialize routes using the existing structure
init_routes(app)

# Catch-all route to handle 404s gracefully
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found", "message": "The requested endpoint does not exist"}), 404

# Required for Vercel
app.debug = False

if __name__ == '__main__':
    # Only used for local development
    app.run(host='0.0.0.0', port=8000, debug=True) 