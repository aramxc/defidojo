# Database Management Guide

## Development Workflow

1. **Setting Up Local Development**
   ```bash
   # Start Docker containers
   docker-compose up -d

   # Verify database connection in pgAdmin
   Host: localhost
   Port: 5433
   Database: defidojo
   Username: dojo_admin
   ```

2. **Adding New Features**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature

   # Create new migration if needed
   flask db migrate -m "Description of change"
   
   # Review migration file in migrations/versions/
   # Apply migration to Docker DB
   flask db upgrade
   
   # Seed development data
   python -m src.seed
   ```

3. **Development Testing**
   - Test features against Docker database
   - Verify UI with seeded data
   - Run automated tests
   - Review API endpoints

## Production Deployment

### 1. Prepare Production Database
```bash
# Pull production environment variables
vercel env pull .env.production

# Review migration files
flask db upgrade --dry-run

# Apply migration to Neon DB
flask db upgrade
```

### 2. Deploy Code
```bash
# Merge to development
git checkout develop
git merge feature/your-feature
git push origin develop

# After testing in development
git checkout main
git merge develop
git push origin main
```

### 3. Verify Deployment
- Check Vercel deployment logs
- Verify database migrations completed
- Test production endpoints
- Monitor application performance

### 4. Rollback Plan (if needed)
```bash
# Revert database changes
flask db downgrade

# Revert code
git revert <commit>
git push origin main
```

## Common Operations

### Database Backup/Restore
```bash
# Backup production database (Neon)
pg_dump -U <user> -d defidojo > backup.sql

# Restore to local Docker database
docker-compose exec postgres psql -U dojo_admin -d defidojo < backup.sql
```

## Development Setup

### Initial Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Start Docker environment
docker-compose up -d

# Initialize and migrate database
docker-compose run --rm migration
```

### Local Development
```bash
# Start all services
docker-compose up

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Database Connections
- Local Development (Docker): localhost:5433
- Production (Neon): Use DATABASE_URL from Vercel

## Best Practices
- Always test migrations on Docker before production
- Keep development and production databases in sync
- Use feature branches for development
- Run migrations before deploying code changes
- Maintain backup before production changes

## Code Formatting Guidelines

### Saving Code with Proper Formatting
- Use normalized line endings
- Preserve indentation
- Handle special characters

Example model methods:
```python
@staticmethod
def format_code(code: str) -> str:
    """Preserve formatting when saving code"""
    return code.replace('\r\n', '\n')

@property
def formatted_code(self) -> str:
    """Return properly formatted code for frontend"""
    return self.code if self.code else ""
```

## Development Setup

### Initial Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt
```

### Database Setup
```bash
# Create database
createdb defidojo

# Initialize migrations
flask db init

# Create and apply initial migration
flask db migrate -m "Initial migration"
flask db upgrade

# Seed initial data
python -m src.seed
```


### Prod Deployment

# Before deploying to production:
1. Pull production environment variables
vercel env pull .env.production

2. Review migration files
flask db upgrade --dry-run

3. Run migrations
flask db upgrade

4. Deploy application
git push (triggers Vercel deploy)