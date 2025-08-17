# Use Node.js 20 LTS as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files from root
COPY package.json pnpm-lock.yaml ./

# Copy backend package files
COPY packages/backend/package.json ./packages/backend/package.json

# Copy shared package files
COPY packages/shared/package.json ./packages/shared/package.json

# Install root dependencies
RUN pnpm install --no-frozen-lockfile --production=false

# Copy the entire project structure
COPY . .

# Change to the backend directory
WORKDIR /app/packages/backend

# Install backend dependencies
RUN pnpm install --no-frozen-lockfile --production=false

# Copy the init script
COPY packages/backend/scripts/init-db.sh ./scripts/init-db.sh
RUN chmod +x ./scripts/init-db.sh

# Build the TypeScript code
RUN pnpm build

# Create a non-root user and switch to it
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Expose the port the app runs on
EXPOSE 3001

USER nextjs

# Start the application with the init script
CMD ["./scripts/init-db.sh"]