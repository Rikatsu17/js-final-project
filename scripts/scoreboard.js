const user = localStorage.getItem("currentUser");
const authArea = document.getElementById("authArea");

if (user) {
  authArea.innerHTML = `👤 ${user}`;
  authArea.style.cursor = "pointer";
  authArea.addEventListener("click", () => {
    window.location.href = "profile.html";
  });

} else {
  authArea.innerHTML = "Login / Register";
  authArea.style.cursor = "pointer";
  authArea.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}


function saveScore(gameName, score, total, timeSpent) {
  const username = localStorage.getItem("currentUser");
  if (!username) return;

  let scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];

  const existing = scoreboard.find(
      (entry) => entry.username === username && entry.game === gameName
  );

  if (existing) {
      const oldScorePercent = existing.score / existing.total;
      const newScorePercent = score / total;

      if (newScorePercent <= oldScorePercent) {
          console.log("💾 Old score is better — not saving.");
          return;
      }

      existing.score = score;
      existing.total = total;
      existing.timeSpent = timeSpent;
      console.log("✅ Updated best score.");
  } else {
      scoreboard.push({
          username,
          game: gameName,
          score,
          total,
          timeSpent,
      });
      console.log("✅ Saved new score.");
  }

  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}


$(document).ready(function () {
  loadScoreboard();
});

function loadScoreboard() {
  const scoreTable = $("#scoreTableBody");
  scoreTable.html(""); 

  let scores = JSON.parse(localStorage.getItem("scoreboard")) || [];

  if (scores.length === 0) {
      scoreTable.append(`<tr><td colspan="5">No scores yet 🚫</td></tr>`);
      return;
  }

  scores.sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent);

  scores.forEach((entry, index) => {
      scoreTable.append(`
          <tr>
              <td>${index + 1}</td>
              <td>${entry.username}</td>
              <td>${entry.game}</td>
              <td>${entry.score} / ${entry.total}</td>
              <td>${entry.timeSpent}s</td>
          </tr>
      `);
  });
}


document.getElementById("searchInput").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const rows = document.querySelectorAll("#scoreTableBody tr");

  rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(filter) ? "" : "none";
  });
});


document.getElementById("clearScores").addEventListener("click", () => {
  if (!confirm("⚠️ Are you sure you want to delete all scores?")) return;

  localStorage.removeItem("scoreboard");
  loadScoreboard();
});
