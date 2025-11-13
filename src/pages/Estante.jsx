import React, { useState, useEffect } from 'react';
import './listagem.css'; // Mantenha listagem.css ou renomeie para estante.css

// 🚨 ATENÇÃO: ESTE CATÁLOGO DEVE SER IDÊNTICO AO USADO EM Home.jsx
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

// Componente BookCard para Estante (Cópia da Home)
const BookCard = ({ book, onStatusChange, currentStatus }) => {
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
                {/* Seletor de Status de Leitura */}
                <div className="book-status-group">
                    <label htmlFor={`status-${book.id}`}>Status:</label>
                    <select
                        id={`status-${book.id}`}
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
            </div>
        </div>
    );
};


export default function Estante() {
    const [bookStatuses, setBookStatuses] = useState({}); 

    // 1. CARREGA STATUS SALVO AO MONTAR
    useEffect(() => {
        const storedStatuses = JSON.parse(localStorage.getItem("bookStatuses")) || {};
        setBookStatuses(storedStatuses);
    }, []);

    // Garante que a Estante reaja a mudanças feitas na Home em outra aba (sincronização)
    useEffect(() => {
        const handleStorageChange = () => {
            const storedStatuses = JSON.parse(localStorage.getItem("bookStatuses")) || {};
            setBookStatuses(storedStatuses);
        };
        // 🚨 O EVENTO 'storage' é o que garante a sincronização entre abas/páginas
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Função para atualizar o status e salvar no localStorage (para mudanças feitas na Estante)
    const handleStatusChange = (id, newStatus) => {
        const newStatuses = {
            ...bookStatuses,
            [id]: newStatus,
        };
        setBookStatuses(newStatuses);
        localStorage.setItem("bookStatuses", JSON.stringify(newStatuses));
    };

    // Lógica principal: Agrupa os livros por status LIDO/LENDO/ETC.
    const groupedBooks = catalogue.reduce((acc, book) => {
        const status = bookStatuses[book.id] || "Quero ler"; 
        
        if (!acc[status]) {
            acc[status] = [];
        }
        acc[status].push(book);
        return acc;
    }, {});

    const STATUS_ORDEM = ["Lendo", "Quero ler", "Lido", "Relendo", "Abandonei"];
    
    // Filtra e ordena as categorias que possuem livros.
    const orderedCategories = STATUS_ORDEM.filter(status => groupedBooks[status]);

    // Verifica se nenhum livro foi marcado fora do padrão inicial
    const allBooksAreDefault = orderedCategories.length === 1 && orderedCategories[0] === "Quero ler" && groupedBooks["Quero ler"].length === catalogue.length;


    return (
        <div className="listagem-container estante-page">
            <h2 className="estante-title">Minha Estante de Leitura</h2>
            <p className="estante-subtitle">Gerencie seus status de leitura em um só lugar.</p>
            
            {allBooksAreDefault ? (
                <p className="no-filter-message">Marque um livro na página "Início" como "Lido", "Lendo", ou outro status para que ele apareça aqui, agrupado!</p>
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