import React from 'react';
import "./home.css";
// O componente Header seria importado de sua pasta de componentes.
import Header from "../components/header/Header";

// --- Componente de Ícone de Estrela ---
const StarIcon = ({ filled }) => (
  <svg
    className={`star-icon ${filled ? 'filled' : ''}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// --- Dados das Dicas de Leitura ---
const readingTips = [
  {
    id: 1,
    title: 'Chainsaw Man',
    author: 'Tatsuki Fujimoto',
    rating: 5,
    description: 'A história segue Denji, um jovem pobre que se funde com Pochita e vira o Homem-Motosserra, caçando demônios para o governo',
    imageUrl: 'https://m.media-amazon.com/images/I/81tadC4LSVL._UF1000,1000_QL80_.jpg',
  },
  {
    id: 2,
    title: 'Kimetsu no Yaiba',
    author: 'Koyoharu Gotouge',
    rating: 5,
    description: 'A história segue Tanjiro Kamado, que após perder sua família para demônios e ver sua irmã virar uma deles, busca uma cura para Nezuko e vingança.',
    imageUrl: 'https://m.media-amazon.com/images/I/91YlzTkLWHL._UF1000,1000_QL80_.jpg',
  },
  {
    id: 3,
    title: 'Blue Lock',
    author: 'Muneyuki Kaneshiro',
    rating: 4,
    description: 'Blue Lock é um anime e mangá de futebol que acompanha Yoichi Isagi e outros jovens atacantes em um treinamento intenso e competitivo criado para formar o melhor centroavante do mundo.',
    imageUrl: 'https://i.ebayimg.com/images/g/84gAAOSwxMhi0tIO/s-l1200.jpg',
  },
];

// --- Componente do Card de Livro ---
const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img
        className="book-card-image"
        src={book.imageUrl}
        alt={`Capa do livro ${book.title}`}
      />
      <div className="book-card-content">
        <h3>{book.title}</h3>
        <p className="book-card-author">por {book.author}</p>
        <div className="book-card-rating">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < book.rating} />
            ))}
        </div>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

// --- Componente Principal da Página Home ---
export default function Home() {
  return (
    <div className="home-page">
     <Header/>
      <main className="home-container">
        {/* Seção de Boas-Vindas */}
        <section className="welcome-section">
          <h2>Bem-vindo ao seu universo literário!</h2>
          <p>
            Aqui você pode organizar suas leituras, descobrir novos títulos e compartilhar suas paixões com outros leitores. Explore nossas dicas e comece uma nova aventura hoje mesmo.
          </p>
        </section>

        {/* Seção de Dicas de Leitura */}
        <section>
          <h2 className="section-title">Dicas de Leitura para Você</h2>
          <div className="reading-tips-grid">
            {readingTips.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </main>

      {/* Seção de Rodapé */}
      <footer className="footer">
          <p>&copy; 2025 Clube do Livro. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}