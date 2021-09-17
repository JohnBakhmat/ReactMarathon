// @ts-nocheck

import PokemonCard from "../../components/PokemonCard/";
import s from "./styles.module.css";
import { useState, useEffect } from "react";
import database from "../../services/firebase"



function GamePage() {

  const [pokemons, setPokemons] = useState({});

  useEffect(()=>{
    database.ref("pokemons").once('value',(snapshot)=>{
      setPokemons(snapshot.val())
    })    
  },[])
  const handleFlipEvent = (id) => {
    



    setPokemons(prevState => {
      return Object.entries(prevState).reduce((acc, item) => {
          const pokemon = {...item[1]};
          if (pokemon.id === id) {
              pokemon.isActive = !pokemon.isActive;
              database.ref(`pokemons/${item[0]}`).set(pokemon)
          };
  
          acc[item[0]] = pokemon;
  
          return acc;
      }, {});
  });
  };
  return (
    <div className={s.section}>
      {
      Object.entries(pokemons).map(([key,item]) => (
        <PokemonCard
          key={key}
          id={item.id}
          name={item.name}
          img={item.img}
          stats={item.stats}
          type={item.type}
          values={item.values}
          isActive={item.isActive}
          onClickEvent={handleFlipEvent}
        />
      ))}
    </div>
  );
}

export default GamePage;
