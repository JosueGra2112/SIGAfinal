// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCJLJPTXJuQj9IVAPIa5jzAZ75FJ7QO8Bw",
  authDomain: "push-siga.firebaseapp.com",
  projectId: "push-siga",
  storageBucket: "push-siga.appspot.com",
  messagingSenderId: "812030668721",
  appId: "1:812030668721:web:a4afd1d212d5fae8f25790",
  measurementId: "G-F4L287MBG5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta el servicio de mensajería
export const messaging = getMessaging(app);
