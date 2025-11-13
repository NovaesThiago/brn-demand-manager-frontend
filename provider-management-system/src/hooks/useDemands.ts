import { useState, useEffect, useMemo } from 'react';
import type { Demand, DemandFormData } from '../types';
import { demandsService } from '../services/demands';
import { useDebounce } from './useDebounce';

export const useDemands = () => {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: '',
    providerId: '',
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    loadDemands();
  }, []);

  const filteredDemands = useMemo(() => {
    return demands.filter(demand => {
      const matchesSearch = !debouncedSearch || 
        demand.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        demand.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        demand.provider?.tradeName.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesStatus = !filters.status || demand.status === filters.status;
      const matchesType = !filters.type || demand.type === filters.type;
      const matchesProvider = !filters.providerId || demand.providerId === filters.providerId;

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createDemand = async (demandData: DemandFormData) => {
    try {
      const newDemand = await demandsService.create(demandData);
      setDemands(prev => [newDemand, ...prev]);
      return newDemand;
    } catch (err) {
      setError('Failed to create demand');
      throw err;
    }
  };

  const updateDemand = async (id: string, demandData: Partial<Demand>) => {
    try {
      const updatedDemand = await demandsService.update(id, demandData);
      setDemands(prev => 
        prev.map(demand => 
          demand.id === id ? updatedDemand : demand
        )
      );
      return updatedDemand;
    } catch (err) {
      setError('Failed to update demand');
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