import { api } from './api';
import type { Demand, DemandFormData } from '../types';

export const demandsService = {
  async getAll(): Promise<Demand[]> {
    const response = await api.get('/demands');
    return response.data;
  },

  async getById(id: string): Promise<Demand> {
    const response = await api.get(`/demands/${id}`);
    return response.data;
  },

  async create(data: DemandFormData): Promise<Demand> {
    const response = await api.post('/demands', data);
    return response.data;
  },

  async update(id: string, data: Partial<Demand>): Promise<Demand> {
    const response = await api.post(`/demands/${id}`, data);
    return response.data;
  }
};