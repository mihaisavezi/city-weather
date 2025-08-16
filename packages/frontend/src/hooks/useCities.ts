import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { cityApi } from '@/services/cityApi';

export const useCities = () => {
  const queryClient = useQueryClient();

  const citiesQuery = useQuery({
    queryKey: cityApi.queryKeys.cities,
    queryFn: async () => {
      // In a real implementation, you would fetch all cities
      // For now, we'll return an empty array
      return [];
    },
  });

  const createCityMutation = useMutation({
    mutationFn: cityApi.createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cityApi.queryKeys.cities });
    },
  });

  const updateCityMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      cityApi.updateCity(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cityApi.queryKeys.cities });
    },
  });

  const deleteCityMutation = useMutation({
    mutationFn: cityApi.deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cityApi.queryKeys.cities });
    },
  });

  return {
    cities: citiesQuery.data || [],
    isLoading: citiesQuery.isLoading,
    error: citiesQuery.error,
    createCity: createCityMutation.mutateAsync,
    updateCity: updateCityMutation.mutateAsync,
    deleteCity: deleteCityMutation.mutateAsync,
  };
};
