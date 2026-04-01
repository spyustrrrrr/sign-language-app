// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSigns = async () => {
  try {
    const response = await api.get('/signs');
    return response.data;
  } catch (error) {
    console.error('Error fetching signs:', error);
    throw error;
  }
};

export const getSignsByType = async (type) => {
  try {
    const response = await api.get(`/signs/type/${type}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching signs by type:', error);
    throw error;
  }
};

export default api;