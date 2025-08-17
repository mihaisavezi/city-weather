#!/bin/sh

# Create the data directory if it doesn't exist
mkdir -p /app/data

# Check if we've already run migrations
if [ ! -f /app/.migration_complete ]; then
  # Run migrations
  echo "Running database migrations..."
  if pnpm db:migrate; then
    echo "Migrations completed successfully"
    touch /app/.migration_complete
  else
    echo "Migrations failed"
    exit 1
  fi
else
  echo "Migrations already completed, skipping..."
fi

# Check if we've already seeded the database
if [ ! -f /app/.seed_complete ]; then
  # Seed the database with sample data
  echo "Seeding the database..."
  if pnpm db:seed; then
    echo "Database seeding completed successfully"
    touch /app/.seed_complete
  else
    echo "Database seeding failed"
    exit 1
  fi
else
  echo "Database already seeded, skipping..."
fi

# Start Drizzle Studio in the background
echo "Starting Drizzle Studio..."
pnpm db:studio --verbose --host 0.0.0.0 &

# Start the application
echo "Starting the application..."
exec pnpm dev
