import React, { useState, useEffect } from 'react';
import './App.css';
import { file } from '@babel/types';

function App() {

  // Inicializando as variaveis que funcionam como atributos
  const [filmes, setFilmes] = useState([])  
  const [nomeFilme, setNomeFilme] = useState('')
  const [filmesParaComparar, setFilmesParaComparar] = useState([])

  // Estilos
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

  // Funções
  const pesquisarFilme = () => {
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

  const compararFilme = (filme) => {
    const listaFilmesAtualizados = filmes.map(f => {
      return f.imdbID === filme.imdbID ? {...f, comparar: !f.comparar} : f;
    });
    setFilmes(listaFilmesAtualizados);
    filmesParaComparar.length > 0 ? setFilmesParaComparar([...filmesParaComparar, filme]) : setFilmesParaComparar([...filmesParaComparar, filme])
  }
  
  const encerrarComparacaoFilmes = () => {
    const listaFilmesAtualizados = filmes.map(f => {
      return {...f, comparar: false};
    });
    setFilmes(listaFilmesAtualizados);    
    setFilmesParaComparar([])
  }

  return (
    <>
    {filmesParaComparar.length < 2 && 
      <div className="container" style={styleContainer}>
        <div className="row justify-content-md-center">
          <form className="form-inline">
            <div className="form-group mx-sm-3 mb-2">
              <input onChange={e => setNomeFilme(e.target.value)} type="text" className="form-control" placeholder="Digite o nome do filme"/>
            </div>
            <button onClick={() => pesquisarFilme()} type="button" className="btn btn-primary mb-2">Pesquisar</button>
          </form>
        </div>

        {filmes && filmes.map(filme => {
          return (
            <div key={filme.imdbID} className="row justify-content-md-center">
              <div className="card" style={styleCard}>
                <img src={filme.Poster} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 style={styleTitle} className="card-title">{filme.Title}</h5>
                  <p className="card-text"><strong>imdbID: </strong>{filme.imdbID}</p>
                  <p className="card-text"><strong>Tipo: </strong>{filme.Type}</p>
                  <p className="card-text"><strong>Ano: </strong>{filme.Year}</p>                  
                  {filme.favorito && <h6><span className="badge badge-success">Filme favorito!</span></h6>}                
                  {filme.favorito && <button onClick={() => favoritarFilme(filme.imdbID)} href="#" className="btn btn-danger">Desfavoritar</button>}
                  {!filme.favorito && <button onClick={() => favoritarFilme(filme.imdbID)} href="#" className="btn btn-primary">Favoritar</button>}                
                  &nbsp;
                  {filme.comparar && <button onClick={() => compararFilme(filme)} href="#" className="btn btn-success">Comparar</button>}
                  {!filme.comparar && <button onClick={() => compararFilme(filme)} href="#" className="btn btn-secondary">Comparar</button>}
                </div>
              </div>          
          </div>          
          )
        })}
      </div>    
    }

    {filmesParaComparar.length == 2 &&    
    <div className="container">      
      <div className="row">
        {filmesParaComparar && filmesParaComparar.map(filme => {
          return (
            <div class="col-md-4">
              <div className="card" style={styleCard}>
                <img src={filme.Poster} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 style={styleTitle} className="card-title">{filme.Title}</h5>
                  <p className="card-text"><strong>imdbID: </strong>{filme.imdbID}</p>
                  <p className="card-text"><strong>Tipo: </strong>{filme.Type}</p>
                  <p className="card-text"><strong>Ano: </strong>{filme.Year}</p>
                  {filme.favorito && <h6><span className="badge badge-success">Filme favorito!</span></h6>}
                </div>
              </div>                  
            </div>  
          )
        })}
      </div>
      <div className="row justify-content-md-center">
        <button onClick={() => encerrarComparacaoFilmes()} href="#" className="btn btn-danger">Encerrar Comparação</button>
      </div>
    </div>
    }
    </>
  );
}

export default App;
