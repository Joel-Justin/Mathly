from pathlib import Path
import re
root = Path(r"C:\Projects\Mathly")
for path in list((root / "pages").glob("*.html")) + [root / "index.html"]:
    text = path.read_text(encoding="utf-8")
    text = re.sub(r"\n?\s*<div class=\"page-next-wrap\"><a class=\"page-next-btn\"[^>]*>Next →</a></div>\n?", "\n", text)
    path.write_text(text, encoding="utf-8")
print("Removed static next buttons")
