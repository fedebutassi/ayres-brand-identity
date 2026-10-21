const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..');

const slides = [
  { days: 4 },
  { days: 3 },
  { days: 2 },
  { days: 1 },
];

module.exports = { slides, repoRoot };
