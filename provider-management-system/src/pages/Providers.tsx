import { useState } from 'react';
import { Button } from '../components/ui';
import { ProviderList } from '../components/providers';
import { ProviderForm } from '../components/forms';
import { useProviders } from '../hooks/useProviders';
import type { ProviderFormData } from '../types';

const Providers = () => {
  const [showForm, setShowForm] = useState(false);
  const { providers, loading, error, createProvider } = useProviders();
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateProvider = async (providerData: ProviderFormData) => {
    setFormLoading(true);
    try {
      await createProvider(providerData);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create provider:', err);
    } finally {
      setFormLoading(false);
    }
  };

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
              <ProviderForm
                onSubmit={handleCreateProvider}
                onCancel={() => setShowForm(false)}
                loading={formLoading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;