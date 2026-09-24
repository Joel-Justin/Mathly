from pathlib import Path

root = Path(r'C:\Projects\Mathly\pages')
count = 0

for path in root.glob('*.html'):
    text = path.read_text(encoding='utf-8')

    if '../theme.js' not in text:
        text = text.replace('</head>', '  <script src="../theme.js" defer></script>\n</head>', 1)

    if 'theme-toggle' not in text:
        text = text.replace(
            '<body>',
            '<body>\n  <div class="page-tools"><button class="theme-toggle" type="button" aria-label="Toggle theme"><span class="theme-icon">☀️</span></button></div>',
            1,
        )

    path.write_text(text, encoding='utf-8')
    count += 1

print(f'Updated {count} page files')
