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
    fetchPlayerTwoHand: (state) => {
      const copy = state
      copy.playerTwoHand.isLoading = true
      return copy
    },
    fetchPlayerTwoHandResolve: (state, action) => {
      const copy = state
      copy.playerTwoHand.data = action.payload
      copy.playerTwoHand.isLoading = false
      return copy
    },
    changeGameStatus: (state, action) => ({
      ...state,
      gameStatus: action.payload,
    }),
    fetchPlayerOneHand: (state) => {
      const copy = state
      copy.playerOneHand.isLoading = true
      return copy
    },
    fetchPlayerOneHandResolve: (state, action) => {
      const copy = state
      copy.playerOneHand.isLoading = false
      copy.playerOneHand.data = action.payload
      return copy
    },
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
