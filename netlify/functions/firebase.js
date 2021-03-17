console.log('inside firebase.js')

const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyDXPYkTmzZCg8QlCOY_1nnSEe-61cy3V0A",
  authDomain: "kiei-451-final-project.firebaseapp.com",
  projectId: "kiei-451-final-project",
  storageBucket: "kiei-451-final-project.appspot.com",
  messagingSenderId: "141223762459",
  appId: "1:141223762459:web:de917f4bfaec55705c36be"}; // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase