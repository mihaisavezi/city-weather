import { City } from '@city-weather-deloitte/shared';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

import { CityForm } from '@/components/cities/CityForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cityApi } from '@/services/cityApi';

export const Route = createFileRoute('/cities/edit/$id')({
  component: EditCity,
});

function EditCity() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: city,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['city', id],
    queryFn: () => cityApi.getCityById(id),
  });

  const updateCityMutation = useMutation({
    mutationFn: (updatedCity: Partial<City>) =>
      cityApi.updateCity(id, updatedCity),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      queryClient.setQueryData(['city', id], data);
      navigate({ to: `/cities/${id}` });
    },
  });

  const [initialData, setInitialData] = useState<Partial<City> | null>(null);

  useEffect(() => {
    if (city) {
      setInitialData({
        name: city.name,
        state: city.state,
        country: city.country,
        touristRating: city.touristRating,
        dateEstablished: city.dateEstablished,
        estimatedPopulation: city.estimatedPopulation,
      });
    }
  }, [city]);

  const handleSubmit = async (data: Partial<City>) => {
    try {
      await updateCityMutation.mutateAsync(data);
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading city: {(error as Error).message}</div>;
  if (!initialData) return <div>No city data found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <Link
          to={`/cities/${id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to City Details
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit City</h1>

      <CityForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
}
