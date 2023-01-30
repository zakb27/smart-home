import { initializeApp } from 'firebase/app';
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBTyXi7xD19kg3p-sqRHph-g_zUoSsoAKA",
    authDomain: "smart-home-81ebd.firebaseapp.com",
    projectId: "smart-home-81ebd",
    storageBucket: "smart-home-81ebd.appspot.com",
    messagingSenderId: "304145939648",
    appId: "1:304145939648:web:e4f63f7a0e160e070e8125",
    measurementId: "G-EDC747VQHF"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const db = getFirestore(app);
export { auth,db };