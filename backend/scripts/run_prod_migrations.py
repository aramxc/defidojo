import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Add backend directory to Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

# Load env from backend directory
load_dotenv(backend_dir / '.env')

def run_prod_migrations():
    """Run database migrations for production environment"""
    # Set up database URL
    db_url = f"postgresql://{os.getenv('NEON_DB_USER')}:{os.getenv('NEON_DB_PASSWORD')}@{os.getenv('NEON_DB_HOST')}/{os.getenv('NEON_DB_DATABASE')}?sslmode=require"
    os.environ['SQLALCHEMY_DATABASE_URI'] = db_url
    os.environ['FLASK_APP'] = 'src.main'
    
    print("🔄 Starting migration process...")
    
    # Import Flask-Migrate commands
    from flask.cli import FlaskGroup
    from src.main import create_app
    
    app = create_app('production')
    
    with app.app_context():
        # Remove existing migrations
        import shutil
        migrations_dir = backend_dir / 'migrations'
        if migrations_dir.exists():
            print("🗑️  Removing old migrations...")
            shutil.rmtree(migrations_dir)
        
        # Initialize migrations
        print("📁 Initializing new migrations...")
        from flask_migrate import init, migrate, upgrade
        init()
        
        # Create and run migrations
        print("🗃️  Creating new migration...")
        migrate(message='initial schema')
        print("⬆️  Applying migrations...")
        upgrade()
        
        print("✅ Migrations completed successfully!")

if __name__ == '__main__':
    required_env_vars = [
        'NEON_DB_USER',
        'NEON_DB_PASSWORD',
        'NEON_DB_HOST',
        'NEON_DB_DATABASE'
    ]
    
    missing_vars = [var for var in required_env_vars if not os.getenv(var)]
    if missing_vars:
        print("Error: Missing required environment variables:")
        for var in missing_vars:
            print(f"- {var}")
        print("\nMake sure these are set in your .env file")
        sys.exit(1)
    
    try:
        run_prod_migrations()
    except Exception as e:
        print(f"❌ Error running migrations: {str(e)}")
        sys.exit(1)