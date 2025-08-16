# City Weather Application

A full-stack web application for managing city information and retrieving real-time weather data. Built with a modern tech stack featuring React, TypeScript, Express, and SQLite.

## Features

### City Management
- **Add new cities** with detailed information including name, state, country, tourist rating, establishment date, and population
- **Search functionality** with autocomplete (requires 3+ characters for search to reduce API calls and improve performance)
- **View city details** with enriched data from external APIs
- **Edit existing city information**
- **Delete cities** from the database
- **Pagination** for efficient browsing of large city datasets

### Weather Integration
- **Real-time weather data** fetched from external weather APIs
- **Country information** including country codes and currency data
- **Comprehensive city profiles** combining local data with external API information

### Technical Features
- **Full-stack TypeScript application** with type safety across frontend and backend
- **RESTful API** with comprehensive documentation using Swagger
- **SQLite database** with Drizzle ORM for efficient data management
- **React Query** for server state management and caching
- **TanStack Router** for client-side routing
- **Tailwind CSS** for responsive UI design
- **Cursor-based pagination** for consistent results during data modifications
- **Input validation** using Zod schemas
- **Database seeding** with over 100 major world cities
- **Debounced search** to optimize API calls
- **Error handling** with user-friendly error messages

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **TanStack Router** for routing
- **TanStack Query** for server state management
- **Tailwind CSS** for styling
- **Vite** for fast development and building

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **SQLite** database with Drizzle ORM
- **Better-SQLite3** for database connectivity
- **Swagger** for API documentation
- **Zod** for input validation

### Shared
- **TypeScript** shared types and schemas

## Getting Started

### Prerequisites
- Node.js 20.x
- pnpm 8+
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd city-weather-deloitte
```

2. Install dependencies:
```bash
pnpm install
```

3. Seed the database with initial city data:
```bash
pnpm run db:seed
```

### Development

Start both frontend and backend in development mode:
```bash
pnpm run dev
```

This will start:
- Backend server on http://localhost:3000
- Frontend development server on http://localhost:5173

### Available Scripts

#### Root
- `pnpm run dev` - Start both frontend and backend in development mode
- `pnpm run build` - Build both frontend and backend
- `pnpm run test` - Run tests for all packages
- `pnpm run clean` - Clean build artifacts

#### Backend
- `pnpm run dev` - Start backend in watch mode
- `pnpm run build` - Compile TypeScript to JavaScript
- `pnpm run start` - Start the compiled backend
- `pnpm run db:generate` - Generate database migrations
- `pnpm run db:migrate` - Apply database migrations
- `pnpm run db:studio` - Open Drizzle Studio for database inspection
- `pnpm run db:seed` - Seed the database with over 100 sample cities from around the world
- `pnpm run test` - Run backend tests

#### Frontend
- `pnpm run dev` - Start frontend development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run test` - Run frontend tests

## API Documentation

The backend API is documented with Swagger and can be accessed at:
- http://localhost:3001/api-docs (when running locally)

## Database

The application uses SQLite for data storage with the following features:
- **Drizzle ORM** for type-safe database operations
- **Automatic migrations** for schema updates
- **Database seeding** with over 100 major world cities from around the globe
- **Cursor-based pagination** for efficient data retrieval

### Seeding the Database

The application comes with a comprehensive seed script that populates the database with over 100 major cities from all continents. To seed the database:

```bash
pnpm run db:seed
```

The seed script is designed to be safe to run multiple times - it will only add cities that don't already exist in the database, preventing duplicates.

## Search Optimization

The search functionality has been optimized to improve performance and reduce unnecessary API calls:

1. **Minimum Character Requirement**: Search only triggers when 3 or more characters are entered, preventing excessive API calls for short queries.

2. **Debouncing**: Search requests are debounced with a 300ms delay, ensuring that API calls are only made after the user has paused typing.

3. **Client-side Filtering**: Search results are filtered on the client-side to provide instant feedback while maintaining responsiveness.

4. **Caching**: TanStack Query is used to cache search results, reducing redundant API calls for the same search terms.

## Project Structure

```
city-weather/
├── packages/
│   ├── backend/         # Express server and API
│   ├── frontend/        # React frontend application
│   └── shared/          # Shared types and utilities
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── package.json         # Root package configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under the MIT License.
