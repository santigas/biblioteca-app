import React, { useState } from "react";
import "./home.css";

const readingTips = [
  {
    id: 1,
    title: "A Terra da Flor Azul",
    author: "Frances Hodgson Burnett",
    imageUrl: "https://m.media-amazon.com/images/I/81LtpDR0LZL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    title: "Harry Potter e a Pedra Filosofal",
    author: "J.K. Rowling",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_754630-MLU77444326845_072024-O.webp",
  },
  {
    id: 3,
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    imageUrl: "https://m.media-amazon.com/images/I/81t2CVWEsUL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 4,
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    imageUrl: "https://m.media-amazon.com/images/I/71OZNgRJ3hL.jpg",
  },
  {
    id: 5,
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    imageUrl: "https://covers.openlibrary.org/b/id/11121638-L.jpg",
  },
  {
    id: 6,
    title: "Dom Quixote",
    author: "Miguel de Cervantes",
    imageUrl: "https://covers.openlibrary.org/b/id/8101356-L.jpg",
  },
{
    id: 7,
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    imageUrl: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
  },
  {
    id: 8,
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    imageUrl: "https://covers.openlibrary.org/b/id/9251996-L.jpg",
  },
  {
    id: 9,
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    imageUrl: "https://covers.openlibrary.org/b/id/11121638-L.jpg",
  },
  {
    id: 10,
    title: "Dom Quixote",
    author: "Miguel de Cervantes",
    imageUrl: "https://covers.openlibrary.org/b/id/8101356-L.jpg",
  },
];

const BookCard = ({ book, onSave, onRead, saved, read }) => {
  return (
    <div className="bookcard">
      <img
        className="book-card-image"
        src={book.imageUrl}
        alt={`Capa do livro ${book.title}`}
      />
      <div className="book-card-content">
        <h3>{book.title}</h3>
        <p>{book.author}</p>

        <div className="book-actions">
          <button
            className={`save-btn ${saved ? "active" : ""}`}
            onClick={() => onSave(book.id)}
          >
            {saved ? "✔️ Salvo" : "🔖 Ler depois"}
          </button>

          <button
            className={`read-btn ${read ? "active" : ""}`}
            onClick={() => onRead(book.id)}
          >
            {read ? "📘 Lido" : "✅ Já li"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSave = (id) => {
    setSavedBooks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleRead = (id) => {
    setReadBooks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filteredBooks = readingTips.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <main className="home-container">
        <section className="welcome-section">
          <p>
            Salve os livros que deseja ler e marque os que já terminou.
          </p>
        </section>

        <div className="content-layout">
          <section className="books-section">
            <h2 className="section-title">Sua Estante</h2>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Pesquisar livros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="reading-tips-grid">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onSave={toggleSave}
                    onRead={toggleRead}
                    saved={savedBooks.includes(book.id)}
                    read={readBooks.includes(book.id)}
                  />
                ))
              ) : (
                <p className="no-results">Nenhum livro encontrado.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Clube do Livro. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}