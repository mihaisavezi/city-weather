# City Weather Application

This is a full-stack application that provides information about cities, including weather data and country information.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, TanStack Router, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript, Drizzle ORM
- **Database:** SQLite
- **Development:** Docker, Docker Compose

## Features

- **City Management:** Add, edit, and delete cities.
- **Weather Information:** View current weather for each city.
- **Country Information:** View country details for each city.
- **Live Reloading:** Automatic reloading for both frontend and backend during development.
- **Automated Database Setup:** The database is automatically created, migrated, and seeded on startup.

## Prerequisites

- Docker and Docker Compose

## Getting Started

### 1. Environment Setup

Before running the application, you need to set up your environment variables.

1.  Create a `.env` file in the root of the project.
2.  Add your OpenWeather API key to the `.env` file:

    ```
    OPENWEATHER_API_KEY=your_api_key_here
    ```

### 2. Running the Application

To run the application in development mode with Docker:

```bash
# Build and start all services in development mode
docker-compose -f docker-compose.dev.yml up --build -d
```

This command will:
- Build the Docker images for the frontend and backend.
- Start the containers in detached mode.
- Automatically create, migrate, and seed the database.
- Enable live reloading for both the frontend and backend.

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### 3. Stopping the Application

To stop the application:

```bash
# Stop all services
docker-compose -f docker-compose.dev.yml down

# Stop all services and remove volumes
docker-compose -f docker-compose.dev.yml down -v
```

## Development Workflow

### Database

The application uses SQLite with Drizzle ORM. The database is automatically initialized when the backend container starts.

To generate new migrations, run the following command inside the backend container:

```bash
docker-compose -f docker-compose.dev.yml exec backend pnpm db:generate
```

To run database studio:

```bash
docker-compose -f docker-compose.dev.yml exec backend pnpm db:studio
```

## API Documentation

Once the backend is running, API documentation is available at:
http://localhost:3001/api-docs

## Testing

To run tests, you can run the following commands:

```bash
# Run all tests
docker-compose -f docker-compose.dev.yml exec frontend pnpm test
docker-compose -f docker-compose.dev.yml exec backend pnpm test

# Run frontend tests
docker-compose -f docker-compose.dev.yml exec frontend pnpm test

# Run backend tests
docker-compose -f docker-compose.dev.yml exec backend pnpm test
```
