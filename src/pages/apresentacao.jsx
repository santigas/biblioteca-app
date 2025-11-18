import React from "react";
import { Link } from "react-router-dom"; 
import "./apresentacao.css"; 

export default function Apresentacao() {
  return (
    <div className="apresentacao-wrapper"> 
      <main className="apresentacao-container">

        {/* --- 1. Seção Hero: O Logo e o Nome --- */}
        <section className="hero-section">
          
          {/* --- A SUA LOGO CORRETA (Livro Aberto + Marcador) --- */}
          <div className="hero-logo">
            <svg 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* O Livro (Contorno Cinza) */}
                <path 
                    className="logo-book"
                    d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V22H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v5" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
                {/* O Marcador (Preenchido de Amarelo) */}
                <path 
                    className="logo-bookmark"
                    d="M16 2V11L12 9L8 11V2H16Z" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
          </div>
          {/* --- FIM DA LOGO --- */}

          <h1 className="hero-title">Shelf</h1>
          <p className="hero-subtitle">
            A sua estante digital, redefinida.
          </p>
          {/* BOTÃO "Comece a organizar" REMOVIDO DAQUI */}
        </section>

        {/* --- 2. Seção de Funcionalidades --- */}
        <section className="features-section">
          <h2 className="section-heading">Tudo o que você precisa. Em um só lugar.</h2>
          
          <div className="features-grid">
            
            {/* Funcionalidade 1: Explore */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <h3>Explore</h3>
              <p>Descubra milhares de livros, HQs e revistas através do nosso catálogo integrado.</p>
            </div>

            {/* Funcionalidade 2: Organize */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><path d="M12 10v6m-3-3h6"></path></svg>
              </div>
              <h3>Organize</h3>
              <p>Adicione qualquer livro à sua estante pessoal com um único clique no botão "+".</p>
            </div>

            {/* Funcionalidade 3: Filtre */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              </div>
              <h3>Filtre</h3>
              <p>Gestão de status (Lido, Lendo), favoritos, itens salvos e muito mais. A sua estante, as suas regras.</p>
            </div>

          </div>
        </section>

        {/* --- 3. Seção de CTA (Chamada para Ação) Final --- */}
        <section className="cta-section">
          <h2>Pronto para construir a sua coleção?</h2>
          <div className="cta-buttons">
            <Link to="/catalogo" className="cta-button primary">
              Explorar Catálogo
            </Link>
            <Link to="/estante" className="cta-button secondary">
              Ver Minha Estante
            </Link>
          </div>
        </section>

      </main>

      <footer className="footer">
        <p>&copy; 2025 Shelf. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}