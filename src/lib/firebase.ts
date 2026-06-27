import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBCpdxyr5yzENnvFVeGU6Wc8xg9WmCKi0",
  authDomain: "tapvybe-b1575.firebaseapp.com",
  projectId: "tapvybe-b1575",
  storageBucket: "tapvybe-b1575.firebasestorage.app",
  messagingSenderId: "1044519155026",
  appId: "1:1044519155026:web:07d3a51c55fe5093db368b",
  measurementId: "G-ZBNWW3L01H",
};

// Super Admin credentials — email is fixed, password is set via Firebase Auth
export const SUPER_ADMIN_EMAIL = "superadmin@tapvybe.com";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
