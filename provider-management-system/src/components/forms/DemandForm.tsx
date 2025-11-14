// src/components/forms/DemandForm.tsx
import { useState } from 'react';
import type { DemandFormData, Provider } from '../../types';
import { Input, Textarea, Select, Button } from '../ui';
import { FormField} from '../ui/FormField';
import { FormSection } from '../ui/FormSection';
import { DEMAND_STATUS_OPTIONS, DEMAND_TYPE_OPTIONS } from '../../utils/constants';
import { FileText, AlertCircle, Building2 } from 'lucide-react';

interface DemandFormProps {
  onSubmit: (data: DemandFormData) => void;
  onCancel: () => void;
  initialData?: DemandFormData;
  providers: Provider[];
  loading?: boolean;
}

interface DemandFormState {
  title: string;
  description: string;
  type: 'DIAGNOSTICO' | 'MANUTENCAO' | 'CONFIGURACAO' | 'INSTALACAO' | 'OUTRO';
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  providerId: number | null;
}

export const DemandForm = ({ 
  onSubmit, 
  onCancel, 
  initialData, 
  providers, 
  loading = false 
}: DemandFormProps) => {
  const [formData, setFormData] = useState<DemandFormState>(
    initialData ? {
      ...initialData,
      providerId: initialData.providerId || null
    } : {
      title: '',
      description: '',
      type: 'DIAGNOSTICO',
      status: 'PENDENTE',
      providerId: null,
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof DemandFormState, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<Record<keyof DemandFormState, string>> = {};
    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.providerId) newErrors.providerId = 'Provedor é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    onSubmit({
      ...formData,
      providerId: formData.providerId as number
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'providerId') {
      const numericValue = value === '' ? null : Number(value);
      setFormData(prev => ({ 
        ...prev, 
        [name]: numericValue 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value 
      }));
    }
    
    if (errors[name as keyof DemandFormState]) {
      setErrors(prev => ({ 
        ...prev, 
        [name]: undefined 
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection 
        title="Detalhes da Demanda" 
        description="Informações principais sobre a solicitação técnica"
      >
        <FormField 
          label="Título da Demanda" 
          required 
          error={errors.title}
          helpText="Descreva brevemente o problema ou solicitação"
        >
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="ex: Análise de Lentidão na Rede Borda"
              disabled={loading}
              className="pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </FormField>

        <FormField 
          label="Descrição Detalhada" 
          required 
          error={errors.description}
          helpText="Descreva todos os detalhes técnicos necessários"
        >
          <div className="relative">
            <AlertCircle className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva o problema, sintomas, equipamentos envolvidos, horários de ocorrência..."
              rows={5}
              disabled={loading}
              className="pl-10 resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </FormField>
      </FormSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSection title="Classificação">
          <FormField label="Tipo de Demanda" required>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={DEMAND_TYPE_OPTIONS}
              disabled={loading}
              className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </FormField>

          <FormField label="Status" required>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={DEMAND_STATUS_OPTIONS}
              disabled={loading}
              className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </FormField>
        </FormSection>

        <FormSection title="Provedor">
          <FormField 
            label="Provedor Responsável" 
            required 
            error={errors.providerId}
            helpText="Selecione o provedor relacionado a esta demanda"
          >
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Select
                name="providerId"
                value={formData.providerId?.toString() || ''}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Selecione um provedor' },
                  ...providers.map(p => ({
                    value: p.id.toString(),
                    label: p.name
                  }))
                ]}
                disabled={loading}
                className="pl-10 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
          </FormField>
        </FormSection>
      </div>

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
            initialData ? 'Atualizar' : 'Criar Demanda'
          )}
        </Button>
      </div>
    </form>
  );
};