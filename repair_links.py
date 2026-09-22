from pathlib import Path
import re

root = Path(r"c:\Users\joelj\OneDrive\Desktop\mathly")
pages = root / "pages"
pages.mkdir(exist_ok=True)

sections = {
    "Number & Arithmetic": [
        "Number overview",
        "Introducing numbers",
        "Decimals",
        "Written addition and subtraction",
        "Adding and subtracting decimals",
        "Negative numbers",
        "Multiplying and dividing by 10, 100, and 1000",
        "Methods of multiplication",
        "Methods of division",
        "Mental addition and subtraction",
        "Mental multiplication and division",
        "Powers of numbers",
        "Factors and multiples",
        "Prime numbers",
        "Prime factorization",
        "Common factors and multiples",
        "Order of operations",
    ],
    "Geometry & Shapes": [
        "Geometry overview",
        "Angles",
        "Angle facts",
        "Angles and parallel lines",
        "Measuring and drawing angles",
        "Symmetry",
        "Properties of triangles",
        "Properties of quadrilaterals",
        "Properties of polygons",
        "Angles in a triangle",
        "Angles in a quadrilateral",
        "Exterior angles of a polygon",
        "Interior angles of a polygon",
        "Properties of a circle",
        "Practice question: Working with angles",
    ],
    "Fractions, Decimals & Percentages": [
        "Fractions overview",
        "Fractions",
        "Improper fractions and mixed numbers",
        "Comparing fractions",
        "Adding and subtracting fractions",
        "Fraction of an amount",
        "Multiplying fractions",
        "Dividing fractions",
        "Percentages",
        "Fractions, decimals, and percentages",
        "Percentage of an amount",
        "Vertical percentage calculations",
        "Finding the percentage change",
        "Percentage increase and decrease",
        "Reverse percentages",
        "Growth and decay",
        "Compound interest",
        "Recurring decimals",
        "Recurring decimals and fractions",
    ],
    "Measurement": [
        "Measurement overview",
        "Metric units of measure and time",
        "Imperial units of measure",
        "Converting units of measure",
        "Converting units of area and volume",
        "Compound units of measure",
        "Practice questions: Working with compound units",
        "Perimeter and area",
        "Area formulas",
        "How area formulas work",
        "Circumference and area of a circle",
        "Length of an arc and area of a sector",
        "Practice questions: Compound 2-D shapes",
        "3-D shapes",
        "3-D sections",
        "Plans and elevations",
        "Volume of a cuboid",
        "Surface area of a cuboid",
        "Volume and surface area of a prism",
        "Volume and surface area of a cylinder",
        "Volume and surface area of a pyramid",
        "Volume and surface area of a cone",
        "Volume and surface area of a sphere",
        "Practice questions: Compound 3-D shapes",
        "Rounding and estimating",
        "Bounds of accuracy",
    ],
    "Algebra Basics": [
        "Algebra overview",
        "Algebraic terms",
        "Expressions",
        "Substitution",
        "Indices in algebra",
        "Expanding brackets",
        "Expanding quadratics",
        "Factorizing",
        "Factorizing quadratics",
        "Factorizing harder quadratic expressions",
        "The difference of two squares",
        "Algebraic fractions",
        "Adding and subtracting algebraic fractions",
        "Multiplying and dividing algebraic fractions",
        "Formulas",
        "Rearranging formulas",
        "Functions",
        "Inverse functions",
        "Composite functions",
    ],
    "Powers & Calculations": [
        "Powers overview",
        "Higher powers and estimating powers",
        "Roots",
        "Negative powers",
        "Multiplying and dividing with powers",
        "Raising a power to a power",
        "Fractional powers and roots",
        "Practice questions: Calculating with powers",
        "Surds and irrational numbers",
        "Simplifying surd expressions",
        "Surds in fractions",
        "Exact calculations",
        "Standard form",
        "Multiplying and dividing with standard form",
        "Adding and subtracting with standard form",
    ],
    "Equations & Graphs": [
        "Graphs overview",
        "Equations",
        "Solving simple equations",
        "Solving harder equations",
        "Equations with brackets",
        "Simultaneous equations",
        "Practice question: Real-world simultaneous equations",
        "Solving simple quadratic equations",
        "Solving harder quadratic equations",
        "Completing the square",
        "How to complete the square",
        "The quadratic formula",
        "Practice question: Choosing a method for quadratic problems",
        "Trial and improvement",
        "The coordinate grid",
        "Linear graphs",
        "Equation of a straight line",
        "Parallel and perpendicular lines",
        "Length and midpoint of a line segment",
        "Quadratic graphs",
        "Quadratics in the real world",
        "Solving equations using graphs",
        "Inequalities",
        "Graphing linear inequalities",
        "Quadratic inequalities",
    ],
}

section_overview = {
    "Number & Arithmetic": "number-arithmetic",
    "Geometry & Shapes": "geometry-shapes",
    "Fractions, Decimals & Percentages": "fractions-decimals-percentages",
    "Measurement": "measurement",
    "Algebra Basics": "algebra-basics",
    "Powers & Calculations": "powers-calculations",
    "Equations & Graphs": "equations-graphs",
}


def slugify(value: str) -> str:
    value = value.lower()
    value = value.replace("&", "and")
    value = re.sub(r"[^a-z0-9\s-]", "", value)
    value = re.sub(r"\s+", "-", value.strip())
    value = re.sub(r"-+", "-", value)
    return value


def page_html(title: str, section: str) -> str:
    intro = {
        "Number & Arithmetic": "Number skills are the foundation of maths. They help us count, compare values, and solve everyday problems with confidence.",
        "Geometry & Shapes": "Geometry helps us describe shape, size, and space in the world around us.",
        "Fractions, Decimals & Percentages": "Fractions, decimals, and percentages are different ways to show parts of a whole.",
        "Measurement": "Measurement helps us describe length, area, volume, and time using clear units.",
        "Algebra Basics": "Algebra uses letters and symbols to represent numbers and rules.",
        "Powers & Calculations": "Powers and calculations help us work with repeated multiplication and large values.",
        "Equations & Graphs": "Equations and graphs show how numbers and quantities relate to one another.",
    }[section]

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <link rel="stylesheet" href="../bootstrap css/bootstrap.css">
  <link rel="stylesheet" href="../style.css">
  <style>
    body {{ background: linear-gradient(135deg, #f8f9fa, #eef6ff); font-family: Arial, sans-serif; }}
    .page-card {{ background: #fff; border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); padding: 30px; margin-top: 30px; }}
    .lesson-box {{ background: #f4f8ff; border-left: 5px solid #0d6efd; padding: 20px; border-radius: 10px; margin: 20px 0; }}
  </style>
</head>
<body>
  <div class="container py-5">
    <a href="../index.html" class="btn btn-dark mb-4">Home</a>
    <div class="page-card">
      <h1 class="mb-3">{title}</h1>
      <p class="lead">{intro}</p>

      <div class="lesson-box">
        <h3>What is {title.lower()}?</h3>
        <p>{title} is an important part of {section.lower()}. It helps us recognise patterns, compare values, and solve problems clearly.</p>
      </div>

      <div class="row">
        <div class="col-md-6">
          <h4>Examples</h4>
          <ul>
            <li>Check the key numbers and symbols carefully.</li>
            <li>Work through one easy example first.</li>
            <li>Use a method you can explain step by step.</li>
          </ul>
        </div>
        <div class="col-md-6">
          <h4>Quick rule</h4>
          <p>Read the question carefully, write the method clearly, and check whether your answer makes sense.</p>
        </div>
      </div>

      <div class="lesson-box">
        <h3>Key idea</h3>
        <p>Practice makes this topic easier. Work on a few simple questions before moving to harder ones, and always review your steps.</p>
      </div>

      <h4>Practice</h4>
      <ul>
        <li>Explain the method in your own words.</li>
        <li>Solve one example without notes.</li>
        <li>Try one harder question.</li>
        <li>Write one real-life example where this idea is used.</li>
      </ul>
    </div>
  </div>
</body>
</html>
'''

for section, items in sections.items():
    for item in items:
        plain_slug = section_overview[section] if item.endswith(" overview") else slugify(item)
        (pages / f"{plain_slug}.html").write_text(page_html(item, section), encoding="utf-8")

rows = []
for section, items in sections.items():
    links = []
    for item in items:
        slug = section_overview[section] if item.endswith(" overview") else slugify(item)
        links.append(f'    <li><a class="dropdown-item" href="pages/{slug}.html">{item}</a></li>')
    rows.append(f'''<div class="col-2"><div class="dropdown">
  <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {section}
  </button>
  <ul class="dropdown-menu">
{chr(10).join(links)}
  </ul>
</div></div>''')

index = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mathly</title>
    <link rel="stylesheet" href="bootstrap css/bootstrap.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
 <div class="container-fluid">
    <h1>Mathly</h1>
    <br>
    <div class="row">
        <div class="col-1"><button type="button" class="btn btn-dark">Home</button></div>
        ''' + ''.join(rows) + '''
    </div>
    <hr class="space">
 </div>
<br>
<div class="paragraph">
    <p>Welcome to Mathly – your all-in-one destination for mastering mathematics with clarity and confidence. At<br>Mathly, we believe that everyone can succeed in math with the right approach and support. Whether you're<br>a student looking to strengthen your skills, a parent supporting your child’s learning, or an educator seeking<br>reliable resources, Mathly has something for you. Our platform offers a rich collection of interactive lessons,<br>step-by-step tutorials, practice exercises, worksheets, and real-life applications that make math meaningful and<br>engaging. From the basics of addition and subtraction to advanced topics like algebra, geometry, calculus, and<br>statistics, Mathly is designed to guide learners through every stage of their mathematical journey. We’re<br>passionate about making math less intimidating and more intuitive, helping learners build a strong foundation,<br>boost problem-solving abilities, and develop a genuine love for the subject. Join the Mathly community and<br>discover how fun and empowering learning math can be!</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="bootstrap js/bootstrap.js"></script>
</body>
</html>
'''

(root / "index.html").write_text(index, encoding="utf-8")
print(f"Generated {sum(len(v) for v in sections.values())} lesson pages and rebuilt navigation links")
