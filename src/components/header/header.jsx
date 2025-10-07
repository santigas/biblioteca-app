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
          <li><Link to="/cadastro">Cadastro</Link></li>
          <li><Link to="/listagem">Listagem</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;