// Adicionado onStatusChange como propriedade
export default function BookCard({ livro, onRemover, onStatusChange }) { 
  
  // Array de opções de status (o que você pediu)
  const STATUS_OPCOES = [
    "Quero ler",
    "Lendo",
    "Lido",
    "Relendo",
    "Abandonei",
  ];

  const imagemUrl = livro.imagem || "/placeholder.png"; 

  // Handler para a mudança de status
  const handleStatusChange = (e) => {
    // Chama a função passada pelo Listagem.jsx com o novo valor
    onStatusChange(e.target.value); 
  };

  return (
    <div className="book-card">
      <img
        src={imagemUrl}
        alt={`Capa do livro ${livro.titulo}`}
        className="book-card-image"
      />
      <div className="book-card-content">
        <h3>{livro.titulo}</h3>
        <p className="book-card-author">por {livro.autor}</p>
        <p className="book-card-genre">Gênero: {livro.genero}</p>

        {/* INÍCIO: Seletor de Status de Leitura */}
        <div className="book-status-group">
          <label htmlFor={`status-${livro.titulo}`}>Status:</label>
          <select
            id={`status-${livro.titulo}`}
            // Usa o status atual do livro. Se não existir (livros antigos), define como 'Quero ler'
            value={livro.statusLeitura || "Quero ler"} 
            onChange={handleStatusChange}
            className="book-status-select"
          >
            {STATUS_OPCOES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        {/* FIM: Seletor de Status de Leitura */}

        <button className="delete-btn" onClick={onRemover}>
          Excluir
        </button>
      </div>
    </div>
  );
}