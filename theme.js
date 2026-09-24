(function () {
  const body = document.body;
  const savedTheme = localStorage.getItem('mathly-theme') || 'light';

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    const toggle = document.querySelector('.theme-toggle');
    const icon = toggle ? toggle.querySelector('.theme-icon') : null;
    if (icon) {
      icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    localStorage.setItem('mathly-theme', theme);
  }

  function ensureToggle() {
    let toggle = document.querySelector('.theme-toggle');
    if (toggle) return toggle;

    const wrapper = document.createElement('div');
    wrapper.className = 'page-tools';

    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');

    const icon = document.createElement('span');
    icon.className = 'theme-icon';
    icon.textContent = '☀️';

    toggle.appendChild(icon);
    wrapper.appendChild(toggle);
    body.insertBefore(wrapper, body.firstChild);
    return toggle;
  }

  const toggle = ensureToggle();
  applyTheme(savedTheme);

  toggle.addEventListener('click', function () {
    const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });
})();
