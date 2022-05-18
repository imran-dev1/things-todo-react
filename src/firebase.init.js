import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
   apiKey: "AIzaSyABTeayOyUbclMRZrhQORCzEWoXh1nHXBY",
   authDomain: "things-todo-react.firebaseapp.com",
   projectId: "things-todo-react",
   storageBucket: "things-todo-react.appspot.com",
   messagingSenderId: "216604275934",
   appId: "1:216604275934:web:0f696cf3405a73526bfe4f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
