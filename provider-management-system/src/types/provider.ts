export interface Provider {
  id: string;
  tradeName: string;
  responsiblePerson: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
}

export type ProviderFormData = Omit<Provider, 'id' | 'createdAt' | 'updatedAt'>;