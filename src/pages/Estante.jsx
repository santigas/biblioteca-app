import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './estante.css'; 

// Opções de status
const STATUS_OPCOES = [
  "Quero ler",
  "Lendo",
  "Lido",
  "Relendo",
  "Abandonei",
];

// Mapa de classes para as BANDEIRAS (no card)
const statusClassMap = {
  "Lido": "status-lido",
  "Lendo": "status-lendo",
  "Quero ler": "status-quero-ler",
  "Relendo": "status-relendo",
  "Abandonei": "status-abandonei",
};

// --- MAPA DA SIDEBAR ATUALIZADO ---
const sidebarStatusMap = {
    // Status
    "Todos": { colorClass: "icon-todos" }, // (Removemos o ícone daqui)
    "Lido": { colorClass: "icon-lido" },
    "Lendo": { colorClass: "icon-lendo" },
    "Quero ler": { colorClass: "icon-quero-ler" },
    "Relendo": { colorClass: "icon-relendo" },
    "Abandonei": { colorClass: "icon-abandonei" },
    // Ações
    "Favorito": { colorClass: "icon-favorito", icon: "♥" },
    "Salvo": { colorClass: "icon-salvo", icon: "⚑" }, 
    "Possuo": { colorClass: "icon-possui", icon: "✓" }, 
    "Emprestado": { colorClass: "icon-emprestado", icon: "→" } 
};

// Listas de filtros para o JSX
const STATUS_FILTERS = ["Todos", "Lido", "Lendo", "Quero ler", "Relendo", "Abandonei"];
const ACTION_FILTERS = ["Favorito", "Salvo", "Possuo", "Emprestado"];


// --- COMPONENTE BOOKCARD ---
const BookCard = ({ book, onStatusChange, currentStatus, onRemoveBook }) => { 
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleStatusSelect = (status) => {
        onStatusChange(book.id, status);
        setIsPopoverOpen(false);
    };

    const flagClass = statusClassMap[currentStatus] || '';

    return (
        <div className="book-card"> 
            
            {currentStatus && <div className={`book-status-flag ${flagClass}`}></div>}
            
            <button 
                className="remove-book-btn" 
                onClick={() => onRemoveBook(book.id)} 
                title="Remover da estante"
            >
                🗑️
            </button>
        
            <img
                src={book.imageUrl}
                alt={`Capa do livro ${book.title}`}
                className="book-card-image"
            />
            <div className="book-card-content">
                <h3>{book.title}</h3>
                <p className="book-card-author">por {book.author}</p>
                
                <div className="status-btn-wrapper">
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


// --- COMPONENTE ESTANTE ---
export default function Estante() {
    // ... (Hooks, handlers e lógica de filtro permanecem os mesmos) ...
    const [bookStatuses, setBookStatuses] = useState({}); 
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("Todos"); 

    useEffect(() => {
        const storedStatuses = JSON.parse(localStorage.getItem("bookStatuses")) || {};
        setBookStatuses(storedStatuses);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedStatuses = JSON.parse(localStorage.getItem("bookStatuses")) || {};
            setBookStatuses(storedStatuses);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Atualiza status (PRESERVA as ações)
    const handleStatusChange = (id, newStatus) => {
        setBookStatuses(prevStatuses => {
            const bookToUpdate = prevStatuses[id]; 
            
            const newStatuses = {
                ...prevStatuses,
                [id]: {
                    ...bookToUpdate, 
                    status: newStatus, 
                }
            };
            localStorage.setItem("bookStatuses", JSON.stringify(newStatuses));
            return newStatuses;
        });
    };
    
    // Remove livro (sem mudança)
    const handleRemoveBook = (idToRemove) => {
        setBookStatuses(prevStatuses => {
            const newStatuses = { ...prevStatuses };
            delete newStatuses[idToRemove]; 
            localStorage.setItem("bookStatuses", JSON.stringify(newStatuses));
            return newStatuses;
        });
    };

    // --- LÓGICA DE FILTRO E CONTAGEM ATUALIZADA ---
    const allMyBooks = Object.values(bookStatuses);
    const filterCounts = {
        "Todos": allMyBooks.length,
        "Lido": allMyBooks.filter(b => b.status === "Lido").length,
        "Lendo": allMyBooks.filter(b => b.status === "Lendo").length,
        "Quero ler": allMyBooks.filter(b => b.status === "Quero ler").length,
        "Relendo": allMyBooks.filter(b => b.status === "Relendo").length,
        "Abandonei": allMyBooks.filter(b => b.status === "Abandonei").length,
        "Favorito": allMyBooks.filter(b => b.isLiked === true).length,
        "Salvo": allMyBooks.filter(b => b.isSaved === true).length,
        "Possuo": allMyBooks.filter(b => b.isOwned === true).length,
        "Emprestado": allMyBooks.filter(b => b.isLent === true).length,
    };
    const statusFilteredBooks = allMyBooks.filter(book => {
        switch (activeFilter) {
            case "Todos":
                return true;
            case "Lido":
                return book.status === "Lido";
            case "Lendo":
                return book.status === "Lendo";
            case "Quero ler":
                return book.status === "Quero ler";
            case "Relendo":
                return book.status === "Relendo";
            case "Abandonei":
                return book.status === "Abandonei";
            case "Favorito":
                return book.isLiked === true;
            case "Salvo":
                return book.isSaved === true;
            case "Possuo":
                return book.isOwned === true;
            case "Emprestado":
                return book.isLent === true;
            default:
                return true;
        }
    });
    const finalBooksToShow = statusFilteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const isEstanteEmpty = allMyBooks.length === 0;

    return (
        <div className="estante-page-wrapper">

            {/* --- MUDANÇA PRINCIPAL AQUI --- */}
            
            {isEstanteEmpty ? (
                // SE ESTIVER VAZIA, renderiza o container de página vazia
                <div className="listagem-container-vazio">
                    <div className="empty-estante-container">
                        <p className="no-filter-message">A sua estante está vazia. Vá ao "Catálogo" e marque o status de um livro para o adicionar aqui!</p>
                        <Link to="/catalogo" className="btn-voltar-home">
                            Ir para o Catálogo
                        </Link>
                    </div>
                </div>
            ) : (
                // SE TIVER LIVROS, renderiza o layout normal
                <div className="listagem-container estante-page">
                    <>
                        {/* 1. SIDEBAR (À esquerda de tudo) */}
                        <div className="estante-sidebar">
                            <div className="sidebar-filters">
                                {STATUS_FILTERS.map(status => (
                                    <div
                                        key={status}
                                        className={`sidebar-filter-item ${activeFilter === status ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(status)}
                                    >
                                        <span className={`icon ${sidebarStatusMap[status].colorClass}`}>
                                            {/* Renderiza um span vazio para a bandeira CSS */}
                                        </span>
                                        <span className="text">{status}</span>
                                        <span className="count">{filterCounts[status]}</span>
                                    </div>
                                ))}
                                
                                <hr className="sidebar-divider" />
                                
                                {ACTION_FILTERS.map(action => (
                                    <div
                                        key={action}
                                        className={`sidebar-filter-item ${activeFilter === action ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(action)}
                                    >
                                        <span className={`icon ${sidebarStatusMap[action].colorClass}`}>
                                          {sidebarStatusMap[action].icon}
                                        </span>
                                        <span className="text">{action}</span>
                                        <span className="count">{filterCounts[action]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. COLUNA PRINCIPAL (À direita) */}
                        <div className="estante-main-column">

                            <div className="page-header">
                                <h2 className="section-title">Minha Estante</h2>
                                <p className="section-subtitle">Organize, filtre e gerencie todos os seus livros em um só lugar.</p>
                            </div>
                            <div className="estante-top-bar">
                                <div className="category-filters">
                                    <button className="category-btn active">
                                        📘 Livros
                                    </button>
                                    <button className="category-btn">
                                        🖼️ Quadrinhos
                                    </button>
                                    <button className="category-btn">
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
                                        placeholder="Pesquise na sua estante..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <hr className="estante-divider" />

                            <div className="estante-grid-area">
                                <p className="results-summary">
                                    {finalBooksToShow.length} {finalBooksToShow.length === 1 ? 'livro encontrado' : 'livros encontrados'}
                                </p>

                                <div className="listagem-grid">
                                    {finalBooksToShow.map(book => (
                                        <BookCard
                                            key={book.id}
                                            book={book}
                                            currentStatus={book.status} 
                                            onStatusChange={handleStatusChange}
                                            onRemoveBook={handleRemoveBook} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            )}
            
            {/* --- FIM DA MUDANÇA --- */}

            <footer className="footer">
                <p>&copy; 2025 Clube do Livro. Todos os direitos reservados.</p>
            </footer>

        </div> 
    );
}