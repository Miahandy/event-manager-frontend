import api from './api';

const fliereService = {
    getFiliere: async () => {
        const response = await api.get('/filieres');
        return response.data;
    },
};

export default filiereService;