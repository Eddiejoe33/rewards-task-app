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

  if (activeBtn) {
    activeBtn.classList.remove("text-gray-500");
    activeBtn.classList.add("text-blue-600","font-medium");
  }
}

/* ===== DEFAULT ===== */
document.addEventListener("DOMContentLoaded", () => {
  updateXP();
  showSection("home");
});
</script>
