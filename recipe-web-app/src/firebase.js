import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAw0zlEohSLf5efyLAxT1BVK0mQgSgji8E",
    authDomain: "recipe-web-app-55874.firebaseapp.com",
    projectId: "recipe-web-app-55874",
    storageBucket: "recipe-web-app-55874.appspot.com",
    messagingSenderId: "698119975415",
    appId: "1:698119975415:web:aa8c9f47818772baf67ef2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

