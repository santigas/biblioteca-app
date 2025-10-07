import { useState } from "react";
import "./cadastro.css"; // Importando o CSS

export default function Cadastro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pega os livros já existentes no localStorage
    const livrosSalvos = JSON.parse(localStorage.getItem("livros")) || [];
    
    const novoLivro = { titulo, autor, genero };
    
    // Adiciona o novo livro à lista
    const livrosAtualizados = [...livrosSalvos, novoLivro];
    
    // Salva a lista atualizada no localStorage
    localStorage.setItem("livros", JSON.stringify(livrosAtualizados));
    
    // Limpa os campos do formulário
    setTitulo("");
    setAutor("");
    setGenero("");

    // Exibe uma mensagem de sucesso
    setMensagem("Livro cadastrado com sucesso!");
    setTimeout(() => setMensagem(""), 3000); // Limpa a mensagem após 3 segundos
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
            <input 
              id="genero"
              type="text" 
              placeholder="Ex: Fantasia" 
              value={genero} 
              onChange={(e) => setGenero(e.target.value)} 
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Cadastrar Livro</button>
        </form>
        {mensagem && <div className="alert alert-success mt-3">{mensagem}</div>}
      </div>
    </div>
  );
}