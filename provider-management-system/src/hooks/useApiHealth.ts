import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useApiHealth = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true);
        await api.get('/health'); // Ou um endpoint simples como '/providers'
        setIsOnline(true);
      } catch (error) {
        console.warn('Backend is not reachable:', error);
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    
    // Verificar a cada 30 segundos
    const interval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { isOnline, loading };
};