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
    pendingDemands: allDemands.filter(d => d.status === 'PENDENTE').length,
    inProgressDemands: allDemands.filter(d => d.status === 'EM_ANDAMENTO').length,
    completedDemands: allDemands.filter(d => d.status === 'CONCLUIDA').length,
    totalProviders: providers.length,
  };

  const recentDemands = allDemands
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Mapeamento dos enums para ícones
  const statusIcons = {
    PENDENTE: <Clock className="w-4 h-4 text-yellow-500" />,
    EM_ANDAMENTO: <Wrench className="w-4 h-4 text-blue-500" />,
    CONCLUIDA: <CheckCircle className="w-4 h-4 text-green-500" />,
    CANCELADA: <AlertCircle className="w-4 h-4 text-red-500" />,
  };

  // Mapeamento dos enums para labels em português
  const statusLabels = {
    PENDENTE: 'Pendente',
    EM_ANDAMENTO: 'Em Andamento',
    CONCLUIDA: 'Concluída',
    CANCELADA: 'Cancelada',
  };

  // Cores para os status com dark mode
  const statusColors = {
    PENDENTE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    EM_ANDAMENTO: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    CONCLUIDA: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    CANCELADA: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Visão geral do sistema</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/providers">
            <Button variant="secondary" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Provedores</span>
            </Button>
          </Link>
          <Link to="/demands">
            <Button className="flex items-center space-x-2">
              <Wrench className="w-4 h-4" />
              <span>Todas as Demandas</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total de Demandas */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total de Demandas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDemands}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        {/* Pendentes */}
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Pendentes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingDemands}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        {/* Em Andamento */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Em Andamento</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgressDemands}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        {/* Concluídas */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Concluídas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedDemands}</p>
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Demandas Recentes</h2>
            <Link 
              to="/demands" 
              className="text-[#4169E1] hover:text-[#3151B0] dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
            >
              <span>Ver todas</span>
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
          
          {recentDemands.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">Nenhuma demanda ainda.</p>
              <Link to="/demands">
                <Button className="mt-3">Criar Primeira Demanda</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentDemands.map(demand => (
                <Link 
                  key={demand.id} 
                  to={`/demands/${demand.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-[#4169E1] hover:shadow-md transition-all dark:border-gray-700 dark:hover:border-blue-500 dark:hover:shadow-gray-900"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{demand.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{demand.provider?.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {statusIcons[demand.status]}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[demand.status]}`}>
                        {statusLabels[demand.status]}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {new Date(demand.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions & System Info */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ações Rápidas</h2>
          <div className="space-y-4">
            <Link to="/demands" className="block">
              <Button className="w-full justify-start space-x-3 py-4">
                <Wrench className="w-5 h-5" />
                <span>Criar Nova Demanda</span>
              </Button>
            </Link>
            
            <Link to="/providers" className="block">
              <Button variant="secondary" className="w-full justify-start space-x-3 py-4">
                <Users className="w-5 h-5" />
                <span>Adicionar Provedor</span>
              </Button>
            </Link>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Visão do Sistema</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Total de Provedores</span>
                  <span className="font-semibold text-[#4169E1] dark:text-blue-400">{stats.totalProviders}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Demandas Ativas</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.pendingDemands + stats.inProgressDemands}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 dark:text-gray-400">Taxa de Conclusão</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
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