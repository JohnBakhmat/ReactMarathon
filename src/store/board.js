import { createSlice } from '@reduxjs/toolkit'
import { createPlayer } from '../services/zarApiService'

const initialState = {
  playerOneHand: {
    data: [],
    isLoading: false,
  },
  playerTwoHand: {
    data: [],
    isLoading: false,
  },
  gameStatus: 'Starting',
  firstPlayer: 1 + Math.floor(Math.random() * 2),
}

const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    fetchPlayerTwoHand: (state) => ({
      ...state,
      playerTwoHand: {
        ...state.playerTwoHand,
        isLoading:true
      },
    }),
    fetchPlayerTwoHandResolve: (state, action) => ({
      ...state,
      playerTwoHand:{
        ...state.playerTwoHand,
        data:action.payload,
        isLoading:false
      }
    }),

    changeGameStatus: (state, action) => ({
      ...state,
      gameStatus: action.payload,
    }),

    fetchPlayerOneHand: (state) => ({
      ...state,
      playerOneHand:{
        ...state.playerOneHand,
        isLoading:true
      }
    }),
    fetchPlayerOneHandResolve: (state, action) => ({
      ...state,
      playerOneHand:{
        ...state.playerOneHand,
        isLoading:false,
        data: action.payload
      }
    }),
    resetGameResolve: () => initialState,
  },
})

export const {
  fetchPlayerTwoHand,
  fetchPlayerOneHand,
  fetchPlayerTwoHandResolve,
  fetchPlayerOneHandResolve,
  changeGameStatus,
  resetGameResolve,
} = board.actions

export const getPlayerTwoHand = () => (dispatch) => {
  dispatch(fetchPlayerTwoHand())
  createPlayer().then((response) => {
    const data = response.data.data
    const object = data.map((item) => ({ ...item, possession: 'red' }))
    dispatch(fetchPlayerTwoHandResolve(object))
  })
}
export const setPlayerOneHand = (pokemons) => (dispatch) => {
  dispatch(fetchPlayerOneHand())
  const data = Object.values(pokemons)
    .filter((item) => item.isSelected)
    .map((item) => ({ ...item, possession: 'blue' }))
  dispatch(fetchPlayerOneHandResolve(data))
}

export const setGameStatus = (status) => (dispatch) => {
  dispatch(changeGameStatus(status))
}
export const resetGame = () => (dispatch) => {
  dispatch(resetGameResolve())
}

export const selectPlayerTwoHand = (state) => state.board.playerTwoHand.data
export const selectPlayerOneHand = (state) => state.board.playerOneHand.data
export const selectGameStatus = (state) => state.board.gameStatus

export default board.reducer
