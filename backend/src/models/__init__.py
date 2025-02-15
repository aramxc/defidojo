"""Database models initialization."""
from flask_sqlalchemy import SQLAlchemy

# Create db without initializing
db = SQLAlchemy()

# Define __all__ to explicitly declare public exports
__all__ = ['db']

# After db is used everywhere, extend __all__

from .user import User  # noqa: E402
from .challenge.challenge import Challenge  # noqa: E402
from .challenge.solution import Solution    # noqa: E402
from .challenge.tag import Tag             # noqa: E402
from .challenge.test_case import TestCase  # noqa: E402

# Update __all__ with model exports
__all__ += ['User', 'Challenge', 'Solution', 'Tag', 'TestCase']