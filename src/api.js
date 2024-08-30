import axios from 'axios'

const API_URL = 'http://localhost:8000/api/'

const api = axios.create({
  baseURL: API_URL
})

// Function to get the token from local storage
const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
    }
  }
}

// API calls
export const login = credentials => {
  return api.post('token/', credentials)
}
export const Validity = accessToken =>
  api.post('token/verify/', { accessToken }, { withCredentials: true })

export const fetchCompanies = () => {
  return api.get('companies/', getAuthHeader())
}
export const createCompany = data =>
  api.post('companies/', data, getAuthHeader())

export const updateCompanies = (id, data) => {
  return api.put(`companies/${id}/`, data, getAuthHeader())
}
export const deleteCompanies = id => {
  return api.delete(`companies/${id}/`, getAuthHeader())
}

export const uploadCompanies = file => {
  return api.post('companies/upload_companies/', file, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const fetchEmployees = () => {
  return api.get('employees/', getAuthHeader())
}

export const createEmployee = data => {
  return api.post('employees/', data, getAuthHeader())
}

export const deleteEmployee = id => {
  return api.delete(`employees/${id}/`, getAuthHeader())
}
export const updateEmployee = (id, data) => {
  return api.put(`employees/${id}/`, data, getAuthHeader())
}

export const uploadEmployees = file => {
  return api.post('employees/upload_employees/', file, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default api
