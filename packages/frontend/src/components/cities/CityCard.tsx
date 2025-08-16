import type { CitySearchResult } from '@city-weather-deloitte/shared';

interface CityCardProps {
  city: CitySearchResult;
}

export function CityCard({ city }: CityCardProps) {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{city.name}</h2>
          <p className="text-lg text-gray-600">{city.state}, {city.country}</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          {city.touristRating}/5 ⭐
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* City Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-3">City Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Population</span>
              <span className="font-medium">{city.estimatedPopulation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Established</span>
              <span className="font-medium">
                {new Date(city.dateEstablished).getFullYear()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Country Codes</span>
              <div className="font-medium">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-1">
                  {city.countryCode2}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {city.countryCode3}
                </span>
              </div>
            </div>
            {city.currencyCode && (
              <div className="flex justify-between">
                <span className="text-gray-600">Currency</span>
                <span className="font-medium">{city.currencyCode}</span>
              </div>
            )}
          </div>
        </div>

        {/* Weather Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Current Weather</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Temperature</span>
              <span className="font-medium text-lg">
                {city.weather.temperature}°C
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Description</span>
              <span className="font-medium capitalize">{city.weather.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Humidity</span>
              <span className="font-medium">{city.weather.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Wind Speed</span>
              <span className="font-medium">{city.weather.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}