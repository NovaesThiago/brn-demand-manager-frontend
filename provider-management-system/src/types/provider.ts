export interface Provider {
  id: number;  // ← Mudou de string para number (autoincrement)
  name: string; // ← Mudou de tradeName para name
  email: string;
  contact?: string; // ← Opcional
  responsible?: string; // ← Opcional (responsável técnico)
  createdAt: string;
}

export type ProviderFormData = Omit<Provider, 'id' | 'createdAt'>;