import axios from 'axios';

// API service for all backend requests (auth, users, sessions, requests, availability)
const API_BASE_URL = 'https://mentorship-platform-backend-production.up.railway.app/api';
console.log('Frontend API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        message = error.response.data.message;
      } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        message = error.response.data.errors.map(e => e.msg || e.message).join(' ');
      }
    } else if (error.message) {
      message = error.message;
    }
    error.userMessage = message;
    return Promise.reject(error);
  }
);

export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const users = {
  getCurrentUserProfile: () => api.get('/users/me'),
  getUserProfileById: (id) => api.get(`/users/${parseInt(id, 10)}`),
  getMentors: () => api.get('/users/mentors'),
  updateCurrentUserProfile: (profileData) => api.put('/users/me/profile', profileData),
};

export const requests = {
  sendMentorshipRequest: (mentorId) => api.post('/requests', { mentorId: parseInt(mentorId, 10) }),
  getReceivedRequests: () => api.get('/requests/received'),
  getSentRequests: () => api.get('/requests/sent'),
  updateRequestStatus: (requestId, status) => api.put(`/requests/${parseInt(requestId, 10)}`, { status }),
};

export const sessions = {
  /**
   * Schedule a new session. Ensures mentorId, menteeId, and userId are integers if present.
   */
  scheduleSession: (sessionData) => {
    const data = { ...sessionData };
    if (data.mentorId) data.mentorId = parseInt(data.mentorId, 10);
    if (data.menteeId) data.menteeId = parseInt(data.menteeId, 10);
    if (data.userId) data.userId = parseInt(data.userId, 10);
    return api.post('/sessions', data);
  },
  getMentorSessions: () => api.get('/sessions/mentor'),
  getMenteeSessions: () => api.get('/sessions/mentee'),
};

export const availability = {
  getMentorAvailability: () => api.get('/availability/me'),
  getMentorAvailabilityById: (mentorId) => api.get(`/availability/${parseInt(mentorId, 10)}`),
  /**
   * Add a new availability slot for a mentor. Ensures mentorId is integer if present.
   */
  addAvailabilitySlot: (slotData) => {
    const data = { ...slotData };
    if (data.mentorId) data.mentorId = parseInt(data.mentorId, 10);
    return api.post('/availability', data);
  },
};

export default api;
