// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/messaging";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6r22uPQBahRmtyRsn26WeensEOg5TZ5k",
  authDomain: "chekeaapp-f5abe.firebaseapp.com",
  databaseURL: "https://chekeaapp-f5abe.firebaseio.com",
  projectId: "chekeaapp-f5abe",
  storageBucket: "chekeaapp-f5abe.appspot.com",
  messagingSenderId: "1018071683424",
  appId: "1:1018071683424:web:62b2adfc270f618399ce05",
  measurementId: "G-B0XYV7SVYF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const analytics = getAnalytics(app);


export default app;
