import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cityApi } from '@/services/cityApi';
import { CityForm } from '@/components/cities/CityForm';
import { useQuery } from '@tanstack/react-query';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const Route = createFileRoute('/cities/edit/$id')({
  component: EditCity,
});

function EditCity() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Fetch the actual city data
  const { data: city, isLoading, error } = useQuery({
    queryKey: cityApi.queryKeys.city(id),
    queryFn: () => cityApi.getCityById(id),
    enabled: !!id
  });
  
  const mutation = useMutation({
    mutationFn: (updates: any) => cityApi.updateCity(id, updates),
    onSuccess: () => {
      // Invalidate and refetch cities
      queryClient.invalidateQueries({ queryKey: cityApi.queryKeys.cities });
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