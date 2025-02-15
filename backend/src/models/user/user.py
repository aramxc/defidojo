from .. import db
from ..utils import generate_uuid, TimestampMixin


class User(db.Model, TimestampMixin):
    """Represents a user in the platform."""
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    wallet_address = db.Column(db.String(42), unique=True, nullable=True)

    # Relationships
    challenges = db.relationship('Challenge', backref='author', lazy=True)
    solutions = db.relationship('Solution', backref='user', lazy=True)

    def to_dict(self):
        """Convert user to frontend-compatible dictionary"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'walletAddress': self.wallet_address,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }