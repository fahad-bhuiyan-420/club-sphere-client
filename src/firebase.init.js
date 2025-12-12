// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDLD-xMRXoFtCxxoWrN_Ma8AhZO0iF1N9w",
  // authDomain: "club-sphere-cf585.firebaseapp.com",
  // projectId: "club-sphere-cf585",
  // storageBucket: "club-sphere-cf585.firebasestorage.app",
  // messagingSenderId: "908726299276",
  // appId: "1:908726299276:web:ca503450afa6e1274769a9",
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);