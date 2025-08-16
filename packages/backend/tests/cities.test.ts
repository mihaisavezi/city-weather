import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import cityRoutes from '../src/routes/cities.js';

const app = express();
app.use(express.json());
app.use('/api/cities', cityRoutes);

describe('Cities API', () => {
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
});