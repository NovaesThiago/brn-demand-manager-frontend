import type { Provider } from './provider';

export type DemandStatus = 'Pendente' | 'Em Andamento' | 'Concluída';
export type DemandType = 'Diagnóstico' | 'Manutenção' | 'Configuração' | 'Instalação' | 'Outro';

export interface Demand {
  id: string;
  title: string;
  description: string;
  type: DemandType;
  status: DemandStatus;
  providerId: string;
  provider?: Provider;
  createdAt: string;
  updatedAt: string;
}

export interface TechnicalAction {
  id: string;
  demandId: string;
  description: string;
  technicianName: string;
  executedAt: string;
}

export type DemandFormData = Omit<Demand, 'id' | 'createdAt' | 'updatedAt' | 'provider'>;