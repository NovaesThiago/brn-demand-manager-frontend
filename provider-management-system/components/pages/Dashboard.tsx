import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/providers" className="card hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold text-[#4169E1]">Providers</h2>
          <p className="text-gray-600 mt-2">Manage internet providers</p>
        </Link>
        
        <Link to="/demands" className="card hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold text-[#4169E1]">Demands</h2>
          <p className="text-gray-600 mt-2">View technical demands</p>
        </Link>
        
        <div className="card">
          <h2 className="text-xl font-semibold text-[#4169E1]">Quick Stats</h2>
          <p className="text-gray-600 mt-2">System overview</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;