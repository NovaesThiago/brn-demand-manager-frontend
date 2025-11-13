import { useState } from 'react';
import type { ProviderFormData } from '../../types';
import { Input, Textarea, Button } from '../ui';

interface ProviderFormProps {
  onSubmit: (data: ProviderFormData) => void;
  onCancel: () => void;
  initialData?: ProviderFormData;
  loading?: boolean;
}

export const ProviderForm = ({ 
  onSubmit, 
  onCancel, 
  initialData, 
  loading = false 
}: ProviderFormProps) => {
  const [formData, setFormData] = useState<ProviderFormData>(
    initialData || {
      tradeName: '',
      responsiblePerson: '',
      contact: '',
    }
  );

  const [errors, setErrors] = useState<Partial<ProviderFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    const newErrors: Partial<ProviderFormData> = {};
    if (!formData.tradeName.trim()) newErrors.tradeName = 'Trade name is required';
    if (!formData.responsiblePerson.trim()) newErrors.responsiblePerson = 'Responsible person is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact information is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ProviderFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Trade Name *"
        name="tradeName"
        value={formData.tradeName}
        onChange={handleChange}
        error={errors.tradeName}
        placeholder="e.g., BRNX Fibra"
        disabled={loading}
      />

      <Input
        label="Responsible Person *"
        name="responsiblePerson"
        value={formData.responsiblePerson}
        onChange={handleChange}
        error={errors.responsiblePerson}
        placeholder="e.g., João Silva"
        disabled={loading}
      />

      <Textarea
        label="Contact Information *"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        error={errors.contact}
        placeholder="Email, phone, address..."
        rows={3}
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
          {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')} Provider
        </Button>
      </div>
    </form>
  );
};