// Import the functions you need from the SDKs you need
import axios from 'axios';
import firebase from 'firebase/compat/app';

import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDLNEG_jj29h-DJ0YwGJTNXGx7c-WEhMqA',
  authDomain: 'jb-react-marathon.firebaseapp.com',
  databaseURL: 'https://jb-react-marathon-default-rtdb.firebaseio.com',
  projectId: 'jb-react-marathon',
  storageBucket: 'jb-react-marathon.appspot.com',
  messagingSenderId: '204321349034',
  appId: '1:204321349034:web:413032aa758b303cdf1fd3',
  measurementId: 'G-B0M4LYHTMT',
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonsOnce = async () => {
    return await this.database
      .ref('pokemons')
      .once('value')
      .then((snapshot) => snapshot.val());
  };
  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };
  addPokemon = async (data) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    return await this.database.ref('pokemons/' + newKey).set(data);
  };

  getPokemonSocket = (callBack) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      callBack(snapshot.val());
    });
  };
}
export const userSignUp = ({ email, password }) => {
  const body = {
    email,
    password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
    body
  );
};
export const userLogin = ({ email, password }) => {
  const body = {
    email,
    password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
    body
  );
};
const FirebaseObject = new Firebase();
export default FirebaseObject;
