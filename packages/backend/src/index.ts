import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './config/swagger.js';
import citiesRouter from './routes/cities.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'city-weather-backend',
  });
});

// Routes
app.use('/api/cities', citiesRouter);

// Swagger UI
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    deepLinking: false,
    customSiteTitle: 'City Weather API Documentation',
  })
);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `API Documentation available at http://localhost:${port}/api-docs`
  );
  console.log(
    `Health check endpoint available at http://localhost:${port}/health`
  );
});
