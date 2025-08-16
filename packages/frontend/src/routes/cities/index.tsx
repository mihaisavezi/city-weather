import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { cityApi } from '@/services/cityApi';
import { CityTable } from '@/components/cities/CityTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const Route = createFileRoute('/cities/')({
  component: Cities,
});

function Cities() {
  const { data: cities, isLoading, error } = useQuery({
    queryKey: ['cities'],
    queryFn: cityApi.getAllCities
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cities</h1>
        <Link 
          to="/cities/add" 
          className="btn-primary"
        >
          Add City
        </Link>
      </div>
      <p className="text-gray-600 mb-6">View and manage all cities in the database</p>
      
      {isLoading && <LoadingSpinner />}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
          Error: {error.message}
        </div>
      )}
      
      {cities && cities.length > 0 && (
        <CityTable 
          cities={cities} 
          showWeather={false}
          onEdit={(city) => cityApi.updateCity(city.id, city)}
          onDelete={(id) => cityApi.deleteCity(id)}
        />
      )}
      
      {cities && cities.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No cities found in the database</p>
          <Link to="/cities/add" className="btn-primary">
            Add Your First City
          </Link>
        </div>
      )}
    </div>
  );
}