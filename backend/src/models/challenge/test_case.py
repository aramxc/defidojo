from .. import db
from ..utils import TimestampMixin
import uuid
from sqlalchemy.dialects.postgresql import UUID


class TestCase(db.Model, TimestampMixin):
    """Represents a test case for a challenge."""
    __tablename__ = 'test_cases'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    challenge_id = db.Column(UUID(as_uuid=True), db.ForeignKey('challenges.id'), nullable=False)
    input = db.Column(db.Text, nullable=False)
    expected_output = db.Column(db.Text, nullable=False)
    is_public = db.Column(db.Boolean, default=True)
    order = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        """Convert test case to frontend-compatible dictionary"""
        return {
            'id': self.id,
            'challengeId': self.challenge_id,
            'input': self.input,
            'expectedOutput': self.expected_output,
            'isPublic': self.is_public,
            'order': self.order
        }