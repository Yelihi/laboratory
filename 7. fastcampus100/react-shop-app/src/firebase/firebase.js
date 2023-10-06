// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn_kkMaftky0cHt9qg93HR29Ujegx84XM",
  authDomain: "react-next-shop-app-d82a7.firebaseapp.com",
  projectId: "react-next-shop-app-d82a7",
  storageBucket: "react-next-shop-app-d82a7.appspot.com",
  messagingSenderId: "189445782359",
  appId: "1:189445782359:web:5c77b348d87c923e065c12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
