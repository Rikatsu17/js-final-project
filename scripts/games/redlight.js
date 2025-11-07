const player = document.getElementById("player");
const statusText = document.getElementById("statusText");
const btn = document.getElementById("actionBtn");
const bgMusic = document.getElementById("bgMusic"); 

let position = 0;
let running = false;
let currentLight = "red";
let moveInterval;
let startTime = null;
let endTime = null;

const SPEED = 1.2;      
const FINISH = 900;

function getPlayerImage(state) {
    const theme = document.documentElement.getAttribute("data-theme");
    const isDark = theme === "dark";

    if (state === "run") {
        return isDark ? "../material/run_dark.gif" : "../material/jackson.gif";
    } else {
        return isDark ? "../material/idle_dark.png" : "../material/jackson.gif";
    }
}

player.src = getPlayerImage("stop");

document.addEventListener("themeChanged", () => {
    player.src = getPlayerImage(running ? "run" : "stop");
});

function switchLight() {
    const randomTime = Math.floor(Math.random() * 3000) + 3000;

    setTimeout(() => {
        currentLight = currentLight === "red" ? "green" : "red";

        if (currentLight === "green") {
            statusText.textContent = "GREEN — RUN!";
            statusText.classList.remove("red");
            statusText.classList.add("green");
        } else {
            statusText.textContent = "RED — STOP!";
            statusText.classList.remove("green");
            statusText.classList.add("red");

            if (running) {
                gameOver("❌ You moved on RED!", false);
                return;
            }
        }

        switchLight();
    }, randomTime);
}
switchLight();

btn.addEventListener("click", () => {
    if (!running && currentLight === "green") {
        startRunning();
    } else {
        stopRunning();
    }
});

function startRunning() {
    if (!startTime) startTime = Date.now();

    bgMusic.play().catch(() => {}); 

    running = true;
    btn.textContent = "STOP";
    player.src = getPlayerImage("run");
    player.classList.add("running"); 

    moveInterval = setInterval(() => {
        if (currentLight === "red") {
            gameOver("❌ You moved on RED!", false);
            return;
        }

        position += SPEED;
        player.style.transform = `translateX(${position}px)`;

        if (position >= FINISH) {
            gameOver("✅ YOU WIN!", true);
        }
    }, 16);
}

function stopRunning() {
    running = false;
    btn.textContent = "RUN";
    player.src = getPlayerImage("stop");
    player.classList.remove("running");
    clearInterval(moveInterval);
}

function saveScore(didWin, timeSpent) {
    const username = localStorage.getItem("currentUser") || "Guest";

    const result = {
        username,
        game: "Red Light",
        score: didWin ? 1 : 0,
        total: 1,
        timeSpent: timeSpent
    };

    let scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];
    scoreboard.push(result);
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}

function gameOver(message, didWin) {
    stopRunning();
    endTime = Date.now();

    const timeSpent = ((endTime - startTime) / 1000).toFixed(2);

    saveScore(didWin, timeSpent);

    setTimeout(() => {
        alert(`${message}\n⏱ Time: ${timeSpent}s`);
        window.location.reload();
    }, 300);
}
