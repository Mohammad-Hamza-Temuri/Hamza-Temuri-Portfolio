import api from './api.js';

export const projectService = {
  getAll: (category) => api.get(`/projects${category && category !== 'all' ? `?category=${category}` : ''}`),
  getFeatured: () => api.get('/projects/featured'),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  adminGetAll: () => api.get('/projects/admin/all'),
  create: (data) => api.post('/projects/admin', data),
  update: (id, data) => api.put(`/projects/admin/${id}`, data),
  delete: (id) => api.delete(`/projects/admin/${id}`),
};
