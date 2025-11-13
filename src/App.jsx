import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx"; 
import Home from "./pages/Home.jsx";
// NOVO: Importa o componente Apresentacao
import Apresentacao from "./pages/Apresentacao.jsx"; 
import Estante from "./pages/Estante.jsx"; 
// REMOVIDO: import Cadastro from "./pages/Cadastro.jsx";

function App() {
  return (
    <Router>
      <Header /> 
      <div className="container mt-4">
        <Routes>
          {/* Rota para o Início (mantendo Home.jsx original) */}
          <Route path="/" element={<Home />} /> 
          {/* Rota para a nova página de Apresentação */}
          <Route path="/apresentacao" element={<Apresentacao />} />
          <Route path="/estante" element={<Estante />} />
          {/* REMOVIDO: <Route path="/cadastro" element={<Cadastro />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App; 