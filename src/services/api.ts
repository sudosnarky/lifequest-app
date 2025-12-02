import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL - update this for your environment
const API_BASE_URL = __DEV__ 
  ? 'http://172.21.244.33:3000/api'  // Development: Use your computer's IP
  : 'https://lifequest-app-production.up.railway.app/api'; // Production: Railway API URL

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@lifequest_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage
      await AsyncStorage.multiRemove(['@lifequest_token', '@lifequest_user']);
      // You might want to navigate to login screen here
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };
