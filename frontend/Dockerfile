# Base stage for development and production
FROM node:18-alpine AS base
WORKDIR /app

# Development stage
FROM base AS development
COPY package*.json ./
RUN npm install
RUN npm install @monaco-editor/react monaco-editor framer-motion
COPY . .