import React, { useState, useEffect } from "react";
import "./home.css";

// Catálogo de livros mockados (substituir por API real)
const mockCatalogue = [
    { id: 1,
      title: "A Terra da Flor Azul",
      author: "Frances Hodgson Burnett",
      imageUrl: "https://m.media-amazon.com/images/I/81LtpDR0LZL._AC_UF1000,1000_QL80_.jpg" 
    },
    { id: 2,
      title: "Harry Potter e a Pedra Filosofal",
      author: "J.K. Rowling",
      imageUrl: "https://http2.mlstatic.com/D_NQ_NP_754630-MLU77444326845_072024-O.webp" 
    },
    { id: 3,
      title: "O Hobbit",
      author: "J.R.R. Tolkien",
      imageUrl: "https://m.media-amazon.com/images/I/81t2CVWEsUL._AC_UF894,1000_QL80_.jpg" 
      },
    { id: 4,
      title: "O Pequeno Príncipe",
      author: "Antoine de Saint-Exupéry",
      imageUrl: "https://m.media-amazon.com/images/I/71OZNgRJ3hL.jpg" 
    },
    { id: 5,
      title: "Orgulho e Preconceito",
      author: "Jane Austen",
      imageUrl: "https://covers.openlibrary.org/b/id/11121638-L.jpg" 
    },
    { id: 6,
      title: "Dom Quixote",
      author: "Miguel de Cervantes",
      imageUrl: "https://covers.openlibrary.org/b/id/8101356-L.jpg" 
    },
    { id: 7,
      title: "1984",
      author: "George Orwell",
      imageUrl: "https://m.media-amazon.com/images/I/71NnJ2X9mAL._AC_UF894,1000_QL80_.jpg" 
    },
    { id: 8,
      title: "Fahrenheit 451",
      author: "Ray Bradbury",
      imageUrl: "https://m.media-amazon.com/images/I/81l9tP4pU+L._AC_UF894,1000_QL80_.jpg" 
    },
    { id: 9,
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    imageUrl: "https://covers.openlibrary.org/b/id/11121638-L.jpg" 
    },
    { id: 10,
    title: "Dom Quixote",
    author: "Miguel de Cervantes",
    imageUrl: "https://covers.openlibrary.org/b/id/8101356-L.jpg" 
    },
  ];

const STATUS_OPCOES = [
  "Quero ler",
  "Lendo",
  "Lido",
  "Relendo",
  "Abandonei",
];

const BookCard = ({ book, onStatusChange, currentStatus }) => {
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
          <select
            value={currentStatus || "Quero ler"} 
            // 🚨 Aqui o status é atualizado via onStatusChange (que salva no localStorage)
            onChange={(e) => onStatusChange(book.id, e.target.value)}
            className="book-status-select"
          >
            {STATUS_OPCOES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogue, setCatalogue] = useState(mockCatalogue);
  const [bookStatuses, setBookStatuses] = useState({}); 

  // 1. CARREGA STATUS SALVO
  useEffect(() => {
    const storedStatuses = JSON.parse(localStorage.getItem("bookStatuses")) || {};
    setBookStatuses(storedStatuses);
  }, []);

  // 2. SALVA STATUS MODIFICADO (sempre que bookStatuses muda)
  useEffect(() => {
    localStorage.setItem("bookStatuses", JSON.stringify(bookStatuses));
  }, [bookStatuses]);

  // Função para atualizar o status do livro
  const handleStatusChange = (id, newStatus) => {
    setBookStatuses(prevStatuses => ({
      ...prevStatuses,
      [id]: newStatus,
    }));
  };

  const filteredBooks = catalogue.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="home-page">
      <main className="home-container">
        <section className="welcome-section">
          <p>
            Encontre novos livros e categorize seu status de leitura!
          </p>
        </section>

        <div className="content-layout">
          <section className="books-section">
            <h2 className="section-title">Catálogo de Livros</h2>

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
                    currentStatus={bookStatuses[book.id]}
                    onStatusChange={handleStatusChange}
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