import { useParams, Link } from "react-router-dom";
import { useContext, useMemo, useEffect, useState } from "react";
import UnidadesContext from "../../contexts/UnidadesContext";

//! Dados mockados (serão substituídos pela API)
const unidadesMock = [
  {
    id: 1,
    nome: "Maresia - Unidade Centro",
    endereco: "Rua das Palmeiras, 123 - Centro, São Paulo - SP",
    latitude: -23.561684,
    longitude: -46.655981,
  },
  {
    id: 2,
    nome: "Maresia - Unidade Beach",
    endereco: "Av. Beira Mar, 456 - Praia Grande, Praia Grande - SP",
    latitude: -24.005833,
    longitude: -46.402778,
  },
  {
    id: 3,
    nome: "Maresia - Unidade Mall",
    endereco:
      "Shopping Center, Loja 789 - 3º Piso, Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    latitude: -23.563194,
    longitude: -46.656572,
  },
];

export default function Localizacao() {
  const { id } = useParams();
  const { unidades, selecionarUnidade } = useContext(UnidadesContext);
  const [copiado, setCopiado] = useState(false);

  // Encontra a unidade de forma síncrona
  const unidade = useMemo(() => {
    const idNumerico = Number(id);
    return (
      unidades.find((u) => u.id === idNumerico) ||
      unidadesMock.find((u) => u.id === idNumerico)
    );
  }, [id, unidades]);

  // Garante que o context global saiba qual unidade está ativa
  useEffect(() => {
    if (unidade) {
      selecionarUnidade(unidade.id);
    }
  }, [unidade.id, selecionarUnidade, unidade]);

  // Função para copiar o endereço
  const copiarEndereco = () => {
    if (unidade?.endereco) {
      navigator.clipboard.writeText(unidade.endereco);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  // Links para apps de mapas externos
  const googleMapsUrl = unidade
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(unidade.endereco)}`
    : "#";

  const wazeUrl = unidade
    ? `https://www.waze.com/ul?q=${encodeURIComponent(unidade.endereco)}&navigate=yes`
    : "#";

  // URL do iframe do OpenStreetMap
  const osmEmbedUrl =
    unidade?.latitude && unidade?.longitude
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${unidade.longitude - 0.01},${unidade.latitude - 0.01},${unidade.longitude + 0.01},${unidade.latitude + 0.01}&layer=mapnik&marker=${unidade.latitude},${unidade.longitude}`
      : null;

  if (!unidade) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-areia/20">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-tinta mb-2">
            Unidade não encontrada
          </h2>
          <Link
            to="/"
            className="text-teal-petroleo font-medium hover:underline"
          >
            ← Voltar para a Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-areia/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-teal-petroleo transition-colors">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={`/unidade/${unidade.id}`}
            className="hover:text-teal-petroleo transition-colors"
          >
            {unidade.nome}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-tinta font-medium">Localização</span>
        </nav>

        {/* Header da Página */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-tinta mb-3">
            Como Chegar
          </h1>
          <p className="text-gray-600 text-lg">
            Estamos te esperando na unidade <strong>{unidade.nome}</strong>.
            Confira nosso endereço e trace sua rota.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda: Informações e Ações */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card de Endereço */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-petroleo/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-teal-petroleo"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-tinta mb-1">
                    Endereço
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {unidade.endereco}
                  </p>
                </div>
              </div>

              {/* Botão Copiar Endereço */}
              <button
                onClick={copiarEndereco}
                className="w-full flex items-center justify-center gap-2 bg-areia/50 text-tinta border border-areia px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-areia transition-colors"
              >
                {copiado ? (
                  <>
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Endereço copiado!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Copiar endereço
                  </>
                )}
              </button>
            </div>

            {/* Card de Coordenadas */}
            {unidade.latitude && unidade.longitude && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Coordenadas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Latitude</p>
                    <p className="text-tinta font-mono font-medium">
                      {unidade.latitude.toFixed(6)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Longitude</p>
                    <p className="text-tinta font-mono font-medium">
                      {unidade.longitude.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Card de Ações Rápidas */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-tinta mb-4">
                Abrir no aplicativo
              </h3>
              <div className="space-y-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 bg-white text-tinta border border-gray-200 px-4 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#4285F4"
                    />
                  </svg>
                  Google Maps
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 bg-white text-tinta border border-gray-200 px-4 py-3 rounded-lg font-medium text-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                      fill="#33CCFF"
                    />
                  </svg>
                  Waze
                </a>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Mapa */}
          <div className="lg:col-span-2">
            {osmEmbedUrl ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full min-h-[400px] lg:min-h-[500px] relative group">
                <iframe
                  src={osmEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "500px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa da ${unidade.nome}`}
                  className="w-full h-full"
                ></iframe>

                {/* Overlay com link para o mapa completo */}
                <a
                  href={`https://www.openstreetmap.org/?mlat=${unidade.latitude}&mlon=${unidade.longitude}#map=16/${unidade.latitude}/${unidade.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white text-tinta px-4 py-2 rounded-lg shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-teal-petroleo hover:text-white"
                >
                  Ver mapa completo
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-tinta mb-3">
                  Localização indisponível
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  As coordenadas desta unidade ainda não foram cadastradas. Por
                  favor, entre em contato conosco para obter o endereço exato.
                </p>
                <a
                  href="/contato"
                  className="text-teal-petroleo font-medium hover:underline"
                >
                  Ir para a página de contato
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Botão de Voltar */}
        <div className="mt-8 text-center">
          <Link
            to={`/unidade/${unidade.id}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-petroleo transition-colors font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar para a página da unidade
          </Link>
        </div>
      </div>
    </div>
  );
}
