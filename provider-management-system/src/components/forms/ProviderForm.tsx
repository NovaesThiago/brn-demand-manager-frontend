// src/components/forms/ProviderForm.tsx
import { useState } from 'react';
import type { ProviderFormData } from '../../types';
import { Input, Button } from '../ui';
import { FormField} from '../ui/FormField';
import { FormSection } from '../ui/FormSection';
import { Building2, User, Mail, Phone } from 'lucide-react';

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
      name: '',
      email: '',
      contact: '',
      responsible: '',
    }
  );

  const [errors, setErrors] = useState<Partial<ProviderFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<ProviderFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProviderFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection 
        title="Informações do Provedor" 
        description="Dados principais do provedor de internet"
      >
        <FormField 
          label="Nome do Provedor" 
          required 
          error={errors.name}
          helpText="Nome da empresa provedora"
        >
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ex: BRNX Fibra"
              disabled={loading}
              className="pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </FormField>

        <FormField 
          label="Email" 
          required 
          error={errors.email}
          helpText="Email para contato"
        >
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ex: suporte@brnxfibra.com.br"
              disabled={loading}
              className="pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </FormField>
      </FormSection>

      <FormSection 
        title="Informações Adicionais" 
        description="Dados opcionais para contato"
      >
        <FormField 
          label="Responsável Técnico" 
          error={errors.responsible}
          helpText="Nome do responsável técnico (opcional)"
        >
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              name="responsible"
              value={formData.responsible || ''}
              onChange={handleChange}
              placeholder="ex: João Silva"
              disabled={loading}
              className="pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </FormField>

        <FormField 
          label="Telefone de Contato" 
          error={errors.contact}
          helpText="Telefone para contato (opcional)"
        >
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              name="contact"
              value={formData.contact || ''}
              onChange={handleChange}
              placeholder="ex: (11) 99999-9999"
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
            initialData ? 'Atualizar' : 'Criar Provider'
          )}
        </Button>
      </div>
    </form>
  );
};