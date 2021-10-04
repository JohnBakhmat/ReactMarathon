import axios from 'axios';
const service = axios.create({
  baseURL: 'https://reactmarathon-api.netlify.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});


const getStartingDeck = () => {
  return axios.get('https://reactmarathon-api.herokuapp.com/api/pokemons/starter');
};
const getBoard = () => {
  return service.get('/board');
};
const createPlayer = () => {
  return service.get('/create-player');
};
const playerTurn = (params) => {
  return service.post('/players-turn', JSON.stringify(params));
};

export { getBoard, createPlayer, playerTurn, getStartingDeck };
