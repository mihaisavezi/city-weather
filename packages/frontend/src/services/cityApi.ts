import { 
  CreateCity, 
  UpdateCity, 
  City, 
  CitySearchResult, 
  ApiResponse,
  CursorPaginatedResponse
} from '@city-weather-deloitte/shared';

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

// Query keys
export const queryKeys = {
  cities: ['cities'] as const,
  citiesPaginated: (params?: { limit?: number; cursor?: string }) => 
    ['cities', 'paginated', params] as const,
  city: (id: string) => ['city', id] as const,
  search: (name: string) => ['cities', 'search', name] as const,
};

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

  getAllCities: async (): Promise<CitySearchResult[]> => {
    // Using search with empty string to get all cities
    return apiRequest(`/cities/search?name=`);
  },
  
  getAllCitiesPaginated: async (params?: { limit?: number; cursor?: string }): Promise<CursorPaginatedResponse<City>> => {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.cursor) searchParams.set('cursor', params.cursor);
    
    const endpoint = `/cities${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data: CursorPaginatedResponse<City> = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  },

  getCityById: async (id: string): Promise<CitySearchResult> => {
    return apiRequest(`/cities/${id}`);
  },
  
  queryKeys
};
