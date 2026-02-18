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
  setDoc
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
const emailInput   = document.getElementById("email");
const passwordInput= document.getElementById("password");
const authMsg      = document.getElementById("authMsg");
const authBox      = document.getElementById("authBox");
const appBox       = document.getElementById("app");
const navBar       = document.getElementById("bottom-nav");
const profileEmail = document.getElementById("profileEmail");

/* ================= UI SECTIONS ================= */
function hideAllSections() {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active-section"));
}

window.showSection = function(section){
  hideAllSections();
  document.getElementById(section).classList.add("active-section");

  document.querySelectorAll("#bottom-nav button").forEach(b=>b.classList.remove("active"));
  document.getElementById("nav-" + section).classList.add("active");
};

/* ================= SIGN UP ================= */
document.getElementById("signupBtn")?.addEventListener("click", async () => {
  authMsg.textContent = "";

  if (!emailInput.value || !passwordInput.value) {
    authMsg.textContent = "Enter email & password";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);

    await setDoc(doc(db, "users", cred.user.uid), {
      email: cred.user.email,
      points: 0,
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
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (err) {
    authMsg.textContent = err.message;
  }
});

/* ================= LOGOUT ================= */
window.logout = () => signOut(auth);

/* ================= AUTH STATE ================= */
onAuthStateChanged(auth, user => {
  if (user) {
    authBox.style.display = "none";
    appBox.style.display = "block";
    navBar.style.display = "flex";
    profileEmail.textContent = user.email;

    showSection("dashboard");
  } else {
    authBox.style.display = "block";
    appBox.style.display = "none";
    navBar.style.display = "none";
  }
});

/* ================= TASKS + REWARDS ================= */
let tasks = [
  { name: "Task 1", status: "Pending" },
  { name: "Task 2", status: "Completed" }
];
let points = 10;

function renderTasks(){
  const ul = document.getElementById("task-list");
  ul.innerHTML = "";
  tasks.forEach(t=>{
    const li = document.createElement("li");
    li.textContent = `${t.name} - ${t.status}`;
    ul.appendChild(li);
  });
}

function renderRewards(){
  document.getElementById("rewards").innerText = `You have earned: ${points} points`;
}

window.addTask = function(){
  tasks.push({ name: `Task ${tasks.length+1}`, status: "Pending" });
  points += 5;
  renderTasks();
  renderRewards();
};

renderTasks();
renderRewards();

/* ================= PRAYER REQUESTS ================= */
let prayers = [];

window.addPrayer = function(){
  const input = document.getElementById("prayer-input").value.trim();
  if(!input) return alert("Type prayer request");

  prayers.push(input);
  const ul = document.getElementById("prayer-log");
  const li = document.createElement("li");
  li.textContent = input;
  ul.appendChild(li);
  document.getElementById("prayer-input").value = "";
};

/* ================= FAKE PASTOR AI ================= */
window.askAI = function(){
  const input = document.getElementById("ai-input").value.trim();
  if(!input) return alert("Ask something");

  let reply = "🙏 Pastor AI: God is with you.";

  const t = input.toLowerCase();
  if(t.includes("hello")) reply = "Hello my child.";
  if(t.includes("pray")) reply = "🙏 I will pray for you.";
  if(t.includes("problem")) reply = "Every problem shall pass.";
  if(t.includes("task")) reply = "Complete your daily task.";
  if(t.includes("reward")) reply = `You have ${points} points.`;

  const box = document.getElementById("ai-chat");
  box.innerHTML += `<p><b>You:</b> ${input}</p>`;
  box.innerHTML += `<p><b>Pastor AI:</b> ${reply}</p><hr>`;
  document.getElementById("ai-input").value = "";
};
</script>
