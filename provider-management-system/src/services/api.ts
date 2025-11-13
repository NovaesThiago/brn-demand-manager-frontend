import axios from 'axios';

// URL base da API - usa variável de ambiente ou fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

console.log('API Base URL:', API_BASE_URL); // Para debug

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 segundos para production
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    // Adicione tokens de autenticação aqui se necessário
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    
    // Tratamento de erros comum
    if (error.response?.status === 401) {
      // Redirecionar para login se não autorizado
      console.warn('⚠️ Unauthorized access');
      // window.location.href = '/login';
    } else if (error.response?.status === 500) {
      console.error('🚨 Server error:', error.response.data);
    } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
      console.error('🌐 Network error - Backend might be down');
    }
    
    return Promise.reject(error);
  }
);