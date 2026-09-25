const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const source = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
const context = vm.createContext({ Math });
vm.runInContext(source.slice(0, source.indexOf('        let currentStudyMode')), context);
for (let run = 0; run < 2000; run++) {
  for (const question of vm.runInContext('buildStudyQuestions()', context)) {
    assert.equal(new Set(question.choices).size, 4);
    assert(question.choices.includes(question.answer), question.question);
    let match;
    let expected;
    if ((match = question.question.match(/What is (\d+)% of (\d+)/))) expected = Number(match[1]) * Number(match[2]) / 100;
    else if ((match = question.question.match(/are (\d+)°, (\d+)°/))) expected = 180 - Number(match[1]) - Number(match[2]);
    else if ((match = question.question.match(/What is (\d+)\/(\d+) of (\d+)/))) expected = Number(match[3]) * Number(match[1]) / Number(match[2]);
    else if ((match = question.question.match(/Solve x \+ (\d+) = (\d+)/))) expected = Number(match[2]) - Number(match[1]);
    else assert.fail(`Unverified question type: ${question.question}`);
    assert.equal(Number(question.answer), expected, question.question);
  }
}
const data = JSON.parse(html.match(/id="mathly-topics-data">([\s\S]*?)<\/script>/)[1]);
for (const group of data.categories) {
  for (const topic of group.topics) assert(fs.existsSync(path.join(root, topic.page)), topic.page);
}
console.log('Passed: 8,000 generated questions, unique choices, correct answers, and all catalog links.');
