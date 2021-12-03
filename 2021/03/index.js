// https://adventofcode.com/2021/day/3

const fs = require('fs');

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

const lines = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(line => line.split(''))

const transposedLines = transpose(lines)

const [most, least] = transposedLines.map((v) => {
  const onesCount = v.reduce((ones, v) => {
    if (v === '1') ones += 1
    return ones
  }, 0)
  return onesCount > lines.length - onesCount
}).reduce(([most, least], moreOnes) => {
  if (moreOnes) {
    most.push('1')
    least.push('0')
  } else {
    most.push('0')
    least.push('1')
  }
  return [most, least]
}, [[], []]).map(v => parseInt(v.join(''), 2))

console.log({result1: most * least})

const lines2 = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(line => line.split(''))

var filteredMost = [...lines2]
for (var bit = 0; bit < filteredMost[0].length; bit++) {
  var count1s = 0
  for (var j = 0; j < filteredMost.length; j++) {
    count1s = count1s + (filteredMost[j][bit] === '1' ? 1 : 0)
  }
  const most = count1s >= filteredMost.length - count1s ? '1' : '0'
  if (filteredMost.length > 1) filteredMost = filteredMost.filter(f => f[bit] === most)
  if (filteredMost.length === 1) break
}

var filteredLeast = [...lines2]
for (var bit = 0; bit < filteredLeast[0].length; bit++) {
  var count1s = 0
  for (var j = 0; j < filteredLeast.length; j++) {
    count1s = count1s + (filteredLeast[j][bit] === '1' ? 1 : 0)
  }
  const least = count1s >= filteredLeast.length - count1s ? '0' : '1'
  if (filteredLeast.length > 1) filteredLeast = filteredLeast.filter(f => f[bit] === least)
  if (filteredLeast.length === 1) break
}

const m = parseInt(filteredMost[0].join(''), 2)
const l = parseInt(filteredLeast[0].join(''), 2)

console.log({result2: m * l})
