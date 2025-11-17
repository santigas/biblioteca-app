// santigas/biblioteca-app/biblioteca-app-fcc725e9387e4d0204ab59422db90f6e8dcf8093/src/pages/Home.jsx

import React, { useState, useEffect } from "react"; 
import "./home.css";

// Catálogo de livros mockados
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

// BookCard da Home (sem título/autor)
const BookCard = ({ book, onStatusChange, currentStatus }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleStatusSelect = (status) => {
    onStatusChange(book.id, status); 
    setIsPopoverOpen(false); 
  };

  return (
    <div className="bookcard"> 
      <img
        className="book-card-image"
        src={book.imageUrl}
        alt={`Capa do livro ${book.title}`}
      />
      <div className="book-card-content">
        
        {/* Título e Autor removidos */}

        {/* Wrapper para alinhar o botão ao CENTRO */}
        <div className="status-btn-wrapper">
          <button
            className="status-plus-btn"
            onClick={() => setIsPopoverOpen(true)}
            title="Mudar status"
          >
            +
          </button>
        </div>

        {/* O Pop-up (a "telinha") */}
        {isPopoverOpen && (
          <>
            <div className="popover-backdrop" onClick={() => setIsPopoverOpen(false)}></div>
            <div className="status-popover">
              {STATUS_OPCOES.map((status) => (
                <div
                  key={status}
                  className={`popover-item ${
                      (currentStatus || "Quero ler") === status ? 'active' : ''
                  }`}
                  onClick={() => handleStatusSelect(status)}
                >
                  {status}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogue, setCatalogue] = useState(mockCatalogue);
  const [bookStatuses, setBookStatuses] = useState({}); 

  // Carrega status salvo
  useEffect(() => {
    const storedStatuses = JSON.parse(localStorage.getItem("bookStatuses")) || {};
    setBookStatuses(storedStatuses);
  }, []);

  // Salva status modificado
  useEffect(() => {
    localStorage.setItem("bookStatuses", JSON.stringify(bookStatuses));
  }, [bookStatuses]);

  // Atualiza o status
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
      {/* MUDANÇA: Título, Subtítulo e Pesquisa movidos para o topo */}
      <main className="home-container">
        
        <h2 className="section-title">Catálogo de Livros</h2>
        <p className="section-subtitle">
          Encontre novos livros e categorize seu status de leitura!
        </p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar livros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Layout de conteúdo (grelha) */}
        <div className="content-layout">
          <section className="books-section">
            
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