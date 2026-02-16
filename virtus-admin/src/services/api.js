import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getCategories = () => api.get('/categories');
export const addCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export const getProductsByCategory = (categoryId) => api.get(`/products/${categoryId}`);
export const addProduct = (data) => api.post('/products', data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;
