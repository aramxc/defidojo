from flask import Flask
from flask_cors import CORS
from src.routes import init_routes
import os

app = Flask(__name__)

# Configure CORS
cors_origin = os.getenv('CORS_ORIGINS', 'http://localhost:3000')
CORS(app, resources={r"/api/*": {"origins": cors_origin.split(',')}})

# Initialize routes using the existing structure
init_routes(app)

# Required for Vercel
app.debug = False

if __name__ == '__main__':
    # Only used for local development
    app.run(host='0.0.0.0', port=8000, debug=True) 