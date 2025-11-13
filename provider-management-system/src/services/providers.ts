import { api } from './api';
import { Provider, ProviderFormData } from '../types';

export const providersService = {
  async getAll(): Promise<Provider[]> {
    const response = await api.get('/providers');
    return response.data;
  },

  async getById(id: string): Promise<Provider> {
    const response = await api.get(`/providers/${id}`);
    return response.data;
  },

  async create(data: ProviderFormData): Promise<Provider> {
    const response = await api.post('/providers', data);
    return response.data;
  },

  async update(id: string, data: Partial<Provider>): Promise<Provider> {
    const response = await api.post(`/providers/${id}`, data);
    return response.data;
  }
};