import "./home.css";
import Header from "../components/header/Header";

export default function Home() {
  return (
    <div className="titulo-home">
      <Header/>
      <h1>Bem-vindo à Biblioteca</h1>
      <p>Cadastre e organize seus livros favoritos!</p>
    </div>
  );
}