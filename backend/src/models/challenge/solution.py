from .. import db
from ..utils import TimestampMixin, CodeFormattingMixin
import uuid
from sqlalchemy.dialects.postgresql import UUID


class Solution(db.Model, TimestampMixin, CodeFormattingMixin):
    """Represents a user's solution to a challenge."""
    __tablename__ = 'solutions'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    challenge_id = db.Column(UUID(as_uuid=True), db.ForeignKey('challenges.id'), nullable=False)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    code = db.Column(db.Text, nullable=False)
    language = db.Column(db.String(50), nullable=False)
    passed_tests = db.Column(db.Boolean, nullable=False)
    execution_time = db.Column(db.Integer)  # in milliseconds

    def __init__(self, *args, **kwargs):
        """Initialize solution with formatted code"""
        if 'code' in kwargs:
            kwargs['code'] = self.format_code(kwargs['code'])
        super().__init__(*args, **kwargs)

    def to_dict(self):
        """Convert solution to frontend-compatible dictionary"""
        return {
            'id': self.id,
            'challengeId': self.challenge_id,
            'userId': self.user_id,
            'code': self.code,
            'language': self.language,
            'passedTests': self.passed_tests,
            'executionTime': self.execution_time,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }