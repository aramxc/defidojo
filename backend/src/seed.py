from sqlalchemy import text
from src.main import create_app
from src.models import db, User, Challenge, Tag
from src.config import get_database_url
import os


def seed_database(environment='local'):
    """Seed the database with initial data.
    
    Args:
        environment (str): Either 'local' or 'development'
    """
    os.environ['FLASK_ENV'] = environment
    os.environ['DATABASE_URL'] = get_database_url(environment)
    
    app = create_app()
    
    with app.app_context():
        print(f"Seeding {environment} database...")
        try:
            # Test database connection with proper text() wrapper
            db.session.execute(text('SELECT 1'))
            print("Database connection successful!")
            
            # Create test user
            user = User(
                username="defi_master",
                email="defi@example.com",
                wallet_address="0x123456789abcdef123456789abcdef123456789a"
            )
            db.session.add(user)
            db.session.commit()

            print("Creating tags...")
            # Create tags
            tags = [
                Tag(
                    name="Solidity",
                    color="rgb(103, 76, 196)",
                    background_color="rgba(103, 76, 196, 0.1)"
                ),
                Tag(
                    name="ERC20",
                    color="rgb(59, 130, 246)",
                    background_color="rgba(59, 130, 246, 0.1)"
                ),
                Tag(
                    name="View Functions",
                    color="rgb(16, 185, 129)",
                    background_color="rgba(16, 185, 129, 0.1)"
                )
            ]
            db.session.add_all(tags)
            db.session.commit()

            print("Creating challenge...")
            # Create test challenge
            challenge = Challenge(
                title="Simple Token Balance Checker",
                difficulty="Easy",
                description="Create a function that checks if an address has a token balance greater than a specified amount.",
                examples=[
                    {
                        "input": "hasEnoughTokens(0x123...789, 50)",
                        "output": "true",
                        "explanation": "Address has 100 tokens, which is greater than minimum balance of 50"
                    },
                    {
                        "input": "hasEnoughTokens(0x456...abc, 150)",
                        "output": "false",
                        "explanation": "Address has 100 tokens, which is less than minimum balance of 150"
                    }
                ],
                constraints=[
                    "Account address must be a valid Ethereum address",
                    "minBalance must be greater than 0",
                    "Function must be marked as view",
                    "Use the provided _balances mapping to check balances"
                ],
                author_id=user.id,
                author_name=user.username,
                tags=tags  # Link all tags to this challenge
            )
            db.session.add(challenge)
            db.session.commit()

            print("Database seeded successfully!")
            
        except Exception as e:
            print(f"Database connection failed: {str(e)}")
            raise


if __name__ == "__main__":
    import sys
    env = sys.argv[1] if len(sys.argv) > 1 else 'local'
    try:
        seed_database(env)
        print(f"Successfully seeded {env} database!")
    except Exception as e:
        print(f"Error seeding database: {str(e)}")
        sys.exit(1)