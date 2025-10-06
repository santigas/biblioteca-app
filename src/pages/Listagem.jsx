import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

export default function Listagem() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    const armazenados = JSON.parse(localStorage.getItem("livros")) || [];
    setLivros(armazenados);
  }, []);

  return (
    <div>
      <h2>Lista de Livros</h2>
      {livros.map((livro, index) => (
        <BookCard key={index} livro={livro} />
      ))}
    </div>
  );
}