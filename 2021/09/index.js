// https://adventofcode.com/2021/day/9

const fs = require('fs');

const DUMMY_LOCATION = 9

const rawRows = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(line => line.split('').map(c => parseInt(c)))
  .map(row => [DUMMY_LOCATION, ...row, DUMMY_LOCATION])

const rows = [
  Array(rawRows[0].length).fill(DUMMY_LOCATION),
  ...rawRows,
  Array(rawRows[0].length).fill(DUMMY_LOCATION)
]

const lowPoints = []
for (var i = 1; i < rows.length - 1; i++) {
  for (var j = 1; j < rows[i].length - 1; j++) {
    const current = rows[i][j]
    const left = rows[i][j - 1]
    const right = rows[i][j + 1]
    const top = rows[i - 1][j]
    const bottom = rows[i + 1][j]

    const neighbors = [left, right, top, bottom]
    const isLowest = neighbors.every(n => n > current)
    if (isLowest) {
      lowPoints.push({value: current, i, j})
    }
  }
}

const riskLevels = lowPoints.map(lp => lp.value + 1)

console.log({result: riskLevels.reduce((sum, v) => sum + v, 0)})

const basinSizes = lowPoints.map(lp => {
  const stack = [lp]

  var numberOfElements = 0
  while (stack.length !== 0) {
    const {i, j} = stack.pop()
    const left = {value: rows[i][j - 1], i, j: j - 1}
    const right = {value: rows[i][j + 1], i, j: j + 1}
    const top = {value: rows[i - 1][j], i: i - 1, j}
    const bottom = {value: rows[i + 1][j], i: i + 1, j}

    const neighbors = [left, right, top, bottom]
    neighbors.filter(n => rows[n.i][n.j] != 9).forEach(n => stack.unshift(n))
    
    if (rows[i][j] != 9) numberOfElements++
    rows[i][j] = 9
  }

  return numberOfElements
})

const result2 = basinSizes
  .sort((a, b) => b - a) 
  .slice(0, 3)
  .reduce((product, v) => product * v, 1)

console.log({result2})