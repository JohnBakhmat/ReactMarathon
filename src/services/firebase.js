// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);
export const analytics = getAnalytics(fire);
const database = firebase.database()


export default database;