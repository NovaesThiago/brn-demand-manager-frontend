import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { TechnicalActionForm } from '../components/forms';
import { TechnicalActionsList } from '../components/demands';
import { useDemands } from '../hooks/useDemands';
import { useTechnicalActions } from '../hooks/useTechnicalActions';

const DemandDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allDemands, updateDemand } = useDemands();
  
  // CORREÇÃO: Converter e validar o ID
  const demandId = id ? parseInt(id) : null;
  
  // CORREÇÃO: Só usar o hook se demandId for válido
  const technicalActionsData = demandId 
    ? useTechnicalActions(demandId)
    : { 
        actions: [], 
        loading: false, 
        createAction: undefined,
        error: 'ID da demanda inválido'
      };

  const { actions, loading: actionsLoading, createAction } = technicalActionsData;
  
  const [showActionForm, setShowActionForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // CORREÇÃO: Encontrar a demanda usando o demandId já convertido
  const demand = allDemands.find(d => d.id === demandId);

  // CORREÇÃO: Redirecionar se ID for inválido
  useEffect(() => {
    if (!demandId) {
      navigate('/demands');
    }
  }, [demandId, navigate]);

  if (!demandId) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">ID Inválido</h1>
        <p className="text-gray-600 mb-6">O ID da demanda é inválido.</p>
        <Link to="/demands" className="btn-primary">
          Voltar para Demandas
        </Link>
      </div>
    );
  }

  if (!demand) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Demanda Não Encontrada</h1>
        <p className="text-gray-600 mb-6">A demanda que você está procurando não existe.</p>
        <Link to="/demands" className="btn-primary">
          Voltar para Demandas
        </Link>
      </div>
    );
  }

  // Cores para os status (usando os enums do seu schema)
  const statusColors = {
    PENDENTE: 'bg-yellow-100 text-yellow-800',
    EM_ANDAMENTO: 'bg-blue-100 text-blue-800',
    CONCLUIDA: 'bg-green-100 text-green-800',
    CANCELADA: 'bg-red-100 text-red-800',
  };

  // Cores para os tipos (usando os enums do seu schema)
  const typeColors = {
    DIAGNOSTICO: 'bg-purple-100 text-purple-800',
    MANUTENCAO: 'bg-orange-100 text-orange-800',
    CONFIGURACAO: 'bg-indigo-100 text-indigo-800',
    INSTALACAO: 'bg-teal-100 text-teal-800',
    OUTRO: 'bg-gray-100 text-gray-800',
  };

  // Labels em português para os enums
  const statusLabels = {
    PENDENTE: 'Pendente',
    EM_ANDAMENTO: 'Em Andamento',
    CONCLUIDA: 'Concluída',
    CANCELADA: 'Cancelada',
  };

  const typeLabels = {
    DIAGNOSTICO: 'Diagnóstico',
    MANUTENCAO: 'Manutenção',
    CONFIGURACAO: 'Configuração',
    INSTALACAO: 'Instalação',
    OUTRO: 'Outro',
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateDemand(demand.id, { status: newStatus as any });
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  const handleCreateAction = async (actionData: { label: string; technician: string; demandId: number }) => {
    // CORREÇÃO: Verificar se createAction existe antes de usar
    if (!createAction) {
      console.error('Não é possível criar ação: createAction não disponível');
      return;
    }

    setFormLoading(true);
    try {
      await createAction(actionData);
      setShowActionForm(false);
    } catch (err) {
      console.error('Erro ao criar ação:', err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <Link to="/demands" className="text-[#4169E1] hover:text-[#3151B0] mb-2 inline-block">
            ← Voltar para Demandas
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{demand.title}</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => navigate('/demands')}
          >
            Voltar
          </Button>
          <Button
            onClick={() => setShowActionForm(true)}
            // CORREÇÃO: Desabilitar botão se não puder criar ações
            disabled={!createAction}
          >
            Adicionar Ação
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detalhes da demanda */}
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[demand.type]}`}>
                  {typeLabels[demand.type]}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[demand.status]}`}>
                  {statusLabels[demand.status]}
                </span>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Criada em</p>
                <p className="text-sm font-medium">
                  {new Date(demand.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Provedor</h3>
              <p className="text-[#4169E1] font-medium">
                {demand.provider?.name || 'Provedor Desconhecido'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
              <p className="text-gray-700 whitespace-pre-line">{demand.description}</p>
            </div>
          </Card>

          {/* Ações técnicas */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Ações Técnicas</h2>
              <span className="text-sm text-gray-500">
                {actions.length} ação{actions.length !== 1 ? 'es' : ''}
              </span>
            </div>
            <TechnicalActionsList actions={actions} loading={actionsLoading} />
          </div>
        </div>

        {/* Sidebar - Status e informações */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Atualizar Status</h3>
            <div className="space-y-2">
              {(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    demand.status === status
                      ? 'bg-[#4169E1] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {statusLabels[status]}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Informações Rápidas</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Provedor</p>
                <p className="font-medium">{demand.provider?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">Criada em</p>
                <p className="font-medium">
                  {new Date(demand.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Tipo</p>
                <p className="font-medium">{typeLabels[demand.type]}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal para adicionar ação */}
      {showActionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Adicionar Ação Técnica</h2>
              <TechnicalActionForm
                demandId={demand.id}
                onSubmit={handleCreateAction}
                onCancel={() => setShowActionForm(false)}
                loading={formLoading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandDetails;