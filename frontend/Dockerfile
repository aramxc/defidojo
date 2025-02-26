# Base stage for development and production
FROM node:18-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install Python and build tools
RUN apk add --no-cache python3 make g++ gcc libc6-compat

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

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]