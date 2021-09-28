import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from './pokemons.js'
import boardReducer from './board.js'

export default configureStore({
  reducer: {
    pokemons: pokemonReducer,
    board: boardReducer,
  },
})
