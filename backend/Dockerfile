# Base stage for development and production
FROM python:3.12-slim AS base
WORKDIR /app

# Install system dependencies including PostgreSQL client
RUN apt-get update && \
    apt-get install -y \
    curl \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Development stage
FROM base AS development
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

# Set environment variables
ENV FLASK_APP=src/main.py
ENV FLASK_ENV=development

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=8000"]