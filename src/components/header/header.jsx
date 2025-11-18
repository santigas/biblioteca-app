import { Link } from 'react-router-dom';
import './header.css'; 

const Header = () => {
  return (
    <header className="simple-header">
      <div className="header-logo">
        {/* O Link agora envolve a Logo e o Título */}
        <Link to="/">
          {/* A SUA LOGO (Livro Aberto + Marcador) */}
          <svg 
              width="30" 
              height="30" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="header-logo-svg" /* Classe para estilizar o SVG */
          >
              <path 
                  className="logo-book"
                  d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V22H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v5" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
              />
              <path 
                  className="logo-bookmark"
                  d="M16 2V11L12 9L8 11V2H16Z" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
              />
          </svg>
          {/* O nome do site atualizado */}
          <h1>Shelf</h1>
        </Link>
      </div>
      <nav className="header-nav">
        <ul>
          {/* Link do Catálogo (correto) */}
          <li><Link to="/catalogo">Início</Link></li> 
          
          {/* Link da Estante (correto) */}
          <li><Link to="/estante">Estante</Link></li> 
        </ul>
      </nav>
    </header>
  );
}

export default Header;