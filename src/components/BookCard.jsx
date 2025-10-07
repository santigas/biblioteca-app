export default function BookCard({ livro, onRemover }) {
  const imagemUrl = livro.imagem || "/placeholder.png"; 

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
        <button className="delete-btn" onClick={onRemover}>Excluir</button>
      </div>
    </div>
  );
}