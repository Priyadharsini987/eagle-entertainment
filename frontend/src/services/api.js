import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('eagle_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Public APIs
export const publicApi = {
  getUpcomingEvents: () => api.get('/api/public/events/upcoming'),
  getRecentEvents: () => api.get('/api/public/events/recent'),
  getAllEvents: () => api.get('/api/public/events'),
  getEventById: (id) => api.get(`/api/public/events/${id}`),
  getGallery: () => api.get('/api/public/gallery'),
  getTestimonials: () => api.get('/api/public/testimonials'),
  getStats: () => api.get('/api/public/stats'),
  submitInquiry: (data) => api.post('/api/public/inquiry', data),
  getTeam: () => api.get('/api/public/team'),
};

// Auth APIs
export const authApi = {
  login: (username, password) => api.post('/api/auth/login', { username, password }),
  verify: () => api.get('/api/auth/verify'),
};

// Admin APIs
export const adminApi = {
  getDashboard: () => api.get('/api/admin/dashboard'),
  // Events
  getEvents: () => api.get('/api/admin/events'),
  createEvent: (data) => api.post('/api/admin/events', data),
  updateEvent: (id, data) => api.put(`/api/admin/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/api/admin/events/${id}`),
  // Gallery
  getGallery: () => api.get('/api/admin/gallery'),
  addGallery: (data) => api.post('/api/admin/gallery', data),
  deleteGallery: (id) => api.delete(`/api/admin/gallery/${id}`),
  // Testimonials
  getTestimonials: () => api.get('/api/admin/testimonials'),
  addTestimonial: (data) => api.post('/api/admin/testimonials', data),
  deleteTestimonial: (id) => api.delete(`/api/admin/testimonials/${id}`),
  // Inquiries
  getInquiries: () => api.get('/api/admin/inquiries'),
  updateInquiryStatus: (id, status) => api.put(`/api/admin/inquiries/${id}/status`, { status }),
  deleteInquiry: (id) => api.delete(`/api/admin/inquiries/${id}`),
  // Team Members
  getTeam: () => api.get('/api/admin/team'),
  addTeam: (data) => api.post('/api/admin/team', data),
  updateTeam: (id, data) => api.put(`/api/admin/team/${id}`, data),
  deleteTeam: (id) => api.delete(`/api/admin/team/${id}`),
};

export default api;
