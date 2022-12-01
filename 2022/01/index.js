// https://adventofcode.com/2022/day/1

const fs = require('fs');

const result1 = Math.max(...fs
  .readFileSync('input.txt', 'utf8')
  .split("\n\n")
  .map(elfRawCalories => elfRawCalories.split("\n"))
  .map(elfCalories => elfCalories.reduce((sum, elfCalorie) => sum + parseInt(elfCalorie), 0)))

console.log({ result1 })

const elfCalorieSums = fs
  .readFileSync('input.txt', 'utf8')
  .split("\n\n")
  .map(elfRawCalories => elfRawCalories.split("\n"))
  .map(elfCalories => elfCalories.reduce((sum, elfCalorie) => sum + parseInt(elfCalorie), 0))

elfCalorieSums.sort((a, b) => a - b)

const result2 = elfCalorieSums.slice(-3).reduce((sum, elfCalorieSum) => sum + elfCalorieSum, 0)

console.log({ result2 })