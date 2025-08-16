import type { City, CitySearchResult } from '@city-weather-deloitte/shared';
import { Link } from '@tanstack/react-router';

interface CityTableProps {
  cities: (City | CitySearchResult)[];
  showWeather?: boolean;
  onEdit?: (city: City) => void;
  onDelete?: (id: string) => void;
}

export function CityTable({
  cities,
  showWeather = false,
  onEdit,
  onDelete,
}: CityTableProps) {
  const isSearchResult = (city: any): city is CitySearchResult => {
    return 'weather' in city;
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">State</th>
            <th className="table-header">Country</th>
            <th className="table-header">Rating</th>
            <th className="table-header">Population</th>
            {showWeather && <th className="table-header">Weather</th>}
            {showWeather && <th className="table-header">Country Code</th>}
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cities.map(city => (
            <tr key={city.id}>
              <td className="table-cell">{city.name}</td>
              <td className="table-cell">{city.state}</td>
              <td className="table-cell">{city.country}</td>
              <td className="table-cell">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {city.touristRating}/5
                </span>
              </td>
              <td className="table-cell">
                {city.estimatedPopulation.toLocaleString()}
              </td>

              {showWeather && isSearchResult(city) && (
                <>
                  <td className="table-cell">
                    <div className="text-sm text-gray-900">
                      {city.weather.temperature}°C
                    </div>
                    <div className="text-sm text-gray-500">
                      {city.weather.description}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {city.countryCode2}
                    </span>
                  </td>
                </>
              )}

              <td className="table-cell">
                <div className="flex space-x-2">
                  <Link
                    to="/cities/detail/$id"
                    params={{ id: city.id }}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    View
                  </Link>
                  {onEdit && (
                    <button
                      onClick={() => onEdit(city as City)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(city.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
