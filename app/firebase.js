// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";  
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAHEZcJ8F1WiusYmaw_8rZD2exXFwVW2I",
  authDomain: "hydrobryan-608df.firebaseapp.com",
  databaseURL: "https://hydrobryan-608df-default-rtdb.firebaseio.com",
  projectId: "hydrobryan-608df",
  storageBucket: "hydrobryan-608df.appspot.com",
  messagingSenderId: "112798735952",
  appId: "1:112798735952:web:716001891a223a9f08bb55",
  measurementId: "G-0BLJR0C008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database }