const user = localStorage.getItem("currentUser");
const authArea = document.getElementById("authArea");

if (authArea) {
  if (user) {
    authArea.innerHTML = `👤 ${user}`;
    authArea.style.cursor = "pointer";
    authArea.onclick = () => window.location.href = "../profile.html";
  } else {
    authArea.innerHTML = "Login / Register";
    authArea.style.cursor = "pointer";
    authArea.onclick = () => window.location.href = "../login.html";
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const questions = shuffle([
  {
    img: "../material/quiz/1.jfif",
    options: ["Attack on Titan", "Vinland Saga", "Tokyo Ghoul", "Jujutsu Kaisen"],
    answer: 0
  },
  {
    img: "../material/quiz/2.jfif",
    options: ["One Punch Man", "Naruto", "Bleach", "Chainsaw Man"],
    answer: 1
  },
  {
    img:  "../material/quiz/3.jfif",
    options: ["Death Note", "Code Geass", "Monster", "Black Clover"],
    answer: 1
  },
  
  {
    img:  "../material/quiz/4.jfif",
    options: ["Haikyu!!", "My Hero Academia", "Demon Slayer", "Fairy Tail"],
    answer: 3
  },
  {
    img: "../material/quiz/5.jfif",
    options: ["One Piece", "Hunter x Hunter", "Dragon Ball Super", "Yu-Gi-Oh!"],
    answer: 1
  },
  {
    img: "../material/quiz/6.jfif",
    options: ["Princess Mononoke", "Howl's Moving Castle", "My Neighbor Totoro", "Spirited Away"],
    answer: 2
  },
  {
    img: "../material/quiz/7.jfif",
    options: ["Hell's Paradise", "Dorohedoro", "Chainsaw Man", "Fire Force"],
    answer: 3
  },
  {
    img: "../material/quiz/8.jfif",
    options: ["Bleach", "Jujutsu Kaisen", "A Silent Voice", "Fullmetal Alchemist"],
    answer: 1
  },
  {
    img: "../material/quiz/9.jfif",
    options: ["Black Clover", "Naruto Shippuden", "Demon Slayer: Kimetsu no Yaiba", "Dr. Stone"],
    answer: 0
  },
  {
    img: "../material/quiz/10.jfif",
    options: ["Your Name", "Weathering with You", "A Silent Voice", "Plastic Memories"],
    answer: 3
  },
  {
    img: "../material/quiz/11.jfif",
    options: ["Space Dandy", "Trigun", "Samurai Champloo", "Cowboy Bebop"],
    answer: 2
  },
  {
    img: "../material/quiz/12.jfif",
    options: ["Fullmetal Alchemist: Brotherhood", "Soul Eater", "Fairy Tail", "The Promised Neverland"],
    answer: 3
  },
  {
    img:"../material/quiz/13.jfif",
    options: ["Slam Dunk", "Gintama", "Rurouni Kenshin", "Hinamatsuri"],
    answer: 0
  },
  {
    img: "../material/quiz/14.jfif",
    options: ["Berserk", "Vinland Saga", "Vagabond", "Claymore"],
    answer: 0
  },
  {
    img: "../material/quiz/15.jfif",
    options: ["Sword Art Online", "Konosuba", "Re:Zero", "That Time I Got Reincarnated as a Slime"],
    answer: 1
  },
  {
    img: "../material/quiz/16.jfif",
    options: ["Kuroko's Basketball", "Haikyu!!", "Free!", "Yowamushi Pedal"],
    answer: 3
  },
  {
    img: "../material/quiz/17.jfif",
    options: ["The Disastrous Life of Saiki K.", "Mob Psycho 100", "Bungo Stray Dogs", "Assassination Classroom"],
    answer: 2
  },
  {
    img: "../material/quiz/18.jfif",
    options: ["5 Centimeters Per Second", "Your Name", "The Garden of Words", "I Want to Eat Your Pancreas"],
    answer: 0
  },
  {
    img:  "../material/quiz/19.jfif",
    options: ["Ghost in the Shell", "Ergo Proxy", "Steins;Gate", "Psycho-Pass"],
    answer: 2
  },
  {
    img: "../material/quiz/20.jfif",
    options: ["Fairy Tail", "Bleach", "One Piece", "Yu Yu Hakusho"],
    answer: 1
  }
]);


let current = 0;
let score = 0;
let totalTime = 0;
let timer = 10;
let interval;

const img = document.getElementById("quiz-img");
const buttons = [...document.querySelectorAll(".answer-btn")];
const timerDisplay = document.getElementById("timer");
const qNumber = document.getElementById("question-num");

function startQuestion() {
  const q = questions[current];

  img.src = q.img;
  qNumber.textContent = `${current + 1} / ${questions.length}`;

  buttons.forEach((btn, idx) => {
    btn.textContent = q.options[idx];
    btn.onclick = () => selectAnswer(idx);
  });

  timer = 10;
  timerDisplay.textContent = timer;
  clearInterval(interval);
  interval = setInterval(countdown, 1000);
}

function countdown() {
  timer--;
  totalTime++;
  timerDisplay.textContent = timer;

  if (timer <= 0) nextQuestion();
}

function selectAnswer(index) {
  if (index === questions[current].answer) score++;
  nextQuestion();
}

function nextQuestion() {
  clearInterval(interval);
  current++;

  if (current >= questions.length) {
    saveScore();
    window.location.href = "../scoreboard.html";
  } else {
    startQuestion();
  }
}

function saveScore() {
  const username = localStorage.getItem("currentUser") || "Guest";

  let scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];

  const existing = scoreboard.find(e => e.username === username && e.game === "Guess Anime");
  if (existing) {
    if (score / questions.length > existing.score / existing.total) {
      existing.score = score;
      existing.total = questions.length;
      existing.timeSpent = totalTime;
      existing.date = new Date().toLocaleString();
    }
  } else {
    scoreboard.push({
      username,
      game: "Guess Anime",
      score,
      total: questions.length,
      timeSpent: totalTime,
      date: new Date().toLocaleString()
    });
  }

  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}

startQuestion();
