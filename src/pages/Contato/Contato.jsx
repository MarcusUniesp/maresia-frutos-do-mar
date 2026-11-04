import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpa o erro do campo assim que o usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validação dos campos obrigatórios
  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.nome.trim()) {
      novosErros.nome = "O nome é obrigatório.";
    }

    if (!formData.email.trim()) {
      novosErros.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      novosErros.email = "Por favor, insira um e-mail válido.";
    }

    if (!formData.mensagem.trim()) {
      novosErros.mensagem = "A mensagem é obrigatória.";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Envio do formulário (abre o cliente de e-mail)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    // Constrói o link do mailto:
    const assunto = encodeURIComponent(`Contato via Site - ${formData.nome}`);
    const corpo = encodeURIComponent(
      `Nome: ${formData.nome}\n` +
        `E-mail: ${formData.email}\n` +
        `Telefone: ${formData.telefone || "Não informado"}\n\n` +
        `Mensagem:\n${formData.mensagem}`,
    );

    const mailtoLink = `mailto:contato@maresia.com.br?subject=${assunto}&body=${corpo}`;

    // Abre o cliente de e-mail
    window.open(mailtoLink, "_blank");

    // Feedback visual de sucesso
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-areia/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-teal-petroleo transition-colors">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="text-tinta font-medium">Contato</span>
        </nav>

        {/* Header da Página */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-tinta mb-3">
            Fale Conosco
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou elogio? Estamos aqui para ouvir você.
            Preencha o formulário abaixo ou entre em contato pelos nossos canais
            diretos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Informações de Contato */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-teal-petroleo rounded-2xl shadow-lg p-8 text-white h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Informações de Contato
                </h2>

                <div className="space-y-6">
                  {/* E-mail */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-1">E-mail</p>
                      <a
                        href="mailto:contato@maresia.com.br"
                        className="font-medium hover:text-areia transition-colors"
                      >
                        contato@maresia.com.br
                      </a>
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-1">Telefone</p>
                      <p className="font-medium">(11) 99999-9999</p>
                    </div>
                  </div>

                  {/* Endereço */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-1">
                        Endereço Principal
                      </p>
                      <p className="font-medium">
                        Rua das Palmeiras, 123
                        <br />
                        Centro, São Paulo - SP
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="mt-10 pt-8 border-t border-white/20">
                <p className="text-sm text-white/70 mb-4">Siga-nos nas redes sociais</p>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-areia hover:text-tinta rounded-lg flex items-center justify-center transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-areia hover:text-tinta rounded-lg flex items-center justify-center transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              {/* Mensagem de Sucesso */}
              {enviado && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-fadeIn">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-green-800 font-medium">
                      Seu cliente de e-mail foi aberto!
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      Basta clicar em "Enviar" no seu aplicativo de e-mail para
                      finalizar o contato.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome e E-mail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-tinta mb-2"
                    >
                      Nome completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.nome ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-teal-petroleo focus:border-teal-petroleo"} focus:ring-2 focus:outline-none transition-all`}
                    />
                    {errors.nome && (
                      <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
                    )}
                  </div>

                  {/* E-mail */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-tinta mb-2"
                    >
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-teal-petroleo focus:border-teal-petroleo"} focus:ring-2 focus:outline-none transition-all`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Telefone */}
                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-tinta mb-2"
                  >
                    Telefone{" "}
                    <span className="text-gray-400 text-xs font-normal">
                      (opcional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-teal-petroleo focus:border-teal-petroleo focus:ring-2 focus:outline-none transition-all"
                  />
                </div>

                {/* Mensagem */}
                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-sm font-medium text-tinta mb-2"
                  >
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Como podemos te ajudar?"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.mensagem ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-200 focus:ring-teal-petroleo focus:border-teal-petroleo"} focus:ring-2 focus:outline-none transition-all resize-none`}
                  ></textarea>
                  {errors.mensagem && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.mensagem}
                    </p>
                  )}
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  className="w-full bg-teal-petroleo text-white font-semibold py-3.5 rounded-lg hover:bg-teal-escuro transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Enviar Mensagem
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Ao enviar, seu aplicativo de e-mail padrão será aberto com as
                  informações preenchidas.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
