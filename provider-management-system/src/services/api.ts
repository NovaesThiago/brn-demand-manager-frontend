import axios from 'axios';

// CORREÇÃO 1: Usar variável de ambiente com fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://brn-demand-manager-backend-production.up.railway.app';

console.log('API Base URL:', API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  // CORREÇÃO 2: Configurações para CORS
  withCredentials: false, // Altere para true se usar cookies/sessions
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log(`API Call: ${config.method?.toUpperCase()} ${config.url}`);
    // CORREÇÃO 3: Adicionar headers para CORS se necessário
    config.headers['Accept'] = 'application/json';
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log(`API Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      // CORREÇÃO 4: Log mais detalhado para debug de CORS
      headers: error.response?.headers,
      data: error.response?.data
    });
    
    // CORREÇÃO 5: Tratamento específico para erro de CORS
    if (error.code === 'NETWORK_ERROR' || error.message.includes('CORS')) {
      console.error('CORS Error: Verifique a configuração do backend');
    }
    
    return Promise.reject(error);
  }
);