import { Link } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import { useDemands } from '../hooks/useDemands';
import { useProviders } from '../hooks/useProviders';

const Dashboard = () => {
  const { allDemands } = useDemands();
  const { providers } = useProviders();

  // Estatísticas
  const stats = {
    totalDemands: allDemands.length,
    pendingDemands: allDemands.filter(d => d.status === 'Pendente').length,
    inProgressDemands: allDemands.filter(d => d.status === 'Em Andamento').length,
    completedDemands: allDemands.filter(d => d.status === 'Concluída').length,
    totalProviders: providers.length,
  };

  // Demandas recentes (últimas 5)
  const recentDemands = allDemands
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const statusColors = {
    Pendente: 'bg-yellow-100 text-yellow-800',
    'Em Andamento': 'bg-blue-100 text-blue-800',
    Concluída: 'bg-green-100 text-green-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <Link to="/providers">
            <Button variant="secondary">Manage Providers</Button>
          </Link>
          <Link to="/demands">
            <Button>View All Demands</Button>
          </Link>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <div className="w-6 h-6 bg-[#4169E1] rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Demands</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDemands}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingDemands}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgressDemands}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedDemands}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demandas Recentes */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Demands</h2>
            <Link to="/demands" className="text-[#4169E1] hover:text-[#3151B0] text-sm font-medium">
              View all →
            </Link>
          </div>
          
          {recentDemands.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No demands yet.</p>
              <Link to="/demands">
                <Button className="mt-2">Create First Demand</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentDemands.map(demand => (
                <Link 
                  key={demand.id} 
                  to={`/demands/${demand.id}`}
                  className="block p-3 rounded-lg border border-gray-200 hover:border-[#4169E1] hover:bg-blue-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 truncate">{demand.title}</h3>
                      <p className="text-sm text-gray-600 truncate">{demand.provider?.tradeName}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[demand.status]}`}>
                      {demand.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(demand.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/demands" className="block">
              <Button className="w-full justify-start">
                <span className="mr-2">📋</span>
                Create New Demand
              </Button>
            </Link>
            
            <Link to="/providers" className="block">
              <Button variant="secondary" className="w-full justify-start">
                <span className="mr-2">🏢</span>
                Add New Provider
              </Button>
            </Link>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">System Overview</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Providers:</span>
                  <span className="font-medium">{stats.totalProviders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Demands:</span>
                  <span className="font-medium">{stats.pendingDemands + stats.inProgressDemands}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Rate:</span>
                  <span className="font-medium">
                    {stats.totalDemands > 0 
                      ? Math.round((stats.completedDemands / stats.totalDemands) * 100) 
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;