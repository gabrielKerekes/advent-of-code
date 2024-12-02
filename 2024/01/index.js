// https://adventofcode.com/2024/day/1

const fs = require("fs");

const list1 = [];
const list2 = [];

fs.readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.split("  "))
  .forEach(([a, b]) => {
    list1.push(a);
    list2.push(b.trim());
  });

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

const result1 = list1.reduce((diff, a, i) => {
  diff += Math.abs(a - list2[i]);
  return diff;
}, 0);

console.log({ result1 });

const counts = {};
list2.forEach((a) => {
  counts[a] = (counts[a] || 0) + 1;
});

console.log({ counts });

const result2 = list1.reduce((similarity, v) => {
  similarity += v * (counts[v] || 0);
  return similarity;
}, 0);

console.log({ result2 });
