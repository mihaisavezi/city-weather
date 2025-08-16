import { Router } from 'express';
import { eq, like } from 'drizzle-orm';
import { db } from '../db/db.js';
import { cities } from '../db/schema.js';
import { CreateCitySchema, UpdateCitySchema } from '@city-weather-deloitte/shared';
import { getCountryInfo } from '../services/countryService.js';
import { getWeatherInfo } from '../services/weatherService.js';

const router = Router();

// Add City
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

// Update City
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

// Delete City
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

// Search Cities (with external data integration)
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