async function getQuote() {
  try {
    const response = await fetch("https://api.allorigins.win/raw?url=https://api.adviceslip.com/advice");
    const data = await response.json();
    document.getElementById("quote").textContent = `"${data.slip.advice}" — AdviceBot 🤖`;
  } catch (error) {
    console.error("Error fetching advice:", error);
    document.getElementById("quote").textContent = "⚠️ Failed to load advice!";
  }
}

getQuote();

document.addEventListener("DOMContentLoaded", () => {
  const newQuoteBtn = document.getElementById("new-quote");
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", getQuote);
  }
});
