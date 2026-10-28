import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import UnidadesContext from "../../contexts/UnidadesContext";

export default function Header() {
  const location = useLocation();
  const { unidadeSelecionada } = useContext(UnidadesContext);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-teal-petroleo font-semibold"
      : "text-tinta hover:text-teal-petroleo";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/src/assets/images/logo-header.svg"
              alt="Maresia Frutos do Mar"
              className="h-12"
            />
          </Link>

          <nav className="hidden md:flex space-x-8">
            {unidadeSelecionada && (
              <>
                <Link
                  to={`/unidade/${unidadeSelecionada.id}/cardapio`}
                  className={isActive(
                    `/unidade/${unidadeSelecionada.id}/cardapio`,
                  )}
                >
                  Cardápio
                </Link>
                <Link
                  to={`/unidade/${unidadeSelecionada.id}/galeria`}
                  className={isActive(
                    `/unidade/${unidadeSelecionada.id}/galeria`,
                  )}
                >
                  Galeria
                </Link>
                <Link
                  to={`/unidade/${unidadeSelecionada.id}/localizacao`}
                  className={isActive(
                    `/unidade/${unidadeSelecionada.id}/localizacao`,
                  )}
                >
                  Localização
                </Link>
              </>
            )}
            <Link to="/contato" className={isActive("/contato")}>
              Contato
            </Link>
            <Link
              to="/reservar"
              className="bg-teal-petroleo text-white px-4 py-2 rounded-lg hover:bg-teal-escuro transition"
            >
              Reservar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
