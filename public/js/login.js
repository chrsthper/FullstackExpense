import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan info user di localStorage
    localStorage.setItem("userId", user.uid);
    localStorage.setItem("email", user.email);

    // Arahkan ke halaman utama setelah login
    window.location.href = "expense.html";
  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed: " + err.message);
  }
});
