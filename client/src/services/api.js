import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1` : '/api/v1',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ht-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ht-token');
      window.location.href = '/login';
    }
    return Promise.reject(err.response?.data || err);
  }
);

export default api;
