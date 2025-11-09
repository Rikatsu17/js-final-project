async function getQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    const quoteEl = document.getElementById("quote");
    quoteEl.textContent = `"${data.content}" — ${data.author}`;
  } catch (error) {
    console.error("Error fetching quote:", error);
    document.getElementById("quote").textContent = "⚠️ Failed to load quote!";
  }
}

getQuote();

document.getElementById("new-quote").addEventListener("click", getQuote);
