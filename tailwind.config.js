/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "teal-petroleo": "#0E5C63",
        "teal-escuro": "#0B474D",
        areia: "#E7D9B8",
        "areia-escura": "#7A6A45",
        tinta: "#1C2321",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
