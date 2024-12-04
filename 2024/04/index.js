// https://adventofcode.com/2024/day/4

const fs = require("fs");

const printWordSearch = (wordSearch) => {
  console.log("--------------------------------");
  console.log(wordSearch.map((r) => r.join(" | ")).join("\n"));
  console.log("--------------------------------");
};

const wordSearch = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((l) => l.trim().split(""));

const reversedRows = wordSearch.map((r) => [...r].reverse());
const transposed = wordSearch[0].map((_, colIndex) =>
  wordSearch.map((row) => row[colIndex])
);
const reversedTransposed = transposed.map((r) => [...r].reverse());

const diagonalsDownRight = [...Array(wordSearch.length * 2 - 1)].map(() => []);
const diagonalsDownLeft = [...Array(wordSearch.length * 2 - 1)].map(() => []);

for (let i = 0; i < wordSearch.length; i++) {
  for (let j = 0; j < wordSearch[i].length; j++) {
    diagonalsDownRight[i - j + wordSearch.length - 1].push(wordSearch[i][j]);
    diagonalsDownLeft[i + j].push(wordSearch[j][i]);
  }
}

const diagonalsUpRight = diagonalsDownLeft.map((r) => [...r].reverse());
const diagonalsUpLeft = diagonalsDownRight.map((r) => [...r].reverse());

const find = (line) => {
  const result = line.match(/XMAS/g)?.length || 0;
  return result;
};

const result1 = [
  wordSearch,
  reversedRows,
  transposed,
  reversedTransposed,
  diagonalsDownRight,
  diagonalsDownLeft,
  diagonalsUpRight,
  diagonalsUpLeft,
].reduce((sum, currentWordSearch) => {
  const wordSearchSum = currentWordSearch.reduce((innerSum, line) => {
    const r = find(line.join(""), 0);
    return innerSum + r;
  }, 0);
  return sum + wordSearchSum;
}, 0);

console.log({ result1: result1 });

const threeByThrees = [...Array(wordSearch.length - 2)]
  .map((_, i) =>
    [...Array(wordSearch[0].length - 2)].map((_, j) => [
      wordSearch[i].slice(j, j + 3),
      wordSearch[i + 1].slice(j, j + 3),
      wordSearch[i + 2].slice(j, j + 3),
    ])
  )
  .flat();

const result2 = threeByThrees.reduce((sum, threeByThree) => {
  if (threeByThree[1][1] !== "A") return sum;
  const rd = threeByThree[0][0] === "M" && threeByThree[2][2] == "S";
  const ld = threeByThree[0][2] === "M" && threeByThree[2][0] == "S";
  const ru = threeByThree[2][0] === "M" && threeByThree[0][2] == "S";
  const lu = threeByThree[2][2] === "M" && threeByThree[0][0] == "S";
  const isCross =
    (rd && (ld || ru)) ||
    (ld && (rd || lu)) ||
    (ru && (lu || rd)) ||
    (lu && (ld || ru));
  return sum + (isCross ? 1 : 0);
}, 0);

console.log({ result2: result2 });
