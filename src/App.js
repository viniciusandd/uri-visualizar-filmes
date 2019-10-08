import React, { useState, useEffect } from 'react';
import './App.css';
import { file } from '@babel/types';

function App() {

  // Inicializando as variaveis que funcionam como atributos
  const [filmes, setFilmes]       = useState([])  
  const [nomeFilme, setNomeFilme] = useState('')  

  const pesquisar = () => {
    fetch('http://www.omdbapi.com/?s='+nomeFilme+'&apikey=796a014c')
    .then(response => response.json())
    .then(json => setFilmes(json.Search));
  }

  const favoritar = (id) => {
    const listaFilmesAtualizados = filmes.map(filme => {
      return filme.imdbID === id ? {...filme, favorito: !filme.favorito} : filme;
    });
    setFilmes(listaFilmesAtualizados);
  }

  return (
    <>
      <br/><br/>
      <input type="text" onChange={e => setNomeFilme(e.target.value)}/>
        <button onClick={() => pesquisar()}>
          Pesquisar
        </button><br/>
      <ul>
        {filmes && filmes.map(filme => {
          return (
          <li key={filme.imdbID}>
            <h3>Titulo: {filme.Title}</h3>
            <h3>Ano: {filme.Year}</h3>
            <button onClick={() => favoritar(filme.imdbID)}>Favoritar</button>
            &nbsp;
            <button>Comparar</button>
            {filme.favorito && <span>Filme favorito!</span>}
            <br/><br/>
            <img src={filme.Poster}/>
          </li>
          )
        })}
      </ul>
    </>
  );
}

export default App;
