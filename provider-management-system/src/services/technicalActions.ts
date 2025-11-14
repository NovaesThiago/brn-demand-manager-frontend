import { api } from './api';
import type { TechnicalAction } from '../types';

export const technicalActionsService = {
  async getByDemandId(demandId: number): Promise<TechnicalAction[]> {
    // CORREÇÃO: Endpoint baseado no schema - ações pertencem a uma demanda
    const response = await api.get(`/demands/${demandId}/actions`);
    return response.data;
  },

  async create(data: { 
    label: string; 
    technician: string; 
    demandId: number;
    done?: boolean; // Opcional, default é false no schema
  }): Promise<TechnicalAction> {
    // CORREÇÃO: Criar ação dentro de uma demanda específica
    const response = await api.post(`/demands/${data.demandId}/actions`, {
      label: data.label,
      technician: data.technician,
      done: data.done || false // Usar default do frontend também
      // createdAt NÃO enviar - backend cuida disso automaticamente
    });
    return response.data;
  },

  async update(id: number, data: Partial<Omit<TechnicalAction, 'id' | 'demandId' | 'createdAt'>>): Promise<TechnicalAction> {
    // CORREÇÃO: Atualizar ação específica
    const response = await api.put(`/actions/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    // CORREÇÃO: Deletar ação específica
    await api.delete(`/actions/${id}`);
  }
};