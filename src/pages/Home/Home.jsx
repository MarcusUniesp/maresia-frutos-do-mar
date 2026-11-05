import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UnidadesContext from "../../contexts/UnidadesContext";
import Loading from "../../components/common/Loading";

export default function Home() {
  const { unidades, loading, error, selecionarUnidade } =
    useContext(UnidadesContext);
  const [unidadeHover, setUnidadeHover] = useState(null);

  const unidadesExibir = unidades;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-areia/30">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-tinta mb-4">
            Erro ao carregar unidades
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-petroleo to-teal-escuro text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-areia rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-areia-escura rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bem-vindo ao <span className="text-areia">Maresia</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Frutos do Mar com o sabor autêntico do oceano. Selecione uma
              unidade abaixo para conhecer nosso cardápio e fazer sua reserva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#unidades"
                className="bg-areia text-tinta px-8 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver Unidades
              </a>
              <Link
                to="/reservar"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-petroleo transition-all duration-300"
              >
                Reservar Mesa
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#E7D9B8"
              fillOpacity="0.3"
            />
          </svg>
        </div>
      </section>

      {/* Unidades */}
      <section id="unidades" className="py-20 bg-areia/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-tinta mb-4">
              Nossas Unidades
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Escolha a unidade mais próxima de você e descubra o melhor da
              nossa culinária
            </p>
            <div className="w-24 h-1 bg-teal-petroleo mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unidadesExibir.map((unidade) => (
              <Link
                key={unidade.id}
                to={`/unidade/${unidade.id}`}
                onClick={() => selecionarUnidade(unidade.id)}
                onMouseEnter={() => setUnidadeHover(unidade.id)}
                onMouseLeave={() => setUnidadeHover(null)}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Imagem da unidade */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      unidade.fotos[0]?.url ||
                      "https://via.placeholder.com/800x400?text=Sem+imagem"
                    }
                    alt={unidade.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Badge de especialidade */}
                  {unidade.especialidade && (
                    <div className="absolute top-4 right-4 bg-teal-petroleo text-white px-3 py-1 rounded-full text-sm font-medium">
                      {unidade.especialidade}
                    </div>
                  )}

                  {/* Ícone de localização */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
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
                    <span className="text-sm font-medium">
                      {unidade.endereco}
                    </span>
                  </div>
                </div>

                {/* Conteúdo do card */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-tinta mb-2 group-hover:text-teal-petroleo transition-colors">
                    {unidade.nome}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {unidade.descricao}
                  </p>

                  {/* Informações de contato */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{unidade.telefone}</span>
                    </div>

                    {/* Seta animada */}
                    <div
                      className={`transform transition-transform duration-300 ${unidadeHover === unidade.id ? "translate-x-1" : ""}`}
                    >
                      <svg
                        className="w-5 h-5 text-teal-petroleo"
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
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques/Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-tinta mb-4">
              Por que escolher o Maresia?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mais de 10 anos servindo o melhor da culinária marítima
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-teal-petroleo/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-petroleo transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-teal-petroleo group-hover:text-white transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-tinta mb-3">
                Ingredientes Frescos
              </h3>
              <p className="text-gray-600">
                Pescados e frutos do mar selecionados diariamente, garantindo
                frescor e qualidade em cada prato.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-teal-petroleo/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-petroleo transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-teal-petroleo group-hover:text-white transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-tinta mb-3">
                Receitas Exclusivas
              </h3>
              <p className="text-gray-600">
                Pratos criados por nossos chefs com técnicas tradicionais e
                toques contemporâneos únicos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-teal-petroleo/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-petroleo transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-teal-petroleo group-hover:text-white transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-tinta mb-3">
                Ambiente Aconchegante
              </h3>
              <p className="text-gray-600">
                Espaços cuidadosamente projetados para proporcionar experiências
                memoráveis em cada visita.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Reserva */}
      <section className="py-20 bg-gradient-to-r from-teal-petroleo to-teal-escuro text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para uma experiência gastronômica única?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Reserve sua mesa agora e garanta o melhor atendimento
          </p>
          <Link
            to="/reservar"
            className="inline-block bg-areia text-tinta px-10 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Fazer Reserva
          </Link>
        </div>
      </section>
    </div>
  );
}
