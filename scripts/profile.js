document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("currentUser");
  if (!username) return window.location.href = "login.html";

  const user = JSON.parse(localStorage.getItem(username)) || {};

  const usernameField  = document.getElementById("profileUsername");
  const emailField     = document.getElementById("profileEmail");
  const phoneField     = document.getElementById("profilePhone");
  const descField      = document.getElementById("profileDesc");
  const achievementsUI = document.getElementById("achievementsList");

  const oldPassField   = document.getElementById("oldPassword");
  const newPassField   = document.getElementById("newPassword");

  const saveBtn        = document.getElementById("saveBtn");
  const logoutBtn      = document.getElementById("logoutBtn");
  const backBtn        = document.getElementById("backHome");

  usernameField.value = username;
  emailField.value = user.email ?? "";
  phoneField.value = user.phone ?? "";
  descField.value = user.description ?? "";

  const scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];
  const myScores = scoreboard.filter(e => e.username === username);

  achievementsUI.innerHTML =
    myScores.length === 0
      ? "<li>No achievements yet 😔</li>"
      : myScores.map(e => `<li>${e.game}: <b>${e.score}/${e.total}</b></li>`).join("");


  saveBtn.addEventListener("click", () => {
    const newUsername = usernameField.value.trim();

    if (newUsername !== username && localStorage.getItem(newUsername)) {
      return alert("⚠ Username already taken!");
    }

    if (oldPassField.value !== "" || newPassField.value !== "") {

      if (oldPassField.value !== user.password) {
        return alert("❌ Old password is incorrect!");
      }

      if (newPassField.value.length < 4) {
        return alert("⚠ New password must be at least 4 characters!");
      }

      user.password = newPassField.value;
    }

    user.phone = phoneField.value.trim();
    user.description = descField.value.trim();

    if (newUsername !== username) {
      localStorage.removeItem(username);
      localStorage.setItem(newUsername, JSON.stringify(user));
      localStorage.setItem("currentUser", newUsername);
    } else {
      localStorage.setItem(username, JSON.stringify(user));
    }

    alert("✅ Profile updated successfully!");
    location.reload();
  });


  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "main.html";
  });

  backBtn.addEventListener("click", () => {
    window.location.href = "main.html";
  });

});
