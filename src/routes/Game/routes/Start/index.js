import PokemonCard from '../../../../components/PokemonCard'
import s from './styles.module.css'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { FireBaseContext } from '../../../../context/firebaseContext'
import { PokemonContext } from '../../../../context/pokemonContext'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {getPokemons, getPokemonsAsync, selectPokemonsData, selectPokemonsLoading} from '../../../../store/pokemons'
import {setPlayerOneHand} from "../../../../store/board"

function StartPage() {
  const firebase = useContext(FireBaseContext)
  const pokemonContext = useContext(PokemonContext)
  const history = useHistory()

  const dispatch = useDispatch()
  const pokemonsRedux = useSelector(selectPokemonsData)

  
  const [pokemons, setPokemons] = useState({})
  const isButtonEnabled = Object.values(pokemons).filter(i=>i.isSelected).length < 5
  useEffect(() => {
    dispatch(getPokemonsAsync())
  }, [firebase])

  useEffect(()=>{
    setPokemons(pokemonsRedux)
  },[pokemonsRedux])
  
  const handleFlipEvent = (key) => {
    dispatch(setPlayerOneHand(pokemons[key]))
    setPokemons((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], isSelected: !prevState[key].isSelected },
    }))
  }

  const handleGameStart = () => {
    history.push('/game/board')
  }

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
                Object.keys(pokemonContext.playerOneHand).length < 5 ||
                item.isSelected
              ) {
                handleFlipEvent(key)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default StartPage
