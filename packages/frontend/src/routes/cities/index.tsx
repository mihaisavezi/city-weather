import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { cityApi } from '@/services/cityApi';
import { CityTable } from '@/components/cities/CityTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Link } from '@tanstack/react-router';

// Mock function to get all cities (will be replaced with actual API call)
const getAllCities = async () => {
  // This is a placeholder - in a real app, you would fetch from the API
  return [
    {
      id: '1',
      name: 'New York',
      state: 'New York',
      country: 'United States',
      touristRating: 4,
      dateEstablished: '1624-01-01T00:00:00.000Z',
      estimatedPopulation: 8336817
    },
    {
      id: '2',
      name: 'London',
      state: 'England',
      country: 'United Kingdom',
      touristRating: 5,
      dateEstablished: '43-01-01T00:00:00.000Z',
      estimatedPopulation: 9648110
    }
  ];
};

export const Route = createFileRoute('/cities/')({
  component: Cities,
});

function Cities() {
  // In a real app, you would fetch the actual cities data
  const { data: cities, isLoading, error } = useQuery({
    queryKey: ['cities'],
    queryFn: getAllCities
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
          onEdit={(city) => console.log('Edit city', city)}
          onDelete={(id) => console.log('Delete city', id)}
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