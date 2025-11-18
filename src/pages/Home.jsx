import React, { useState, useEffect } from "react"; 
import "./home.css";

// Opções de status
const STATUS_OPCOES = [
  "Quero ler",
  "Lendo",
  "Lido",
  "Relendo",
  "Abandonei",
];

// Mapa de Categorias
const CATEGORY_MAP = {
  "Livros": "subject:fiction", 
  "Quadrinhos": "subject:comics",
  "Revistas": "subject:magazines"
};

// --- COMPONENTE BOOKCARD ---
const BookCard = ({ book, onStatusChange, currentStatus, onToggleAction, isLiked, isSaved, isOwned, isLent }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  const handleStatusSelect = (status) => {
    onStatusChange(book, status); 
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
        <div className="card-actions-wrapper">
            <button 
                className={`icon-btn ${isLiked ? 'active' : ''}`} 
                title="Favoritar (Like)"
                onClick={() => onToggleAction(book, 'isLiked')}
            >
                ♥
            </button>
            <button 
                className={`icon-btn ${isSaved ? 'active' : ''}`} 
                title="Salvar (Save)"
                onClick={() => onToggleAction(book, 'isSaved')}
            >
                ⚑
            </button>
            <button 
                className={`icon-btn ${isOwned ? 'active' : ''}`} 
                title="Possuo (Have)"
                onClick={() => onToggleAction(book, 'isOwned')}
            >
                ✓
            </button>
            <button 
                className={`icon-btn ${isLent ? 'active' : ''}`} 
                title="Emprestei (Lent)"
                onClick={() => onToggleAction(book, 'isLent')}
            >
                →
            </button>
            <button
                className="status-plus-btn"
                onClick={() => setIsPopoverOpen(true)}
                title="Mudar status"
            >
                +
            </button>
        </div>
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


// --- COMPONENTE HOME ---
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogue, setCatalogue] = useState([]); 
  const [bookStatuses, setBookStatuses] = useState({}); 
  const [isLoading, setIsLoading] = useState(false); 
  const [searchMessage, setSearchMessage] = useState(""); 
  const [activeCategory, setActiveCategory] = useState("Livros"); 

  useEffect(() => {
    const storedStatuses = JSON.parse(localStorage.getItem("bookStatuses")) || {};
    setBookStatuses(storedStatuses);
  }, []);

  
  const fetchBooks = async (query) => {
    if (query.trim() === "") {
        setSearchMessage("Por favor, digite um termo de busca.");
        setCatalogue([]);
        return;
    }
    
    setIsLoading(true);
    setSearchMessage(""); 
    setCatalogue([]); 

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const formattedBooks = data.items.map(item => ({
                id: item.id, 
                title: item.volumeInfo.title,
                author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor desconhecido',
                imageUrl: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/180x220.png?text=Sem+Capa'
            }));
            setCatalogue(formattedBooks);
        } else {
            setSearchMessage("Nenhum livro encontrado para esta busca.");
        }

    } catch (error) {
        console.error("Erro ao buscar na API do Google Books:", error);
        setSearchMessage("Ocorreu um erro ao buscar. Tente novamente.");
    }
    
    setIsLoading(false);
  };
  
  useEffect(() => {
    setSearchMessage("A carregar livros populares...");
    fetchBooks(CATEGORY_MAP[activeCategory]); 
  }, []); 


  const handleStatusChange = (book, newStatus) => {
    setBookStatuses(prevStatuses => {
      const entry = (prevStatuses[book.id] || {
            id: book.id,
            title: book.title,
            author: book.author,
            imageUrl: book.imageUrl,
            isLiked: false, isSaved: false, isOwned: false, isLent: false
      });
      
      const newStatuses = {
        ...prevStatuses,
        [book.id]: { 
            ...entry,
            status: newStatus 
        }
      };
      localStorage.setItem("bookStatuses", JSON.stringify(newStatuses));
      return newStatuses;
    });
  };

  const handleToggleAction = (book, actionKey) => {
    setBookStatuses(prevStatuses => {
      const entry = (prevStatuses[book.id] || {
            id: book.id,
            title: book.title,
            author: book.author,
            imageUrl: book.imageUrl,
            status: null,
            isLiked: false, isSaved: false, isOwned: false, isLent: false
      });

      const newStatuses = {
        ...prevStatuses,
        [book.id]: {
          ...entry,
          [actionKey]: !entry[actionKey] 
        }
      };
      localStorage.setItem("bookStatuses", JSON.stringify(newStatuses));
      return newStatuses;
    });
  };
  
  const handleSearch = () => {
    if (isLoading) return;
    setActiveCategory(""); 
    fetchBooks(searchTerm); 
  };

  const handleCategoryClick = (categoryName) => {
    if (isLoading) return;
    const query = CATEGORY_MAP[categoryName]; 
    setActiveCategory(categoryName); 
    setSearchTerm(""); 
    fetchBooks(query); 
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
  };

  return (
    <div className="home-page">
      <main className="home-container">
        
        {/* --- NOVO TÍTULO E SUBTÍTULO --- */}
        <div className="page-header">
          <h2 className="section-title">Catálogo</h2>
          <p className="section-subtitle">Explore nosso vasto catálogo e descubra quais livros formarão a sua estante.</p>
        </div>
        {/* --- FIM DO TÍTULO --- */}

        {/* Barra superior */}
        <div className="estante-top-bar">
            <div className="category-filters">
                <button 
                  className={`category-btn ${activeCategory === 'Livros' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('Livros')}
                >
                    📘 Livros
                </button>
                <button 
                  className={`category-btn ${activeCategory === 'Quadrinhos' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('Quadrinhos')}
                >
                    🖼️ Quadrinhos
                </button>
                <button 
                  className={`category-btn ${activeCategory === 'Revistas' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('Revistas')}
                >
                    📖 Revistas
                </button>
            </div>
            
            <div className="search-bar">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="search-icon-svg">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    placeholder="Pesquise no catálogo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress} 
                />
            </div>
            <button onClick={handleSearch} className="btn-search" disabled={isLoading}>
                {isLoading ? 'Buscando...' : 'Pesquisar'}
            </button>
        </div>

        <hr className="estante-divider" />

        <div className="content-layout">
          <section className="books-section">
            <div className="reading-tips-grid">
              {isLoading && <p className="search-message">Carregando...</p>}
              {!isLoading && searchMessage && <p className="search-message">{searchMessage}</p>}
              
              {!isLoading && catalogue.length > 0 && (
                catalogue.map((book) => {
                  const currentEntry = bookStatuses[book.id];
                  return (
                    <BookCard
                      key={book.id} 
                      book={book}
                      currentStatus={currentEntry?.status} 
                      onStatusChange={handleStatusChange}
                      onToggleAction={handleToggleAction}
                      isLiked={currentEntry?.isLiked || false}
                      isSaved={currentEntry?.isSaved || false}
                      isOwned={currentEntry?.isOwned || false}
                      isLent={currentEntry?.isLent || false}
                    />
                  );
                })
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