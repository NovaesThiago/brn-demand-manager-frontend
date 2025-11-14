import { useState, useEffect } from 'react';
import type { TechnicalAction } from '../types';
import { technicalActionsService } from '../services/technicalActions';

export const useTechnicalActions = (demandId?: number) => {
  const [actions, setActions] = useState<TechnicalAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (demandId) {
      loadActions(demandId);
    } else {
      // Limpar ações se não há demandId
      setActions([]);
      setError('Demand ID is required to load technical actions');
    }
  }, [demandId]);

  const loadActions = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await technicalActionsService.getByDemandId(id);
      setActions(data);
    } catch (err) {
      setError('Failed to load technical actions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createAction = async (actionData: { label: string; technician: string }) => {
    if (!demandId) {
      throw new Error('Demand ID is required to create a technical action');
    }

    try {
      const newAction = await technicalActionsService.create({
        ...actionData,
        demandId: demandId
      });
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
    refetch: demandId ? () => loadActions(demandId) : undefined,
    isValid: !!demandId // ← Novo campo para verificar se o hook é válido
  };
};