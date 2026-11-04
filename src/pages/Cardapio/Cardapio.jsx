import { useParams, Link } from "react-router-dom";
import { useContext, useMemo, useEffect } from "react";
import UnidadesContext from "../../contexts/UnidadesContext";

//! Dados mockados (serão substituídos pela API)
const unidadesMock = [
  {
    id: 1,
    nome: "Maresia - Unidade Centro",
    cardapioPdf: "/public/pdfs/centro.pdf",
    telefone: "(11) 3456-7890",
  },
  {
    id: 2,
    nome: "Maresia - Unidade Beach",
    cardapioPdf: "/public/pdfs/ponta-negra.pdf",
    telefone: "(11) 2345-6789",
  },
  {
    id: 3,
    nome: "Maresia - Unidade Mall",
    cardapioPdf: null, // Simulando arquivo indisponível
    telefone: "(11) 4567-8901",
  },
];

export default function Cardapio() {
  const { id } = useParams();
  const { unidades, selecionarUnidade } = useContext(UnidadesContext);

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

  // Se a unidade não for encontrada
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

  // Arquivo indisponível
  if (!unidade.cardapioPdf) {
    return (
      <div className="min-h-screen bg-areia/20 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-tinta font-medium">Cardápio</span>
          </nav>

          {/* Card de Erro */}
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
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
              Cardápio temporariamente indisponível
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Estamos atualizando as delícias do nosso cardápio na unidade{" "}
              <strong>{unidade.nome}</strong>. Enquanto isso, você pode fazer
              seu pedido ou tirar dúvidas diretamente pelo nosso telefone ou
              WhatsApp.
            </p>
            <a
              href={`https://wa.me/5511999999999?text=Olá, gostaria de saber mais sobre o cardápio da unidade ${encodeURIComponent(unidade.nome)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Chamar no WhatsApp
            </a>
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

  // Cardápio disponível
  return (
    <div className="min-h-screen bg-areia/20 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <span className="text-tinta font-medium">Cardápio</span>
        </nav>

        {/* Card Principal do Cardápio */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Topo decorativo */}
          <div className="bg-gradient-to-r from-teal-petroleo to-teal-escuro p-8 md:p-10 text-white">
            <div className="flex items-start gap-6">
              <div className="w-16 h-20 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Cardápio Digital
                </h1>
                <p className="text-white/90 text-lg">{unidade.nome}</p>
                <p className="text-white/70 text-sm mt-2 flex items-center gap-2">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Formato PDF • Atualizado recentemente
                </p>
              </div>
            </div>
          </div>

          {/* Corpo do Card com Ações */}
          <div className="p-8 md:p-10">
            <p className="text-gray-600 mb-8 leading-relaxed">
              Confira nossas opções de entradas, pratos principais, sobremesas e
              bebidas. O arquivo será aberto em uma nova aba para sua
              comodidade, permitindo também o download para consulta offline.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Botão Principal */}
              <a
                href={unidade.cardapioPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-teal-petroleo text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-teal-escuro transition-all duration-300 shadow-sm hover:shadow-md flex-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Abrir Cardápio (Nova Aba)
              </a>

              {/* Botão Secundário para Download */}
              <a
                href={unidade.cardapioPdf}
                download
                className="inline-flex items-center justify-center gap-2 bg-white text-tinta border border-gray-200 px-6 py-3.5 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Baixar PDF
              </a>
            </div>

            {/* Dica de usabilidade */}
            <div className="mt-8 p-4 bg-areia/30 rounded-lg border border-areia flex items-start gap-3">
              <svg
                className="w-5 h-5 text-areia-escura flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-areia-escura">
                <strong>Dica:</strong> Se o PDF não abrir automaticamente,
                verifique se o seu navegador não bloqueou pop-ups. Você também
                pode salvar o arquivo no seu celular para consultar sem
                internet.
              </p>
            </div>
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
