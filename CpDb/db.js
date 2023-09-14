const { initializeApp } = require("firebase/app");

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyChWIIaXWTQtuabqk5AIGv0uvkRqmsFYlY",
  authDomain: "survivor-1bcf3.firebaseapp.com",
  projectId: "survivor-1bcf3",
  storageBucket: "survivor-1bcf3.appspot.com",
  messagingSenderId: "1010689040975",
  appId: "1:1010689040975:web:08cccaa850b1e449b6c03a"
};

const app = initializeApp(firebaseConfig);

module.exports =  app;
