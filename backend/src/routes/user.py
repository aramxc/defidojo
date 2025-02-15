from flask import Blueprint, request, jsonify
from src.services.user_service import UserService
from src.schemas.user import UserCreate, UserUpdate, UserResponse
from src.utils.auth import require_auth
from src.utils.validation import validate_request

user_routes = Blueprint('users', __name__, url_prefix='/users')


@user_routes.route('', methods=['POST'])
@validate_request(UserCreate)
async def create_user():
    """Register a new user"""
    try:
        data = request.get_json()
        user = await UserService.create_user(data=data)
        return jsonify(UserResponse.from_orm(user).dict()), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@user_routes.route('/me', methods=['GET'])
@require_auth
async def get_current_user():
    """Get current user's profile"""
    user = request.current_user
    return jsonify(UserResponse.from_orm(user).dict())


@user_routes.route('/me', methods=['PUT'])
@require_auth
@validate_request(UserUpdate)
async def update_current_user():
    """Update current user's profile"""
    try:
        data = request.get_json()
        user = request.current_user
        
        updated_user = await UserService.update_user(
            user_id=user.id,
            data=data
        )
        
        return jsonify(UserResponse.from_orm(updated_user).dict())
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@user_routes.route('/<user_id>/challenges', methods=['GET'])
async def get_user_challenges(user_id: str):
    """Get challenges created by a user"""
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        
        paginated_challenges = await UserService.get_user_challenges(
            user_id=user_id,
            page=page,
            per_page=per_page
        )
        
        return jsonify({
            'challenges': [ChallengeResponse.from_orm(c).dict() for c in paginated_challenges.items],
            'total': paginated_challenges.total,
            'page': page,
            'per_page': per_page,
            'pages': paginated_challenges.pages
        })
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@user_routes.route('/<user_id>/solutions', methods=['GET'])
async def get_user_solutions(user_id: str):
    """Get solutions submitted by a user"""
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        
        paginated_solutions = await UserService.get_user_solutions(
            user_id=user_id,
            page=page,
            per_page=per_page
        )
        
        return jsonify({
            'solutions': [SolutionResponse.from_orm(s).dict() for s in paginated_solutions.items],
            'total': paginated_solutions.total,
            'page': page,
            'per_page': per_page,
            'pages': paginated_solutions.pages
        })
    except ValueError as e:
        return jsonify({'error': str(e)}), 400