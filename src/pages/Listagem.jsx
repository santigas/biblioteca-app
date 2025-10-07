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
    const novos = [...livros];
    novos.splice(index, 1);
    setLivros(novos);
    localStorage.setItem("livros", JSON.stringify(novos));
  }

  return (
    <div className="listagem-container">
      <div className="listagem-grid">
        {livros.map((livro, index) => (
          <BookCard key={index} livro={livro} onRemover={() => removerLivro(index)} />
        ))}
      </div>
    </div>
  );
}

