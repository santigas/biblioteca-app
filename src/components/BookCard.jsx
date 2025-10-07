export default function BookCard({ livro, onRemover }) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{livro.titulo}</h5>
        <p className="card-text">Autor: {livro.autor}</p>
        <p className="card-text">Gênero: {livro.genero}</p>

        <button className="delete-btn" onClick={onRemover}>
          Excluir
        </button>
      </div>
    </div>
  );
}