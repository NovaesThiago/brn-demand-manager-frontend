// src/components/demands/DemandList.tsx
import { Link } from 'react-router-dom';
import type { Demand } from '../../types';
import { Card } from '../ui';
import { useThemeColors } from '../../hooks/useThemeColors'; // ← Importar o hook

interface DemandListProps {
  demands: Demand[];
  loading?: boolean;
}

export const DemandList = ({ demands, loading = false }: DemandListProps) => {
  const { statusColors, typeColors } = useThemeColors(); // ← Usar o hook

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 dark:bg-gray-700"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4 dark:bg-gray-700"></div>
            <div className="flex space-x-2">
              <div className="h-6 bg-gray-200 rounded w-20 dark:bg-gray-700"></div>
              <div className="h-6 bg-gray-200 rounded w-24 dark:bg-gray-700"></div>
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
          <p className="text-gray-600 dark:text-gray-400">Nenhuma demanda encontrada.</p>
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
          className="block"
        >
          <Card hover className="cursor-pointer transition-all hover:scale-[1.02] dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-4">
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
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
              {demand.description}
            </p>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Provedor: <span className="font-medium text-[#4169E1] dark:text-blue-400">
                  {demand.provider?.name || 'Desconhecido'}
                </span>
              </span>
              <span className="text-gray-400 dark:text-gray-500">
                {new Date(demand.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};