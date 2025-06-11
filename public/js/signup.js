import { auth } from "./firebase-config.js";
import { db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const responseMsg = document.getElementById("responseMsg");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data user di Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });

    responseMsg.textContent = "Signup berhasil! Redirecting...";
    responseMsg.className = "message success";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  } catch (error) {
    console.error("Signup error:", error);
    responseMsg.textContent = error.message;
    responseMsg.className = "message error";
  }
});
