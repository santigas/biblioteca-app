import React from "react";
import { Link } from "react-router-dom"; 
import "./apresentacao.css"; 

export default function Apresentacao() {
  return (
    <div className="apresentacao-page">
      <main className="apresentacao-container">

        {/* Seção Hero: A primeira coisa que o usuário vê */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Bem-vindo ao Livraria Pessoal!</h1>
            <p className="subtitle">
              Sua jornada literária digital começa aqui.
            </p>
            <Link to="/" className="call-to-action-button">
              Comece Sua Estante Agora!
            </Link>
          </div>
        </section>

        {/* Seção de Boas-vindas/Sobre o Projeto (Detalhes) */}
        <section className="about-section">
          <div className="about-content">
            {/* Título menor e mais bonito */}
            <h2 className="section-heading">Explore seu Universo de Histórias</h2>
            <div className="about-grid">
                {/* TEXTO COMPACTADO */}
                <div className="about-text">
                    <p>
                      Nosso site nasceu com um objetivo claro: **simplificar e enriquecer a forma como você interage com seus livros.** Somos mais do que um catálogo; somos a sua estante pessoal digital.
                    </p>
                    <p>
                      Aqui, você pode gerenciar sua coleção, acompanhar o progresso de leitura (de "Quero ler" a "Lido") e manter sua paixão por livros organizada e acessível em qualquer lugar.
                    </p>
                    <p>
                      Explore nosso **Catálogo** (em "Início") ou vá para a **Estante** e comece a construir a sua coleção de livros hoje mesmo!
                    </p>
                </div>
                {/* Imagem adicionada à seção "Sobre" */}
                <div className="about-image-wrapper">
                    <img 
                        src="https://images.unsplash.com/photo-1549673926-d626801c804f?q=80&w=2070&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D" 
                        alt="Pessoa lendo um livro em uma livraria" 
                        className="about-image" 
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Seção de Recursos */}
        <section className="features-section">
            <h2 className="section-heading">Por que escolher o Livraria Pessoal?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>Organização Intuitiva</h3>
                    <p>Mantenha seus livros organizados por status: Quero Ler, Lendo, Lido, etc.</p>
                </div>
                <div class="feature-card">
                    <h3>Descoberta de Títulos</h3>
                    <p>Explore nosso catálogo e encontre sua próxima grande leitura.</p>
                </div>
                <div class="feature-card">
                    <h3>Acesso em Qualquer Lugar</h3>
                    <p>Sua estante digital está sempre com você, em qualquer dispositivo.</p>
                </div>
            </div>
        </section>

        {/* Nova seção com outra imagem e chamada para ação */}
        <section className="cta-image-section">
            <div className="cta-content">
                <h2>Pronto para Começar?</h2>
                <p>Sua estante digital está a um clique de distância.</p>
                <Link to="/estante" className="call-to-action-button secondary">
                    Ver Minha Estante
                </Link>
            </div>
        </section>

      </main>

      <footer className="footer">
        <p>&copy; 2025 Livraria Pessoal. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}