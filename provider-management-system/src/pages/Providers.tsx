import { useState } from 'react';
import { Button } from '../components/ui';
import { ProviderList } from '../components/providers';
import { ProviderForm } from '../components/forms';
import { useProviders } from '../hooks/useProviders';
import { useExport } from '../hooks/useExport';
import { useNotification } from '../contexts/NotificationContext';
import type { ProviderFormData } from '../types';

const Providers = () => {
  const [showForm, setShowForm] = useState(false);
  const { providers, loading, error, createProvider } = useProviders();
  const { exportProviders } = useExport();
  const { addNotification } = useNotification();
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateProvider = async (providerData: ProviderFormData) => {
    setFormLoading(true);
    try {
      await createProvider(providerData);
      setShowForm(false);
      addNotification({
        type: 'success',
        title: 'Provedor criado com sucesso!',
        message: `${providerData.name} foi adicionado ao sistema.`
      });
    } catch (err) {
      console.error('Falha ao criar provedor:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleExport = () => {
    if (providers.length === 0) {
      addNotification({
        type: 'warning',
        title: 'Nenhum dado para exportar',
        message: 'Não há provedores para exportar.'
      });
      return;
    }

    exportProviders(providers);
    addNotification({
      type: 'success',
      title: 'Exportação concluída!',
      message: 'Dados dos provedores foram exportados para CSV.'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Provedores</h1>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={handleExport}>
            Exportar CSV
          </Button>
          <Button onClick={() => setShowForm(true)}>
            Adicionar Provedor
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}
      
      <ProviderList providers={providers} loading={loading} />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Adicionar Novo Provedor</h2>
              <ProviderForm
                onSubmit={handleCreateProvider}
                onCancel={() => setShowForm(false)}
                loading={formLoading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;