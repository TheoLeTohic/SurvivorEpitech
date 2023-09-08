// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPQaOXylHp7aRAwHVAMC015Zcg6OJZaYk",
  authDomain: "survivor-fc090.firebaseapp.com",
  databaseURL: "https://survivor-fc090-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "survivor-fc090",
  storageBucket: "survivor-fc090.appspot.com",
  messagingSenderId: "489716387724",
  appId: "1:489716387724:web:0b2b29a6354c43391e50a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;