// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_AYjCGTmAcdlmTG1fqOSXGizY_vw3LXU",
  authDomain: "padonde-1f32f.firebaseapp.com",
  projectId: "padonde-1f32f",
  storageBucket: "padonde-1f32f.appspot.com",
  messagingSenderId: "1004320054176",
  appId: "1:1004320054176:web:7316425655edc0b430e2c5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
