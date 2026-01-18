<script type="module">
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
  getDoc,
  updateDoc
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

/* ================= ELEMENTS ================= */
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authMsg = document.getElementById("authMsg");
const authBox = document.getElementById("authBox");
const appBox = document.getElementById("app");
const navBar = document.querySelector(".bottom-nav");
const profileEmail = document.getElementById("profileEmail");

/* ================= UI HELPERS ================= */
function hideAllSections() {
  document.querySelectorAll(".section").forEach(s => {
    s.classList.remove("active");
  });
}

window.showSection = function (name, btn) {
  hideAllSections();
  document.getElementById(name + "Section")?.classList.add("active");

  document.querySelectorAll(".bottom-nav button")
    .forEach(b => b.classList.remove("active"));

  if (btn) btn.classList.add("active");
};

/* ================= SIGN UP ================= */
document.getElementById("signupBtn").onclick = async () => {
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
};

/* ================= LOGIN ================= */
document.getElementById("loginBtn").onclick = async () => {
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
};

/* ================= LOGOUT ================= */
window.logout = () => signOut(auth);

/* ================= XP SYSTEM ================= */
let xp = 0;

async function loadXP(uid) {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    xp = snap.exists() ? snap.data().xp || 0 : 0;
  } catch (e) {
    xp = 0;
  }
}

/* ================= AUTH STATE ================= */
onAuthStateChanged(auth, async user => {
  if (user) {
    authBox.style.display = "none";
    appBox.style.display = "flex";
    navBar.style.display = "flex";

    if (profileEmail) {
      profileEmail.textContent = user.email;
    }

    await loadXP(user.uid);
    showSection("home");
  } else {
    authBox.style.display = "block";
    appBox.style.display = "none";
    navBar.style.display = "none";
  }
});
</script>
