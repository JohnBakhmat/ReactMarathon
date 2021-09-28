import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

import PokemonCard from '../../../../components/PokemonCard'
import s from './styles.module.css'
import firebase from '../../../../services/firebase'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPlayerTwoHand,
  selectPlayerOneHand,
  selectGameStatus,
  resetGame,
} from '../../../../store/board'
function FinishPage() {
  const playerTwoHandRedux = useSelector(selectPlayerTwoHand)
  const playerOneHandRedux = useSelector(selectPlayerOneHand)
  const gameStatus = useSelector(selectGameStatus)

  const history = useHistory()
  if (!Object.keys(playerOneHandRedux).length) {
    history.replace('/game')
  }
  const [stolenCard, setStolenCard] = useState(null)
  const [playerTwoHandState, setPlayerTwoHandState] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setPlayerTwoHandState(playerTwoHandRedux)
  }, [playerTwoHandRedux])
  const handleCardSelect = (id) => {
    if (gameStatus !== 'Won') return
    setPlayerTwoHandState((prevState) => {
      let newArray = prevState.map((i) => ({ ...i, isSelected: false }))
      newArray.find((i) => i.id === id).isSelected ^= true
      setStolenCard(newArray.find((i) => i.id === id))
      return [...newArray]
    })
  }

  const handleGameEnd = () => {
    if (gameStatus === 'Won') {
      let card = stolenCard
      card.isSelected = false
      firebase.addPokemon(card, () => {})
    }
    dispatch(resetGame())
    history.replace('/game')
  }

  return (
    <div>
      <div className={s.row}>
        {Object.values(playerOneHandRedux).map((item) => (
          <PokemonCard
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.img}
            stats={item.stats}
            type={item.type}
            values={item.values}
            isActive={true}
            isSelected={item.isSelected}
            className={s.pokemonCard}
          />
        ))}
      </div>
      <button
        type="button"
        disabled={stolenCard === null && gameStatus === 'Won'}
        onClick={handleGameEnd}
      >
        End Game
      </button>
      <div className={s.row}>
        {Object.values(playerTwoHandState).map((item) => (
          <PokemonCard
            key={item.id}
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
              handleCardSelect(item.id)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default FinishPage
