// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZrBx2Emmq9Tmc1vs_H_2jcuw_JvxAX_k",
  authDomain: "urmeetups.firebaseapp.com",
  projectId: "urmeetups",
  storageBucket: "urmeetups.appspot.com",
  messagingSenderId: "408887749409",
  appId: "1:408887749409:web:ab840b200159f709d3ac60",
  measurementId: "G-42FQ0DX4SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);