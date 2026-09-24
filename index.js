/*
  Legacy compatibility file.
  The site-level logic now lives in theme.js so the same behaviour is shared
  uniformly across the homepage and lesson pages.
*/

(function () {
  'use strict';

  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  if (!themeToggle) {
    return;
  }

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    const icon = themeToggle.querySelector('.theme-icon');

    if (icon) {
      icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    localStorage.setItem('mathly-theme', theme);
  }

  const savedTheme = localStorage.getItem('mathly-theme') || 'light';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
})();
