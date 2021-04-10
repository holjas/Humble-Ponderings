import firebase from "firebase/app";
import "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATFPZTVHtZ72yo6V2h7PCav3rsd9aiCms",
  authDomain: "tododanish.firebaseapp.com",
  databaseURL: "https://tododanish-default-rtdb.firebaseio.com",
  projectId: "tododanish",
  storageBucket: "tododanish.appspot.com",
  messagingSenderId: "738369950073",
  appId: "1:738369950073:web:7061ebd2e3277215cadfa8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;