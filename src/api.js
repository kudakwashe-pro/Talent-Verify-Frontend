import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});

// Function to get the token from local storage
const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return { headers: { 'Authorization': `Bearer ${token}` } };
};

// API calls
export const login = (credentials) => api.post('token/', credentials, getAuthHeader());
export const fetchCompanies = () => api.get('companies/', getAuthHeader());
export const createCompany = (data) => api.post('companies/', data, getAuthHeader());
export const fetchEmployees = () => api.get('employees/', getAuthHeader());
export const createEmployee = (data) => api.post('employees/', data, getAuthHeader());
export const uploadEmployees = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('employees/upload/', formData, getAuthHeader());
};

export default api;