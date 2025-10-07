import { useState } from "react";
import "./cadastro.css";

export default function Cadastro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState(""); 
 

  const handleSubmit = (e) => {
    e.preventDefault();

    const livrosSalvos = JSON.parse(localStorage.getItem("livros")) || [];

    const novoLivro = { 
      titulo, 
      autor, 
      imagem, 
      genero
    };

    const livrosAtualizados = [...livrosSalvos, novoLivro];
    localStorage.setItem("livros", JSON.stringify(livrosAtualizados));

    setTitulo("");
    setAutor("");
    setImagem(""); 
    setGenero("");
    setMensagem("Livro cadastrado com sucesso!");

    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-form-wrapper">
        <h2>Cadastro de Livro</h2>
        <p>Preencha os campos abaixo para adicionar um novo livro à sua coleção.</p>
        
        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              type="text"
              placeholder="Ex: O Senhor dos Anéis"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="autor">Autor</label>
            <input
              id="autor"
              type="text"
              placeholder="Ex: J.R.R. Tolkien"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genero">Gênero</label>
            <select
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="form-control"
              required
            >
              <option value="">Selecione um gênero</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Romance">Romance</option>
              <option value="Ficção Científica">Ficção Científica</option>
              <option value="Terror">Terror</option>
              <option value="Mistério">Mistério</option>
              <option value="Aventura">Aventura</option>
              <option value="Biografia">Biografia</option>
            </select>
          </div>

          
          <div className="form-group">
            <label htmlFor="imagem">URL da Imagem</label>
            <input
              id="imagem"
              type="url"
              placeholder="Cole aqui o link da imagem da capa"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Cadastrar Livro</button>
        </form>

        {mensagem && <div className="alert alert-success mt-3">{mensagem}</div>}
      </div>
    </div>
  );
}