import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import uuid

# Add backend directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

# Load env from backend directory
load_dotenv(backend_dir / '.env')


FIXED_IDS = {
    'user': 'f5e5abb2-d6ce-4aee-a471-e407807e4d6e',
    'challenge': 'cbc65716-075f-42c4-a159-e49a62b5d845',
    'tags': {
        'solidity': '8c1bfee3-5759-4c0b-a374-b13fb4f9264c',
        'erc20': 'd47b81f0-962c-4d76-9535-3e1af6146f7f',
        'view_functions': 'e94f68c9-b8a7-4c0d-b8f3-497d8f608175'
    }
}

def get_database_url(environment):
    """Get database URL based on environment.
    
    Args:
        environment (str): Either 'docker', 'local', or 'production'
    Returns:
        str: Database URL
    """
    if environment == 'production':
        return (
            f"postgresql://{os.getenv('NEON_DB_USER')}:{os.getenv('NEON_DB_PASSWORD')}"
            f"@{os.getenv('NEON_DB_HOST')}/{os.getenv('NEON_DB_DATABASE')}?sslmode=require"
        )
    elif environment == 'docker':
        return (
            f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
            f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        )
    else:  # local
        return (
            f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
            f"@localhost:{os.getenv('DB_PORT_LOCAL')}/{os.getenv('DB_NAME')}"
        )

def seed_database(environment='local'):
    """Seed the database with initial data.
    
    Args:
        environment (str): Either 'docker', 'local', or 'production'
    """
    # Set up database URL before importing Flask
    db_url = get_database_url(environment)
    os.environ['SQLALCHEMY_DATABASE_URI'] = db_url
    
    # Now import Flask-related modules
    from src.main import create_app
    from src.models import db, User, Challenge, Tag
    from sqlalchemy import text
    
    print(f"🌱 Starting seed process for {environment} database...")
    app = create_app(environment)
    
    with app.app_context():
        print(f"Checking {environment} database connection...")
        try:
            # Test database connection
            db.session.execute(text('SELECT 1'))
            print("Database connection successful!")
            
            # Check if database is empty
            if User.query.first() or Challenge.query.first() or Tag.query.first():
                print("Database already contains data, skipping seed.")
                return
            
            print("Database is empty, starting seed process...")
            
            # Create test user with fixed ID
            user = User(
                id=FIXED_IDS['user'],
                username="defi_master",
                email="defi@example.com",
                wallet_address="0x123456789abcdef123456789abcdef123456789a"
            )
            db.session.add(user)
            db.session.commit()

            print("Creating tags...")
            tags = [
                Tag(
                    id=FIXED_IDS['tags']['solidity'],
                    name="Solidity",
                    color="rgb(103, 76, 196)",
                    background_color="rgba(103, 76, 196, 0.1)"
                ),
                Tag(
                    id=FIXED_IDS['tags']['erc20'],
                    name="ERC20",
                    color="rgb(59, 130, 246)",
                    background_color="rgba(59, 130, 246, 0.1)"
                ),
                Tag(
                    id=FIXED_IDS['tags']['view_functions'],
                    name="View Functions",
                    color="rgb(16, 185, 129)",
                    background_color="rgba(16, 185, 129, 0.1)"
                )
            ]
            db.session.add_all(tags)
            db.session.commit()

            print("Creating challenge...")
            challenge = Challenge(
                id=FIXED_IDS['challenge'],
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
                initial_code='''// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Challenge {
    function hasEnoughTokens(address account, uint256 minBalance) public view returns (bool) {
        // Your code here
        
    }
}
''',
                author_id=user.id,
                author_name=user.username,
                tags=tags
            )
            db.session.add(challenge)
            db.session.commit()

            print("✅ Database seeded successfully!")
            
        except Exception as e:
            print(f"❌ Database error: {str(e)}")
            raise

if __name__ == "__main__":
    env = sys.argv[1] if len(sys.argv) > 1 else 'local'
    if env not in ['local', 'docker', 'production']:
        print("Error: Environment must be 'local', 'docker', or 'production'")
        sys.exit(1)
    
    try:
        seed_database(env)
        print(f"✨ Seed process completed for {env} database!")
    except Exception as e:
        print(f"Error seeding database: {str(e)}")
        sys.exit(1)