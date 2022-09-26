import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBIer7pFiMMOPd4B1JUmUAa95yputv8qJQ",
  authDomain: "cookie-clicker-v2.firebaseapp.com",
  projectId: "cookie-clicker-v2",
  storageBucket: "cookie-clicker-v2.appspot.com",
  messagingSenderId: "656804963826",
  appId: "1:656804963826:web:662844a0da30d5aa86f76b",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
