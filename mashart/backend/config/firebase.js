// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0f4J6fJltXZUI3WqUhqISG9UPL95SUrw",
  authDomain: "mashart-19fd3.firebaseapp.com",
  projectId: "mashart-19fd3",
  storageBucket: "mashart-19fd3.appspot.com",
  messagingSenderId: "1061560459850",
  appId: "1:1061560459850:web:5d01017d5cf49610523cb3",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

export { storage, ref, getDownloadURL, uploadBytes }
