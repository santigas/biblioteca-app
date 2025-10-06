import { useState, useEffect } from "react";

export default function Cadastro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [livros, setLivros] = useState(() => {
    return JSON.parse(localStorage.getItem("livros")) || [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoLivro = { titulo, autor, genero };
    const atualizados = [...livros, novoLivro];
    setLivros(atualizados);
    localStorage.setItem("livros", JSON.stringify(atualizados));
    setTitulo("");
    setAutor("");
    setGenero("");
  };

  return (
    <div>
      <h2>Cadastro de Livro</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Título" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          className="form-control mb-2"
          required
        />
        <input 
          type="text" 
          placeholder="Autor" 
          value={autor} 
          onChange={(e) => setAutor(e.target.value)} 
          className="form-control mb-2"
          required
        />
        <input 
          type="text" 
          placeholder="Gênero" 
          value={genero} 
          onChange={(e) => setGenero(e.target.value)} 
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}