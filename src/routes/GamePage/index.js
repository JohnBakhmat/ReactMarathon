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

  const handleAddPokemon = ()=>{
    const data = {
      "abilities": [
        "keen-eye",
        "tangled-feet",
        "big-pecks"
      ],
      "base_experience": 270,
      "height": 4,
      "weight": 40,
      "id": 151,
      "img": "https://cdn2.bulbagarden.net/upload/thumb/b/b1/151Mew.png/500px-151Mew.png",
      "name": "Mew",
      "stats": {
        "hp": 63,
        "attack": 60,
        "defense": 55,
        "special-attack": 50,
        "special-defense": 50,
        "speed": 71
      },
      "type": "psychic",
      "values": {
        "top": 7,
        "right": 5,
        "bottom": 1,
        "left": 2
      }
    }
    const newKey = database.ref().child('pokemons').push().key;
    database.ref('pokemons/' + newKey).set(data);
    database.ref("pokemons").once('value',(snapshot)=>{
      setPokemons(snapshot.val())
    }) 
  }

  return (
  <div>
    <button type="button" onClick={handleAddPokemon}>Add Pokemon</button>
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
    </div></div>
  );
}

export default GamePage;
