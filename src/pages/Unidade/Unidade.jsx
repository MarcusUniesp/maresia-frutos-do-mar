import { useParams, Link } from "react-router-dom";
import { useContext, useMemo, useEffect } from "react";
import UnidadesContext from "../../contexts/UnidadesContext";

export default function Unidade() {
  const { id } = useParams();
  const { unidades, selecionarUnidade } = useContext(UnidadesContext);

  const unidade = useMemo(() => {
    const idNumerico = Number(id);
    // Tenta achar no context
    return unidades.find((u) => u.id === idNumerico);
  }, [id, unidades]);

  // useEffect mínimo para garantir que o context global saiba qual unidade está ativa
  useEffect(() => {
    if (unidade) {
      selecionarUnidade(unidade.id);
    }
  }, [unidade.id, selecionarUnidade, unidade]);

  // Se no context e no mock o resultado for nulo, exibe erro
  if (!unidade) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-areia/20">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-tinta mb-2">
            Unidade não encontrada
          </h2>
          <p className="text-gray-500 mb-6">
            A unidade que você procura não existe ou foi removida.
          </p>
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
    <div className="min-h-screen bg-areia/20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex text-sm text-gray-500">
          <Link to="/" className="hover:text-teal-petroleo transition-colors">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="text-tinta font-medium">{unidade.nome}</span>
        </nav>
      </div>

      {/* Hero Banner da Unidade */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={
            unidade.fotos[0]?.url ||
            "https://via.placeholder.com/800x400?text=Sem+imagem"
          }
          alt={`Foto da ${unidade.nome}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tinta/80 via-tinta/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
            {unidade.nome}
          </h1>
          <p className="text-areia text-lg flex items-center gap-2">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {unidade.endereco}
          </p>
        </div>
      </section>

      {/* Barra de Informações Rápidas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-petroleo/10 rounded-lg">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Telefone
              </p>
              <p className="text-tinta font-medium mt-1">{unidade.telefone}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-petroleo/10 rounded-lg">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Horário
              </p>
              <p className="text-tinta font-medium mt-1">{unidade.horario}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-petroleo/10 rounded-lg">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Status
              </p>
              <p className="text-green-600 font-medium mt-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Aberto agora
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Unidade */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-tinta mb-4">
            Sobre esta unidade
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {unidade.descricao}
          </p>
        </div>
      </section>

      {/* Grid de Ações Rápidas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-tinta mb-6">
          O que você deseja fazer?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to={`/unidade/${unidade.id}/cardapio`}
            className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-petroleo/30 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-areia rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-petroleo transition-colors duration-300">
              <svg
                className="w-6 h-6 text-tinta group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-tinta mb-2 group-hover:text-teal-petroleo transition-colors">
              Ver Cardápio
            </h3>
            <p className="text-sm text-gray-500">
              Confira nossos pratos e bebidas em PDF.
            </p>
          </Link>

          <Link
            to={`/unidade/${unidade.id}/galeria`}
            className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-petroleo/30 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-areia rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-petroleo transition-colors duration-300">
              <svg
                className="w-6 h-6 text-tinta group-hover:text-white transition-colors duration-300"
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
            <h3 className="text-lg font-bold text-tinta mb-2 group-hover:text-teal-petroleo transition-colors">
              Galeria de Fotos
            </h3>
            <p className="text-sm text-gray-500">
              Conheça nosso ambiente e pratos.
            </p>
          </Link>

          <Link
            to={`/unidade/${unidade.id}/localizacao`}
            className="group bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-petroleo/30 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-areia rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-petroleo transition-colors duration-300">
              <svg
                className="w-6 h-6 text-tinta group-hover:text-white transition-colors duration-300"
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
            <h3 className="text-lg font-bold text-tinta mb-2 group-hover:text-teal-petroleo transition-colors">
              Localização
            </h3>
            <p className="text-sm text-gray-500">
              Veja no mapa e trace sua rota.
            </p>
          </Link>

          <Link
            to="/reservar"
            className="group bg-teal-petroleo p-6 rounded-xl shadow-sm hover:shadow-md hover:bg-teal-escuro transition-all duration-300"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Reservar Mesa</h3>
            <p className="text-sm text-white/80">
              Agende sua visita pelo Get In.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
