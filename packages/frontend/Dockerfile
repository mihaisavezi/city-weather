# Use Node.js 20 LTS as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files from root
COPY package.json pnpm-lock.yaml ./

# Copy frontend package files
COPY packages/frontend/package.json ./packages/frontend/package.json

# Copy shared package files
COPY packages/shared/package.json ./packages/shared/package.json

# Install root dependencies
RUN pnpm install --no-frozen-lockfile --production=false

# Copy the entire project structure
COPY . .

# Change to the frontend directory
WORKDIR /app/packages/frontend

# Install frontend dependencies
RUN pnpm install --no-frozen-lockfile --production=false

# Build the application with production environment
RUN pnpm build

# Install a simple web server to serve the static files
RUN npm install -g serve

# Create a non-root user and switch to it
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Expose the port the app runs on
EXPOSE 3000

USER nextjs

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "3000"]