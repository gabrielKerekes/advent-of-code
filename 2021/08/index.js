// https://adventofcode.com/2021/day/8

const fs = require('fs');

const result1 = fs
  .readFileSync('smallInput.txt', 'utf8')
  .split('\n')
  .map(line => line.split(' | '))
  .map(([p, v]) => v.split(' '))
  .flat()
  .filter(v => [2, 3, 4, 7].includes(v.length))

console.log({result1: result1.length})

const determineByEvery = (n, hay) => {
  return hay.find(v => n.every(a => v.includes(a)))
}

const determineByEveryOtherWay = (n, hay) => {
  return hay.find(v => v.every(c => n.includes(c)))
}

const result2 = fs
  .readFileSync('smallInput.txt', 'utf8')
  .split('\n')
  .map(line => line.split(' | '))
  .map(([p, v]) => [p.split(' '), v.split(' ')])
  .map(([ps, vs]) => {
    const patterns = ps.map(p => p.split('')).reduce((r, p) => {
      r[p.length].push(p.sort())
      return r
    }, {2: [], 3: [], 4: [], 5: [], 6: [], 7: []})
  
    const result = [-1, patterns[2][0], -1, -1, patterns[4][0], -1, -1, patterns[3][0], patterns[7][0], -1]
    result[3] = determineByEvery(result[1], patterns[5])
    result[9] = determineByEvery(result[3], patterns[6])
    result[5] = determineByEveryOtherWay(result[9], patterns[5].filter(v => v !== result[3]))
    result[2] = patterns[5].filter(v => v !== result[3] && v !== result[5])[0]
    result[0] = determineByEvery(result[1], patterns[6].filter(v => v != result[9]))
    result[6] = patterns[6].filter(v => v !== result[0] && v !== result[9])[0]
    
    const resultStrings = result.map(r => r.join(''))
    return parseInt(vs.map(v => resultStrings.indexOf(v.split('').sort().join(''))).join(''), 10)
  }).reduce((s, v) => s + v, 0)
  
  console.log({result2})