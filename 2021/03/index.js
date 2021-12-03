// https://adventofcode.com/2021/day/3

const fs = require('fs');

const lines = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(line => line.split(''))

  console.log(lines)

const least = []
const most = []
for (var i = 0; i < lines[0].length; i++) {
  var count1s = 0
  for (var j = 0; j < lines.length; j++) {
    count1s = count1s + (lines[j][i] === '1' ? 1 : 0)
  }
  least.push(count1s > lines.length - count1s ? '0' : '1')
  most.push(count1s < lines.length - count1s ? '0' : '1')
}

const leastStr = least.join('')
const mostStr = most.join('')

console.log({result1: parseInt(leastStr, 2) * parseInt(mostStr, 2)})

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
  console.log({filteredMost})
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
console.log({m,l})
console.log({result2: m * l})


// const mostArr = mostArr.split('')
// var filteredMost = [...lines]
// while (filteredMost.length > 1) {
//   const least = []
//   const most = []
//   for (var i = 0; i < lines[0].length; i++) {
//     var count1s = 0
//     for (var j = 0; j < lines.length; j++) {
//       count1s = count1s + (lines[j][i] === '1' ? 1 : 0)
//     }
//     least.push(count1s > lines.length - count1s ? '0' : '1')
//     most.push(count1s < lines.length - count1s ? '0' : '1')
//   }
//   filteredMost.filter()
// }
