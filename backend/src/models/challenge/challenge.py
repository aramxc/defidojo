from src.models import db
from ..utils import TimestampMixin, CodeFormattingMixin
import uuid
from sqlalchemy.dialects.postgresql import UUID
# Junction table for challenge-tag many-to-many relationship
challenge_tags = db.Table(
    "challenge_tags",
    db.Column(
        "challenge_id",
        UUID(as_uuid=True),
        db.ForeignKey("challenges.id", ondelete="CASCADE"),
    ),
    db.Column(
        'tag_id',
        UUID(as_uuid=True),
        db.ForeignKey('tags.id', ondelete='CASCADE'),
    ),
)


class Challenge(db.Model, TimestampMixin, CodeFormattingMixin):
    """Represents a coding challenge in the platform."""
    __tablename__ = 'challenges'

    # Primary fields
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = db.Column(db.String(255), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=False)
    
    # Challenge content
    examples = db.Column(db.JSON, nullable=False)
    constraints = db.Column(db.ARRAY(db.String), nullable=False)
    initial_code = db.Column(db.Text, nullable=True)
    
    # Author information
    author_id = db.Column(
        UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    author_name = db.Column(db.String(255), nullable=False)
    
    # Template/draft functionality
    is_template = db.Column(db.Boolean, default=False)
    is_draft = db.Column(db.Boolean, default=False)
    parent_template_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey('challenges.id'),
        nullable=True
    )

    # Voting metrics
    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)
    total_votes = db.Column(db.Integer, default=0)

    # Relationships
    tags = db.relationship(
        'Tag',
        secondary=challenge_tags,
        backref='challenges'
    )
    solutions = db.relationship(
        'Solution',
        backref='challenge',
        cascade='all, delete-orphan'
    )

    @property
    def formatted_initial_code(self) -> str:
        """Return properly formatted initial code for the editor"""
        return self.format_code(self.initial_code)

    def to_dict(self):
        """Convert challenge to frontend-compatible dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'difficulty': self.difficulty,
            'tags': [tag.to_dict() for tag in self.tags],
            'description': self.description,
            'examples': self.examples,
            'constraints': self.constraints,
            'authorId': self.author_id,
            'authorName': self.author_name,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat(),
            'initialCode': self.formatted_initial_code,
            'upvotes': self.upvotes,
            'downvotes': self.downvotes,
            'totalVotes': self.total_votes,
            'isTemplate': self.is_template,
            'isDraft': self.is_draft,
            'parentTemplateId': self.parent_template_id
        }