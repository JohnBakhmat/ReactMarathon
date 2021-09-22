// import axios from "axios";
const axios = require("axios")
const service = axios.create({
	baseURL: 'https://reactmarathon-api.netlify.app/api',
	headers: {
	  'Content-Type': 'application/json',
	},
  })
const getBoard= (callback)=>{
	service.get('/board').then(resp=>{
		callback(resp.data.data)
	})
}
const createPlayer=(callback)=>{
	service.get('/create-player').then(resp=>{
		callback(resp.data.data)
	})

}
const playerTurn=(params,callback)=>{
	service.post('/player-turn',JSON.stringify(params)).then(resp=>{
		callback(resp.data)
	})
}
// getBoard((data)=>{console.log(data)})
createPlayer((data)=>{console.log(data)})
// playerTurn((data)=>{console.log(data)})