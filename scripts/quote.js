const proxy = "https://api.allorigins.win/raw?url=";
const url = "https://api.quotable.io/random";

async function getQuote() {
  try {
    const response = await fetch(proxy + url);
    const data = await response.json();
    document.getElementById("quote").textContent = `"${data.content}" — ${data.author}`;
  } catch (error) {
    document.getElementById("quote").textContent = "⚠️ Failed to load quote!";
  }
}
getQuote();
