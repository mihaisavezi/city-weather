import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { cityApi } from '@/services/cityApi';
import { CityCard } from '@/components/cities/CityCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const Route = createFileRoute('/cities/detail/$id')({
  component: CityDetail,
});

function CityDetail() {
  const { id } = Route.useParams();
  
  // Fetch the actual city data
  const { data: city, isLoading, error } = useQuery({
    queryKey: cityApi.queryKeys.city(id),
    queryFn: () => cityApi.getCityById(id),
    enabled: !!id
  });

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">City Details</h1>
      {city ? (
        <CityCard city={city} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-700">
          City not found
        </div>
      )}
    </div>
  );
}