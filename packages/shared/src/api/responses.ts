import { z } from 'zod';

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
  timestamp: z.string().datetime()
});

export const PaginatedResponseSchema = ApiResponseSchema.extend({
  data: z.object({
    items: z.array(z.unknown()),
    total: z.number(),
    page: z.number(),
    limit: z.number()
  })
});

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
};

export type PaginatedResponse<T> = {
  success: boolean;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
  };
  error?: string;
  timestamp: string;
};