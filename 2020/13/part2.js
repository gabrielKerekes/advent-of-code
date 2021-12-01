const fs = require('fs');

const part1 = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')[1]
  .split(',')
  .map((item, index) => {
    return { v: parseInt(item), i: index };
  })
  .filter((i) => i.v);

var part2 = 0;
var period = 1;

// again pretty much stolen and with the help of the internet
// https://www.reddit.com/r/adventofcode/comments/kcb3bb/2020_day_13_part_2_can_anyone_tell_my_why_this/
for (let index = 0; index < part1.length; index++) {
  const item = part1[index];
  while ((item.v - (part2 % item.v)) % item.v !== item.i % item.v) {
    part2 += period;
  }

  period *= item.v;
}

console.log({ part2 });
