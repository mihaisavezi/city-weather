import { useQuery } from '@tanstack/react-query';
import { cityApi } from '@/services/cityApi';
import { useState, useEffect } from 'react';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const searchQuery = useQuery({
    queryKey: cityApi.queryKeys.search(debouncedSearchTerm),
    queryFn: () => cityApi.searchCities(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 0,
  });

  return {
    searchTerm,
    setSearchTerm,
    cities: searchQuery.data || [],
    isLoading: searchQuery.isLoading,
    error: searchQuery.error,
  };
};