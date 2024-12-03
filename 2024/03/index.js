// https://adventofcode.com/2024/day/3

const fs = require("fs");

const processMul = (instruction) => {
  const [a, b] = instruction
    .replace("mul(", "")
    .replace(")", "")
    .split(",")
    .map(Number);
  return a * b;
};

const memory = fs.readFileSync("input.txt", "utf8");

const result = memory
  .match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)
  .map(processMul)
  .reduce((sum, v) => sum + v, 0);

console.log(result);

const result2 = memory
  .match(/(mul\([0-9]{1,3},[0-9]{1,3}\))|(don't)|(do)/g)
  .reduce(
    (state, instruction) => {
      if (instruction === "don't") return { ...state, skip: true };
      if (instruction === "do") return { ...state, skip: false };
      if (state.skip) return state;
      return { ...state, sum: state.sum + processMul(instruction) };
    },
    { sum: 0, skip: false }
  ).sum;

console.log(result2);
