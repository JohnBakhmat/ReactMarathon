// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDLNEG_jj29h-DJ0YwGJTNXGx7c-WEhMqA",
  authDomain: "jb-react-marathon.firebaseapp.com",
  databaseURL: "https://jb-react-marathon-default-rtdb.firebaseio.com",
  projectId: "jb-react-marathon",
  storageBucket: "jb-react-marathon.appspot.com",
  messagingSenderId: "204321349034",
  appId: "1:204321349034:web:413032aa758b303cdf1fd3",
  measurementId: "G-B0M4LYHTMT"
};

class Firebase {
  constructor(){
    firebase.initializeApp(firebaseConfig);

    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonOnce = async ()=>{
    return await this.database.ref('pokemons').once('value').then(snapshot=>snapshot.val())
  }
  postPokemon = (key,pokemon)=>{
    this.database.ref(`pokemons/${key}`).set(pokemon)
  }
  addPokemon= (data, callBack)=>{
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref('pokemons/' + newKey).set(data).then(()=>callBack());
  }

  getPokemonSocket = (callBack)=>{
    this.database.ref('pokemons').on('value',(snapshot)=>{
      callBack(snapshot.val())
    })
  }
}


export default Firebase;