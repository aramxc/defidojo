from .. import db
from ..utils import TimestampMixin
import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime


class Tag(db.Model):
    """Represents a challenge tag (e.g., "Solidity", "ERC20")."""
    __tablename__ = 'tags'
    
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(50), unique=True, nullable=False)
    color = db.Column(db.String(50), nullable=False)
    background_color = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        """Convert tag to frontend-compatible dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'color': self.color,
            'backgroundColor': self.background_color
        }