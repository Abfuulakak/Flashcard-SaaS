// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlTDDaQS44Jpia6CadzXFTd3huEMqfnjE",
  authDomain: "flashcardsaas-b3cf6.firebaseapp.com",
  projectId: "flashcardsaas-b3cf6",
  storageBucket: "flashcardsaas-b3cf6.appspot.com",
  messagingSenderId: "924736755141",
  appId: "1:924736755141:web:e57e5a7d0ceac0387e27ac",
  measurementId: "G-0G9C7SCKZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }
