import api from './api';

const lieuService = {
    getLieux: async () => {
        const response = await api.get('/lieux');
        return response.data;
    },
};

export default lieuService;