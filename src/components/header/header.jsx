
import { Link } from 'react-router-dom';
import './header.css'; 

const Header = () => {
  return (
    <header className="simple-header">
      <div className="header-logo">
        <h1>Livraria</h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li><Link to="/">Início</Link></li>
          {/* REMOVIDO: <li><Link to="/cadastro">Cadastro</Link></li> */}
          {/* NOVO: Link renomeado para "Estante" */}
          <li><Link to="/estante">Estante</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;