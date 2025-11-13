import { Link } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import { useDemands } from '../hooks/useDemands';
import { useProviders } from '../hooks/useProviders';
import { TrendingUp, Users, Wrench, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { allDemands } = useDemands();
  const { providers } = useProviders();

  const stats = {
    totalDemands: allDemands.length,
    pendingDemands: allDemands.filter(d => d.status === 'Pendente').length,
    inProgressDemands: allDemands.filter(d => d.status === 'Em Andamento').length,
    completedDemands: allDemands.filter(d => d.status === 'Concluída').length,
    totalProviders: providers.length,
  };

  const recentDemands = allDemands
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const statusIcons = {
    Pendente: <Clock className="w-4 h-4 text-yellow-500" />,
    'Em Andamento': <Wrench className="w-4 h-4 text-blue-500" />,
    Concluída: <CheckCircle className="w-4 h-4 text-green-500" />,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/providers">
            <Button variant="secondary" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Providers</span>
            </Button>
          </Link>
          <Link to="/demands">
            <Button className="flex items-center space-x-2">
              <Wrench className="w-4 h-4" />
              <span>All Demands</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Demands</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDemands}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingDemands}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgressDemands}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedDemands}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Demands */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Demands</h2>
            <Link to="/demands" className="text-[#4169E1] hover:text-[#3151B0] text-sm font-medium flex items-center space-x-1">
              <span>View all</span>
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
          
          {recentDemands.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No demands yet.</p>
              <Link to="/demands">
                <Button className="mt-3">Create First Demand</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentDemands.map(demand => (
                <Link 
                  key={demand.id} 
                  to={`/demands/${demand.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-[#4169E1] hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 truncate">{demand.title}</h3>
                      <p className="text-sm text-gray-600 truncate">{demand.provider?.tradeName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {statusIcons[demand.status]}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        demand.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                        demand.status === 'Em Andamento' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {demand.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(demand.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions & System Info */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/demands" className="block">
              <Button className="w-full justify-start space-x-3 py-4">
                <Wrench className="w-5 h-5" />
                <span>Create New Demand</span>
              </Button>
            </Link>
            
            <Link to="/providers" className="block">
              <Button variant="secondary" className="w-full justify-start space-x-3 py-4">
                <Users className="w-5 h-5" />
                <span>Add New Provider</span>
              </Button>
            </Link>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">System Overview</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Providers</span>
                  <span className="font-semibold text-[#4169E1]">{stats.totalProviders}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Active Demands</span>
                  <span className="font-semibold text-blue-600">{stats.pendingDemands + stats.inProgressDemands}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold text-green-600">
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