import sqlalchemy
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()


def _init_tcp_connection_engine(db_config):
    if os.getenv('ENVIRONMENT') == 'production':
        # Use Vercel's provided DATABASE_URL in production
        database_url = os.getenv('POSTGRES_URL')
        if database_url:
            return create_engine(database_url, **db_config)
    
    # Use local credentials for development
    db_user = os.getenv("DB_USER", "dojo_admin")
    db_name = os.getenv("DB_NAME", "defidojo")
    db_host = os.getenv("DB_HOST", "localhost")
    db_port = int(os.getenv("DB_PORT", "5432"))
    db_pass = os.getenv("DB_PASSWORD")

    # Create the connection URL
    pool = create_engine(
        sqlalchemy.engine.url.URL.create(
            drivername="postgresql+psycopg2",  # Using PostgreSQL
            username=db_user,
            password=db_pass,
            host=db_host,
            port=db_port,
            database=db_name,
        ),
        **db_config
    )

    return pool


def _init_connection_engine():
    db_config = {
        "pool_size": 5,
        "max_overflow": 2,
        "pool_timeout": 30,  # 30 seconds
        "pool_recycle": 1800,  # 30 minutes
        "echo": os.getenv("ECHO_DB_QUERIES", "false").lower() == "true",
    }

    return _init_tcp_connection_engine(db_config)


# Create the engine instance
engine = _init_connection_engine()


def verify_db_connection():
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        return True
    except Exception as e:
        print(f"Database connection failed: {e}")
        return False
