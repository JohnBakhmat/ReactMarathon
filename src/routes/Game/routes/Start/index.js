import PokemonCard from '../../../../components/PokemonCard';
import s from './styles.module.css';
import { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  getPokemonsAsync,
  selectPokemonsData,
  selectPokemonsLoading,
} from '../../../../store/pokemons';
import { setPlayerHand } from '../../../../store/board';

function StartPage() {
  const history = useHistory();

  const dispatch = useDispatch();

  const pokemonsRedux = useSelector(selectPokemonsData);
  const pokemonsLoadingRedux = useSelector(selectPokemonsLoading);

  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    dispatch(getPokemonsAsync());
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);
  const handleFlipEvent = (key) => {
    setPokemons((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], isSelected: !prevState[key].isSelected },
    }));
  };

  const handleGameStart = () => {
    const hand = Object.values(pokemons).filter((item) => item.isSelected);
    dispatch(setPlayerHand(1, hand));
    // dispatch(setPlayerHand(2));
    history.push('/game/board');
  };
  if ((pokemonsLoadingRedux && pokemonsRedux === null) || !pokemons) {
    return 'Loading...';
  }
  const isButtonEnabled =
    Object.values(pokemons).filter((i) => i.isSelected).length < 5;
  return (
    <div>
      <button
        type="button"
        onClick={handleGameStart}
        disabled={isButtonEnabled}
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
                Object.values(pokemons).filter((i) => i.isSelected).length <
                  5 ||
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
