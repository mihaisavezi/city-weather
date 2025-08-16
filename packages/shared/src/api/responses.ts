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

export const PaginatedQuerySchema = z.object({
  limit: z.number().int().positive().max(100).default(10),
  cursor: z.string().optional()
});

export const CursorPaginatedResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z.array(z.unknown()),
    nextCursor: z.string().nullable(),
    hasMore: z.boolean(),
    count: z.number().int()
  }),
  error: z.string().optional(),
  timestamp: z.string().datetime()
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

export type PaginatedQuery = z.infer<typeof PaginatedQuerySchema>;

export type CursorPaginatedResponse<T> = {
  success: boolean;
  data: {
    items: T[];
    nextCursor: string | null;
    hasMore: boolean;
    count: number;
  };
  error?: string;
  timestamp: string;
};