// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbrXfEu35b-J0_PyWpanl7-jRXollNpmU",
  authDomain: "sherby-7b981.firebaseapp.com",
  projectId: "sherby-7b981",
  storageBucket: "sherby-7b981.appspot.com",
  messagingSenderId: "958976944803",
  appId: "1:958976944803:web:e502be49158f5a9d3e6d16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);


export { db,storage, auth, messaging};
