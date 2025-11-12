import { useState } from "react";
import "./cadastro.css";

export default function Cadastro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [imagem, setImagem] = useState("");
  const [genero, setGenero] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const livrosSalvos = JSON.parse(localStorage.getItem("livros")) || [];

    const novoLivro = { 
      titulo, 
      autor, 
      imagem, 
      genero,
      // NOVO: Adiciona um status inicial de leitura.
      statusLeitura: "Quero ler" 
    };

    const livrosAtualizados = [...livrosSalvos, novoLivro];
    localStorage.setItem("livros", JSON.stringify(livrosAtualizados));

    setTitulo("");
    setAutor("");
    setImagem("");
    setGenero("");
    setMensagem("Livro cadastrado com sucesso!");

    // Remove a mensagem após 3 segundos
    setTimeout(() => setMensagem(""), 3000); 
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-form-wrapper">
        <h2>Adicionar Novo Livro</h2>
        <p>Preencha os campos abaixo para catalogar um livro em sua biblioteca.</p>

        {mensagem && <p className="alert-success">{mensagem}</p>}

        <form onSubmit={handleSubmit} className="cadastro-form">
          {/* Campo Título */}
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="form-control"
            />
          </div>

          {/* Campo Autor */}
          <div className="form-group">
            <label htmlFor="autor">Autor(a):</label>
            <input
              type="text"
              id="autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              required
              className="form-control"
            />
          </div>

          {/* Campo URL da Imagem (Capa) */}
          <div className="form-group">
            <label htmlFor="imagem">URL da Capa (Opcional):</label>
            <input
              type="url"
              id="imagem"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Campo Gênero */}
          <div className="form-group">
            <label htmlFor="genero">Gênero:</label>
            <input
              type="text"
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="submit-btn">
            Cadastrar Livro
          </button>
        </form>
      </div>
    </div>
  );
}