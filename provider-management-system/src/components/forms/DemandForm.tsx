import { useState } from 'react';
import type { DemandFormData, Provider } from '../../types';
import { Input, Textarea, Select, Button } from '../ui';
import { DEMAND_STATUS_OPTIONS, DEMAND_TYPE_OPTIONS } from '../../utils/constants';

interface DemandFormProps {
  onSubmit: (data: DemandFormData) => void;
  onCancel: () => void;
  initialData?: DemandFormData;
  providers: Provider[];
  loading?: boolean;
}

export const DemandForm = ({ 
  onSubmit, 
  onCancel, 
  initialData, 
  providers, 
  loading = false 
}: DemandFormProps) => {
  const [formData, setFormData] = useState<DemandFormData>(
    initialData || {
      title: '',
      description: '',
      type: 'Diagnóstico',
      status: 'Pendente',
      providerId: '',
    }
  );

  const [errors, setErrors] = useState<Partial<DemandFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    const newErrors: Partial<DemandFormData> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.providerId) newErrors.providerId = 'Provider is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof DemandFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title *"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="e.g., Network Latency Analysis"
        disabled={loading}
      />

      <Textarea
        label="Description *"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Detailed description of the technical demand..."
        rows={4}
        disabled={loading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Type *"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={DEMAND_TYPE_OPTIONS}
          disabled={loading}
        />

        <Select
          label="Status *"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={DEMAND_STATUS_OPTIONS}
          disabled={loading}
        />
      </div>

      <Select
        label="Provider *"
        name="providerId"
        value={formData.providerId}
        onChange={handleChange}
        error={errors.providerId}
        options={providers.map(provider => ({
          value: provider.id,
          label: provider.tradeName
        }))}
        disabled={loading}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')} Demand
        </Button>
      </div>
    </form>
  );
};