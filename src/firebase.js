// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const REACT_APP_FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const REACT_APP_FIREBASE_API_ID = process.env.REACT_APP_FIREBASE_API_ID;



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: "mct5react-food-delivery-webapp.firebaseapp.com",
  projectId: "mct5react-food-delivery-webapp",
  storageBucket: "mct5react-food-delivery-webapp.appspot.com",
  messagingSenderId: "1061081587239",
  appId: REACT_APP_FIREBASE_API_ID,
  measurementId: "G-0ZDKHK74FG"
};
// console.log(firebaseConfig);
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export default firebase;
const auth=getAuth(firebaseApp);
const FIREBASE_DB = getFirestore(firebaseApp);

export {FIREBASE_DB};
