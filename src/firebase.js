import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS6rN5guzn9ZE5Cfqzo2sp3cPRz6KkhdY",
  authDomain: "humbleponderings.firebaseapp.com",
  databaseURL: "https://humbleponderings-default-rtdb.firebaseio.com",
  projectId: "humbleponderings",
  storageBucket: "humbleponderings.appspot.com",
  messagingSenderId: "450362581872",
  appId: "1:450362581872:web:8b2d8fbda175cfd7f3a5b5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
