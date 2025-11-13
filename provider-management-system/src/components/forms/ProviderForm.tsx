import { useState } from 'react';
import type { ProviderFormData } from '../../types';
import { Input, Textarea, Button } from '../ui';
import { FormField } from '../ui/FormField';
import { FormSection } from '../ui/FormSection';
import { Building2, User, Contact } from 'lucide-react';

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
    
    const newErrors: Partial<ProviderFormData> = {};
    if (!formData.tradeName.trim()) newErrors.tradeName = 'Nome fantasia é obrigatório';
    if (!formData.responsiblePerson.trim()) newErrors.responsiblePerson = 'Responsável é obrigatório';
    if (!formData.contact.trim()) newErrors.contact = 'Contato é obrigatório';

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
    if (errors[name as keyof ProviderFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection 
        title="Informações da Empresa" 
        description="Dados principais do provedor de internet"
      >
        <FormField 
          label="Nome Fantasia" 
          required 
          error={errors.tradeName}
          helpText="Nome comercial da empresa"
        >
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              name="tradeName"
              value={formData.tradeName}
              onChange={handleChange}
              placeholder="ex: BRNX Fibra"
              disabled={loading}
              className="pl-10"
            />
          </div>
        </FormField>

        <FormField 
          label="Responsável Técnico" 
          required 
          error={errors.responsiblePerson}
          helpText="Pessoa responsável pelo contato técnico"
        >
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              name="responsiblePerson"
              value={formData.responsiblePerson}
              onChange={handleChange}
              placeholder="ex: João Silva"
              disabled={loading}
              className="pl-10"
            />
          </div>
        </FormField>
      </FormSection>

      <FormSection 
        title="Contato" 
        description="Informações para contato técnico"
      >
        <FormField 
          label="Dados de Contato" 
          required 
          error={errors.contact}
          helpText="Email, telefone, endereço - um por linha"
        >
          <div className="relative">
            <Contact className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <Textarea
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder={`joao@empresa.com.br\n(11) 99999-9999\nRua Exemplo, 123`}
              rows={4}
              disabled={loading}
              className="pl-10 resize-none"
            />
          </div>
        </FormField>
      </FormSection>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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