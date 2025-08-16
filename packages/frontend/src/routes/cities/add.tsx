import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { CityForm } from '@/components/cities/CityForm';
import { cityApi } from '@/services/cityApi';

export const Route = createFileRoute('/cities/add')({
  component: AddCity,
});

function AddCity() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: cityApi.createCity,
    onSuccess: () => {
      // Invalidate and refetch cities
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      navigate({ to: '/cities' });
    },
  });

  const handleSubmit = async (cityData: any) => {
    await mutation.mutateAsync(cityData);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New City</h1>
      {mutation.isError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 mb-6">
          Error: {mutation.error.message}
        </div>
      )}
      <CityForm onSubmit={handleSubmit} />
    </div>
  );
}
