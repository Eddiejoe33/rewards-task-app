<script>
/* ===== XP LOGIC ===== */
let xp = 320;

function updateXP() {
  const xpEl = document.getElementById("xp");
  if (xpEl) xpEl.innerText = xp + " XP";
}

document.getElementById("dailyTask")?.addEventListener("click", () => {
  xp += 20;
  updateXP();
});

document.getElementById("inviteTask")?.addEventListener("click", () => {
  xp += 50;
  updateXP();
});

document.getElementById("redeemBtn")?.addEventListener("click", () => {
  if (xp >= 200) {
    xp -= 200;
    updateXP();
    alert("Reward redeemed!");
  } else {
    alert("Not enough XP");
  }
});

/* ===== SCREEN SWITCHING + BOTTOM NAV ===== */
function showSection(name) {
  // hide all sections
  ["home","tasks","rewards","profile"].forEach(s => {
    const section = document.getElementById(s + "Section");
    if (section) section.classList.add("hidden");
  });

  // show selected section
  document.getElementById(name + "Section")?.classList.remove("hidden");

  // reset nav colors
  ["Home","Tasks","Rewards","Profile"].forEach(n => {
    const nav = document.getElementById("nav" + n);
    if (!nav) return;
    nav.classList.remove("text-blue-600","font-medium");
    nav.classList.add("text-gray-500");
  });

  // activate selected nav
  const activeNav =
    document.getElementById("nav" + name.charAt(0).toUpperCase() + name.slice(1));

  if (activeNav) {
    activeNav.classList.remove("text-gray-500");
    activeNav.classList.add("text-blue-600","font-medium");
  }
}

/* ===== DEFAULT LOAD ===== */
document.addEventListener("DOMContentLoaded", () => {
  updateXP();
  showSection("home");
});
</script>
