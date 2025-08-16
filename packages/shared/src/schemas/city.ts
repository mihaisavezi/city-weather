import { z } from 'zod';

// Core city data stored in database
export const CreateCitySchema = z.object({
  name: z.string().min(1, 'City name is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  touristRating: z.number().int().min(1).max(5),
  dateEstablished: z.string().datetime().or(z.date()),
  estimatedPopulation: z.number().int().positive()
});

export const UpdateCitySchema = z.object({
  touristRating: z.number().int().min(1).max(5).optional(),
  dateEstablished: z.string().datetime().or(z.date()).optional(),
  estimatedPopulation: z.number().int().positive().optional()
});

export const CitySchema = CreateCitySchema.extend({
  id: z.string().uuid()
});

// External API response schemas
export const CountrySchema = z.object({
  cca2: z.string(), // 2-digit country code
  cca3: z.string(), // 3-digit country code
  currencies: z.record(z.object({
    name: z.string(),
    symbol: z.string().optional()
  })).optional()
});

export const WeatherSchema = z.object({
  temperature: z.number(),
  description: z.string(),
  humidity: z.number(),
  windSpeed: z.number()
});

// Combined search response
export const CitySearchResultSchema = CitySchema.extend({
  countryCode2: z.string(),
  countryCode3: z.string(),
  currencyCode: z.string().optional(),
  weather: WeatherSchema
});

// Type exports
export type CreateCity = z.infer<typeof CreateCitySchema>;
export type UpdateCity = z.infer<typeof UpdateCitySchema>;
export type City = z.infer<typeof CitySchema>;
export type Country = z.infer<typeof CountrySchema>;
export type Weather = z.infer<typeof WeatherSchema>;
export type CitySearchResult = z.infer<typeof CitySearchResultSchema>;