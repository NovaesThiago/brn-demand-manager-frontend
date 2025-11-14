// src/hooks/useThemeColors.ts
import { useTheme } from '../contexts/ThemeContext';

export const useThemeColors = () => {
  const { theme } = useTheme();

  const statusColors = {
    PENDENTE: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
    EM_ANDAMENTO: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
    CONCLUIDA: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
    CANCELADA: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
  };

  const typeColors = {
    DIAGNOSTICO: theme === 'dark' ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
    MANUTENCAO: theme === 'dark' ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800',
    CONFIGURACAO: theme === 'dark' ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800',
    INSTALACAO: theme === 'dark' ? 'bg-teal-900 text-teal-200' : 'bg-teal-100 text-teal-800',
    OUTRO: theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800',
  };

  return { statusColors, typeColors };
};