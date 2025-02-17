from datetime import datetime
from uuid import uuid4
from . import db


def generate_uuid():
    """Generate a string UUID for model IDs"""
    return str(uuid4())


class TimestampMixin:
    """Mixin to automatically add created_at and updated_at timestamps to models"""
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class CodeFormattingMixin:
    """Mixin to handle code formatting for challenges and solutions"""
    @staticmethod
    def format_code(code: str) -> str:
        """Normalize line endings and preserve indentation"""
        return code.replace('\r\n', '\n') if code else ""