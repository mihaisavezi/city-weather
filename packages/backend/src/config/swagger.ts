import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'City Weather API',
      version: '1.0.0',
      description: 'API for managing cities with integrated weather and country data',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        CreateCity: {
          type: 'object',
          required: ['name', 'state', 'country', 'touristRating', 'dateEstablished', 'estimatedPopulation'],
          properties: {
            name: {
              type: 'string',
              example: 'New York',
              description: 'Name of the city',
            },
            state: {
              type: 'string',
              example: 'New York',
              description: 'State where the city is located',
            },
            country: {
              type: 'string',
              example: 'United States',
              description: 'Country where the city is located',
            },
            touristRating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              example: 4,
              description: 'Tourist rating from 1 to 5',
            },
            dateEstablished: {
              type: 'string',
              format: 'date-time',
              example: '1625-01-01T00:00:00.000Z',
              description: 'Date when the city was established (ISO 8601 format)',
            },
            estimatedPopulation: {
              type: 'integer',
              example: 8419000,
              description: 'Estimated population of the city',
            },
          },
        },
        UpdateCity: {
          type: 'object',
          properties: {
            touristRating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              example: 5,
              description: 'Tourist rating from 1 to 5',
            },
            dateEstablished: {
              type: 'string',
              format: 'date-time',
              example: '1625-01-01T00:00:00.000Z',
              description: 'Date when the city was established (ISO 8601 format)',
            },
            estimatedPopulation: {
              type: 'integer',
              example: 8500000,
              description: 'Estimated population of the city',
            },
          },
        },
        City: {
          type: 'object',
          required: [
            'id',
            'name',
            'state',
            'country',
            'touristRating',
            'dateEstablished',
            'estimatedPopulation',
            'createdAt',
            'updatedAt',
          ],
          properties: {
            id: {
              type: 'string',
              example: 'cjld2cjxh0000qzrmn831i7rn',
              description: 'Unique identifier for the city',
            },
            name: {
              type: 'string',
              example: 'New York',
              description: 'Name of the city',
            },
            state: {
              type: 'string',
              example: 'New York',
              description: 'State where the city is located',
            },
            country: {
              type: 'string',
              example: 'United States',
              description: 'Country where the city is located',
            },
            touristRating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              example: 4,
              description: 'Tourist rating from 1 to 5',
            },
            dateEstablished: {
              type: 'string',
              format: 'date-time',
              example: '1625-01-01T00:00:00.000Z',
              description: 'Date when the city was established (ISO 8601 format)',
            },
            estimatedPopulation: {
              type: 'integer',
              example: 8419000,
              description: 'Estimated population of the city',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-01T00:00:00.000Z',
              description: 'Timestamp when the city record was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-01T00:00:00.000Z',
              description: 'Timestamp when the city record was last updated',
            },
          },
        },
        CitySearchResult: {
          type: 'object',
          required: [
            'id',
            'name',
            'state',
            'country',
            'touristRating',
            'dateEstablished',
            'estimatedPopulation',
            'createdAt',
            'updatedAt',
            'countryCode2',
            'countryCode3',
            'weather',
          ],
          properties: {
            id: {
              type: 'string',
              example: 'cjld2cjxh0000qzrmn831i7rn',
              description: 'Unique identifier for the city',
            },
            name: {
              type: 'string',
              example: 'New York',
              description: 'Name of the city',
            },
            state: {
              type: 'string',
              example: 'New York',
              description: 'State where the city is located',
            },
            country: {
              type: 'string',
              example: 'United States',
              description: 'Country where the city is located',
            },
            touristRating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              example: 4,
              description: 'Tourist rating from 1 to 5',
            },
            dateEstablished: {
              type: 'string',
              format: 'date-time',
              example: '1625-01-01T00:00:00.000Z',
              description: 'Date when the city was established (ISO 8601 format)',
            },
            estimatedPopulation: {
              type: 'integer',
              example: 8419000,
              description: 'Estimated population of the city',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-01T00:00:00.000Z',
              description: 'Timestamp when the city record was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-01T00:00:00.000Z',
              description: 'Timestamp when the city record was last updated',
            },
            countryCode2: {
              type: 'string',
              example: 'US',
              description: '2-letter country code',
            },
            countryCode3: {
              type: 'string',
              example: 'USA',
              description: '3-letter country code',
            },
            currencyCode: {
              type: 'string',
              example: 'USD',
              description: 'Currency code of the country',
            },
            weather: {
              type: 'object',
              required: ['temperature', 'description', 'humidity', 'windSpeed'],
              properties: {
                temperature: {
                  type: 'number',
                  format: 'float',
                  example: 22.5,
                  description: 'Current temperature in Celsius',
                },
                description: {
                  type: 'string',
                  example: 'Clear sky',
                  description: 'Weather description',
                },
                humidity: {
                  type: 'integer',
                  example: 65,
                  description: 'Humidity percentage',
                },
                windSpeed: {
                  type: 'number',
                  format: 'float',
                  example: 3.5,
                  description: 'Wind speed in m/s',
                },
              },
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
              description: 'Indicates if the request was successful',
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
            error: {
              type: 'string',
              example: 'City not found',
              description: 'Error message if the request failed',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-01T00:00:00.000Z',
              description: 'Timestamp of the response',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes with JSDoc annotations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;