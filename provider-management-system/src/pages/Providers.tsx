import { useState } from 'react';
import { Card, Button } from '../components/ui';

const Providers = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Providers</h1>
        <Button onClick={() => setShowForm(true)}>
          Add Provider
        </Button>
      </div>
      
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-600">Providers list will be displayed here.</p>
          <Button 
            variant="secondary" 
            className="mt-4"
            onClick={() => setShowForm(true)}
          >
            Create First Provider
          </Button>
        </div>
      </Card>

      {showForm && (
        <Card className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Add New Provider</h2>
          <p className="text-gray-600">Provider form will be implemented here.</p>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowForm(false)}>
              Create Provider
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Providers;