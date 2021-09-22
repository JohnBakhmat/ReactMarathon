import PokemonCard from "../../../../components/PokemonCard";
import s from "./styles.module.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";
import { useHistory } from "react-router-dom";
// const data = {
//   abilities: ["keen-eye", "tangled-feet", "big-pecks"],
//   base_experience: 270,
//   height: 4,
//   weight: 40,
//   id: 151,
//   img: "https://cdn2.bulbagarden.net/upload/thumb/b/b1/151Mew.png/500px-151Mew.png",
//   name: "Mew",
//   stats: {
//     hp: 63,
//     attack: 60,
//     defense: 55,
//     "special-attack": 50,
//     "special-defense": 50,
//     speed: 71,
//   },
//   type: "psychic",
//   values: {
//     top: 7,
//     right: 5,
//     bottom: 1,
//     left: 2,
//   },
// };
function StartPage() {
  const firebase = useContext(FireBaseContext);
  const pokemonContext = useContext(PokemonContext);
  const history = useHistory();

  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    firebase.getPokemonSocket((pokemons) => {
      setPokemons(pokemons);
    });
  }, [firebase]);

  const handleFlipEvent = (key) => {
    const pokemon = { ...pokemons[key] };
    pokemonContext.addToDeck(key, pokemon);

    setPokemons((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], isSelected: !prevState[key].isSelected },
    }));

    // setPokemons((prevState) => {
    //   return Object.entries(prevState).reduce((acc, item) => {
    //     const pokemon = { ...item[1] };
    //     if (pokemon.id === id) {
    //       pokemon.isSelected ^=true;
    //     }

    //     acc[item[0]] = pokemon;
    //     return acc;
    //   }, {});
    // });
  };

  const handleGameStart = () => {
    history.push("/game/board");
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGameStart}
        disabled={Object.keys(pokemonContext.pokemon).length < 5}
      >
        Start Game
      </button>
      <div className={s.section}>
        {Object.entries(pokemons).map(([key, item]) => (
          <PokemonCard
            key={key}
            firebasekey={key}
            id={item.id}
            name={item.name}
            img={item.img}
            stats={item.stats}
            type={item.type}
            values={item.values}
            isActive={true}
            isSelected={item.isSelected}
            className={s.pokemonCard}
            onClickEvent={() => {
              if (
                Object.keys(pokemonContext.pokemon).length < 5 ||
                item.isSelected
              ) {
                handleFlipEvent(key);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default StartPage;
