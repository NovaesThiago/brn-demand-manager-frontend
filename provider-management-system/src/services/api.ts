// Simulação de API - depois substituímos por axios
export const api = {
  async get(url: string): Promise<any> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    if (url === '/providers') {
      return {
        data: [
          {
            id: '1',
            tradeName: 'BRNX Fibra',
            responsiblePerson: 'João Silva',
            contact: 'joao@brnxfibra.com.br\n(11) 99999-9999',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: '2', 
            tradeName: 'NetVeloz',
            responsiblePerson: 'Maria Santos',
            contact: 'maria@netveloz.com.br\n(11) 88888-8888',
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-02T00:00:00Z'
          }
        ]
      };
    }
    
    if (url === '/demands') {
      return {
        data: [
          {
            id: '1',
            title: 'Análise de Lentidão na Rede',
            description: 'Investigar problemas de latência reportados por clientes na região central',
            type: 'Diagnóstico',
            status: 'Em Andamento',
            providerId: '1',
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            title: 'Atualização de Configuração BGP',
            description: 'Configurar novo peering com provedor internacional',
            type: 'Configuração', 
            status: 'Pendente',
            providerId: '2',
            createdAt: '2024-01-16T14:30:00Z',
            updatedAt: '2024-01-16T14:30:00Z'
          }
        ]
      };
    }
    
    return { data: [] };
  },
  
  async post(url: string, data: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() } };
  }
};