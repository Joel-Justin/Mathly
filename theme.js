/*
  Shared theme and navigation logic for the Mathly website.
  This file is loaded on every page so the same dark/light mode
  and “Next” button behaviour stays consistent site-wide.
*/
(function () {
  'use strict';

  const body = document.body;
  const THEME_KEY = 'mathly-theme';
  let lessonPages = [
    'adding-and-subtracting-decimals.html',
    'adding-and-subtracting-fractions.html',
    'algebra-basics.html',
    'algebraic-terms.html',
    'angle-facts.html',
    'angles-and-parallel-lines.html',
    'angles-in-a-quadrilateral.html',
    'angles-in-a-triangle.html',
    'angles.html',
    'area-formulas.html',
    'circumference-and-area-of-a-circle.html',
    'common-factors-and-multiples.html',
    'comparing-fractions.html',
    'compound-interest.html',
    'compound-units-of-measure.html',
    'converting-units-of-area-and-volume.html',
    'converting-units-of-measure.html',
    'decimals.html',
    'dividing-fractions.html',
    'equation-of-a-straight-line.html',
    'equations-graphs.html',
    'equations.html',
    'exact-calculations.html',
    'expanding-brackets.html',
    'expressions.html',
    'exterior-angles-of-a-polygon.html',
    'factors-and-multiples.html',
    'finding-the-percentage-change.html',
    'formulas.html',
    'fraction-of-an-amount.html',
    'fractions-decimals-and-percentages.html',
    'fractions-decimals-percentages.html',
    'fractions.html',
    'geometry-shapes.html',
    'growth-and-decay.html',
    'higher-powers-and-estimating-powers.html',
    'how-area-formulas-work.html',
    'imperial-units-of-measure.html',
    'improper-fractions-and-mixed-numbers.html',
    'indices-in-algebra.html',
    'interior-angles-of-a-polygon.html',
    'introducing-numbers.html',
    'linear-graphs.html',
    'measurement.html',
    'measuring-and-drawing-angles.html',
    'mental-addition-and-subtraction.html',
    'mental-multiplication-and-division.html',
    'methods-of-division.html',
    'methods-of-multiplication.html',
    'metric-units-of-measure-and-time.html',
    'multiplying-and-dividing-by-10-100-and-1000.html',
    'multiplying-fractions.html',
    'negative-numbers.html',
    'negative-powers.html',
    'number-arithmetic.html',
    'order-of-operations.html',
    'percentage-increase-and-decrease.html',
    'percentage-of-an-amount.html',
    'percentages.html',
    'perimeter-and-area.html',
    'powers-calculations.html',
    'powers-of-numbers.html',
    'practice-question-working-with-angles.html',
    'prime-factorization.html',
    'prime-numbers.html',
    'properties-of-a-circle.html',
    'properties-of-polygons.html',
    'properties-of-quadrilaterals.html',
    'properties-of-triangles.html',
    'rearranging-formulas.html',
    'recurring-decimals-and-fractions.html',
    'recurring-decimals.html',
    'reverse-percentages.html',
    'roots.html',
    'rounding-and-estimating.html',
    'simultaneous-equations.html',
    'solving-simple-equations.html',
    'standard-form.html',
    'substitution.html',
    'surface-area-of-a-cuboid.html',
    'symmetry.html',
    'the-coordinate-grid.html',
    'vertical-percentage-calculations.html',
    'volume-of-a-cuboid.html',
    'written-addition-and-subtraction.html'
  ];

  if (!body.classList.contains('home') && !document.querySelector('link[data-lesson-theme]')) {
    const lessonTheme = document.createElement('link');
    lessonTheme.rel = 'stylesheet';
    lessonTheme.href = '../lesson.css?v=4';
    lessonTheme.dataset.lessonTheme = 'true';
    document.head.appendChild(lessonTheme);
    const lessonContent = document.createElement('script');
    lessonContent.src = '../lesson-content.js?v=3';
    lessonContent.defer = true;
    document.head.appendChild(lessonContent);
  }

  function getSavedTheme() {
    try { return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
  }

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);

    const toggle = document.querySelector('.theme-toggle');
    const icon = toggle ? toggle.querySelector('.theme-icon') : null;

    if (icon) {
      icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    if (toggle) { toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); }
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* Theme still works without storage. */ }
  }

  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path === '' ? 'index.html' : path;
  }

  function getNextPageUrl() {
    const currentPage = decodeURIComponent(getCurrentPage()).toLowerCase();
    const pageList = currentPage === 'index.html' ? ['index.html', ...lessonPages] : lessonPages;
    const currentIndex = pageList.indexOf(currentPage);

    const nextPage = currentIndex >= 0 && currentIndex < pageList.length - 1
      ? pageList[currentIndex + 1]
      : currentPage === 'index.html'
        ? 'pages/introducing-numbers.html'
        : lessonPages[0];

    if (currentPage === 'index.html') {
      return 'pages/' + nextPage.replace('index.html', 'introducing-numbers.html');
    }

    return '../pages/' + nextPage;
  }

  function getNextPageTitle() {
    const currentPage = decodeURIComponent(getCurrentPage()).toLowerCase();
    const index = lessonPages.indexOf(currentPage);
    const next = index >= 0 && index < lessonPages.length - 1 ? lessonPages[index + 1] : lessonPages[0];
    return next ? next.replace(/\.html$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase()) : 'Next lesson';
  }

  async function loadCatalogOrder() {
    if (getCurrentPage() === 'index.html') return;
    try {
      const response = await fetch('../mathly_topics_complete.json', { cache: 'no-store' });
      if (!response.ok) return;
      const catalog = await response.json();
      const ordered = (catalog.categories || [])
        .filter(group => group.category !== 'Home')
        .flatMap(group => group.topics || [])
        .map(topic => String(topic.page || '').split('/').pop().toLowerCase())
        .filter(Boolean);
      if (ordered.length) {
        lessonPages = ordered;
        const nextButton = document.querySelector('.page-next-btn');
        if (nextButton) {
          nextButton.href = getNextPageUrl();
          nextButton.textContent = `Next: ${getNextPageTitle()} →`;
        }
      }
    } catch { /* The built-in order remains available offline. */ }
  }

  function ensureLessonHeader() {
    if (getCurrentPage() === 'index.html' || document.querySelector('.lesson-header')) return;

    const header = document.createElement('header');
    header.className = 'lesson-header';
    header.innerHTML = '<div class="lesson-header-inner">' +
      '<a class="lesson-wordmark" href="../index.html" aria-label="Mathly home"><span class="lesson-logo">m<span>·</span></span>mathly<span class="lesson-dot">.</span></a>' +
      '<div class="lesson-context"><span>Mathly lessons</span><strong>' + document.title.replace(/\s*[|—-].*$/, '') + '</strong></div>' +
      '<a class="lesson-library-link" href="../index.html#topics">Browse all lessons <span>↗</span></a>' +
      '</div>';
    body.insertBefore(header, body.firstChild);
  }

  function ensureControls() {
    let wrapper = document.querySelector('.page-tools');

    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'page-tools';
      body.insertBefore(wrapper, body.firstChild);
    }

    let toggle = document.querySelector('.theme-toggle');

    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'theme-toggle';
      toggle.setAttribute('aria-label', 'Toggle theme');

      const icon = document.createElement('span');
      icon.className = 'theme-icon';
      icon.textContent = '☀️';
      toggle.appendChild(icon);
      wrapper.appendChild(toggle);
    }

    if (getCurrentPage() === 'index.html') return toggle;

    let nextButton = document.querySelector('.page-next-btn');

    if (!nextButton) {
      nextButton = document.createElement('a');
      nextButton.className = 'page-next-btn';
      nextButton.setAttribute('aria-label', 'Next page');
      nextButton.href = getNextPageUrl();
      nextButton.textContent = `Next: ${getNextPageTitle()} →`;
      wrapper.appendChild(nextButton);
    } else {
      nextButton.href = getNextPageUrl();
    }

    return toggle;
  }

  ensureLessonHeader();
  const toggle = ensureControls();
  applyTheme(getSavedTheme());
  loadCatalogOrder();

  toggle.addEventListener('click', function () {
    const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
})();
