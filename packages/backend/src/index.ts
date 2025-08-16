import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './config/swagger.js';
import cityRoutes from './routes/cities.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger UI
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      deepLinking: false,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'City Weather API Documentation',
  })
);

// Routes
app.use('/api/cities', cityRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve swagger spec
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
  console.log(
    ` API Documentation available at http://localhost:${port}/api-docs`
  );
});
