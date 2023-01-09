import '../App.css';
import { Link } from 'react-router-dom';
import PokePreview from './PokePreview';
import { useQuery, QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

function FetchPokemons(filter) {
  const { status, data, error } = useQuery({
    queryKey: ['pkmns'],
    queryFn: () => 
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(out => out.results)
  })

  if (status === 'loading') {
    return (<span>Loading...</span>);
  }

  if (status === 'error') {
    return (<span>Error: {error.message}</span>);
  }

  return (
    <ul className={"pokedex-list"}>
      {data.map((pokemon) => {
        if ( filter.filter === '' || (String(pokemon.name)).includes(filter.filter)) {
          return (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
              <li className={"pokemon-link"}> 
                <PokePreview data={pokemon} />
              </li>
            </Link>
          );
        } else {
          return ("");
        }
      })}
    </ul>
  );
}

const Pokemons=(filter)=>{
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <FetchPokemons filter={filter.filter}/>
      </QueryClientProvider>
    </div>
  );
};

export default Pokemons

