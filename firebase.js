// import * as firebase from "firebase";
//
// const firebaseConfig = {
//     apiKey: "AIzaSyBTyXi7xD19kg3p-sqRHph-g_zUoSsoAKA",
//     authDomain: "smart-home-81ebd.firebaseapp.com",
//     projectId: "smart-home-81ebd",
//     storageBucket: "smart-home-81ebd.appspot.com",
//     messagingSenderId: "304145939648",
//     appId: "1:304145939648:web:e4f63f7a0e160e070e8125",
//     measurementId: "G-EDC747VQHF"
// };
//
// let app;
// if(firebase.apps.length===0){
//     app = firebase.initializeApp(firebaseConfig);
// }
// else{
//     app = firebase.app();
// }
//
// const auth  = firebase.auth()
//
// export {auth}

// import firebase from 'firebase/app';
// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

export { auth };