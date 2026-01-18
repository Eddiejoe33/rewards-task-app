<script type="module">
/* ================= WAIT FOR DOM ================= */
document.addEventListener("DOMContentLoaded", async () => {

/* ================= FIREBASE IMPORTS ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ================= FIREBASE CONFIG ================= */
const firebaseConfig = {
  apiKey: "AIzaSyDImP8ODFS0lxWZ5AdTLi7jTxZzFo6JxeY",
  authDomain: "rewards-task-mvp.firebaseapp.com",
  projectId: "rewards-task-mvp",
  storageBucket: "rewards-task-mvp.appspot.com",
  messagingSenderId: "154842831298",
  appId: "1:154842831298:web:9ff9e24acfaf346aa99e5b"
};

/* ================= INIT ================= */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ================= ELEMENTS (SAFE) ================= */
const emailInput   = document.getElementById("email");
const passwordInput= document.getElementById("password");
const authMsg      = document.getElementById("authMsg");
const authBox      = document.getElementById("authBox");
const appBox       = document.getElementById("app");
const navBar       = document.querySelector(".bottom-nav");
const profileEmail = document.getElementById("profileEmail");
const loader       = document.getElementById("loadingScreen");

/* ================= LOADER FAIL-SAFE ================= */
if (loader) {
  setTimeout(() => loader.style.display = "none", 3000);
}

/* ================= UI HELPERS ================= */
function hideAllSections() {
  document.querySelectorAll(".section").forEach(s =>
    s.classList.remove("active")
  );
}

window.showSection = function (name, btn) {
  hideAllSections();
  document.getElementById(name + "Section")?.classList.add("active");

  document.querySelectorAll(".bottom-nav button")
    .forEach(b => b.classList.remove("active"));

  if (btn) btn.classList.add("active");
};

/* ================= SIGN UP ================= */
document.getElementById("signupBtn")?.addEventListener("click", async () => {
  authMsg.textContent = "";

  if (!emailInput.value || !passwordInput.value) {
    authMsg.textContent = "Enter email & password";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      email: cred.user.email,
      xp: 0,
      createdAt: new Date()
    });

    authMsg.textContent = "Account created ✅";
  } catch (err) {
    authMsg.textContent = err.message;
  }
});

/* ================= LOGIN ================= */
document.getElementById("loginBtn")?.addEventListener("click", async () => {
  authMsg.textContent = "";

  if (!emailInput.value || !passwordInput.value) {
    authMsg.textContent = "Enter email & password";
    return;
  }

  try {
    await signInWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value
    );
  } catch (err) {
    authMsg.textContent = err.message;
  }
});

/* ================= LOGOUT ================= */
window.logout = () => signOut(auth);

/* ================= AUTH STATE ================= */
onAuthStateChanged(auth, async user => {
  if (loader) loader.style.display = "none";

  if (user) {
    authBox.style.display = "none";
    appBox.style.display = "flex";
    navBar.style.display = "flex";

    if (profileEmail) {
      profileEmail.textContent = user.email;
    }

    showSection("home");
  } else {
    authBox.style.display = "block";
    appBox.style.display = "none";
    navBar.style.display = "none";
  }
});

});
</script>
