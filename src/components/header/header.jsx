import './header.css'; 

const Header = () => {
  return (
    <header className="simple-header">
      <div className="header-logo">
        <h1>Livraria</h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li><a href="#home">inicio</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#cadastro">cadastro</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;