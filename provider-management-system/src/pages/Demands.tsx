import { useState } from 'react';
import { Button } from '../components/ui';
import { DemandList } from '../components/demands/DemandList';
import { useDemands } from '../hooks/useDemands';

const Demands = () => {
  const [showForm, setShowForm] = useState(false);
  const { demands, loading, error } = useDemands();

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
      
      <DemandList demands={demands} loading={loading} />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Demand</h2>
              <p className="text-gray-600 mb-4">Demand form will be implemented here.</p>
              <div className="flex justify-end space-x-3">
                <Button variant="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowForm(false)}>
                  Create Demand
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demands;