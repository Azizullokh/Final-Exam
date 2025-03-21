import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfgSyc5kkwIiMFSisCMAbvgekNXYI14O0",
  authDomain: "pinterest-80d5c.firebaseapp.com",
  projectId: "pinterest-80d5c",
  storageBucket: "pinterest-80d5c.appspot.com",
  messagingSenderId: "556485957491",
  appId: "1:556485957491:web:017f7ecb76b542ee811706",
  measurementId: "G-KQQ06JFX0H",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
