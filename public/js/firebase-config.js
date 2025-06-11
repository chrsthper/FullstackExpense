// public/js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Konfigurasi Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyBs9YlKxRg8zsdedWip_OxnHIAUxYgCewE",
  authDomain: "expense-tracker-app-17f79.firebaseapp.com",
  projectId: "expense-tracker-app-17f79",
  storageBucket: "expense-tracker-app-17f79.appspot.com",
  messagingSenderId: "405060085984",
  appId: "1:405060085984:web:af312b2b79d256ac0a8885",
  measurementId: "G-C56XWMTJJB"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
