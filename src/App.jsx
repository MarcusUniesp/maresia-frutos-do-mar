import { BrowserRouter /* Routes, Route */ } from "react-router-dom";
import { UnidadesProvider } from "./contexts/UnidadesContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
/* import Home from "./pages/Home";
import Unidade from "./pages/Unidade";
import Cardapio from "./pages/Cardapio";
import Galeria from "./pages/Galeria";
import Localizacao from "./pages/Localizacao";
import Contato from "./pages/Contato";
import Reserva from "./pages/Reserva"; */

function App() {
  return (
    <BrowserRouter>
      <UnidadesProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          {/* <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/unidade/:id" element={<Unidade />} />
              <Route path="/unidade/:id/cardapio" element={<Cardapio />} />
              <Route path="/unidade/:id/galeria" element={<Galeria />} />
              <Route
                path="/unidade/:id/localizacao"
                element={<Localizacao />}
              />
              <Route path="/contato" element={<Contato />} />
              <Route path="/reservar" element={<Reserva />} />
            </Routes>
          </main> */}
          <Footer />
        </div>
      </UnidadesProvider>
    </BrowserRouter>
  );
}

export default App;
