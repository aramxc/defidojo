# Base stage for development and production
FROM python:3.9-slim AS base
WORKDIR /app

# Development stage
FROM base AS development
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .