(function () {
  'use strict';

  const guides = {
    equations: {
      idea: 'An equation is a balance. Whatever operation you perform on one side must also be performed on the other side.',
      steps: ['Simplify each side if needed.', 'Use inverse operations to isolate the unknown.', 'Substitute your answer back into the original equation.'],
      mistake: 'Do not move a term across the equals sign without changing the operation.'
    },
    fractions: {
      idea: 'Fractions describe equal parts of a whole. The denominator names the size of each part and the numerator counts those parts.',
      steps: ['Check whether the denominators match.', 'Simplify the answer when possible.', 'Use a visual model or benchmark such as 1/2 to check size.'],
      mistake: 'When adding fractions, add the numerators but keep the common denominator.'
    },
    percentages: {
      idea: 'A percentage is a proportion out of 100. Converting it to a decimal makes many calculations easier.',
      steps: ['Write the percentage as a decimal or fraction.', 'Multiply by the original amount.', 'Check whether the result is sensible compared with the whole.'],
      mistake: 'A percentage change is based on the original amount, not the final amount.'
    },
    angles: {
      idea: 'Angles measure turn. Known angle facts let you replace a diagram with a short calculation.',
      steps: ['Mark the angles you already know.', 'Choose the correct fact: straight line, around a point, triangle, or parallel lines.', 'Write an equation before calculating the missing angle.'],
      mistake: 'Always check whether the diagram shows an interior or exterior angle.'
    },
    graphs: {
      idea: 'A graph turns a relationship into a picture. The horizontal axis is usually the input and the vertical axis is the output.',
      steps: ['Read the scale before plotting.', 'Label axes and include units.', 'Use two or more points to check a pattern or line.'],
      mistake: 'Do not assume every grid square represents one unit; inspect the scale first.'
    },
    powers: {
      idea: 'An index tells you how many times a base is multiplied by itself. Index laws make repeated multiplication quicker and clearer.',
      steps: ['Identify the base and the index.', 'Apply one index law at a time.', 'Check special cases such as index 0 or a negative index.'],
      mistake: 'A power applies to the base immediately before it unless brackets say otherwise.'
    },
    measurement: {
      idea: 'Measurement connects numbers to real quantities. The unit and the scale are just as important as the numerical answer.',
      steps: ['Choose a sensible unit.', 'Convert all measurements to compatible units.', 'Estimate before calculating to catch unreasonable answers.'],
      mistake: 'Area and volume conversions use squared and cubed scale factors.'
    }
  };

  const formulas = {
    equation: [['Balance rule', 'Do the same operation to both sides.'], ['Inverse operations', 'addition ↔ subtraction · multiplication ↔ division']],
    fraction: [['Equivalent fractions', 'a/b = (a × n)/(b × n)'], ['Fraction of an amount', 'fraction × amount']],
    percentage: [['Percentage of an amount', 'percentage ÷ 100 × amount'], ['Percentage change', '(change ÷ original) × 100%']],
    angle: [['Triangle total', 'a + b + c = 180°'], ['Straight line', 'angles = 180°'], ['Full turn', 'angles = 360°']],
    area: [['Rectangle', 'A = length × width'], ['Triangle', 'A = ½ × base × height'], ['Circle', 'A = πr²']],
    volume: [['Cuboid', 'V = length × width × height'], ['Prism', 'V = area of cross-section × length']],
    perimeter: [['Rectangle', 'P = 2(length + width)'], ['Circle circumference', 'C = 2πr = πd']],
    power: [['Index law', 'aᵐ × aⁿ = aᵐ⁺ⁿ'], ['Zero index', 'a⁰ = 1'], ['Negative index', 'a⁻ⁿ = 1/aⁿ']],
    speed: [['Speed', 'speed = distance ÷ time'], ['Distance', 'distance = speed × time']],
    line: [['Straight-line form', 'y = mx + c'], ['Gradient', 'm = change in y ÷ change in x']],
    probability: [['Probability', 'P(event) = favourable outcomes ÷ total outcomes'], ['Complement', 'P(not A) = 1 − P(A)']],
    compound: [['Compound growth', 'final = original × (1 + rate)ⁿ'], ['Compound decay', 'final = original × (1 − rate)ⁿ']],
    pythagoras: [['Pythagoras', 'a² + b² = c²'], ['Right-angle check', 'the longest side is c']],
    density: [['Density', 'density = mass ÷ volume'], ['Mass', 'mass = density × volume']]
  };

  function getGuide(title) {
    const lower = title.toLowerCase();
    if (lower.includes('equation')) return guides.equations;
    if (lower.includes('fraction')) return guides.fractions;
    if (lower.includes('percentage') || lower.includes('percent')) return guides.percentages;
    if (lower.includes('angle') || lower.includes('triangle') || lower.includes('polygon') || lower.includes('circle')) return guides.angles;
    if (lower.includes('graph') || lower.includes('coordinate') || lower.includes('straight line')) return guides.graphs;
    if (lower.includes('power') || lower.includes('index') || lower.includes('indices') || lower.includes('standard form') || lower.includes('root')) return guides.powers;
    if (lower.includes('measure') || lower.includes('area') || lower.includes('volume') || lower.includes('perimeter') || lower.includes('unit')) return guides.measurement;
    return {
      idea: `${title} becomes easier when you connect the definition to a diagram, a worked example, and a quick estimate.`,
      steps: ['Read the definition and identify the important vocabulary.', 'Work through one example one line at a time.', 'Use a second example to check that the method works.'],
      mistake: 'Write down the rule you are using before substituting numbers or symbols.'
    };
  }

  function getFormulas(title) {
    const lower = title.toLowerCase();
    if (lower.includes('area')) return formulas.area;
    if (lower.includes('volume')) return formulas.volume;
    if (lower.includes('perimeter') || lower.includes('circumference')) return formulas.perimeter;
    if (lower.includes('equation') || lower.includes('substitution') || lower.includes('formula')) return formulas.equation;
    if (lower.includes('fraction')) return formulas.fraction;
    if (lower.includes('percentage') || lower.includes('percent') || lower.includes('growth') || lower.includes('decay')) return formulas.percentage;
    if (lower.includes('angle') || lower.includes('triangle') || lower.includes('polygon')) return formulas.angle;
    if (lower.includes('power') || lower.includes('index') || lower.includes('indices') || lower.includes('standard form') || lower.includes('root')) return formulas.power;
    if (lower.includes('speed') || lower.includes('time')) return formulas.speed;
    if (lower.includes('line') || lower.includes('graph') || lower.includes('coordinate')) return formulas.line;
    if (lower.includes('probability')) return formulas.probability;
    if (lower.includes('compound interest')) return formulas.compound;
    if (lower.includes('pythagoras')) return formulas.pythagoras;
    if (lower.includes('density')) return formulas.density;
    return [['Working rule', 'Identify the known values, choose the matching rule, then check the units.'], ['Check', 'Estimate first and compare your answer with the original question.']];
  }

  const card = document.querySelector('.page-card');
  const title = card && card.querySelector('h1');
  if (!card || !title || card.querySelector('.lesson-expansion')) return;

  const guide = getGuide(title.textContent.trim());
  const formulaSet = getFormulas(title.textContent.trim());
  const section = document.createElement('section');
  section.className = 'lesson-expansion';
  section.innerHTML = `<div class="lesson-expansion-heading"><span>BUILD YOUR UNDERSTANDING</span><h2>Study guide</h2><p>${guide.idea}</p></div><div class="lesson-formulas"><div class="lesson-formulas-heading"><span>QUICK REFERENCE</span><h3>Formulas & rules</h3></div><div class="formula-grid">${formulaSet.map(([name, value]) => `<div class="formula-card"><strong>${name}</strong><code>${value}</code></div>`).join('')}</div></div><div class="lesson-guide-grid"><article><h3>A reliable method</h3><ol>${guide.steps.map(step => `<li>${step}</li>`).join('')}</ol></article><article><h3>Watch out for this</h3><p>${guide.mistake}</p><div class="lesson-check">✓ Check your answer against the original question.</div></article></div>`;
  card.appendChild(section);
})();
