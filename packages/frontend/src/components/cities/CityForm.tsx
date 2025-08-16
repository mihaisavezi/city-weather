import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CreateCity, UpdateCity } from '@city-weather-deloitte/shared';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CityFormProps {
  initialData?: Partial<CreateCity>;
  onSubmit: (city: CreateCity | UpdateCity) => Promise<void>;
  isEditing?: boolean;
}

export function CityForm({ initialData, onSubmit, isEditing = false }: CityFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    state: initialData?.state || '',
    country: initialData?.country || '',
    touristRating: initialData?.touristRating?.toString() || '3',
    dateEstablished: initialData?.dateEstablished?.toString().split('T')[0] || '',
    estimatedPopulation: initialData?.estimatedPopulation?.toString() || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cityData = {
      name: formData.name,
      state: formData.state,
      country: formData.country,
      touristRating: parseInt(formData.touristRating),
      dateEstablished: new Date(formData.dateEstablished).toISOString(),
      estimatedPopulation: parseInt(formData.estimatedPopulation),
    };

    await onSubmit(cityData);
    navigate({ to: '/cities' });
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? 'Edit City' : 'Add New City'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              City Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <Input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <Input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="touristRating" className="block text-sm font-medium text-gray-700">
              Tourist Rating
            </label>
            <select
              id="touristRating"
              name="touristRating"
              value={formData.touristRating}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {[1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>
                  {rating} Star{rating > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="dateEstablished" className="block text-sm font-medium text-gray-700">
              Date Established
            </label>
            <Input
              type="date"
              id="dateEstablished"
              name="dateEstablished"
              value={formData.dateEstablished}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="estimatedPopulation" className="block text-sm font-medium text-gray-700">
              Estimated Population
            </label>
            <Input
              type="number"
              id="estimatedPopulation"
              name="estimatedPopulation"
              value={formData.estimatedPopulation}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="secondary"
            onClick={() => navigate({ to: '/cities' })}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update City' : 'Add City'}
          </Button>
        </div>
      </form>
    </div>
  );
}