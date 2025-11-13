import { useState } from 'react';
import type { TechnicalAction } from '../../types';
import { Textarea, Input, Button } from '../ui';

interface TechnicalActionFormProps {
  demandId: string;
  onSubmit: (data: Omit<TechnicalAction, 'id'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const TechnicalActionForm = ({ 
  demandId,
  onSubmit, 
  onCancel, 
  loading = false 
}: TechnicalActionFormProps) => {
  const [formData, setFormData] = useState({
    description: '',
    technicianName: '',
    executedAt: new Date().toISOString().split('T')[0], // Data atual
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    const newErrors: Partial<typeof formData> = {};
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.technicianName.trim()) newErrors.technicianName = 'Technician name is required';
    if (!formData.executedAt) newErrors.executedAt = 'Execution date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      demandId,
      description: formData.description,
      technicianName: formData.technicianName,
      executedAt: new Date(formData.executedAt).toISOString(),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        label="Action Description *"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Describe the technical action performed..."
        rows={4}
        disabled={loading}
      />

      <Input
        label="Technician Name *"
        name="technicianName"
        value={formData.technicianName}
        onChange={handleChange}
        error={errors.technicianName}
        placeholder="e.g., João Silva"
        disabled={loading}
      />

      <Input
        label="Execution Date *"
        name="executedAt"
        type="date"
        value={formData.executedAt}
        onChange={handleChange}
        error={errors.executedAt}
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
          {loading ? 'Saving...' : 'Add Action'}
        </Button>
      </div>
    </form>
  );
};