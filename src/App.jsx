import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx"; // ← Adicione esta linha
import Home from "./pages/Home.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Listagem from "./pages/Listagem.jsx";

function App() {
  return (
    <Router>
      <Header /> {/* ← Fica fixo em todas as páginas */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/listagem" element={<Listagem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
