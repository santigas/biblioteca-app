import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// MUDANÇA AQUI: Corrigido de "Header.jsx" para "header.jsx" (h minúsculo)
import Header from "./components/header/header.jsx"; 
import Home from "./pages/Home.jsx";
import Estante from "./pages/Estante.jsx"; 
import Apresentacao from "./pages/apresentacao.jsx";

function App() {
  return (
    <Router>
      <Header /> 
        <div className="container mt-4">
        <Routes>
        {/* A rota "/" (principal) agora carrega a Apresentacao */}
        <Route path="/" element={<Apresentacao />} />

        {/* A Home (catálogo) passa para a rota "/catalogo" */}
        <Route path="/catalogo" element={<Home />} />
        <Route path="/estante" element={<Estante />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;