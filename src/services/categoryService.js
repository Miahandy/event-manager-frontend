import api from './api';

const categoryService = {
    getCategories: async () => {
        const response = await api.get('/categorie');
        return response.data;
    },
};

export default categoryService;