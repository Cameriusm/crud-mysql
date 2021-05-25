import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDn29MJXCAKSRQyA2qwqFLjTAn-OUUBMjU",
  authDomain: "auth-parser.firebaseapp.com",
  projectId: "auth-parser",
  storageBucket: "auth-parser.appspot.com",
  messagingSenderId: "29473829559",
  appId: "1:29473829559:web:2775da040439f0d3385332",
});

export const auth = app.auth();
export default app;
