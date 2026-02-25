import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL + '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getCategories = () => api.get('/categories');
export const addCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export const getProductsByCategory = (categoryId) => api.get(`/products/${categoryId}`);
export const addProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getCatalogues = () => api.get('/catalogues');
export const addCatalogue = (data) => api.post('/catalogues', data);
export const updateCatalogue = (id, data) => api.put(`/catalogues/${id}`, data);
export const deleteCatalogue = (id) => api.delete(`/catalogues/${id}`);

export const reorderItems = (type, order) => api.post('/reorder', { type, order });

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export default api;
