from typing import Optional
from uuid import UUID
from src.models import db, User
from src.schemas.user import UserCreate, UserUpdate
from sqlalchemy.exc import IntegrityError


class UserService:
    @staticmethod
    async def create_user(data: UserCreate) -> User:
        """Create a new user"""
        user = User(
            username=data.username,
            email=data.email,
            wallet_address=data.wallet_address
        )
        
        db.session.add(user)
        try:
            db.session.commit()
            return user
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Username or email already exists")

    @staticmethod
    async def get_user(user_id: UUID) -> Optional[User]:
        """Get a user by ID"""
        return User.query.get_or_404(user_id)

    @staticmethod
    async def get_user_by_email(email: str) -> Optional[User]:
        """Get a user by email"""
        return User.query.filter_by(email=email).first()

    @staticmethod
    async def update_user(user_id: UUID, data: UserUpdate) -> User:
        """Update a user's profile"""
        user = await UserService.get_user(user_id)
        
        # Update fields if provided
        for field, value in data.dict(exclude_unset=True).items():
            setattr(user, field, value)

        try:
            db.session.commit()
            return user
        except IntegrityError:
            db.session.rollback()
            raise ValueError("Username or email already exists")

    @staticmethod
    async def get_user_challenges(user_id: UUID, page: int = 1, per_page: int = 20):
        """Get challenges created by a user"""
        user = await UserService.get_user(user_id)
        return user.challenges.paginate(page=page, per_page=per_page)

    @staticmethod
    async def get_user_solutions(user_id: UUID, page: int = 1, per_page: int = 20):
        """Get solutions submitted by a user"""
        user = await UserService.get_user(user_id)
        return user.solutions.paginate(page=page, per_page=per_page)