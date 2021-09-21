import { useRouteMatch, Route, Switch } from "react-router";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import { PokemonContext } from "../../context/pokemonContext";
import { useEffect, useState } from "react";
const GamePage = () => {
  const match = useRouteMatch();
  const [deck, setDeck] = useState({});

  const handlePokemonSelect = (key, pokemon) => {
    setDeck((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];
        return copyState;
      }
      return { ...prevState, [key]: pokemon };
    });
  };
  return (
    <PokemonContext.Provider
      value={{
        pokemon: deck,
        addToDeck: handlePokemonSelect,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};
export default GamePage;
