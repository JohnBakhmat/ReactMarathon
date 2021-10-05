import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemons.js';
import boardReducer from './board.js';
import userReducer from './user.js';

export default configureStore({
  reducer: {
    pokemons: pokemonReducer,
    board: boardReducer,
    user: userReducer,
  },
});
