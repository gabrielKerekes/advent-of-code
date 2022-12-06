// https://adventofcode.com/2022/day/5

const fs = require("fs");

const datastream = fs.readFileSync("input.txt", "utf8");

const partOne = datastream.indexOf((d, index) => new Set([d[index], d[index + 1], d[index + 2], d[index + 3]].length === 4))
console.log({ partOne })