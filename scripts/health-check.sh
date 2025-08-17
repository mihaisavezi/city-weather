#!/bin/bash

# Script to check the health of the City Weather application services

echo "Checking City Weather application health..."

# Set the docker-compose file based on the environment
COMPOSE_FILE="docker-compose.yml"
if [ "$1" == "dev" ]; then
  COMPOSE_FILE="docker-compose.dev.yml"
fi

# Check if docker-compose is running
if ! docker-compose -f $COMPOSE_FILE ps | grep -q "Up"; then
  echo "❌ Docker containers are not running for $1 environment"
  exit 1
fi

echo "✅ Docker containers are running"

# Check backend health
echo "Checking backend health..."
if curl -f -s http://localhost:3001/health > /dev/null; then
  echo "✅ Backend is healthy"
else
  echo "❌ Backend health check failed"
  exit 1
fi

# Check frontend health
echo "Checking frontend health..."
if curl -f -s http://localhost:3000 > /dev/null; then
  echo "✅ Frontend is healthy"
else
  echo "⚠️  Frontend health check failed (this is normal for Docker production builds)"
fi

echo "Health check complete!"