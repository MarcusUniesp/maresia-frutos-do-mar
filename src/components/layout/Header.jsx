import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import UnidadesContext from "../../contexts/UnidadesContext";

export default function Header() {
  const location = useLocation();
  const { unidadeSelecionada } = useContext(UnidadesContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-teal-petroleo font-semibold border-b-2 border-teal-petroleo"
      : "text-tinta hover:text-teal-petroleo transition-colors";
  };

  const navLinks = unidadeSelecionada
    ? [
        {
          path: `/unidade/${unidadeSelecionada.id}/cardapio`,
          label: "Cardápio",
        },
        { path: `/unidade/${unidadeSelecionada.id}/galeria`, label: "Galeria" },
        {
          path: `/unidade/${unidadeSelecionada.id}/localizacao`,
          label: "Localização",
        },
        { path: "/contato", label: "Contato" },
      ]
    : [{ path: "/contato", label: "Contato" }];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img
              src="/src/assets/images/logo-header.svg"
              alt="Maresia Frutos do Mar"
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium py-2 ${isActive(link.path)}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/reservar"
              className="bg-teal-petroleo text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-teal-escuro transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Reservar
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6 text-tinta"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg ${isActive(link.path)}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/reservar"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-teal-petroleo text-white px-6 py-2.5 rounded-lg font-medium text-sm text-center hover:bg-teal-escuro transition"
              >
                Reservar
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
