export default function Footer() {
  return (
    <footer className="bg-tinta text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Maresia Frutos do Mar
            </h3>
            <p className="text-gray-300">O melhor da culinária marítima</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-areia transition"
              >
                Instagram
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-areia transition"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-300">contato@maresia.com.br</p>
            <p className="text-gray-300">(11) 99999-9999</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2026 Maresia Frutos do Mar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
