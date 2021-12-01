// https://adventofcode.com/2021/day/1

const fs = require('fs');

const result1 = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(line => parseInt(line))
  .map((depth, i, a) => i === 0 ? false : depth - a[i - 1] > 0)
  .filter((hasIncreased) => hasIncreased).length;

console.log({result1})

const result2 = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(line => parseInt(line))
  .map((depth, i, a) => i < 2 ? false : depth + a[i - 1] + a[i - 2])
  .map((depthWindow, i, a) => i === 0 ? false : depthWindow - a[i - 1] > 0)
  .filter((hasIncreased) => hasIncreased).length - 1;

console.log({result2})