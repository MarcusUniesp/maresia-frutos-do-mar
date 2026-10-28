import api from "./api";

export const unidadesService = {
  getAll: async () => {
    const response = await api.get("/unidades");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/unidades/${id}`);
    return response.data;
  },

  getFotos: async (unidadeId) => {
    const response = await api.get(`/unidades/${unidadeId}/fotos`);
    return response.data;
  },
};
