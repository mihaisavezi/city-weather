import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cityApi, queryKeys } from '@/services/cityApi';
import { CityTable } from '@/components/cities/CityTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { City, CursorPaginatedResponse } from '@city-weather-deloitte/shared';

export const Route = createFileRoute('/cities/')({
  component: CitiesList,
});

function CitiesList() {
  const [allCities, setAllCities] = useState<City[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  const { data, isLoading, error, isFetching } = useQuery<
    CursorPaginatedResponse<City>,
    Error
  >({
    queryKey: queryKeys.citiesPaginated({ limit: 20, cursor: currentCursor || undefined }),
    queryFn: () => cityApi.getAllCitiesPaginated({ limit: 20, cursor: currentCursor || undefined }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Handle data updates when query succeeds
  useEffect(() => {
    if (data) {
      if (currentCursor) {
        // Append for pagination
        setAllCities(prev => [...prev, ...(data.data.items as City[])]);
      } else {
        // Initial load or refresh
        setAllCities(data.data.items as City[]);
      }
    }
  }, [data, currentCursor]);

  const deleteMutation = useMutation({
    mutationFn: cityApi.deleteCity,
    onSuccess: (_, deletedId) => {
      // Remove from local state
      setAllCities(prev => prev.filter(city => city.id !== deletedId));
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: [...queryKeys.cities] });
    },
  });

  const loadMore = () => {
    if (data?.data.nextCursor) {
      setCurrentCursor(data.data.nextCursor);
    }
  };

  const refresh = () => {
    setCurrentCursor(null);
    setAllCities([]);
    queryClient.invalidateQueries({ 
      queryKey: [...queryKeys.citiesPaginated({ limit: 20 })] 
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading && !currentCursor && allCities.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
        <div className="flex justify-between items-center">
          <span>Error: {error.message}</span>
          <button 
            onClick={refresh}
            className="btn-secondary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const citiesToDisplay = currentCursor ? allCities : (data?.data.items || []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Cities</h1>
          <p className="text-gray-600">Manage your cities database ({citiesToDisplay.length} loaded)</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={refresh}
            className="btn-secondary"
          >
            Refresh
          </button>
          <Link 
            to="/cities/add" 
            className="btn-primary"
          >
            Add City
          </Link>
        </div>
      </div>

      {citiesToDisplay.length > 0 ? (
        <>
          <CityTable 
            cities={citiesToDisplay} 
            showWeather={false}
            onEdit={(city) => {
              // Navigate to edit page - implement based on your routing setup
              window.location.href = `/cities/edit/${city.id}`;
            }}
            onDelete={handleDelete}
          />
          
          {data?.data.hasMore && (
            <div className="mt-4 text-center">
              <button 
                onClick={loadMore}
                disabled={isFetching}
                className="btn-primary"
              >
                {isFetching ? 'Loading...' : `Load More Cities`}
              </button>
            </div>
          )}
          
          {data && !data.data.hasMore && citiesToDisplay.length > 0 && (
            <div className="mt-4 text-center text-gray-500">
              All cities loaded ({citiesToDisplay.length} total)
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <p className="text-gray-500 mb-4">No cities found in your database</p>
              <Link to="/cities/add" className="btn-primary">
                Add Your First City
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}