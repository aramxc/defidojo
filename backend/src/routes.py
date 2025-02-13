from flask import jsonify, request
from models import db, Challenge, Solution


def register_routes(app):
    @app.route('/')
    def index():
        return jsonify({"message": "Hello, World!"})

    @app.route('/challenges', methods=['GET'])
    def get_challenges():
        challenges = Challenge.query.all()
        return jsonify([c.to_dict() for c in challenges])

    @app.route('/challenges/<int:challenge_id>', methods=['GET'])
    def get_challenge(challenge_id):
        challenge = Challenge.query.get_or_404(challenge_id)
        return jsonify(challenge.to_dict())

    @app.route('/submit', methods=['POST'])
    def submit_solution():
        data = request.get_json()
        
        new_solution = Solution(
            challenge_id=data['challenge_id'],
            user_id=data['user_id'],
            code=data['code']
        )
        
        db.session.add(new_solution)
        db.session.commit()
        
        return jsonify({"message": "Solution submitted successfully"})


if __name__ == '__main__':
    app.run(debug=True)