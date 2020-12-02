const fs = require('fs');

const result1 = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((line) => {
    const split = line.split(' ');
    const splitRange = split[0].split('-');
    const range = { from: splitRange[0], to: splitRange[1] };
    const letter = split[1][0];
    const word = split[2];

    const count = word.split(letter).length - 1;
    return range.from <= count && count <= range.to;
  })
  .filter((d) => d).length;

console.log(result1);

const result2 = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((line) => {
    const split = line.split(' ');
    const splitPositions = split[0].split('-');
    const positions = [
      parseInt(splitPositions[0]) - 1,
      parseInt(splitPositions[1]) - 1,
    ];
    const letter = split[1][0];
    const word = split[2];

    const matchesFirstPosition = word[positions[0]] === letter;
    const matchesSecondPosition = word[positions[1]] === letter;

    return matchesFirstPosition ^ matchesSecondPosition;
  })
  .filter((d) => d).length;

console.log(result2);
