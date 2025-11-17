import { Link } from 'react-router-dom';
import './header.css'; 

const Header = () => {
  return (
    <header className="simple-header">
      <div className="header-logo">
        {/* MUDANÇA: O Logo agora aponta para a página de Apresentação ("/") */}
        <h1><Link to="/">Livraria</Link></h1>
      </div>
      <nav className="header-nav">
        <ul>
          {/* MUDANÇA: O link "Início" agora aponta para "/catalogo" (onde está a Home) */}
          <li><Link to="/catalogo">Início</Link></li> 
          
          {/* Mantém o link da Estante */}
          <li><Link to="/estante">Estante</Link></li> 
        </ul>
      </nav>
    </header>
  );
}

export default Header;