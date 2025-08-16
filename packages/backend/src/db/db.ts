import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';

const sqlite = new Database('./dev.db');
export const db = drizzle(sqlite, { schema });

// Enable WAL mode for better performance
sqlite.pragma('journal_mode = WAL');