import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw45bf9pWy2jRsIq2hOIlgSqcdi-rhfUI",
  authDomain: "test-blog-c9553.firebaseapp.com",
  projectId: "test-blog-c9553",
  storageBucket: "test-blog-c9553.appspot.com",
  messagingSenderId: "425141022826",
  appId: "1:425141022826:web:65b6ccf031298e15909a13"
};


export const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
