from flask import Blueprint, request, jsonify
from src.services.challenge_service import ChallengeService
from src.schemas.challenge import (
    ChallengeCreate, ChallengeUpdate, SolutionCreate, ChallengeResponse, SolutionResponse
)
from typing import Optional
from src.utils.auth import require_auth
from src.utils.validation import validate_request

challenge_routes = Blueprint('challenge', __name__, url_prefix='/challenges')


@challenge_routes.route('', methods=['POST'])
@require_auth
@validate_request(ChallengeCreate)
async def create_challenge():
    """Create a new challenge"""
    try:
        data = request.get_json()
        user = request.current_user
        
        challenge = await ChallengeService.create_challenge(
            data=data,
            author_id=user.id,
            author_name=user.username
        )
        
        return jsonify(ChallengeResponse.from_orm(challenge).dict()), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@challenge_routes.route('', methods=['GET', 'OPTIONS'])
async def get_challenges():
    """Get challenges with optional filters"""
    # Handle OPTIONS request
    if request.method == 'OPTIONS':
        return '', 204
        
    try:
        difficulty: Optional[str] = request.args.get('difficulty')
        tag: Optional[str] = request.args.get('tag')
        author_id: Optional[str] = request.args.get('author_id')
        page: int = int(request.args.get('page', 1))
        per_page: int = int(request.args.get('per_page', 20))

        result = await ChallengeService.get_challenges(
            difficulty=difficulty,
            tag=tag,
            author_id=author_id,
            page=page,
            per_page=per_page
        )

        return jsonify({
            'challenges': [ChallengeResponse.from_orm(c).dict() for c in result['challenges']],
            'total': result['total'],
            'page': result['page'],
            'per_page': result['per_page'],
            'pages': result['pages']
        })
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@challenge_routes.route('/<challenge_id>', methods=['GET'])
async def get_challenge(challenge_id: str):
    """Get a specific challenge"""
    try:
        challenge = await ChallengeService.get_challenge(challenge_id)
        return jsonify(ChallengeResponse.from_orm(challenge).dict())
    except ValueError as e:
        return jsonify({'error': str(e)}), 404


@challenge_routes.route('/<challenge_id>', methods=['PUT'])
@require_auth
@validate_request(ChallengeUpdate)
async def update_challenge(challenge_id: str):
    """Update a challenge"""
    try:
        data = request.get_json()
        user = request.current_user
        
        # Verify ownership
        challenge = await ChallengeService.get_challenge(challenge_id)
        if challenge.author_id != user.id:
            return jsonify({'error': 'Unauthorized'}), 403
            
        updated_challenge = await ChallengeService.update_challenge(
            challenge_id=challenge_id,
            data=data
        )
        
        return jsonify(ChallengeResponse.from_orm(updated_challenge).dict())
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@challenge_routes.route('/<challenge_id>/solutions', methods=['POST'])
@require_auth
@validate_request(SolutionCreate)
async def submit_solution(challenge_id: str):
    """Submit a solution to a challenge"""
    try:
        data = request.get_json()
        user = request.current_user
        
        solution = await ChallengeService.submit_solution(
            data=data,
            user_id=user.id
        )
        
        return jsonify(SolutionResponse.from_orm(solution).dict()), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@challenge_routes.route('/<challenge_id>/vote', methods=['POST'])
@require_auth
async def vote_challenge(challenge_id: str):
    """Vote on a challenge"""
    try:
        vote_type = request.json.get('type')
        if vote_type not in ['upvote', 'downvote']:
            return jsonify({'error': 'Invalid vote type'}), 400
            
        challenge = await ChallengeService.vote_challenge(
            challenge_id=challenge_id,
            vote_type=vote_type
        )
        
        return jsonify(ChallengeResponse.from_orm(challenge).dict())
    except ValueError as e:
        return jsonify({'error': str(e)}), 400


@challenge_routes.route('/tags', methods=['GET'])
async def get_tags():
    """Get all available tags"""
    try:
        tags = await ChallengeService.get_tags()
        return jsonify([tag.to_dict() for tag in tags])
    except ValueError as e:
        return jsonify({'error': str(e)}), 400