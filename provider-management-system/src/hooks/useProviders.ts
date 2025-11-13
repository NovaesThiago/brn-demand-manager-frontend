import { useState, useEffect } from 'react';
import type { Provider, ProviderFormData } from '../types';
import { providersService } from '../services/providers';

export const useProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      return newProvider;
    } catch (err) {
      setError('Failed to create provider');
      throw err;
    }
  };

  const updateProvider = async (id: string, providerData: Partial<Provider>) => {
    try {
      const updatedProvider = await providersService.update(id, providerData);
      setProviders(prev => 
        prev.map(provider => 
          provider.id === id ? updatedProvider : provider
        )
      );
      return updatedProvider;
    } catch (err) {
      setError('Failed to update provider');
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