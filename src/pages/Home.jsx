import React, { useState, useEffect } from "react";
import "./home.css";

// Dados mockados (simulando a resposta da API)
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
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    imageUrl: "https://covers.openlibrary.org/b/id/6979861-L.jpg" 
  },
  { id: 8,
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    imageUrl: "https://covers.openlibrary.org/b/id/9251996-L.jpg" 
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

// Componente BookCard para a Home.jsx
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

        {/* NOVO: Seletor de Status de Leitura */}
        <div className="book-actions">
          <select
            value={currentStatus || "Quero ler"} 
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
        {/* FIM NOVO */}
      </div>
    </div>
  );
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogue, setCatalogue] = useState(mockCatalogue); // Catálogo (dados da API)
  
  // NOVO: Mapeamento de status: { bookId: status, ... }
  const [bookStatuses, setBookStatuses] = useState({}); 

  // Carrega status do localStorage ao montar
  useEffect(() => {
    const storedStatuses = JSON.parse(localStorage.getItem("bookStatuses")) || {};
    setBookStatuses(storedStatuses);
    
    // Simulação da API: aqui você faria o fetch(API_URL).then(setCatalogue)
    // Manteremos mockCatalogue por enquanto.
  }, []);

  // Salva status no localStorage sempre que 'bookStatuses' mudar
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