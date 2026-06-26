import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR9ZbZv3-7toZPnf9ev7F-ytcvF7d86wI",
  authDomain: "janmitra-ai-7db82.firebaseapp.com",
  projectId: "janmitra-ai-7db82",
  storageBucket: "janmitra-ai-7db82.firebasestorage.app",
  messagingSenderId: "85867019830",
  appId: "1:85867019830:web:4c3f13c82e4814521aa297",
  measurementId: "G-PF2K28L0PN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;