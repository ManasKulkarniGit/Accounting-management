// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXBZBHC_PrVse4gk1E7n_Uje5OWbncqYk",
  authDomain: "accounting-f46aa.firebaseapp.com",
  projectId: "accounting-f46aa",
  storageBucket: "accounting-f46aa.appspot.com",
  messagingSenderId: "1045660992977",
  appId: "1:1045660992977:web:e3e3d8947cc1e472d8ccf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export default db;
export {auth};