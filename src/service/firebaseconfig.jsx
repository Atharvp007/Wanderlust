// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0SIgM6GWGYUD_i8c2VC6-pnvBV2T-qdU",
  authDomain: "ai-travel-planner-18700.firebaseapp.com",
  projectId: "ai-travel-planner-18700",
  storageBucket: "ai-travel-planner-18700.firebasestorage.app",
  messagingSenderId: "427717034528",
  appId: "1:427717034528:web:d25d13a2605a0993ea7245",
  measurementId: "G-2WN945V3T4"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app)
//const analytics = getAnalytics(app);