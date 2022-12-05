// https://adventofcode.com/2022/day/3

const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf8").split("\n");

const getStacks = lines => lines
  .filter((l) => l.includes("["))
  .map((l) => l.match(/(     )|(   )|([A-Z])/g))
  .reduce((stacks, l) => {
    l.forEach((v, i) =>
      stacks.length <= i ? stacks.push([v]) : stacks[i].push(v)
    );
    return stacks;
  }, [])
  .map((stack) => stack.filter((i) => i.trim() !== ""));

const getInstructions = lines => lines
  .filter((line) => line.startsWith("m"))
  .map((instruction) =>
    instruction
      .replace(/(move )|(from )|(to )/g, "")
      .split(" ")
      .map((i) => parseInt(i, 10))
  )

const stacks = getStacks(lines)
getInstructions(lines).forEach(([count, from, to]) => {
  for (var i = 0; i < count; i++) {
    stacks[to - 1].splice(0, 0, stacks[from - 1].shift());
  }
});

const partOne = stacks.map((s) => s[0]).join("");

console.log({ partOne });

const stacks2 = getStacks(lines)
getInstructions(lines).forEach(([count, from, to]) => {
  stacks2[to - 1].splice(0, 0, ...stacks2[from - 1].splice(0, count));
});

const partTwo = stacks2.map((s) => s[0]).join("");
console.log({ partTwo });