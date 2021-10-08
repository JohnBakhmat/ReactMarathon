import axios from 'axios';
const service = axios.create({
  baseURL: 'https://reactmarathon-api.netlify.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const herokuApi = axios.create({
  baseURL: 'https://reactmarathon-api.herokuapp.com/api/pokemons',
  headers: {
    'Content-Type': 'text/plain',
    // 'Access-Control-Allow-Origin': '*',
  },
});

const getStartingDeck = () => {
  return herokuApi.get('/starter');
};
const gameStart = (data)=>{
  // console.dir(data)
  return herokuApi.post('/game/start',JSON.stringify(data))
}
const gameProceed = (data)=>{
  return herokuApi.post('/game',JSON.stringify(data))
}
//Netlify
const getBoard = () => {
  return axios.get('https://reactmarathon-api.herokuapp.com/api/pokemons/board');
};
const createPlayer = () => {
  return service.get('/create-player');
};
const playerTurn = (params) => {
  return service.post('/players-turn', JSON.stringify(params));
};


export { getBoard, createPlayer, playerTurn, getStartingDeck,gameStart,gameProceed };
