import { api } from './api';
import type { Provider, ProviderFormData } from '../types';

export const providersService = {
  async getAll(): Promise<Provider[]> {
    const response = await api.get('/providers');
    return response.data;
  },

  async getById(id: number): Promise<Provider> { // ← number como parâmetro
    const response = await api.get(`/providers/${id}`);
    return response.data;
  },

  async create(data: ProviderFormData): Promise<Provider> {
    const response = await api.post('/providers', data);
    return response.data;
  },

  async update(id: number, data: Partial<Provider>): Promise<Provider> { // ← number como parâmetro
    const response = await api.put(`/providers/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> { // ← number como parâmetro
    await api.delete(`/providers/${id}`);
  }
};