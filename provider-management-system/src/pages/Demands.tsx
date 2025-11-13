import { useState } from 'react';
import { Button } from '../components/ui';
import { DemandList, DemandFilters } from '../components/demands';
import { DemandForm } from '../components/forms';
import { useDemands } from '../hooks/useDemands';
import { useProviders } from '../hooks/useProviders';
import type { DemandFormData } from '../types';

const Demands = () => {
  const [showForm, setShowForm] = useState(false);
  const { demands, loading, error, createDemand, updateFilters } = useDemands();
  const { providers } = useProviders();
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateDemand = async (demandData: DemandFormData) => {
    setFormLoading(true);
    try {
      await createDemand(demandData);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create demand:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFilter = (filters: any) => {
    updateFilters(filters);
  };

  const handleClearFilters = () => {
    updateFilters({
      search: '',
      status: '',
      type: '',
      providerId: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Technical Demands</h1>
        <Button onClick={() => setShowForm(true)}>
          Create Demand
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <DemandFilters
        providers={providers}
        onFilter={handleFilter}
        onClear={handleClearFilters}
      />
      
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          Showing {demands.length} demand{demands.length !== 1 ? 's' : ''}
        </span>
      </div>

      <DemandList demands={demands} loading={loading} />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Demand</h2>
              <DemandForm
                onSubmit={handleCreateDemand}
                onCancel={() => setShowForm(false)}
                providers={providers}
                loading={formLoading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demands;