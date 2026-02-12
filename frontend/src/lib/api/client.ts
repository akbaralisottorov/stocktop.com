import axios from 'axios';

// Environment variable for API URL or default to localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Ensures cookies are sent with requests if needed (e.g. for refresh tokens)
  withCredentials: true, 
});

// Request interceptor for adding Auth Token
apiClient.interceptors.request.use(
  (config) => {
    // In a real app, you would retrieve the token from localStorage or a global state store
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.warn('Unauthorized access. Redirecting to login...');
      // window.location.href = '/auth/login'; // Uncomment when routing is set up
    }
    return Promise.reject(error);
  }
);
