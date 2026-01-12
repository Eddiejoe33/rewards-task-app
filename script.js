let faithPoints = localStorage.getItem("faithPoints")
  ? parseInt(localStorage.getItem("faithPoints"))
  : 0;

let credits = localStorage.getItem("credits")
  ? parseInt(localStorage.getItem("credits"))
  : 0;

const faithEl = document.getElementById("faithPoints");
const creditEl = document.getElementById("credits");

function updateUI() {
  faithEl.innerText = faithPoints;
  creditEl.innerText = credits;

  localStorage.setItem("faithPoints", faithPoints);
  localStorage.setItem("credits", credits);
}

document.querySelectorAll(".task-btn").forEach((btn, index) => {
  if (localStorage.getItem("task_" + index) === "done") {
    btn.innerText = "Completed";
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

    btn.innerText = "Completed";
    btn.classList.add("completed");
    btn.disabled = true;

    localStorage.setItem("task_" + index, "done");
    updateUI();
  });
});

updateUI();
