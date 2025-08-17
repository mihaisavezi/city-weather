import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { cities } from './schema';

// For Docker deployment, we'll use a consistent path for the SQLite database
const databasePath = process.env.DATABASE_URL || './data/cities.db';

const sqlite = new Database(databasePath);
export const db = drizzle(sqlite, { schema: { cities } });

// Graceful shutdown
process.on('exit', () => sqlite.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
