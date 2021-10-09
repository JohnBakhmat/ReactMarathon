import { createSlice } from '@reduxjs/toolkit';
import { createPlayer } from '../services/zarApiService';

const initialState = {
  // playerOneHand: {
  //   data: [],
  //   isLoading: false,
  // },
  // playerTwoHand: {
  //   data: [],
  //   isLoading: false,
  // },
  players: {
    1: {
      data: [],
      isLoading: false,
    },
    2: {
      data: [],
      isLoading: false,
    },
  },
  gameStatus: 'Starting',
  firstPlayer: 2,
  // 1 + Math.floor(Math.random() * 2),
};

const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    fetchPlayer: (state, action) => ({
      ...state,
      players: {
        ...state.players,
        [action.payload]: {
          ...state.players[action.payload],
          isLoading: true,
        },
      },
    }),
    fetchPlayerResolve: (state, action) => ({
      ...state,
      players: {
        ...state.players,
        [action.payload.id]: {
          ...state.players[action.payload.id],
          data: action.payload.data,
          isLoading: false,
        },
      },
    }),

    changeGameStatus: (state, action) => ({
      ...state,
      gameStatus: action.payload,
    }),

    resetGameResolve: () => initialState,
  },
});

export const {
  fetchPlayerTwoHand,
  fetchPlayerOneHand,
  fetchPlayerTwoHandResolve,
  fetchPlayerOneHandResolve,
  changeGameStatus,
  resetGameResolve,
  fetchPlayerResolve,
  fetchPlayer,
} = board.actions;

export const setPlayerHand =
  (id, pokemons = {}, possession = 'blue') =>
  async (dispatch) => {
    dispatch(fetchPlayer(id));
    let data;
    if (Object.keys(pokemons).length === 0) {
      data = (await createPlayer()).data.data.map((item) => ({
        ...item,
        possession: 'red',
      }));
    } else {
      data = pokemons.map((item) => ({ ...item, possession: possession }));
    }
    dispatch(
      fetchPlayerResolve({
        id: id,
        data: data,
      })
    );
  };

export const setGameStatus = (status) => (dispatch) => {
  dispatch(changeGameStatus(status));
};
export const resetGame = () => (dispatch) => {
  dispatch(resetGameResolve());
};

export const selectPlayer = (id) => (state) => state.board.players[id];
export const selectGameStatus = (state) => state.board.gameStatus;
export const getFirstPlayer = (state) => state.board.firstPlayer;

export default board.reducer;
