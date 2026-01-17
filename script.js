<script type="module">
/* ================= FIREBASE ================= */
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

const firebaseConfig = {
  apiKey: "AIzaSyDImP8ODFS0lxWZ5AdTLi7jTxZzFo6JxeY",
  authDomain: "rewards-task-mvp.firebaseapp.com",
  projectId: "rewards-task-mvp",
  storageBucket: "rewards-task-mvp.appspot.com",
  messagingSenderId: "154842831298",
  appId: "PASTE_YOUR_APP_ID_HERE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ================= AUTH ================= */
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authMsg = document.getElementById("authMsg");

document.getElementById("signupBtn").onclick = async () => {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    );

    await setDoc(doc(db, "users", userCred.user.uid), {
      email: userCred.user.email,
      xp: 0
    });

    authMsg.innerText = "Account created ✅";
  } catch (err) {
    authMsg.innerText = err.message;
  }
};

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

/* ================= NAV ================= */
window.showSection = function (name) {
  ["home","tasks","rewards","profile"].forEach(s => {
    document.getElementById(s + "Section")?.classList.add("hidden");
  });

  document.getElementById(name + "Section")?.classList.remove("hidden");

  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.remove("text-blue-600","font-medium");
    btn.classList.add("text-gray-500");
  });

  const activeBtn = document.getElementById(
    "nav" + name.charAt(0).toUpperCase() + name.slice(1)
  );

  activeBtn?.classList.add("text-blue-600","font-medium");
};

/* ================= AUTH STATE ================= */
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("authBox").style.display = "none";
    loadXP(user.uid);
    showSection("home");
  } else {
    document.getElementById("authBox").style.display = "block";
  }
});
</script>
