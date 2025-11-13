import { api } from './api';
import type { Demand, DemandFormData } from '../types';

export const demandsService = {
  async getAll(): Promise<Demand[]> {
    const response = await api.get('/demands');
    return response.data;
  },

  async getById(id: number): Promise<Demand> { // ← number como parâmetro
    const response = await api.get(`/demands/${id}`);
    return response.data;
  },

  async create(data: DemandFormData): Promise<Demand> {
    const response = await api.post('/demands', data);
    return response.data;
  },

  async update(id: number, data: Partial<Demand>): Promise<Demand> { // ← number como parâmetro
    const response = await api.put(`/demands/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> { // ← number como parâmetro
    await api.delete(`/demands/${id}`);
  }
};