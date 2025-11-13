import { Link } from 'react-router-dom';
import type { Demand } from '../../types';
import { Card } from '../ui';

interface DemandListProps {
  demands: Demand[];
  loading?: boolean;
}

export const DemandList = ({ demands, loading = false }: DemandListProps) => {
  const statusColors = {
    Pendente: 'bg-yellow-100 text-yellow-800',
    'Em Andamento': 'bg-blue-100 text-blue-800',
    Concluída: 'bg-green-100 text-green-800',
  };

  const typeColors = {
    Diagnóstico: 'bg-purple-100 text-purple-800',
    Manutenção: 'bg-orange-100 text-orange-800',
    Configuração: 'bg-indigo-100 text-indigo-800',
    Instalação: 'bg-teal-100 text-teal-800',
    Outro: 'bg-gray-100 text-gray-800',
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (demands.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-600">No demands found.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {demands.map(demand => (
        <Link 
          key={demand.id} 
          to={`/demands/${demand.id}`}
          className="block" // Importante para o Link se comportar como block
        >
          <Card hover className="cursor-pointer transition-all hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">
                {demand.title}
              </h3>
              <div className="flex space-x-2 flex-shrink-0">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[demand.type]}`}>
                  {demand.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[demand.status]}`}>
                  {demand.status}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {demand.description}
            </p>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                Provider: <span className="font-medium text-[#4169E1]">
                  {demand.provider?.tradeName || 'Unknown'}
                </span>
              </span>
              <span className="text-gray-400">
                {new Date(demand.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};