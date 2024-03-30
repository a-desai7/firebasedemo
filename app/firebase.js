// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGbqHryFzE2k_G4Jf9xFXxZz_waQQ6wj8",
  authDomain: "fir-demo-1acde.firebaseapp.com",
  databaseURL: "https://fir-demo-1acde-default-rtdb.firebaseio.com",
  projectId: "fir-demo-1acde",
  storageBucket: "fir-demo-1acde.appspot.com",
  messagingSenderId: "26503760699",
  appId: "1:26503760699:web:6452507fd2526c6597c51e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database }