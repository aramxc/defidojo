from typing import Optional, Dict, Any
from ..models import db, Challenge, Solution, Tag
from ..schemas.challenge import ChallengeCreate, ChallengeUpdate, SolutionCreate
from sqlalchemy.exc import IntegrityError



class ChallengeService:
    @staticmethod
    async def create_challenge(data: ChallengeCreate, author_id: str, author_name: str) -> Challenge:
        """Create a new challenge"""
        # Create or get tags
        tags = []
        for tag_name in data.tags:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(
                    name=tag_name,
                    color="rgb(103, 76, 196)",  # Default color
                    background_color="rgba(103, 76, 196, 0.1)"
                )
                db.session.add(tag)
            tags.append(tag)

        # Create challenge
        challenge = Challenge(
            title=data.title,
            difficulty=data.difficulty,
            description=data.description,
            examples=data.examples,
            constraints=data.constraints,
            initial_code=data.initial_code,
            author_id=author_id,
            author_name=author_name,
            is_template=data.is_template,
            is_draft=data.is_draft,
            parent_template_id=data.parent_template_id,
            tags=tags
        )
        
        db.session.add(challenge)
        try:
            db.session.commit()
            return challenge
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Challenge creation failed")

    @staticmethod
    async def get_challenge(challenge_id: str) -> Optional[Challenge]:
        """Get a challenge by ID"""
        return Challenge.query.get_or_404(challenge_id)

    @staticmethod
    async def get_challenges(
        difficulty: Optional[str] = None,
        tag: Optional[str] = None,
        author_id: Optional[str] = None,
        page: int = 1,
        per_page: int = 20
    ) -> Dict[str, Any]:
        """Get challenges with filters and pagination"""
        query = Challenge.query

        if difficulty:
            query = query.filter_by(difficulty=difficulty)
        if tag:
            query = query.join(Challenge.tags).filter(Tag.name == tag)
        if author_id:
            query = query.filter_by(author_id=author_id)

        total = query.count()
        challenges = query.order_by(Challenge.created_at.desc()) \
                        .offset((page - 1) * per_page) \
                        .limit(per_page) \
                        .all()

        return {
            "challenges": challenges,
            "total": total,
            "page": page,
            "per_page": per_page,
            "pages": (total + per_page - 1) // per_page
        }

    @staticmethod
    async def update_challenge(challenge_id: str, data: ChallengeUpdate) -> Challenge:
        """Update a challenge"""
        challenge = await ChallengeService.get_challenge(challenge_id)
        
        # Update fields if provided
        for field, value in data.dict(exclude_unset=True).items():
            if field == 'tags' and value is not None:
                # Handle tags update
                tags = []
                for tag_name in value:
                    tag = Tag.query.filter_by(name=tag_name).first()
                    if not tag:
                        tag = Tag(name=tag_name)
                        db.session.add(tag)
                    tags.append(tag)
                challenge.tags = tags
            else:
                setattr(challenge, field, value)

        try:
            db.session.commit()
            return challenge
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Challenge update failed")

    @staticmethod
    async def submit_solution(data: SolutionCreate, user_id: str) -> Solution:
        """Submit a solution to a challenge"""
        # Verify challenge exists
        challenge = await ChallengeService.get_challenge(data.challenge_id)
        
        # Create solution
        solution = Solution(
            challenge_id=challenge.id,
            user_id=user_id,
            code=data.code,
            language=data.language,
            passed_tests=False  # Will be updated after testing
        )
        
        db.session.add(solution)
        try:
            db.session.commit()
            return solution
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Solution submission failed")

    @staticmethod
    async def vote_challenge(challenge_id: str, vote_type: str) -> Challenge:
        """Update challenge vote count"""
        challenge = await ChallengeService.get_challenge(challenge_id)
        
        if vote_type == 'upvote':
            challenge.upvotes += 1
        elif vote_type == 'downvote':
            challenge.downvotes += 1
        
        challenge.total_votes = challenge.upvotes - challenge.downvotes
        db.session.commit()
        return challenge