// Load saved values or start from 0
let faithPoints = localStorage.getItem("faithPoints")
  ? parseInt(localStorage.getItem("faithPoints"))
  : 0;

let credits = localStorage.getItem("credits")
  ? parseInt(localStorage.getItem("credits"))
  : 0;

// Get display elements
const faithEl = document.getElementById("faithPoints");
const creditEl = document.getElementById("credits");

// Update UI and save
function updateUI() {
  faithEl.textContent = faithPoints;
  creditEl.textContent = credits;

  localStorage.setItem("faithPoints", faithPoints);
  localStorage.setItem("credits", credits);
}

// Handle task buttons
document.querySelectorAll(".task-btn").forEach((btn, index) => {

  // If already completed before
  if (localStorage.getItem("task_" + index) === "done") {
    btn.textContent = "Completed";
    btn.classList.add("completed");
    btn.disabled = true;
  }

  btn.addEventListener("click", () => {
    const points = parseInt(btn.dataset.points);
    const type = btn.dataset.type;

    if (type === "faith") {
      faithPoints += points;
    } else {
      credits += points;
    }

    btn.textContent = "Completed";
    btn.classList.add("completed");
    btn.disabled = true;

    localStorage.setItem("task_" + index, "done");
    updateUI();
  });
});

// Initial display
updateUI();
