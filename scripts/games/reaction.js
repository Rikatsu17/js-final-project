const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timeLeft");
const startBtn = document.getElementById("startBtn");

let score = 0;
let gameTime = 30;
let gameInterval, ballInterval;

startBtn.addEventListener("click", startGame);

function startGame() {
    score = 0;
    gameTime = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = gameTime;
    gameArea.innerHTML = "";
    startBtn.disabled = true;

    gameInterval = setInterval(updateTime, 1000);
    ballInterval = setInterval(spawnBall, 700);
}

function updateTime() {
    gameTime--;
    timeDisplay.textContent = gameTime;

    if (gameTime <= 0) {
        endGame();
    }
}

function spawnBall() {
    const ball = document.createElement("div");
    ball.classList.add("ball");

    ball.style.background = `hsl(${Math.random() * 360}, 90%, 50%)`;

    ball.style.top = Math.random() * 450 + "px";
    ball.style.left = Math.random() * 850 + "px";

    ball.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = score;
        ball.remove();
    });

    gameArea.appendChild(ball);

    setTimeout(() => ball.remove(), 900);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(ballInterval);
    startBtn.disabled = false;

    saveScore();

    alert(`✅ Game Over!\nScore: ${score}`);

    gameArea.innerHTML = "";
}

function saveScore() {
    const user = localStorage.getItem("currentUser") || "Guest";

    const scoreData = {
        username: user,
        game: "Reaction",
        score: score,
        total: "∞",
        timeSpent: 30
    };

    let scores = JSON.parse(localStorage.getItem("scoreboard")) || [];
    scores.push(scoreData);
    localStorage.setItem("scoreboard", JSON.stringify(scores));
}
