# Base stage for development and production
FROM node:18-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Development stage
FROM base AS development
COPY package*.json ./
# Use npm ci for more consistent installs
RUN npm ci --quiet

COPY . .
# Add build cache directory
RUN mkdir -p .next && chown node:node .next

# Switch to non-root user for better security
USER node

CMD ["npm", "run", "dev"]