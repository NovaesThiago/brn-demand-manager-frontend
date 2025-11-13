import { api } from './api';
import type { TechnicalAction } from '../types';

export const technicalActionsService = {
  async getByDemandId(demandId: number): Promise<TechnicalAction[]> { // ← number como parâmetro
    const response = await api.get(`/actions/demand/${demandId}`);
    return response.data;
  },

  async create(data: Omit<TechnicalAction, 'id'>): Promise<TechnicalAction> {
    const response = await api.post('/actions', data);
    return response.data;
  },

  async update(id: number, data: Partial<TechnicalAction>): Promise<TechnicalAction> { // ← number como parâmetro
    const response = await api.put(`/actions/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> { // ← number como parâmetro
    await api.delete(`/actions/${id}`);
  }
};