import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhPfEeuXyUBEPePiev1zW8jUI13NJO1bQ",
  authDomain: "clone-1801d.firebaseapp.com",
  databaseURL: "https://clone-1801d.firebaseio.com",
  projectId: "clone-1801d",
  storageBucket: "clone-1801d.appspot.com",
  messagingSenderId: "628432304310",
  appId: "1:628432304310:web:8b857a0e0164c0465d4e17",
  measurementId: "G-YQLBJVRBDJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
// the real time database in firebase

const auth = firebase.auth();

export {db, auth};