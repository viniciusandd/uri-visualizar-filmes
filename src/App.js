import React, { useState, useEffect } from 'react';
import './App.css';
import { file } from '@babel/types';

function App() {

  // Inicializando as variaveis que funcionam como atributos
  const [filmes, setFilmes]       = useState([])  
  const [nomeFilme, setNomeFilme] = useState('')

  const styleContainer = {
    marginTop: '20px'
  }

  const styleTitle = {
    textAlign: 'center'
  }
  
  const styleCard = {    
    width: "18rem",
    marginTop: '25px',
    marginBottom: '25px'
  }

  const pesquisar = () => {
    fetch('http://www.omdbapi.com/?s='+nomeFilme+'&apikey=796a014c')
    .then(response => response.json())
    .then(json => setFilmes(json.Search));
  }

  const favoritarFilme = (id) => {
    const listaFilmesAtualizados = filmes.map(filme => {
      return filme.imdbID === id ? {...filme, favorito: !filme.favorito} : filme;
    });
    setFilmes(listaFilmesAtualizados);
  }


  return (
    <>
    <div className="container" style={styleContainer}>
      <div className="row justify-content-md-center">
        <form className="form-inline">
          <div className="form-group mx-sm-3 mb-2">
            <input onChange={e => setNomeFilme(e.target.value)} type="text" className="form-control" placeholder="Digite o nome do filme"/>
          </div>
          <button onClick={() => pesquisar()} type="button" className="btn btn-primary mb-2">Pesquisar</button>
        </form>
      </div>

      {/* <br/><h3 style={styleAlign}><span class="badge badge-secondary">Filmes localizados</span></h3><br/> */}

      {filmes && filmes.map(filme => {
        return (
          <div key={filme.imdbID} className="row justify-content-md-center">
            <div className="card" style={styleCard}>
              <img src={filme.Poster} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 style={styleTitle} className="card-title">{filme.Title}</h5>
                <p className="card-text"><strong>imdbID: </strong>{filme.imdbID}</p>
                <p className="card-text"><strong>Ano: </strong>{filme.Year}</p>
                {filme.favorito && <h6><span className="badge badge-success">Filme favorito!</span></h6>}                
                {filme.favorito && <button onClick={() => favoritarFilme(filme.imdbID)} href="#" className="btn btn-danger">Desfavoritar</button>}
                {!filme.favorito && <button onClick={() => favoritarFilme(filme.imdbID)} href="#" className="btn btn-primary">Favoritar</button>}                
                &nbsp;
                <button href="#" className="btn btn-secondary">Comparar</button>
              </div>
            </div>          
        </div>          
        )
      })}
    </div>

      {/* <input type="text" onChange={e => setNomeFilme(e.target.value)}/>
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
      </ul>         */}
    </>
  );
}

export default App;
