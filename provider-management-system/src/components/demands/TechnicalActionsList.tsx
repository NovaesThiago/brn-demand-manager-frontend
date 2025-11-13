import type { TechnicalAction } from '../../types';
import { Card } from '../ui';

interface TechnicalActionsListProps {
  actions: TechnicalAction[];
  loading?: boolean;
}

export const TechnicalActionsList = ({ actions, loading = false }: TechnicalActionsListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map(i => (
          <Card key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (actions.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-600">No technical actions recorded yet.</p>
          <p className="text-gray-500 text-sm mt-1">Add the first action to start the history.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {actions.map(action => (
        <Card key={action.id} hover>
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-semibold text-gray-900">{action.technician}</h4>
            <span className="text-sm text-gray-500">
              {new Date(action.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{action.label}</p>
        </Card>
      ))}
    </div>
  );
};