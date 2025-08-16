import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">City Weather Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage cities and view their weather information
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Cities</h2>
          <p className="text-gray-600 mb-4">View and manage all cities in the database</p>
          <a 
            href="/cities" 
            className="btn-primary inline-block"
          >
            View Cities
          </a>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Search</h2>
          <p className="text-gray-600 mb-4">Find cities with weather and country information</p>
          <a 
            href="/cities/search" 
            className="btn-primary inline-block"
          >
            Search Cities
          </a>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Add City</h2>
          <p className="text-gray-600 mb-4">Add a new city to the database</p>
          <a 
            href="/cities/add" 
            className="btn-primary inline-block"
          >
            Add City
          </a>
        </div>
      </div>
    </div>
  );
}