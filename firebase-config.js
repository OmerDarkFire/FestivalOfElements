// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwJl-qfFh0HgxDBUWL0_o1A9L3IAAtzO4",
  authDomain: "festivalofelements.firebaseapp.com",
  projectId: "festivalofelements",
  storageBucket: "festivalofelements.firebasestorage.app",
  messagingSenderId: "139897775481",
  appId: "1:139897775481:web:d7610406144e30aa9cbba8",
  measurementId: "G-QKCFX9C1YK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };
