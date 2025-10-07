import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import "./listagem.css";

export default function Listagem() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const armazenados = JSON.parse(localStorage.getItem("livros")) || [];
    setLivros(armazenados);
  }, []);

  function removerLivro(index) {
    const novosLivros = livros.filter((_, i) => i !== index);
    setLivros(novosLivros);
    localStorage.setItem("livros", JSON.stringify(novosLivros));
  }

  return (
    <main className="listagem-container">
      <h2 className="titulo-principal">Lista de Livros</h2>
      {livros.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        livros.map((livro, index) => (
          <BookCard
            key={index}
            livro={livro}
            onRemover={() => removerLivro(index)} // aqui passa a função
          />
        ))
      )}
    </main>
  );
}

