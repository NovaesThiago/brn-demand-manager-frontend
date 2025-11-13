import type { Provider } from '../../types';
import { Card } from '../ui';
import { Mail, Phone, User } from 'lucide-react';

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
          <p className="text-gray-600">Nenhum provedor encontrado.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {providers.map(provider => (
        <Card key={provider.id} hover className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {provider.name} {/* ← mudou de tradeName para name */}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm">{provider.email}</p>
                  </div>
                </div>
                
                {provider.responsible && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <div>
                      <p className="text-sm font-medium">Responsável</p>
                      <p className="text-sm">{provider.responsible}</p>
                    </div>
                  </div>
                )}
                
                {provider.contact && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <div>
                      <p className="text-sm font-medium">Telefone</p>
                      <p className="text-sm">{provider.contact}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-gray-400">
                Criado: {new Date(provider.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};