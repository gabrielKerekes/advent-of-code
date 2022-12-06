// https://adventofcode.com/2022/day/6

const fs = require("fs");

const datastream = fs.readFileSync("input.txt", "utf8").split('');

const solve = (n) => datastream.findIndex((_, index) => {
    const set = new Set([...datastream.slice(index, index + n)])
    return set.size === n
}) + n

const partOne = solve(4)

console.log({ partOne })

const partTwo = solve(14)

console.log({ partTwo })