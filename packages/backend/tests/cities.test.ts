import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import cityRoutes from '../src/routes/cities.js';

const app = express();
app.use(express.json());
app.use('/api/cities', cityRoutes);

describe('Cities API', () => {
  beforeEach(async () => {
    // Clear the database before each test
    // Note: In a real test, you would want to set up a test database
  });

  it('should create a new city', async () => {
    const cityData = {
      name: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      touristRating: 4,
      dateEstablished: '2020-01-01T00:00:00.000Z',
      estimatedPopulation: 100000
    };

    const response = await request(app)
      .post('/api/cities')
      .send(cityData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(cityData.name);
    expect(response.body.data.id).toBeDefined();
  });

  it('should validate required fields', async () => {
    const invalidData = {
      name: '', // Invalid empty name
      state: 'Test State'
    };

    const response = await request(app)
      .post('/api/cities')
      .send(invalidData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('required');
  });

  it('should get all cities with cursor-based pagination', async () => {
    // First create a few cities
    const cities = [
      {
        name: 'Test City 1',
        state: 'Test State 1',
        country: 'Test Country 1',
        touristRating: 4,
        dateEstablished: '2020-01-01T00:00:00.000Z',
        estimatedPopulation: 100000
      },
      {
        name: 'Test City 2',
        state: 'Test State 2',
        country: 'Test Country 2',
        touristRating: 3,
        dateEstablished: '2021-01-01T00:00:00.000Z',
        estimatedPopulation: 200000
      }
    ];

    // Create the cities
    for (const cityData of cities) {
      await request(app)
        .post('/api/cities')
        .send(cityData)
        .expect(201);
    }

    // Test pagination endpoint
    const response = await request(app)
      .get('/api/cities?limit=10')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.items).toBeDefined();
    expect(Array.isArray(response.body.data.items)).toBe(true);
    expect(response.body.data.count).toBeDefined();
    expect(response.body.data.hasMore).toBeDefined();
    expect(response.body.data.nextCursor).toBeDefined();
  });

  it('should validate pagination limit parameter', async () => {
    const response = await request(app)
      .get('/api/cities?limit=101') // Over the max limit of 100
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Limit must be between 1 and 100');
  });
});