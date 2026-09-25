(function () {
  'use strict';
  const groups = JSON.parse(document.getElementById('mathly-topics-data').textContent).categories.filter(group => group.category !== 'Home');
  const details = [
    ['numbers', '＋', '#eef0df', '#6b7940', 'Build a strong foundation, one number at a time.'],
    ['shapes', '△', '#faeee0', '#bd8550', 'A new angle on the world around you.'],
    ['numbers', '½', '#eeebf7', '#9180b8', 'Small parts. A whole new understanding.'],
    ['shapes', '⌁', '#e7eff5', '#688ea6', 'Make sense of size, space, and everything between.'],
    ['algebra', 'x', '#f7e9e5', '#b98070', 'Meet the unknown. Discover what’s possible.'],
    ['numbers', 'x²', '#f7f0d9', '#a18a42', 'Take your number skills to the next power.'],
    ['algebra', '↗', '#e5eeea', '#648b7b', 'Connect the dots between ideas and answers.']
  ];
  const grid = document.getElementById('subjectGrid');
  const search = document.getElementById('lessonSearch');
  let filter = 'all';
  document.getElementById('lessonCount').textContent = groups.reduce((sum, group) => sum + group.topics.length, 0);
  function render() {
    const query = search.value.trim().toLowerCase();
    grid.replaceChildren();
    let count = 0;
    groups.forEach((group, index) => {
      const [category, symbol, background, ink, description] = details[index];
      if (filter !== 'all' && filter !== category) return;
      const topics = group.topics.filter(topic => `${group.category} ${topic.title}`.toLowerCase().includes(query));
      if (!topics.length) return;
      count += topics.length;
      const card = document.createElement('article');
      card.className = 'subject-card';
      card.style.setProperty('--tile-bg', background);
      card.style.setProperty('--tile-ink', ink);
      const icon = document.createElement('span');
      icon.className = 'subject-icon'; icon.textContent = symbol; icon.setAttribute('aria-hidden', 'true');
      const heading = document.createElement('h3');
      const link = document.createElement('a'); link.className = 'card-title'; link.href = group.topics[0].page; link.textContent = group.category;
      heading.append(link);
      const copy = document.createElement('p'); copy.textContent = description;
      card.append(icon, heading, copy);
      {
        const disclosure = document.createElement('details'); disclosure.className = 'subject-lessons'; disclosure.open = Boolean(query);
        const summary = document.createElement('summary'); summary.textContent = query ? 'Matching lessons' : 'Browse lessons'; disclosure.append(summary);
        const list = document.createElement('ul'); list.className = 'lesson-results';
        topics.forEach(topic => { const item = document.createElement('li'); const anchor = document.createElement('a'); anchor.href = topic.page; anchor.textContent = topic.title; item.append(anchor); list.append(item); });
        disclosure.append(list); card.append(disclosure);
      }
      const bottom = document.createElement('div'); bottom.className = 'card-bottom';
      const label = document.createElement('span'); label.textContent = `${topics.length} ${topics.length === 1 ? 'lesson' : 'lessons'}`;
      const arrow = document.createElement('a'); arrow.href = group.topics[0].page; arrow.textContent = '↗'; arrow.setAttribute('aria-label', `Explore ${group.category}`);
      bottom.append(label, arrow); card.append(bottom); grid.append(card);
    });
    document.getElementById('emptyResults').hidden = count > 0;
    document.getElementById('searchStatus').textContent = `${count} ${count === 1 ? 'lesson' : 'lessons'} found`;
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
    render();
  }));
  search.addEventListener('input', render);
  render();
})();
