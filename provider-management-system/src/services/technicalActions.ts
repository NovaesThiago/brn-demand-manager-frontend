import { api } from './api';
import type { TechnicalAction } from '../types';

export const technicalActionsService = {
  async getByDemandId(demandId: string): Promise<TechnicalAction[]> {
    const response = await api.get(`/demands/${demandId}/actions`);
    return response.data || [];
  },

  async create(data: Omit<TechnicalAction, 'id'>): Promise<TechnicalAction> {
    const response = await api.post('/technical-actions', data);
    return response.data;
  },
};