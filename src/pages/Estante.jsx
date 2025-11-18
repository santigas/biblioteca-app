import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './estante.css'; 

const STATUS_OPCOES = ["Quero ler", "Lendo", "Lido", "Relendo", "Abandonei"];

const statusClassMap = {
  "Lido": "status-lido", "Lendo": "status-lendo", "Quero ler": "status-quero-ler",
  "Relendo": "status-relendo", "Abandonei": "status-abandonei",
};

const sidebarStatusMap = {
    "Todos": { colorClass: "icon-todos" },
    "Lido": { colorClass: "icon-lido" }, "Lendo": { colorClass: "icon-lendo" },
    "Quero ler": { colorClass: "icon-quero-ler" }, "Relendo": { colorClass: "icon-relendo" },
    "Abandonei": { colorClass: "icon-abandonei" },
    "Favorito": { colorClass: "icon-favorito", icon: "♥" },
    "Salvo": { colorClass: "icon-salvo", icon: "⚑" }, 
    "Possuo": { colorClass: "icon-possui", icon: "✓" }, 
    "Emprestado": { colorClass: "icon-emprestado", icon: "→" } 
};

// Listas de filtros
const CATEGORY_FILTERS = ["Livros", "Quadrinhos", "Revistas"];
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
            <button className="remove-book-btn" onClick={() => onRemoveBook(book.id)} title="Remover da estante">🗑️</button>
            <img src={book.imageUrl} alt={`Capa do livro ${book.title}`} className="book-card-image" />
            <div className="book-card-content">
                <h3>{book.title}</h3>
                <p className="book-card-author">por {book.author}</p>
                <div className="status-btn-wrapper">
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


// --- COMPONENTE ESTANTE ---
export default function Estante() {
    const [bookStatuses, setBookStatuses] = useState({}); 
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("Todos"); 

    // 1. CARREGAR DADOS DO BACK-END
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
                console.error("Erro ao carregar da Estante:", error);
            }
        };
        loadFromBackend();
    }, []);

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
                    category: bookData.category, 
                    isLiked: bookData.isLiked,
                    isSaved: bookData.isSaved,
                    isOwned: bookData.isOwned,
                    isLent: bookData.isLent
                })
            });
        } catch (error) {
            console.error("Erro ao salvar update:", error);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setBookStatuses(prevStatuses => {
            const bookToUpdate = prevStatuses[id]; 
            const updatedBook = { ...bookToUpdate, status: newStatus };
            saveToBackend(updatedBook); 
            return { ...prevStatuses, [id]: updatedBook };
        });
    };
    
    const handleRemoveBook = async (idToRemove) => {
        setBookStatuses(prevStatuses => {
            const newStatuses = { ...prevStatuses };
            delete newStatuses[idToRemove]; 
            return newStatuses;
        });
        try {
            await fetch(`http://localhost:3000/api/books/${idToRemove}`, { method: 'DELETE' });
        } catch (error) {
            console.error("Erro ao deletar:", error);
        }
    };

    // --- LÓGICA DE FILTRO ---
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
            case "Todos": return true;
            // Categorias
            case "Livros": return book.category === "Livros";
            case "Quadrinhos": return book.category === "Quadrinhos";
            case "Revistas": return book.category === "Revistas";
            // Status
            case "Lido": return book.status === "Lido";
            case "Lendo": return book.status === "Lendo";
            case "Quero ler": return book.status === "Quero ler";
            case "Relendo": return book.status === "Relendo";
            case "Abandonei": return book.status === "Abandonei";
            // Ações
            case "Favorito": return book.isLiked === true;
            case "Salvo": return book.isSaved === true;
            case "Possuo": return book.isOwned === true;
            case "Emprestado": return book.isLent === true;
            default: return true;
        }
    });

    const finalBooksToShow = statusFilteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const isEstanteEmpty = allMyBooks.length === 0;

    return (
        <div className="estante-page-wrapper">
            <div className="listagem-container estante-page">
                {isEstanteEmpty ? (
                    <div className="listagem-container-vazio">
                        <div className="empty-estante-container">
                            <p className="no-filter-message">A sua estante está vazia. Vá ao "Início" e marque o status de um livro para o adicionar aqui!</p>
                            <Link to="/catalogo" className="btn-voltar-home">
                                Ir para o Catálogo
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* SIDEBAR (Apenas Status e Ações) */}
                        <div className="estante-sidebar">
                            <div className="sidebar-filters">
                                {STATUS_FILTERS.map(status => (
                                    <div key={status} className={`sidebar-filter-item ${activeFilter === status ? 'active' : ''}`} onClick={() => setActiveFilter(status)}>
                                        <span className={`icon ${sidebarStatusMap[status].colorClass}`}></span>
                                        <span className="text">{status}</span>
                                        <span className="count">{filterCounts[status]}</span>
                                    </div>
                                ))}
                                <hr className="sidebar-divider" />
                                {ACTION_FILTERS.map(action => (
                                    <div key={action} className={`sidebar-filter-item ${activeFilter === action ? 'active' : ''}`} onClick={() => setActiveFilter(action)}>
                                        <span className={`icon ${sidebarStatusMap[action].colorClass}`}>{sidebarStatusMap[action].icon}</span>
                                        <span className="text">{action}</span>
                                        <span className="count">{filterCounts[action]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="estante-main-column">
                            <div className="page-header">
                                <h2 className="section-title">Minha Estante</h2>
                                <p className="section-subtitle">Organize, filtre e gerencie todos os seus livros em um só lugar.</p>
                            </div>
                            
                            {/* BARRA DE TOPO (Voltou a ter Categorias e Pesquisa) */}
                            <div className="estante-top-bar">
                                <div className="category-filters">
                                    {CATEGORY_FILTERS.map(cat => (
                                        <button 
                                            key={cat}
                                            className={`category-btn ${activeFilter === cat ? 'active' : ''}`}
                                            onClick={() => setActiveFilter(cat)}
                                        >
                                            {cat === 'Livros' ? '📘' : cat === 'Quadrinhos' ? '🖼️' : '📖'} {cat}
                                        </button>
                                    ))}
                                </div>

                                <div className="search-bar">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="search-icon-svg">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                    <input type="text" placeholder="Pesquise na sua estante..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                            </div>
                            
                            <hr className="estante-divider" />
                            <div className="estante-grid-area">
                                <p className="results-summary">
                                    {finalBooksToShow.length} {finalBooksToShow.length === 1 ? 'livro encontrado' : 'livros encontrados'}
                                </p>
                                <div className="listagem-grid">
                                    {finalBooksToShow.map(book => (
                                        <BookCard key={book.id} book={book} currentStatus={book.status} onStatusChange={handleStatusChange} onRemoveBook={handleRemoveBook} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <footer className="footer">
                <p>&copy; 2025 Clube do Livro. Todos os direitos reservados.</p>
            </footer>
        </div> 
    );
}