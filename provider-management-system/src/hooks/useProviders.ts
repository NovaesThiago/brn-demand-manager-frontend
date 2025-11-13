import { useState, useEffect } from 'react';
import type { Provider, ProviderFormData } from '../types';
import { providersService } from '../services/providers';
import { useNotification } from '../contexts/NotificationContext';

export const useProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      setLoading(true);
      const data = await providersService.getAll();
      setProviders(data);
    } catch (err) {
      setError('Failed to load providers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProvider = async (providerData: ProviderFormData) => {
    try {
      const newProvider = await providersService.create(providerData);
      setProviders(prev => [newProvider, ...prev]);
      addNotification({
        type: 'success',
        title: 'Provider created successfully!',
        message: `${providerData.name} has been added to the system.`
      });
      return newProvider;
    } catch (err) {
      const errorMsg = 'Failed to create provider';
      setError(errorMsg);
      addNotification({
        type: 'error',
        title: 'Error creating provider',
        message: 'Please try again.'
      });
      throw err;
    }
  };

  const updateProvider = async (id: number, providerData: Partial<Provider>) => {
    try {
      const updatedProvider = await providersService.update(id, providerData);
      setProviders(prev => 
        prev.map(provider => 
          provider.id === id ? updatedProvider : provider
        )
      );
      addNotification({
        type: 'success',
        title: 'Provider updated successfully!'
      });
      return updatedProvider;
    } catch (err) {
      const errorMsg = 'Failed to update provider';
      setError(errorMsg);
      addNotification({
        type: 'error',
        title: 'Error updating provider',
        message: 'Please try again.'
      });
      throw err;
    }
  };

  return {
    providers,
    loading,
    error,
    createProvider,
    updateProvider,
    refetch: loadProviders
  };
};