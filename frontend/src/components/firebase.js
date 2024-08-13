// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDKRkyy1PvI7rzqPJraw0b4LgsMFNJUYw",
  authDomain: "react-auth-job.firebaseapp.com",
  projectId: "react-auth-job",
  storageBucket: "react-auth-job.appspot.com",
  messagingSenderId: "766724263932",
  appId: "1:766724263932:web:31879592fffc1913b7ac79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;