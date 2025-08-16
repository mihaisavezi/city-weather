import { createId } from '@paralleldrive/cuid2';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const cities = sqliteTable('cities', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  state: text('state').notNull(),
  country: text('country').notNull(),
  touristRating: integer('tourist_rating').notNull(),
  dateEstablished: text('date_established').notNull(), // ISO string
  estimatedPopulation: integer('estimated_population').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export type City = typeof cities.$inferSelect;
export type NewCity = typeof cities.$inferInsert;
