import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMpaXgdPDArArK8h2xjcPMhQlK2baB0dk",
  authDomain: "linkedin-clone-3594a.firebaseapp.com",
  projectId: "linkedin-clone-3594a",
  storageBucket: "linkedin-clone-3594a.appspot.com",
  messagingSenderId: "77245907282",
  appId: "1:77245907282:web:6a4e1dc6e0135373c4fa8b"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
