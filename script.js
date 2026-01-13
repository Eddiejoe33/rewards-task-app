<script>
let xp = 320;

/* ===== XP ===== */
function updateXP() {
  document.getElementById("xp").innerText = xp + " XP";
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

/* ===== NAV + SECTIONS ===== */
function showSection(name) {
  // hide all sections
  ["home","tasks","rewards","profile"].forEach(s => {
    document.getElementById(s + "Section").classList.add("hidden");
  });

  // show active section
  document.getElementById(name + "Section").classList.remove("hidden");

  // reset nav styles
  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.remove("text-blue-600","font-medium");
    btn.classList.add("text-gray-500");
  });

  // activate clicked nav
  const activeBtn = document.getElementById(
    "nav" + name.charAt(0).toUpperCase() + name.slice(1)
  );

  activeBtn.classList.remove("text-gray-500");
  activeBtn.classList.add("text-blue-600","font-medium");
}

/* ===== DEFAULT ===== */
document.addEventListener("DOMContentLoaded", () => {
  updateXP();
  showSection("home"); // Home blue by default
});
</script>
