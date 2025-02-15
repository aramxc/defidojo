from functools import wraps
from flask import request, jsonify
from src.services.user_service import UserService


def require_auth(f):
    """Decorator to require authentication"""
    @wraps(f)
    async def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'No authorization header'}), 401

        try:
            # Get user from token (implement your auth logic here)
            user = await UserService.get_user("user_id_from_token")
            request.current_user = user
            return await f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Invalid token', 'details': str(e)}), 401

    return decorated