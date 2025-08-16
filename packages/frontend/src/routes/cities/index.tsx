import type {
  City,
  CursorPaginatedResponse,
} from '@city-weather-deloitte/shared';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

import { CityTable } from '@/components/cities/CityTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cityApi, queryKeys } from '@/services/cityApi';

export const Route = createFileRoute('/cities/')({
  component: CitiesList,
});

function CitiesList() {
  const [allCities, setAllCities] = useState<City[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const queryClient = useQueryClient();

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Existing query for all cities (paginated)
  const { data, isLoading, error, isFetching } = useQuery<
    CursorPaginatedResponse<City>,
    Error
  >({
    queryKey: queryKeys.citiesPaginated({
      limit: 20,
      cursor: currentCursor || undefined,
    }),
    queryFn: () =>
      cityApi.getAllCitiesPaginated({
        limit: 20,
        cursor: currentCursor || undefined,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // New query for search results (debounced)
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useQuery({
    queryKey: queryKeys.search(debouncedSearchTerm),
    queryFn: () => cityApi.searchCities(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length >= 3, // Only search when 3 or more characters are entered
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
      queryKey: [...queryKeys.citiesPaginated({ limit: 20 })],
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      deleteMutation.mutate(id);
    }
  };

  // Determine which data to display - search results or all cities
  const displayData = currentCursor ? allCities : data?.data.items || [];

  if (isLoading && !currentCursor && allCities.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
        <div className="flex justify-between items-center">
          <span>Error: {error.message}</span>
          <button onClick={refresh} className="btn-secondary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cities</h1>
          <p className="text-gray-600">
            Manage your cities database ({displayData.length} loaded)
          </p>
        </div>
        <div className="flex space-x-2">
          <button onClick={refresh} className="btn-secondary">
            Refresh
          </button>
          <Link to="/cities/add" className="btn-primary">
            Add City
          </Link>
        </div>
      </div>

      {/* Search Bar with Autocomplete */}
      <div className="mb-36">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Search Cities
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)} // Delay to allow click on results
            placeholder="Enter city name (3+ characters)..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Floating search results dropdown */}
          {searchFocused && debouncedSearchTerm.length >= 3 && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden">
              {isSearchLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Searching...
                </div>
              ) : searchError ? (
                <div className="p-4 text-red-500">
                  Error: {searchError.message}
                </div>
              ) : searchResults && searchResults.length > 0 ? (
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map(city => (
                    <div
                      key={city.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onMouseDown={() => {
                        // Navigate to city detail page
                        window.location.href = `/cities/detail/${city.id}`;
                      }}
                    >
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-gray-600">
                        {city.state}, {city.country}
                      </div>
                      {city.weather && (
                        <div className="mt-1 flex items-center text-sm">
                          <span className="text-blue-600 font-medium">
                            {city.weather.temperature}°C
                          </span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-gray-600">
                            {city.weather.description}
                          </span>
                        </div>
                      )}
                      <div className="mt-1 flex text-xs text-gray-500">
                        <span className="mr-3">
                          Humidity: {city.weather?.humidity}%
                        </span>
                        <span>Wind: {city.weather?.windSpeed} m/s</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : debouncedSearchTerm ? (
                <div className="p-4 text-gray-500 text-center">
                  No cities found matching "{debouncedSearchTerm}"
                </div>
              ) : null}
            </div>
          )}

          {/* Show hint when search term is less than 3 characters */}
          {searchFocused &&
            debouncedSearchTerm.length > 0 &&
            debouncedSearchTerm.length < 3 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden">
                <div className="p-4 text-gray-500 text-center">
                  Please enter at least 3 characters to search
                </div>
              </div>
            )}
        </div>
      </div>

      {/* List of all cities (always shown) */}
      {displayData.length > 0 ? (
        <>
          <CityTable
            cities={displayData}
            showWeather={false}
            onEdit={city => {
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

          {data && !data.data.hasMore && displayData.length > 0 && (
            <div className="mt-4 text-center text-gray-500">
              All cities loaded ({displayData.length} total)
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No cities found in your database</p>
          <Link to="/cities/add" className="btn-primary">
            Add Your First City
          </Link>
        </div>
      )}
    </div>
  );
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
