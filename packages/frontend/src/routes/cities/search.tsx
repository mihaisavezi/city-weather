import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cityApi, queryKeys } from '@/services/cityApi';
import { CityTable } from '@/components/cities/CityTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const Route = createFileRoute('/cities/search')({
  component: SearchCities,
});

function SearchCities() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: cities, isLoading, error } = useQuery({
    queryKey: queryKeys.search(searchTerm),
    queryFn: () => cityApi.searchCities(searchTerm),
    enabled: searchTerm.length > 0,
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Search Cities</h1>
        <p className="text-gray-600 mb-6">Find cities with weather and country information</p>
      </div>

      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          City Name
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading && <LoadingSpinner />}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error: {error.message}
        </div>
      )}

      {cities && cities.length > 0 && (
        <CityTable cities={cities} showWeather={true} />
      )}

      {cities && cities.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No cities found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}