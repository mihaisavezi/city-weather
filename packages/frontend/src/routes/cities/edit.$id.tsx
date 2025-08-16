import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cityApi } from '@/services/cityApi';
import { CityForm } from '@/components/cities/CityForm';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/services/cityApi';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Mock function to get city by ID (will be replaced with actual API call)
const getCityById = async (id: string) => {
  // This is a placeholder - in a real app, you would fetch from the API
  return {
    id,
    name: 'Sample City',
    state: 'Sample State',
    country: 'Sample Country',
    touristRating: 4,
    dateEstablished: '2023-01-01T00:00:00.000Z',
    estimatedPopulation: 1000000
  };
};

export const Route = createFileRoute('/cities/edit/$id')({
  component: EditCity,
});

function EditCity() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // In a real app, you would fetch the actual city data
  const { data: city, isLoading, error } = useQuery({
    queryKey: ['city', id],
    queryFn: () => getCityById(id),
    enabled: !!id
  });
  
  const mutation = useMutation({
    mutationFn: (updates: any) => cityApi.updateCity(id, updates),
    onSuccess: () => {
      // Invalidate and refetch cities
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      navigate({ to: '/cities' });
    },
  });

  const handleSubmit = async (cityData: any) => {
    await mutation.mutateAsync(cityData);
  };

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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit City</h1>
      {mutation.isError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 mb-6">
          Error: {mutation.error.message}
        </div>
      )}
      {city && (
        <CityForm 
          initialData={city}
          onSubmit={handleSubmit}
          isEditing={true}
        />
      )}
    </div>
  );
}