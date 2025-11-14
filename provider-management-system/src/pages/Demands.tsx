import { useState } from 'react';
import { Button } from '../components/ui';
import { DemandList, DemandFilters } from '../components/demands';
import { DemandForm } from '../components/forms';
import { useDemands } from '../hooks/useDemands';
import { useProviders } from '../hooks/useProviders';
import { useExport } from '../hooks/useExport';
import { useNotification } from '../contexts/NotificationContext';
import type { DemandFormData } from '../types';

const Demands = () => {
  const [showForm, setShowForm] = useState(false);
  const { demands, allDemands, loading, error, createDemand, updateFilters } = useDemands();
  const { providers } = useProviders();
  const { exportDemands } = useExport();
  const { addNotification } = useNotification();
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateDemand = async (demandData: DemandFormData) => {
    setFormLoading(true);
    try {
      await createDemand(demandData);
      setShowForm(false);
      addNotification({
        type: 'success',
        title: 'Demand created successfully!',
        message: `${demandData.title} has been added.`
      });
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

  const handleExport = () => {
    if (allDemands.length === 0) {
      addNotification({
        type: 'warning',
        title: 'No data to export',
        message: 'There are no demands to export.'
      });
      return;
    }

    exportDemands(allDemands);
    addNotification({
      type: 'success',
      title: 'Export completed!',
      message: 'Demands data has been exported to CSV.'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Technical Demands</h1>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={handleExport}>
            Export CSV
          </Button>
          <Button onClick={() => setShowForm(true)}>
            Create Demand
          </Button>
        </div>
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
          {demands.length !== allDemands.length && ` (filtered from ${allDemands.length} total)`}
        </span>
      </div>

      <DemandList demands={demands} loading={loading} />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Criar Nova Demanda</h2>
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