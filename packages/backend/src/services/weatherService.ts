import { z } from 'zod';

const OpenWeatherResponseSchema = z.object({
  main: z.object({
    temp: z.number(),
    humidity: z.number(),
  }),
  weather: z.array(
    z.object({
      description: z.string(),
    })
  ),
  wind: z.object({
    speed: z.number(),
  }),
});

export interface WeatherInfo {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export async function getWeatherInfo(
  cityName: string
): Promise<WeatherInfo | null> {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    console.warn('OpenWeather API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    const weather = OpenWeatherResponseSchema.parse(data);

    return {
      temperature: weather.main.temp,
      description: weather.weather[0].description,
      humidity: weather.main.humidity,
      windSpeed: weather.wind.speed,
    };
  } catch (error) {
    console.error('Error fetching weather info:', error);
    return null;
  }
}
