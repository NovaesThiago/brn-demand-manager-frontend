import { useState, useEffect } from 'react';
import type { TechnicalAction } from '../types';
import { technicalActionsService } from '../services/technicalActions';

export const useTechnicalActions = (demandId?: number) => { // ← number como parâmetro
  const [actions, setActions] = useState<TechnicalAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (demandId) {
      loadActions(demandId);
    }
  }, [demandId]);

  const loadActions = async (id: number) => { // ← number como parâmetro
    try {
      setLoading(true);
      const data = await technicalActionsService.getByDemandId(id);
      setActions(data);
    } catch (err) {
      setError('Failed to load technical actions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createAction = async (actionData: Omit<TechnicalAction, 'id'>) => {
    try {
      const newAction = await technicalActionsService.create(actionData);
      setActions(prev => [newAction, ...prev]);
      return newAction;
    } catch (err) {
      setError('Failed to create technical action');
      throw err;
    }
  };

  return {
    actions,
    loading,
    error,
    createAction,
    refetch: demandId ? () => loadActions(demandId) : undefined
  };
};