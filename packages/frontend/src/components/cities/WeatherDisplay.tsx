import type { Weather } from '@city-weather-deloitte/shared';

interface WeatherDisplayProps {
  weather: Weather;
}

export function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Current Weather</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Temperature</p>
          <p className="text-xl font-semibold">{weather.temperature}°C</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Description</p>
          <p className="text-xl font-semibold capitalize">{weather.description}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Wind Speed</p>
          <p className="text-xl font-semibold">{weather.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
}