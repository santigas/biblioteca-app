import React, { useState, useEffect } from "react"; 
import "./home.css";

const STATUS_OPCOES = ["Quero ler", "Lendo", "Lido", "Relendo", "Abandonei"];
const CATEGORY_MAP = {
  "Livros": "subject:fiction", 
  "Quadrinhos": "subject:comics",
  "Revistas": "subject:magazines"
};

// --- COMPONENTE BOOKCARD ---
const BookCard = ({ book, currentStatus, onStatusChange, onToggleAction, isLiked, isSaved, isOwned, isLent }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleStatusSelect = (status) => { onStatusChange(book, status); setIsPopoverOpen(false); };

  return (
    <div className="bookcard"> 
      <img className="book-card-image" src={book.imageUrl} alt={`Capa do livro ${book.title}`} />
      <div className="book-card-content">
        <div className="card-actions-wrapper">
            <button className={`icon-btn ${isLiked ? 'active' : ''}`} title="Favoritar (Like)" onClick={() => onToggleAction(book, 'isLiked')}>♥</button>
            <button className={`icon-btn ${isSaved ? 'active' : ''}`} title="Salvar (Save)" onClick={() => onToggleAction(book, 'isSaved')}>⚑</button>
            <button className={`icon-btn ${isOwned ? 'active' : ''}`} title="Possuo (Have)" onClick={() => onToggleAction(book, 'isOwned')}>✓</button>
            <button className={`icon-btn ${isLent ? 'active' : ''}`} title="Emprestei (Lent)" onClick={() => onToggleAction(book, 'isLent')}>→</button>
            <button className="status-plus-btn" onClick={() => setIsPopoverOpen(true)} title="Mudar status">+</button>
        </div>
        {isPopoverOpen && (
          <>
            <div className="popover-backdrop" onClick={() => setIsPopoverOpen(false)}></div>
            <div className="status-popover">
              {STATUS_OPCOES.map((status) => (
                <div key={status} className={`popover-item ${ (currentStatus || "Quero ler") === status ? 'active' : '' }`} onClick={() => handleStatusSelect(status)}>{status}</div>
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
    const loadFromBackend = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/books');
            const data = await response.json();
            const booksMap = {};
            data.forEach(book => {
                booksMap[book.googleId] = { ...book, id: book.googleId };
            });
            setBookStatuses(booksMap);
        } catch (error) {
            console.error("Erro ao conectar com o Back-end:", error);
        }
    };
    loadFromBackend();
  }, []); 
  
  // --- SALVAR NO BACKEND (COM CATEGORIA) ---
  const saveToBackend = async (bookData) => {
      try {
          await fetch('http://localhost:3000/api/books', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  googleId: bookData.id,
                  title: bookData.title,
                  author: bookData.author,
                  imageUrl: bookData.imageUrl,
                  status: bookData.status,
                  // Envia a categoria ativa (Livros, Quadrinhos, etc.)
                  category: activeCategory, 
                  isLiked: bookData.isLiked,
                  isSaved: bookData.isSaved,
                  isOwned: bookData.isOwned,
                  isLent: bookData.isLent
              })
          });
      } catch (error) {
          console.error("Erro ao salvar no Back-end:", error);
      }
  };

  const getOrCreateBookEntry = (prevStatuses, book) => {
    return prevStatuses[book.id] || {
        id: book.id,
        title: book.title,
        author: book.author,
        imageUrl: book.imageUrl,
        status: null,
        isLiked: false, isSaved: false, isOwned: false, isLent: false
    };
  };

  const handleStatusChange = (book, newStatus) => {
    setBookStatuses(prevStatuses => {
      const entry = getOrCreateBookEntry(prevStatuses, book);
      const updatedBook = { ...entry, status: newStatus };
      saveToBackend(updatedBook); 
      return { ...prevStatuses, [book.id]: updatedBook };
    });
  };

  const handleToggleAction = (book, actionKey) => {
    setBookStatuses(prevStatuses => {
      const entry = getOrCreateBookEntry(prevStatuses, book);
      const updatedBook = { ...entry, [actionKey]: !entry[actionKey] };
      saveToBackend(updatedBook);
      return { ...prevStatuses, [book.id]: updatedBook };
    });
  };
  
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
        console.error("Erro na API Google:", error);
        setSearchMessage("Erro ao buscar.");
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    setSearchMessage("A carregar livros populares...");
    fetchBooks(CATEGORY_MAP[activeCategory]); 
  }, []); 

  const handleSearch = () => { if (isLoading) return; setActiveCategory(""); fetchBooks(searchTerm); };
  const handleCategoryClick = (categoryName) => { if (isLoading) return; const query = CATEGORY_MAP[categoryName]; setActiveCategory(categoryName); setSearchTerm(""); fetchBooks(query); };
  const handleKeyPress = (event) => { if (event.key === 'Enter') handleSearch(); };

  return (
    <div className="home-page">
      <main className="home-container">
        <div className="page-header">
          <h2 className="section-title">Catálogo</h2>
          <p className="section-subtitle">Explore nosso vasto catálogo e descubra quais livros formarão a sua estante.</p>
        </div>
        <div className="estante-top-bar">
            <div className="category-filters">
                {Object.keys(CATEGORY_MAP).map(cat => (
                    <button key={cat} className={`category-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => handleCategoryClick(cat)}>
                        {cat === 'Livros' ? '📘' : cat === 'Quadrinhos' ? '🖼️' : '📖'} {cat}
                    </button>
                ))}
            </div>
            <div className="search-bar">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="search-icon-svg">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" placeholder="Pesquise no catálogo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} />
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