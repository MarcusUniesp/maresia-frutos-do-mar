/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useState, useEffect, useCallback } from "react";
import { unidadesService } from "../services/unidadesService";

const UnidadesContext = createContext();

export function UnidadesProvider({ children }) {
  const [unidades, setUnidades] = useState([]);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarUnidades = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await unidadesService.getAll();
      setUnidades(data);

      // Se houver apenas uma unidade, seleciona automaticamente
      if (data.length === 1) {
        setUnidadeSelecionada(data[0]);
      }
    } catch (err) {
      setError("Erro ao carregar unidades");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarUnidades();
  }, [carregarUnidades]);

  function selecionarUnidade(id) {
    const unidade = unidades.find((u) => u.id === id);
    setUnidadeSelecionada(unidade);
  }

  return (
    <UnidadesContext.Provider
      value={{
        unidades,
        unidadeSelecionada,
        loading,
        error,
        selecionarUnidade,
      }}
    >
      {children}
    </UnidadesContext.Provider>
  );
}

export default UnidadesContext;
