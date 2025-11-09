document.addEventListener("DOMContentLoaded", () => {
  const quoteEl = document.getElementById("quote");
  const newQuoteBtn = document.getElementById("new-quote");

  async function getQuote() {
    try {
      const timestamp = Date.now();
      const response = await fetch(`https://api.allorigins.win/raw?url=https://api.adviceslip.com/advice?t=${timestamp}`);
      const data = await response.json();
      quoteEl.textContent = `"${data.slip.advice}" — AdviceBot 🤖`;
    } catch (error) {
      console.error("Error fetching advice:", error);
      quoteEl.textContent = "⚠️ Failed to load advice!";
    }
  }

  getQuote();

  newQuoteBtn.addEventListener("click", () => {
    quoteEl.textContent = "Loading...";
    getQuote();
  });
});
