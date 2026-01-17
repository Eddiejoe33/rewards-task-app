<script type="module">
/* ================= FIREBASE IMPORTS ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ================= FIREBASE CONFIG ================= */
/* 🔴 REPLACE ONLY THE VALUES BELOW */
const firebaseConfig = {
  apiKey: "AIzaSyDImP8ODFS0lxWZ5AdTLi7jTxZzFo6JxeY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "PASTE_APP_ID_HERE"
};

/* ================= INIT ================= */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ================= AUTH ELEMENTS ================= */
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authMsg = document.getElementById("authMsg");
const authBox = document.getElementById("authBox");

/* ================= SIGN UP ================= */
document.getElementById("signupBtn").onclick = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      email: cred.user.email,
      xp: 0,
      createdAt: new Date()
    });

    authMsg.innerText = "Account created ✅";
  } catch (err) {
    authMsg.innerText = err.message;
  }
};

/* ================= LOGIN ================= */
document.getElementById("loginBtn").onclick = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );
    authMsg.innerText = "Logged in ✅";
  } catch (err) {
    authMsg.innerText = err.message;
  }
};

/* ================= XP LOGIC ================= */
let xp = 0;

async function loadXP(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  xp = snap.exists() ? snap.data().xp : 0;
  updateXP();
}

async function saveXP(uid) {
  await updateDoc(doc(db, "users", uid), { xp });
}

function updateXP() {
  const el = document.getElementById("xp");
  if (el) el.innerText = xp + " XP";
}

/* ================= TASK BUTTONS ================= */
document.getElementById("dailyTask")?.addEventListener("click", async () => {
  xp += 20;
  updateXP();
  saveXP(auth.currentUser.uid);
});

document.getElementById("inviteTask")?.addEventListener("click", async () => {
  xp += 50;
  updateXP();
  saveXP(auth.currentUser.uid);
});

document.getElementById("redeemBtn")?.addEventListener("click", async () => {
  if (xp >= 200) {
    xp -= 200;
    updateXP();
    saveXP(auth.currentUser.uid);
    alert("Reward redeemed 🎉");
  } else {
    alert("Not enough XP");
  }
});

/* ================= NAVIGATION ================= */
window.showSection = function (name) {
  ["home","tasks","rewards","profile"].forEach(s => {
    document.getElementById(s + "Section")?.classList.add("hidden");
  });
  document.getElementById(name + "Section")?.classList.remove("hidden");
};

/* ================= AUTH STATE ================= */
onAuthStateChanged(auth, user => {
  if (user) {
    authBox.style.display = "none";
    loadXP(user.uid);
    showSection("home");
  } else {
    authBox.style.display = "block";
  }
});
</script>
