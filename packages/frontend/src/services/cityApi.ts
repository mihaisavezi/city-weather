import { 
  CreateCity, 
  UpdateCity, 
  City, 
  CitySearchResult, 
  ApiResponse 
} from '@city-weather-deloitte/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const API_BASE = '/api';

// HTTP client wrapper
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  const data: ApiResponse<T> = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'API request failed');
  }

  return data.data!;
}

// API functions
export const cityApi = {
  createCity: async (city: CreateCity): Promise<City> => {
    return apiRequest('/cities', {
      method: 'POST',
      body: JSON.stringify(city),
    });
  },

  updateCity: async (id: string, updates: UpdateCity): Promise<City> => {
    return apiRequest(`/cities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  deleteCity: async (id: string): Promise<void> => {
    return apiRequest(`/cities/${id}`, {
      method: 'DELETE',
    });
  },

  searchCities: async (name: string): Promise<CitySearchResult[]> => {
    return apiRequest(`/cities/search?name=${encodeURIComponent(name)}`);
  },
};

// Query keys
export const queryKeys = {
  cities: ['cities'] as const,
  search: (name: string) => ['cities', 'search', name] as const,
};