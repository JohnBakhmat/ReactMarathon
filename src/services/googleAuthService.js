import { GoogleAuthProvider } from "firebase/auth";

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')
GoogleProvider.setCustomParameters({
  'login_hint': 'user@example.com'
});

export default GoogleProvider