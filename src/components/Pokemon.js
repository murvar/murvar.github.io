import '../App.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

function capitalizeFirstLetter(string) {
  return (string.charAt(0).toUpperCase() + string.slice(1));
}

function abbreviate(string) {
  switch(string) {
    case string = "hp":
        return("HP");
    case string = "attack":
        return("ATK");
    case string = "defense":
        return("DEF");
    case string = "special-attack":
        return("SP.ATK");
    case string = "special-defense":
        return("SP.DEF");
    case string = "speed":
        return("SPD");
    default:
        return("ERROR");
  }
}

function GeneratePokemon() {

  const { pokemonName } = useParams();
  const { status, data, error } = useQuery({
    queryKey: [pokemonName],
    queryFn: () => 
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
    .then(response => response.json())
  });

  if (status === 'loading') {
    return (<span>Loading...</span>);
  }

  if (status === 'error') {
    return (<span>Error: {error.message}</span>);
  }

  const types = [];

  for (let i = 0; i < data.types.length; i++) {
    types.push(data.types[i]['type']['name']);
  }

  const stats = data.stats;

  return (
    <div className={'pokemon-page'}>
      <div className={'pokemon-page-top ' + data.types[0]['type']['name']}>
        <img src={data.sprites.other.dream_world.front_default} alt={data.name} className={'pokemon-image'}/>      
      </div>
      <div className={'pokemon-page-bottom'}>
        <div className={'pokemon-page-name pokemon-name'}>
          <p className={''}>#{String(data.id).padStart(3, '0')}</p>
          <h1 className={''}>{data.name.toUpperCase()}</h1>
        </div>
        <div className={'pokemon-page-types'}>
          <ul className={'pokemon-type-list'}>
            {types.map((type) => (
              <li className={type + " pokemon-type"} key={String(type)}>
                {capitalizeFirstLetter(type)}
              </li>
            ))}
          </ul>
        </div>
        <div className={'pokemon-page-size pokemon-name'}>
          <div className={'pokemon-page-weight'}>
            <h3 className={''}>{String(data.weight)/10} KG</h3>
            <p className={''}>Weight</p>
          </div>
          <div className={'pokemon-page-height'}>
            <h3 className={''}>{String(data.height)/10} M</h3>
            <p className={''}>Height</p>
          </div>
        </div>
        <div className={'pokemon-page-stats pokemon-name'}>
          <h3 className={''}>Base Stats</h3>
          <ul className={'pokemon-stats-ul'}>
            {stats.map((stat) => (
              <li className={'pokemon-stats-list'} key={stat["stat"]["name"]}>
                <div className={'pokemon-stats-titles'}>
                  {abbreviate(stat["stat"]["name"])}
                </div>
                <div className={"pokemon-stat-progress"}>
                  <div className={stat["stat"]["name"] + " pokemon-stat-bar"} style={{width: stat["base_stat"]}}>
                    {stat["base_stat"] + "/300"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Pokemon() {
  return (
    <QueryClientProvider client={queryClient}>
      <GeneratePokemon />
    </QueryClientProvider>
  );
}

export default Pokemon