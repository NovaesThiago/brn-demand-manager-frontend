import type { Provider } from './provider';

export type DemandStatus = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
export type DemandType = 'DIAGNOSTICO' | 'MANUTENCAO' | 'CONFIGURACAO' | 'INSTALACAO' | 'OUTRO';

export interface Demand {
  id: number; // ← number em vez de string
  title: string;
  description: string;
  type: DemandType;
  status: DemandStatus;
  providerId: number; // ← number em vez de string
  provider?: Provider;
  createdAt: string;
}

export interface TechnicalAction {
  id: number; // ← number em vez de string
  label: string; // ← mudou de description para label
  technician: string; // ← nome do técnico
  done: boolean;
  demandId: number; // ← number em vez de string
  createdAt: string;
}

export type DemandFormData = Omit<Demand, 'id' | 'createdAt' | 'provider'>;
export type TechnicalActionFormData = Omit<TechnicalAction, 'id' | 'createdAt'>;