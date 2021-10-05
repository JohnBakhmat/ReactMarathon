import { createSlice } from '@reduxjs/toolkit';
import fb, { getPokemonsOnce, postPokemons } from '../services/firebase';
import { selectLocalId } from './user';
const initialState = {
  isLoading: false,
  data: {},
  error: null,
};

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
});

export const { fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject } =
  pokemons.actions;
export const getPokemonsAsync = () => async (dispatch, getState) => {
  dispatch(fetchPokemons());
  const localId = selectLocalId(getState());
  getPokemonsOnce(localId)
    .then((response) => {
      console.dir(response);
      dispatch(fetchPokemonsResolve(response.data));
    })
    .catch((error) => console.dir(error));
};
export const savePokemon = (card) => async (dispatch, getState) => {
  const localId = selectLocalId(getState());
  const idToken = localStorage.getItem('idToken');
  if (idToken) {
    postPokemons([card], localId, idToken);
  }
};
export const selectPokemonsLoading = (state) => state.pokemons.isLoading;
export const selectPokemonsData = (state) => state.pokemons.data;
export default pokemons.reducer;
