const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const THEME_KEY = 'arcade_theme';

function applyTheme(theme){
  if(theme === 'dark'){
    body.classList.add('theme-dark');
    toggleBtn.textContent = '☀️';
    toggleBtn.setAttribute('aria-pressed','true');
  } else {
    body.classList.remove('theme-dark');
    toggleBtn.textContent = '🌙';
    toggleBtn.setAttribute('aria-pressed','false');
  }
}

const saved = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(saved);

toggleBtn.addEventListener('click', () => {
  const current = body.classList.contains('theme-dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  
  applyTheme(next);
  document.dispatchEvent(new Event("themeChanged"));

});

document.querySelectorAll('.art-card').forEach(card => {
  card.addEventListener('keypress', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      const link = card.querySelector('a');
      if(link) link.click();
    }
  });
});
