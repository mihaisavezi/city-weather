import { Router } from 'express';
import { eq, like } from 'drizzle-orm';
import { db } from '../db/db.js';
import { cities } from '../db/schema.js';
import { CreateCitySchema, UpdateCitySchema } from '@city-weather-deloitte/shared';
import { getCountryInfo } from '../services/countryService.js';
import { getWeatherInfo } from '../services/weatherService.js';

const router = Router();

/**
 * @swagger
 * /api/cities:
 *   post:
 *     summary: Add a new city
 *     description: Creates a new city record in the database
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCity'
 *           example:
 *             name: "New York"
 *             state: "New York"
 *             country: "United States"
 *             touristRating: 4
 *             dateEstablished: "1625-01-01T00:00:00.000Z"
 *             estimatedPopulation: 8419000
 *     responses:
 *       201:
 *         description: City created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/City'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             examples:
 *               validationError:
 *                 summary: Validation error
 *                 value:
 *                   success: false
 *                   error: "Invalid data"
 *                   timestamp: "2023-01-01T00:00:00.000Z"
 */
router.post('/', async (req, res) => {
  try {
    const cityData = CreateCitySchema.parse(req.body);
    
    const [newCity] = await db.insert(cities).values({
      name: cityData.name,
      state: cityData.state,
      country: cityData.country,
      touristRating: cityData.touristRating,
      dateEstablished: typeof cityData.dateEstablished === 'string' 
        ? cityData.dateEstablished 
        : cityData.dateEstablished.toISOString(),
      estimatedPopulation: cityData.estimatedPopulation
    }).returning();

    res.status(201).json({
      success: true,
      data: newCity,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Invalid data',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @swagger
 * /api/cities/{id}:
 *   put:
 *     summary: Update an existing city
 *     description: Updates a city record by its ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: City ID
 *         example: cjld2cjxh0000qzrmn831i7rn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCity'
 *           example:
 *             touristRating: 5
 *             estimatedPopulation: 8500000
 *     responses:
 *       200:
 *         description: City updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/City'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             examples:
 *               validationError:
 *                 summary: Validation error
 *                 value:
 *                   success: false
 *                   error: "Invalid data"
 *                   timestamp: "2023-01-01T00:00:00.000Z"
 *       404:
 *         description: City not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             examples:
 *               cityNotFound:
 *                 summary: City not found
 *                 value:
 *                   success: false
 *                   error: "City not found"
 *                   timestamp: "2023-01-01T00:00:00.000Z"
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = UpdateCitySchema.parse(req.body);
    
    const updatePayload: any = {
      updatedAt: new Date().toISOString()
    };
    
    if (updateData.touristRating !== undefined) {
      updatePayload.touristRating = updateData.touristRating;
    }
    if (updateData.dateEstablished !== undefined) {
      updatePayload.dateEstablished = typeof updateData.dateEstablished === 'string' 
        ? updateData.dateEstablished 
        : updateData.dateEstablished.toISOString();
    }
    if (updateData.estimatedPopulation !== undefined) {
      updatePayload.estimatedPopulation = updateData.estimatedPopulation;
    }

    const [updatedCity] = await db.update(cities)
      .set(updatePayload)
      .where(eq(cities.id, id))
      .returning();

    if (!updatedCity) {
      return res.status(404).json({
        success: false,
        error: 'City not found',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: updatedCity,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Invalid data',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @swagger
 * /api/cities/{id}:
 *   delete:
 *     summary: Delete a city
 *     description: Deletes a city record by its ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: City ID
 *         example: cjld2cjxh0000qzrmn831i7rn
 *     responses:
 *       200:
 *         description: City deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: cjld2cjxh0000qzrmn831i7rn
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: City not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             examples:
 *               cityNotFound:
 *                 summary: City not found
 *                 value:
 *                   success: false
 *                   error: "City not found"
 *                   timestamp: "2023-01-01T00:00:00.000Z"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             examples:
 *               deleteError:
 *                 summary: Delete failed
 *                 value:
 *                   success: false
 *                   error: "Failed to delete city"
 *                   timestamp: "2023-01-01T00:00:00.000Z"
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [deletedCity] = await db.delete(cities)
      .where(eq(cities.id, id))
      .returning();

    if (!deletedCity) {
      return res.status(404).json({
        success: false,
        error: 'City not found',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: { id: deletedCity.id },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete city',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @swagger
 * /api/cities/search:
 *   get:
 *     summary: Search cities with external data
 *     description: Searches for cities by name and enriches results with country and weather data from external APIs
 *     tags: [Cities]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: City name to search for
 *         example: New York
 *     responses:
 *       200:
 *         description: Search results with enriched data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CitySearchResult'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Missing or invalid query parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             examples:
 *               missingName:
 *                 summary: Missing name parameter
 *                 value:
 *                   success: false
 *                   error: "City name is required"
 *                   timestamp: "2023-01-01T00:00:00.000Z"
 *       500:
 *         description: Server error during search
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             examples:
 *               searchError:
 *                 summary: Search failed
 *                 value:
 *                   success: false
 *                   error: "Search failed"
 *                   timestamp: "2023-01-01T00:00:00.000Z"
 */
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name || typeof name !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'City name is required',
        timestamp: new Date().toISOString()
      });
    }

    const foundCities = await db.select()
      .from(cities)
      .where(like(cities.name, `%${name}%`));

    if (foundCities.length === 0) {
      return res.json({
        success: true,
        data: [],
        timestamp: new Date().toISOString()
      });
    }

    // Enrich with external API data
    const enrichedCities = await Promise.all(
      foundCities.map(async (city) => {
        const [countryInfo, weatherInfo] = await Promise.all([
          getCountryInfo(city.country),
          getWeatherInfo(city.name)
        ]);

        return {
          ...city,
          countryCode2: countryInfo?.countryCode2 || '',
          countryCode3: countryInfo?.countryCode3 || '',
          currencyCode: countryInfo?.currencyCode || '',
          weather: weatherInfo || {
            temperature: 0,
            description: 'Data unavailable',
            humidity: 0,
            windSpeed: 0
          }
        };
      })
    );

    res.json({
      success: true,
      data: enrichedCities,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Search failed',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;