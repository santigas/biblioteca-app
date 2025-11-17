import React, { useState, useEffect } from 'react';
import './estante.css'; // (ou ./estante.css se o renomeou)

// ... (mockCatalogue, STATUS_OPCOES, e o componente BookCard permanecem os mesmos) ...
const catalogue = [
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
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleStatusSelect = (status) => {
        onStatusChange(book.id, status);
        setIsPopoverOpen(false);
    };

    return (
        <div className="book-card"> 
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


export default function Estante() {
    const [bookStatuses, setBookStatuses] = useState({}); 

    // ... (useEffect para carregar e sincronizar permanecem os mesmos) ...
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

    // 
    // --- A CORREÇÃO ESTÁ AQUI ---
    // 
    // Atualiza status e salva no localStorage
    const handleStatusChange = (id, newStatus) => {
        
        // MUDANÇA: Usar a função de callback (prevStatuses) 
        // para garantir que estamos a adicionar ao estado antigo,
        // e não a substituí-lo.
        setBookStatuses(prevStatuses => {
            const newStatuses = {
                ...prevStatuses, // <-- Copia TODOS os status antigos
                [id]: newStatus,      // <-- Adiciona/Atualiza o novo status
            };
            
            // Salva o objeto completo no localStorage
            localStorage.setItem("bookStatuses", JSON.stringify(newStatuses));
            return newStatuses; // Retorna o novo objeto para o estado
        });
    };
    
    // --- FIM DA CORREÇÃO ---
    // 

    // (O resto do código - trackedBookIds, trackedBooks, groupedBooks, e o return JSX - 
    //  permanece exatamente o mesmo da minha resposta anterior.)

    // 1. Obter a lista de IDs dos livros que o utilizador JÁ MARCOU
    const trackedBookIds = Object.keys(bookStatuses).map(id => id.toString());

    // 2. Filtrar o catálogo principal para incluir APENAS os livros marcados
    const trackedBooks = catalogue.filter(book => 
        trackedBookIds.includes(book.id.toString())
    );

    // 3. Agrupar APENAS os livros marcados
    const groupedBooks = trackedBooks.reduce((acc, book) => {
        const status = bookStatuses[book.id]; 
        
        if (status) { 
            if (!acc[status]) {
                acc[status] = [];
            }
            acc[status].push(book);
        }
        return acc;
    }, {});
    

    const STATUS_ORDEM = ["Lendo", "Lido", "Quero ler", "Relendo", "Abandonei"];
    
    const orderedCategories = STATUS_ORDEM.filter(status => groupedBooks[status] && groupedBooks[status].length > 0);

    const isEstanteEmpty = orderedCategories.length === 0;


    return (
        <div className="listagem-container estante-page">
            <h2 className="estante-title">Minha Estante de Leitura</h2>
            <p className="estante-subtitle">Gerencie seus status de leitura em um só lugar.</p>
            
            {isEstanteEmpty ? (
                <p className="no-filter-message">A sua estante está vazia. Vá ao "Início" e marque o status de um livro para o adicionar aqui!</p>
            ) : (
                orderedCategories.map(status => (
                    <div key={status} className="status-group">
                        <h3 className="status-group-title">{status} ({groupedBooks[status].length})</h3>
                        <div className="listagem-grid">
                            {groupedBooks[status].map(book => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    currentStatus={bookStatuses[book.id]}
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}