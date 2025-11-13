import React from 'react';

const Providers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Providers</h1>
        <button className="btn-primary">
          Add Provider
        </button>
      </div>
      
      <div className="card">
        <p className="text-gray-600">Providers list will be displayed here.</p>
      </div>
    </div>
  );
};

export default Providers;