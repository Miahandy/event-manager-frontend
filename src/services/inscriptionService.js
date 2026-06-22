import api from './api';

const inscriptionService = {
    inscrire: async (eventId) => {
        const response = await api.post('/inscriptions', {
            eventId,
        });
        return response.data;
    },

    getMyInscriptions: async () => {
        const response = await api.get('/inscriptions/me');
        return response.data;
    },

    annulerInscription: async (id) => {
        const response = await api.delete(`inscriptions/${id}`);
        return response.data;
    },
};

export default inscriptionService;