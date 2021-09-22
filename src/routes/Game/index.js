import { useRouteMatch, Route, Switch } from "react-router";
import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import { PokemonContext } from "../../context/pokemonContext";
import { useState } from "react";
const GamePage = () => {
  const match = useRouteMatch();
  const [deck1, setDeck1] = useState({});
  const [deck2, setDeck2] = useState({});

  const handlePokemonSelect = (key, pokemon) => {
    setDeck1((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];
        return copyState;
      }
      return { ...prevState, [key]: pokemon };
    });
  };

  const savePlayerTwoDeck= (deck)=>{
    setDeck2(deck)
  }
  return (
    <PokemonContext.Provider
      value={{
        playerOneHand: deck1,
        playerTwoHand: deck2,
        addToDeck: handlePokemonSelect,
        savePlayerTwoDeck:savePlayerTwoDeck
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
