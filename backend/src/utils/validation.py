from functools import wraps
from flask import request, jsonify
from pydantic import ValidationError


def validate_request(schema_class):
    """Decorator to validate request data against a Pydantic schema"""
    def decorator(f):
        @wraps(f)
        async def decorated(*args, **kwargs):
            try:
                request_data = request.get_json()
                schema_class(**request_data)
                return await f(*args, **kwargs)
            except ValidationError as e:
                return jsonify({'error': e.errors()}), 400
            except Exception as e:
                return jsonify({'error': str(e)}), 400
        return decorated
    return decorator