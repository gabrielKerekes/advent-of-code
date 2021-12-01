const fs = require('fs');

const WINDOW_SIZE = 25;

const part1 = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((i) => parseInt(i))
  .reduce((sets, value, i, numbers) => {
    if (i < WINDOW_SIZE || i + WINDOW_SIZE > numbers.length) return sets;
    sets.push({ value, set: new Set(numbers.slice(i - WINDOW_SIZE, i)) });
    return sets;
  }, [])
  .filter((item) =>
    [...item.set].every(
      (candidate) =>
        !(
          item.set.has(item.value - candidate) &&
          item.value - candidate != candidate
        ),
    ),
  )[0].value;

console.log({ part1 });

const numbers = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((i) => parseInt(i));

var start = 0;
var sum = 0;
for (var index = 0; index < numbers.length; index++) {
  const number = numbers[index];
  sum += number;

  while (sum > part1 && start < index - 1) {
    sum -= numbers[start];
    start++;
  }

  if (sum === part1) break;
}

const numbersSlice = numbers.slice(start, index + 1);
console.log({ part2: Math.min(...numbersSlice) + Math.max(...numbersSlice) });
