import { useState } from 'react';
import { Button } from '../components/ui';
import { ProviderList } from '../components/providers';
import { useProviders } from '../hooks/useProviders';

const Providers = () => {
  const [showForm, setShowForm] = useState(false);
  const { providers, loading, error } = useProviders();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Providers</h1>
        <Button onClick={() => setShowForm(true)}>
          Add Provider
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}
      
      <ProviderList providers={providers} loading={loading} />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Provider</h2>
              <p className="text-gray-600 mb-4">Provider form will be implemented here.</p>
              <div className="flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowForm(false)}>
                  Create Provider
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;