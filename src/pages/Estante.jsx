// santigas/biblioteca-app/biblioteca-app-9059e10258ab4d082fa551499dc573179f3f949b/src/pages/Listagem.jsx

import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import "./listagem.css";

export default function Listagem() {
  const [livros, setLivros] = useState([]);

  // Função auxiliar para salvar a lista de livros no localStorage
  function salvarLivros(novosLivros) {
    setLivros(novosLivros);
    localStorage.setItem("livros", JSON.stringify(novosLivros));
  }

  useEffect(() => {
    const armazenados = JSON.parse(localStorage.getItem("livros")) || [];
    
    // NOVO: Adiciona 'statusLeitura' se não existir (para livros cadastrados antes da mudança)
    const livrosComStatus = armazenados.map(livro => ({
      ...livro,
      statusLeitura: livro.statusLeitura || "Quero ler" 
    }));

    setLivros(livrosComStatus);
  }, []);

  function removerLivro(index) {
    const novos = [...livros];
    novos.splice(index, 1);
    salvarLivros(novos); 
  }

  // NOVO: Lida com a mudança de status de leitura no livro específico
  function handleStatusChange(index, newStatus) {
    const novos = livros.map((livro, i) => {
      if (i === index) {
        // Retorna uma cópia do livro com o novo status
        return { ...livro, statusLeitura: newStatus }; 
      }
      return livro;
    });
    salvarLivros(novos); // Salva o estado atualizado no state e localStorage
  }

  return (
    <div className="listagem-container">
      <div className="listagem-grid">
        {livros.map((livro, index) => (
          <BookCard 
            key={index} 
            livro={livro} 
            onRemover={() => removerLivro(index)} 
            // NOVO: Conecta o evento de mudança do BookCard com a função que salva o status
            onStatusChange={(newStatus) => handleStatusChange(index, newStatus)} 
          />
        ))}
         {livros.length === 0 && (
          <p>Você não tem livros cadastrados. Vá para "Cadastro" para adicionar um novo livro.</p>
        )}
      </div>
    </div>
  );
}