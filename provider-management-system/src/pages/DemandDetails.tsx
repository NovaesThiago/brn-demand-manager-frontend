import { useState } from 'react';
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
  const { actions, loading: actionsLoading, createAction } = useTechnicalActions(id);
  
  const [showActionForm, setShowActionForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Encontrar a demanda pelo ID
  const demand = allDemands.find(d => d.id === id);

  if (!demand) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Demand Not Found</h1>
        <p className="text-gray-600 mb-6">The demand you're looking for doesn't exist.</p>
        <Link to="/demands" className="btn-primary">
          Back to Demands
        </Link>
      </div>
    );
  }

  const statusColors = {
    Pendente: 'bg-yellow-100 text-yellow-800',
    'Em Andamento': 'bg-blue-100 text-blue-800',
    Concluída: 'bg-green-100 text-green-800',
  };

  const typeColors = {
    Diagnóstico: 'bg-purple-100 text-purple-800',
    Manutenção: 'bg-orange-100 text-orange-800',
    Configuração: 'bg-indigo-100 text-indigo-800',
    Instalação: 'bg-teal-100 text-teal-800',
    Outro: 'bg-gray-100 text-gray-800',
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateDemand(demand.id, { status: newStatus as any });
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleCreateAction = async (actionData: any) => {
    setFormLoading(true);
    try {
      await createAction(actionData);
      setShowActionForm(false);
    } catch (err) {
      console.error('Failed to create action:', err);
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
            ← Back to Demands
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{demand.title}</h1>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => navigate('/demands')}
          >
            Back
          </Button>
          <Button
            onClick={() => setShowActionForm(true)}
          >
            Add Action
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
                  {demand.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[demand.status]}`}>
                  {demand.status}
                </span>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-sm font-medium">
                  {new Date(demand.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Provider</h3>
              <p className="text-[#4169E1] font-medium">
                {demand.provider?.tradeName || 'Unknown Provider'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{demand.description}</p>
            </div>
          </Card>

          {/* Ações técnicas */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Technical Actions</h2>
              <span className="text-sm text-gray-500">
                {actions.length} action{actions.length !== 1 ? 's' : ''}
              </span>
            </div>
            <TechnicalActionsList actions={actions} loading={actionsLoading} />
          </div>
        </div>

        {/* Sidebar - Status e informações */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
            <div className="space-y-2">
              {(['Pendente', 'Em Andamento', 'Concluída'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    demand.status === status
                      ? 'bg-[#4169E1] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Provider</p>
                <p className="font-medium">{demand.provider?.tradeName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-medium">
                  {new Date(demand.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium">
                  {new Date(demand.updatedAt).toLocaleDateString('pt-BR')}
                </p>
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add Technical Action</h2>
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