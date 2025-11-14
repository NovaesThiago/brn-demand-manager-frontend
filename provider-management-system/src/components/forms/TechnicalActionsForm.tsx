// src/components/forms/TechnicalActionForm.tsx
import { useState } from 'react';
import { Textarea, Input, Button } from '../ui';
import { FormField} from '../ui/FormField';
import { FormSection } from '../ui/FormSection';
import { FileText, User } from 'lucide-react';

interface TechnicalActionFormProps {
  demandId: number;
  onSubmit: (data: { label: string; technician: string; demandId: number }) => void;
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
    label: '',
    technician: '',
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<typeof formData> = {};
    if (!formData.label.trim()) newErrors.label = 'Descrição da ação é obrigatória';
    if (!formData.technician.trim()) newErrors.technician = 'Nome do técnico é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      label: formData.label,
      technician: formData.technician,
      demandId: demandId,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection 
        title="Ação Técnica" 
        description="Registre a ação técnica realizada"
      >
        <FormField 
          label="Descrição da Ação *" 
          required 
          error={errors.label}
          helpText="Descreva detalhadamente a ação técnica realizada"
        >
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <Textarea
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="Ex: Configurado BGP para novo peering, ajustado QoS na interface eth1..."
              rows={4}
              disabled={loading}
              className="pl-10 resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </FormField>

        <FormField 
          label="Técnico Responsável *" 
          required 
          error={errors.technician}
          helpText="Nome do técnico que executou a ação"
        >
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              name="technician"
              value={formData.technician}
              onChange={handleChange}
              placeholder="ex: João Silva"
              disabled={loading}
              className="pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </FormField>
      </FormSection>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
          className="min-w-24"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="min-w-24"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Salvando...</span>
            </div>
          ) : (
            'Adicionar Ação'
          )}
        </Button>
      </div>
    </form>
  );
};