import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7AxZ9Yj3xopn6uiM4CN9QKjCxb0SClt8",
  authDomain: "aplicativo-financeiro-61e2a.firebaseapp.com",
  projectId: "aplicativo-financeiro-61e2a",
  storageBucket: "aplicativo-financeiro-61e2a.firebasestorage.app",
  messagingSenderId: "407320180826",
  appId: "1:407320180826:web:ec6d0a53e0fb4beef58063"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);