import { createSlice } from '@reduxjs/toolkit'
import fb from '../services/firebase'
const initialState = {
  isLoading: false,
  data: {},
  error: null,
}

const pokemons = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    fetchPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
  },
})

export const {
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPokemonsReject,
} = pokemons.actions
export const getPokemonsAsync = () => async (dispatch) => {
  dispatch(fetchPokemons())
  const data = await fb.getPokemonsOnce()
  dispatch(fetchPokemonsResolve(data))
}
export const savePokemon = (card) => async () => {
  await fb.addPokemon(card)
}
export const selectPokemonsLoading = (state) => state.pokemons.isLoading
export const selectPokemonsData = (state) => state.pokemons.data
export default pokemons.reducer
