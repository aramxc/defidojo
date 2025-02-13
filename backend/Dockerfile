# Base stage for development and production
FROM python:3.9-slim AS base
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Development stage
FROM base AS development
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .