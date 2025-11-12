// santigas/biblioteca-app/biblioteca-app-9059e10258ab4d082fa551499dc573179f3f949b/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx"; 
import Home from "./pages/Home.jsx";
// REMOVIDO: import Cadastro from "./pages/Cadastro.jsx";
// NOVO: Importa o componente Estante
import Estante from "./pages/Estante.jsx"; 

function App() {
  return (
    <Router>
      <Header /> 
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* REMOVIDO: <Route path="/cadastro" element={<Cadastro />} /> */}
          {/* NOVO: Rota para /estante */}
          <Route path="/estante" element={<Estante />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;