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
  
  const demandId = id ? parseInt(id) : null;
  
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

  const demand = allDemands.find(d => d.id === demandId);

  useEffect(() => {
    if (!demandId) {
      navigate('/demands');
    }
  }, [demandId, navigate]);

  if (!demandId) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ID Inválido</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">O ID da demanda é inválido.</p>
        <Link to="/demands" className="btn-primary">
          Voltar para Demandas
        </Link>
      </div>
    );
  }

  if (!demand) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Demanda Não Encontrada</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">A demanda que você está procurando não existe.</p>
        <Link to="/demands" className="btn-primary">
          Voltar para Demandas
        </Link>
      </div>
    );
  }

  // Cores para os status com dark mode
  const statusColors = {
    PENDENTE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    EM_ANDAMENTO: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    CONCLUIDA: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    CANCELADA: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  // Cores para os tipos com dark mode
  const typeColors = {
    DIAGNOSTICO: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    MANUTENCAO: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    CONFIGURACAO: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    INSTALACAO: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    OUTRO: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
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
          <Link to="/demands" className="text-[#4169E1] hover:text-[#3151B0] dark:text-blue-400 dark:hover:text-blue-300 mb-2 inline-block">
            ← Voltar para Demandas
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{demand.title}</h1>
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Criada em</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(demand.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Provedor</h3>
              <p className="text-[#4169E1] font-medium dark:text-blue-400">
                {demand.provider?.name || 'Provedor Desconhecido'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Descrição</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{demand.description}</p>
            </div>
          </Card>

          {/* Ações técnicas */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ações Técnicas</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {actions.length} ação{actions.length !== 1 ? 'es' : ''}
              </span>
            </div>
            <TechnicalActionsList actions={actions} loading={actionsLoading} />
          </div>
        </div>

        {/* Sidebar - Status e informações */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Atualizar Status</h3>
            <div className="space-y-2">
              {(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    demand.status === status
                      ? 'bg-[#4169E1] text-white dark:bg-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {statusLabels[status]}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Informações Rápidas</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Provedor</p>
                <p className="font-medium text-gray-900 dark:text-white">{demand.provider?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Criada em</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(demand.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Tipo</p>
                <p className="font-medium text-gray-900 dark:text-white">{typeLabels[demand.type]}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal para adicionar ação */}
      {showActionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Adicionar Ação Técnica</h2>
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