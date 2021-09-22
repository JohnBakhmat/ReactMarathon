import React from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { PokemonContext } from "../../../../context/pokemonContext";

function FinishPage() {
  const { pokemon } = useContext(PokemonContext);
  const history = useHistory()

  if(!Object.keys(pokemon).length){
    history.replace('/game')
  }


  return <div>You won!</div>;
}

export default FinishPage;
