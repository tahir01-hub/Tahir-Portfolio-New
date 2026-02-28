import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// About APIs
export const aboutAPI = {
  get: () => api.get('/about'),
  create: (data) => api.post('/about', data),
  update: (id, data) => api.put(`/about/${id}`, data),
  delete: (id) => api.delete(`/about/${id}`),
};

// Project APIs
export const projectAPI = {
  getAll: () => api.get('/projects'),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/projects/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/projects/${id}`),
  toggle: (id) => api.patch(`/projects/${id}/toggle`),
};

// Career APIs
export const careerAPI = {
  getAll: () => api.get('/career'),
  getOne: (id) => api.get(`/career/${id}`),
  create: (data) => api.post('/career', data),
  update: (id, data) => api.put(`/career/${id}`, data),
  delete: (id) => api.delete(`/career/${id}`),
};

// Skill APIs
export const skillAPI = {
  getAll: () => api.get('/skills'),
  create: (data) => api.post('/skills', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/skills/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/skills/${id}`),
};

// Contact APIs
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact'),
  getOne: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, status) => api.patch(`/contact/${id}/status`, { status }),
  toggleStar: (id) => api.patch(`/contact/${id}/star`),
  delete: (id) => api.delete(`/contact/${id}`),
};

// Settings APIs
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

export default api;
