import type { Provider } from '../../types';
import { Card } from '../ui';

interface ProviderListProps {
  providers: Provider[];
  loading?: boolean;
}

export const ProviderList = ({ providers, loading = false }: ProviderListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-600">No providers found.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {providers.map(provider => (
        <Card key={provider.id} hover>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {provider.tradeName}
              </h3>
              <p className="text-gray-600 mt-1">
                Responsible: {provider.responsiblePerson}
              </p>
              <p className="text-gray-500 text-sm mt-2 whitespace-pre-line">
                {provider.contact}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400">
                Created: {new Date(provider.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};