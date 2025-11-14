import { useState } from 'react';
import type { Provider } from '../../types';
import { Input, Select, Button } from '../ui';
import { DEMAND_STATUS_OPTIONS, DEMAND_TYPE_OPTIONS } from '../../utils/constants';

interface DemandFiltersProps {
  providers: Provider[];
  onFilter: (filters: {
    search: string;
    status: string;
    type: string;
    providerId: string; // ← Mantém como string para o Select
  }) => void;
  onClear: () => void;
}

export const DemandFilters = ({ providers, onFilter, onClear }: DemandFiltersProps) => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: '',
    providerId: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      search: '',
      status: '',
      type: '',
      providerId: '',
    };
    setFilters(clearedFilters);
    onClear();
  };

  const hasActiveFilters = filters.search || filters.status || filters.type || filters.providerId;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <Input
          label="Search"
          placeholder="Search demands..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        
        <Select
          label="Status"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          options={[{ value: '', label: 'All Statuses' }, ...DEMAND_STATUS_OPTIONS]}
        />

        <Select
          label="Type"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          options={[{ value: '', label: 'All Types' }, ...DEMAND_TYPE_OPTIONS]}
        />

        <Select
          label="Provider"
          value={filters.providerId}
          onChange={(e) => handleFilterChange('providerId', e.target.value)}
          options={[
            { value: '', label: 'All Providers' },
            ...providers.map(p => ({ 
              value: p.id.toString(), // ← CONVERTE number para string
              label: p.name 
            }))
          ]}
        />

        <div className="flex space-x-2">
          {hasActiveFilters && (
            <Button variant="secondary" onClick={handleClear} size="sm">
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};