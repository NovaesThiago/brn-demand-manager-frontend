import { useState, useEffect, useMemo } from 'react';
import type { Demand, DemandFormData } from '../types';
import { demandsService } from '../services/demands';
import { useDebounce } from './useDebounce';
import { useNotification } from '../contexts/NotificationContext';

export const useDemands = () => {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: '',
    providerId: '', // ← Isso é string no filtro
  });

  const debouncedSearch = useDebounce(filters.search, 300);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadDemands();
  }, []);

  const filteredDemands = useMemo(() => {
    return demands.filter(demand => {
      const matchesSearch = !debouncedSearch || 
        demand.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        demand.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        demand.provider?.name.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesStatus = !filters.status || demand.status === filters.status;
      const matchesType = !filters.type || demand.type === filters.type;
      
      // CORREÇÃO: Converter o filtro para number antes de comparar
      const matchesProvider = !filters.providerId || 
        demand.providerId === Number(filters.providerId); // ← CORREÇÃO AQUI

      return matchesSearch && matchesStatus && matchesType && matchesProvider;
    });
  }, [demands, debouncedSearch, filters.status, filters.type, filters.providerId]);

  const loadDemands = async () => {
    try {
      setLoading(true);
      const data = await demandsService.getAll();
      setDemands(data);
    } catch (err) {
      setError('Failed to load demands');
      addNotification({
        type: 'error',
        title: 'Error loading demands',
        message: 'Please try refreshing the page.'
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createDemand = async (demandData: DemandFormData) => {
    try {
      const newDemand = await demandsService.create(demandData);
      setDemands(prev => [newDemand, ...prev]);
      addNotification({
        type: 'success',
        title: 'Demand created successfully!',
        message: `${demandData.title} has been added.`
      });
      return newDemand;
    } catch (err) {
      const errorMsg = 'Failed to create demand';
      setError(errorMsg);
      addNotification({
        type: 'error',
        title: 'Error creating demand',
        message: 'Please try again.'
      });
      throw err;
    }
  };

  const updateDemand = async (id: number, demandData: Partial<Demand>) => {
    try {
      const updatedDemand = await demandsService.update(id, demandData);
      setDemands(prev => 
        prev.map(demand => 
          demand.id === id ? updatedDemand : demand
        )
      );
      addNotification({
        type: 'success',
        title: 'Demand updated successfully!'
      });
      return updatedDemand;
    } catch (err) {
      const errorMsg = 'Failed to update demand';
      setError(errorMsg);
      addNotification({
        type: 'error',
        title: 'Error updating demand',
        message: 'Please try again.'
      });
      throw err;
    }
  };

  const updateFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return {
    demands: filteredDemands,
    allDemands: demands,
    loading,
    error,
    filters,
    createDemand,
    updateDemand,
    updateFilters,
    refetch: loadDemands
  };
};