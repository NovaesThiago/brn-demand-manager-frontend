import type { Demand, Provider } from '../types';

export const useExport = () => {
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that might contain commas
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const exportDemands = (demands: Demand[]) => {
    const exportData = demands.map(demand => ({
      Title: demand.title,
      Description: demand.description,
      Type: demand.type,
      Status: demand.status,
      Provider: demand.provider?.name || 'Unknown',
      'Created Date': new Date(demand.createdAt).toLocaleDateString(),
    }));

    exportToCSV(exportData, 'demands');
  };

  const exportProviders = (providers: Provider[]) => {
    const exportData = providers.map(provider => ({
      'Trade Name': provider.name,
      'Responsible Person': provider.responsible || 'N/A',
      'Contact': provider.contact,
      'Created Date': new Date(provider.createdAt).toLocaleDateString(),
    }));

    exportToCSV(exportData, 'providers');
  };

  return {
    exportDemands,
    exportProviders,
  };
};