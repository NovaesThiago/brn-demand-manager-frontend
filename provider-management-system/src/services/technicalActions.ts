import { api } from './api';
import type { TechnicalAction } from '../types';

export const technicalActionsService = {
  async getByDemandId(demandId: string): Promise<TechnicalAction[]> {
    const response = await api.get(`/actions/demand/${demandId}`);
    return response.data;
  },

  async create(data: Omit<TechnicalAction, 'id'>): Promise<TechnicalAction> {
    const response = await api.post('/actions', data);
    return response.data;
  },

  async update(id: string, data: Partial<TechnicalAction>): Promise<TechnicalAction> {
    const response = await api.put(`/actions/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/actions/${id}`);
  }
};