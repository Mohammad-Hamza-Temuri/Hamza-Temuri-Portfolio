import api from './api.js';

export const RESUME_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1/upload/resume`
  : '/api/v1/upload/resume';

export const profileService = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile/admin', data),
  uploadImage: (formData) => api.post('/upload/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadResume: (formData) => api.post('/upload/resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
