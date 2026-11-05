import api from "./api";

export const unidadesService = {
  getAll: async () => {
    const response = await api.get("/api/unidades/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/unidades/${id}`);
    return response.data;
  },

  getFotos: async (unidadeId) => {
    const response = await api.get(`/api/fotos/unidade/${unidadeId}`);
    return response.data;
  },
};
