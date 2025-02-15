from .main import create_app
from .models import db, User, Challenge, Tag


def seed_database():
    app = create_app()
    with app.app_context():
        print("Creating user...")
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


if __name__ == "__main__":
    seed_database()