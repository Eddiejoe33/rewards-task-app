<script>
/* =====================
   XP STATE (LOCALSTORAGE)
===================== */
let xp = localStorage.getItem("xp")
  ? parseInt(localStorage.getItem("xp"))
  : 320;

/* =====================
   UPDATE XP UI
===================== */
function updateXP() {
  document.getElementById("xp").innerText = xp + " XP";
  localStorage.setItem("xp", xp);
}

/* =====================
   TASK BUTTONS
===================== */
document.getElementById("dailyTask").onclick = () => {
  xp += 20;
  alert("Daily task completed! +20 XP");
  updateXP();
};

document.getElementById("inviteTask").onclick = () => {
  xp += 50;
  alert("Friend invited! +50 XP");
  updateXP();
};

document.getElementById("redeemBtn").onclick = () => {
  if (xp >= 200) {
    xp -= 200;
    alert("Reward redeemed!");
    updateXP();
  } else {
    alert("Not enough XP");
  }
};

/* =====================
   SECTION NAVIGATION
===================== */
function showSection(name) {
  ["home","tasks","rewards","profile"].forEach(section => {
    document.getElementById(section + "Section").classList.add("hidden");
  });

  document.getElementById(name + "Section").classList.remove("hidden");

  ["navHome","navTasks","navRewards","navProfile"].forEach(nav => {
    document.getElementById(nav).classList.remove("text-blue-600","font-medium");
    document.getElementById(nav).classList.add("text-gray-500");
  });

  const activeNav = "nav" + name.charAt(0).toUpperCase() + name.slice(1);
  document.getElementById(activeNav).classList.remove("text-gray-500");
  document.getElementById(activeNav).classList.add("text-blue-600","font-medium");
}

/* =====================
   INIT APP
===================== */
updateXP();
showSection("home");
</script>
