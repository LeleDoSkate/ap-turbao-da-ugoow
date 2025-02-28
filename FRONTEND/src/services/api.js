const baseUrl = import.meta.env.VITE_API_BASE_URL;

// para acessar localmente
import axios from 'axios';

// Instância do axios com configuração personalizada
export const api = axios.create({
    // Configuração da URL base para todas as requisições feitas com esta instância do axios
    baseURL: baseUrl// Substitua pelo IPv4 local do seu computador
});

// Interceptor para incluir o token JWT em todas as requisições
api.interceptors.request.use(config => {
     const token = localStorage.getItem('token');
     if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
   return config;
 }, error => {
     return Promise.reject(error);
 });