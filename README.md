# 🌊 Maresia Frutos do Mar - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Sistema web moderno e responsivo para gerenciamento e exibição de informações de um restaurante com múltiplas unidades.**

## 📖 Sobre o Projeto

O **Maresia Frutos do Mar** é um projeto acadêmico desenvolvido com foco em boas práticas de desenvolvimento frontend, usabilidade (UX/UI) e performance. O sistema permite que clientes visualizem informações detalhadas das unidades do restaurante, incluindo cardápio em PDF, galeria de fotos, localização com mapa interativo e canais de contato/reserva.

Este repositório contém a camada de **Frontend** da aplicação, utilizando uma arquitetura de componentes reutilizáveis e um design system customizado inspirado no [Untitled UI](https://www.untitledui.com/react/docs/introduction).

## ✨ Funcionalidades Principais

- **Seleção de Unidades:** Interface intuitiva para escolher entre as diferentes unidades do restaurante.
- **Cardápio Digital:** Visualização e download do cardápio em formato PDF, com tratamento para arquivos indisponíveis.
- **Galeria de Fotos:** Grid responsivo de imagens com efeito _lightbox_ (ampliação em modal) e animações suaves.
- **Localização Interativa:** Integração com OpenStreetMap e botões de ação rápida para Google Maps e Waze.
- **Redes Sociais:** Links diretos para perfis oficiais, abrindo em nova aba para preservar a navegação.
- **Reserva de Mesa:** Redirecionamento seguro e bem explicado para a plataforma externa _Get In_, com plano de contingência (WhatsApp) em caso de indisponibilidade.
- **Formulário de Contato:** Validação de campos em tempo real e integração nativa com o cliente de e-mail do usuário (`mailto:`).

## 🎨 Design System e Paleta de Cores

O projeto utiliza **Tailwind CSS** com uma paleta de cores customizada, pensada para transmitir sofisticação e a identidade de um restaurante de frutos do mar:

| Cor               | Hex Code  | Uso Principal                                    |
| :---------------- | :-------- | :----------------------------------------------- |
| **Teal Petróleo** | `#0E5C63` | Cor primária, botões de ação (CTA), destaques    |
| **Teal Escuro**   | `#0B474D` | Estados de hover e elementos secundários         |
| **Areia**         | `#E7D9B8` | Fundos claros, badges e elementos de suporte     |
| **Areia Escura**  | `#7A6A45` | Textos secundários e bordas sutis                |
| **Tinta**         | `#1C2321` | Textos principais e fundos de contraste (Footer) |

## 🛠️ Tecnologias Utilizadas

- **Core:** React 18, Vite
- **Estilização:** Tailwind CSS
- **Roteamento:** React Router DOM (SPA)
- **Requisições HTTP:** Axios
- **Gerenciamento de Estado:** Context API
- **Ícones:** SVGs inline
- **Mapas:** OpenStreetMap (via iframe)

## 🚀 Execução do Projeto

Siga os passos abaixo para rodar o projeto em sua máquina:

### 1. Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) e o [npm](https://www.npmjs.com/) instalados.

### 2. Clonagem do repositório e execução

```bash
git clone https://github.com/MarcusUniesp/maresia-frutos-do-mar.git
cd maresia-frutos-do-mar/frontend
npm install
npm run dev
```

## 👥 Equipe de Desenvolvimento

| Nome                | Função                           | Matrícula     |
| :------------------ | :------------------------------- | :------------ |
| **Marcus Vinicius** | Desenvolvedor Frontend & Backend | 2024210220057 |
