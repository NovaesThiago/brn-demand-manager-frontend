import React from 'react';

const Demands: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Demands</h1>
        <button className="btn-primary">
          Create Demand
        </button>
      </div>
      
      <div className="card">
        <p className="text-gray-600">Demands list will be displayed here.</p>
      </div>
    </div>
  );
};

export default Demands;