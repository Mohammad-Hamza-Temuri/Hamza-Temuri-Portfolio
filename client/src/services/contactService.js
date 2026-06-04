import api from './api.js';

export const contactService = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact/admin', { params }),
  updateStatus: (id, status) => api.patch(`/contact/admin/${id}`, { status }),
  delete: (id) => api.delete(`/contact/admin/${id}`),
};
