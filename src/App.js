import './App.css';
import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pokemons from './components/Pokemons';
import Pokemon from './components/Pokemon';

function App() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className={"pokedex"}>
      <Router>
        <div className={"pokedex-header"}>
          <Link to="/">
            <button className={"pokemon-home-button"}>
              <h1>Pokedex</h1>
            </button>
          </Link>
          <input type="search" placeholder="Search..." onChange={handleChange} value={searchInput} className={"pokemon-search"} />
        </div>
        <Routes>
          <Route path="/pokemon/:pokemonName" element={<Pokemon/>} />
          <Route path="/" element={<Pokemons filter={searchInput}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
