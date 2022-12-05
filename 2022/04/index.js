// https://adventofcode.com/2022/day/3

const fs = require("fs");

const sectionAssignments = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((ranges) =>
    ranges
      .split(",")
      .map((range) => range.split("-").map((str) => parseInt(str, 10)))
  )

const partOne = sectionAssignments
  .filter(
    ([firstRange, secondRange]) =>
      (firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[1]) ||
      (secondRange[0] <= firstRange[0] && secondRange[1] >= firstRange[1])
  ).length;

console.log({ partOne });

const partTwo = sectionAssignments
  .filter(
    ([firstRange, secondRange]) =>
      firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[0] ||
      secondRange[0] <= firstRange[0] && secondRange[1] >= firstRange[0]
  ).length;

console.log({ partTwo });
