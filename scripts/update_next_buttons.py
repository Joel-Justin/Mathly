from pathlib import Path

root = Path(r'C:\Projects\Mathly')
page_dir = root / 'pages'
page_order = sorted(p.name for p in page_dir.glob('*.html'))

for index, file_name in enumerate(page_order):
    target = page_dir / file_name
    text = target.read_text(encoding='utf-8')
    if 'page-next-btn' in text:
        continue

    next_name = page_order[(index + 1) % len(page_order)]
    next_html = f'  <div class="page-next-wrap"><a class="page-next-btn" href="{next_name}">Next →</a></div>\n'
    text = text.replace('</body>', f'{next_html}</body>', 1)
    target.write_text(text, encoding='utf-8')

index_path = root / 'index.html'
text = index_path.read_text(encoding='utf-8')
if 'page-next-btn' not in text:
    text = text.replace('</body>', '  <div class="page-next-wrap"><a class="page-next-btn" href="pages/adding-and-subtracting-decimals.html">Next →</a></div>\n</body>', 1)
    index_path.write_text(text, encoding='utf-8')

print(f'Added next buttons to {len(page_order) + 1} pages')
