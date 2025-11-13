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
          {/* Link para a página Home original (Catálogo) */}
          <li><Link to="/">Início</Link></li>
          {/* Link para a nova página de Apresentação */}
          <li><Link to="/apresentacao">Apresentação</Link></li>
          <li><Link to="/estante">Estante</Link></li>
          {/* REMOVIDO: Link para Cadastro */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;