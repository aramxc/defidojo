from ..contracts.services import DojoTokenService
from flask import Blueprint, request, jsonify
from src.utils.auth import require_auth
from src.utils.validation import validate_request

dojo_token_service = DojoTokenService()

# Create blueprint without url_prefix (we'll add it in init_routes)
dojo_token_routes = Blueprint('dojo_token', __name__)


@require_auth
# @validate_request() add this when we have a schema
@dojo_token_routes.post("/achievements/{achievement_id}")
async def award_achievement(achievement_id: str, player_address: str):
    """Award an achievement to a player"""
    try:
        result = await dojo_token_service.award_achievement(
            player_address=player_address,
            achievement_id=achievement_id,
            reward_amount=1  # Define your reward logic
        )
        return result
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
