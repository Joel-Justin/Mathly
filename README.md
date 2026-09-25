# Mathly

Mathly is a static mathematics learning website built with HTML, CSS, and Bootstrap. It contains lesson pages for multiple maths topics, including number work, geometry, fractions, measurement, algebra, powers, and graphs.

## Project purpose

This project helps students learn key maths topics through:

- simple lesson pages
- searchable lessons and subject filters
- clear examples and quick revision rules
- practice questions for each topic

## Project structure

- [index.html](index.html) – landing page and lesson catalog
- [home.css](home.css) and [home.js](home.js) – responsive homepage, search, and subject filters
- [style.css](style.css) – shared styling for the site
- [pages](pages) – topic lesson pages
- [bootstrap css](bootstrap%20css) – Bootstrap CSS files
- [bootstrap js](bootstrap%20js) – Bootstrap JavaScript files

## Main sections

The website is grouped into the following areas:

- Number & Arithmetic
- Geometry & Shapes
- Fractions, Decimals & Percentages
- Measurement
- Algebra Basics
- Powers & Calculations
- Equations & Graphs

Each section links to dedicated HTML lesson pages for individual topics.

## How to run locally

Open the project in a browser or run a local server from the project folder:

```bash
cd "C:\Projects\Mathly"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

## Notes

This project is a lightweight static website, so no package installation is required. All pages are plain HTML and CSS files, and the content can be expanded by creating new lesson pages inside the pages folder.

## Repository connection

This repository is connected as a local static site project for maths learning content. The core entry point is the homepage, and the lesson materials are organised under the pages directory.

## Validation

Run `node scripts/check-home.cjs` to verify generated quiz answers, answer choices, and catalog links. No dependencies are required.
