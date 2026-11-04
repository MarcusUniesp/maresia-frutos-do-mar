import { Link } from "react-router-dom";

export default function Reserva() {
  // Link oficial do Get In
  const getInUrl = "https://restaurante.getin.app/";

  return (
    <div className="min-h-screen bg-areia/20 py-12 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8 justify-center">
          <Link to="/" className="hover:text-teal-petroleo transition-colors">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="text-tinta font-medium">Reservar Mesa</span>
        </nav>

        {/* Card Principal de Redirecionamento */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 md:p-14 text-center animate-fadeIn">
          {/* Ícone Decorativo */}
          <div className="w-20 h-20 bg-teal-petroleo/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-teal-petroleo"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-tinta mb-4">
            Reserve sua Mesa
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Para garantir a melhor experiência e confirmar a disponibilidade em
            tempo real, nosso sistema de agendamentos é gerenciado com segurança
            pela plataforma
            <strong className="text-teal-petroleo"> Get In</strong>.
          </p>

          {/* Botão de Ação Principal */}
          <a
            href={getInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-teal-petroleo text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-escuro transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full md:w-auto"
          >
            <span>Ir para o Sistema de Reservas</span>
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
          </a>

          <p className="text-xs text-gray-400 mt-6">
            Você será redirecionado para uma aba segura do Get In.
          </p>
        </div>

        {/* Fluxo de Exceção */}
        <div className="mt-8 bg-white rounded-xl border border-areia p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-areia/50 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-areia-escura"
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
            <div>
              <h4 className="font-bold text-tinta">
                Sistema Get In indisponível?
              </h4>
              <p className="text-sm text-gray-600">
                Sem problemas! Faça sua reserva diretamente pelo nosso WhatsApp.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/5511999999999?text=Olá, gostaria de fazer uma reserva no Maresia."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-green-700 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Reservar via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
