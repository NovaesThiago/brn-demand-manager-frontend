import { useState, useEffect } from 'react';
import type { Demand, DemandFormData } from '../types';
import { demandsService } from '../services/demands';

export const useDemands = () => {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDemands();
  }, []);

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

  return {
    demands,
    loading,
    error,
    createDemand,
    updateDemand,
    refetch: loadDemands
  };
};