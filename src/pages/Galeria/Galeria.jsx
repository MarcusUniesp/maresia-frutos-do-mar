/* eslint-disable react-hooks/immutability */
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { unidadesService } from "../../services/unidadesService";
import UnidadesContext from "../../contexts/UnidadesContext";

export default function Galeria() {
  const { id } = useParams();
  const { selecionarUnidade } = useContext(UnidadesContext);

  const [unidade, setUnidade] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [fotoAtual, setFotoAtual] = useState(null);

  // Busca as fotos da unidade
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await unidadesService.getById(id);

        setUnidade(data);
        setFotos(data.fotos || []);
        selecionarUnidade(data.id);
      } catch (err) {
        setError("Não foi possível carregar a galeria desta unidade.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      carregarDados();
    }
  }, [id, selecionarUnidade]);

  // Abrir lightbox
  const abrirLightbox = (foto) => {
    setFotoAtual(foto);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Previne scroll
  };

  // Fechar lightbox
  const fecharLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setFotoAtual(null), 300);
    document.body.style.overflow = "unset";
  };

  // Navegação entre as fotos
  const navegarFoto = (direcao) => {
    if (!fotoAtual) return;
    const indiceAtual = fotos.findIndex((f) => f.id === fotoAtual.id);
    const novoIndice =
      direcao === "prev"
        ? (indiceAtual - 1 + fotos.length) % fotos.length
        : (indiceAtual + 1) % fotos.length;
    setFotoAtual(fotos[novoIndice]);
  };

  // Fechar com tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && lightboxOpen) {
        fecharLightbox();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [lightboxOpen]);

  // Tela de Erro da API
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-areia/20">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-red-100">
          <h2 className="text-2xl font-bold text-tinta mb-2">
            Ops! Algo deu errado.
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
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

  // Tela de Carregamento
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-areia/20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-petroleo border-t-transparent"></div>
      </div>
    );
  }

  // Nenhuma foto cadastrada
  if (!loading && fotos.length === 0) {
    return (
      <div className="min-h-screen bg-areia/20 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-tinta font-medium">Galeria</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-areia/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-areia-escura"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-tinta mb-3">
              Galeria de Fotos
            </h2>
            <p className="text-gray-600 mb-6">
              Em breve teremos fotos desta unidade para você conhecer melhor
              nosso ambiente e pratos.
            </p>
            <Link
              to={`/unidade/${unidade.id}`}
              className="text-teal-petroleo font-medium hover:underline"
            >
              ← Voltar para a página da unidade
            </Link>
          </div>
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
          <span className="text-tinta font-medium">Galeria de Fotos</span>
        </nav>

        {/* Header da Galeria */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-tinta mb-3">
            Galeria de Fotos
          </h1>
          <p className="text-gray-600 text-lg">
            Conheça nosso ambiente, pratos e momentos especiais na unidade{" "}
            <strong>{unidade.nome}</strong>
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-petroleo border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* Grid de Fotos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {fotos.map((foto, index) => (
                <div
                  key={foto.id}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${index % 3 === 0 ? "row-span-2" : ""}`}
                  onClick={() => abrirLightbox(foto)}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Imagem */}
                  <div
                    className={`relative overflow-hidden ${index % 3 === 0 ? "h-full min-h-96" : "aspect-square"}`}
                  >
                    <img
                      src={foto.url}
                      alt={foto.legenda}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay com gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-tinta/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Ícone de zoom */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg
                          className="w-6 h-6 text-tinta"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Legenda */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium line-clamp-2">
                        {foto.legenda}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contador de fotos */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              {fotos.length} {fotos.length === 1 ? "foto" : "fotos"} disponíveis
            </div>
          </>
        )}

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

      {/* LIGHTBOX/MODAL - Visualização Ampliada */}
      {lightboxOpen && fotoAtual && (
        <div
          className="fixed inset-0 z-50 bg-tinta/95 backdrop-blur-sm flex items-center justify-center"
          onClick={fecharLightbox}
          style={{
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          {/* Botão Fechar */}
          <button
            onClick={fecharLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50"
            aria-label="Fechar visualização"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Botão Anterior */}
          {fotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navegarFoto("prev");
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50"
              aria-label="Foto anterior"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Imagem Ampliada */}
          <div
            className="max-w-5xl max-h-[85vh] px-4"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "scaleIn 0.3s ease-out",
            }}
          >
            <img
              src={fotoAtual.url}
              alt={fotoAtual.legenda}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            {fotoAtual.legenda && (
              <p className="text-white text-center mt-4 text-lg font-medium">
                {fotoAtual.legenda}
              </p>
            )}
          </div>

          {/* Botão Próxima */}
          {fotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navegarFoto("next");
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-50"
              aria-label="Próxima foto"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Contador de posição */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white text-sm font-medium">
              {fotos.findIndex((f) => f.id === fotoAtual.id) + 1} /{" "}
              {fotos.length}
            </span>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
