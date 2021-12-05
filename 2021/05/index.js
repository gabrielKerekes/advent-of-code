// https://adventofcode.com/2021/day/5

const fs = require('fs');

const markPoint = (points, x, y) => {
  if (!points.has(y)) {
    points.set(y, new Map())
  }

  const row = points.get(y)
  if (!row.has(x)) {
    row.set(x, 0)
  }

  row.set(x, row.get(x) + 1)
}

const zip = (a, b) => Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i] == null ? a[a.length - 1] : a[i], b[i] == null ? b[b.length - 1] : b[i]]);

const getRange = (start, end) => Array(end - start + 1).fill().map((_, i) => i + start)

const getStartAndEnd = (v1, v2) => v1 < v2 ? [v1, v2, false] : [v2, v1, true]

const getLinePoints = (p1, p2) => {
  const [xStart, xEnd, reverseXs] = getStartAndEnd(p1.x, p2.x)
  const xs = getRange(xStart, xEnd)
  if (reverseXs) xs.reverse()

  const [yStart, yEnd, reverseYs] = getStartAndEnd(p1.y, p2.y)
  const ys = getRange(yStart, yEnd)
  if (reverseYs) ys.reverse()

  return zip(ys, xs)
}

const coords = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(line => line.split(' -> '))
  .map(([p1, p2]) => [p1.split(',').map(v => parseInt(v)), p2.split(',').map(v => parseInt(v))])
  .map(([p1, p2]) => {return {p1: {x: p1[0], y: p1[1]}, p2: {x: p2[0], y: p2[1]}}})

const points = new Map()

// mark horizontal and vertical lines
coords
  .filter(({p1, p2}) => p1.y === p2.y || p1.x === p2.x)
  .forEach(({p1, p2}) => getLinePoints(p1, p2).forEach(p => markPoint(points, p[1], p[0])))

console.log({result1: [...points.values()].map(m => [...m.values()]).flat().filter(v => v >= 2).length})

// mark diagonals
coords
  .filter(({p1, p2}) => p1.y !== p2.y && p1.x !== p2.x)
  .forEach(({p1, p2}) => getLinePoints(p1, p2).forEach(p => markPoint(points, p[1], p[0])))

console.log({result2: [...points.values()].map(m => [...m.values()]).flat().filter(v => v >= 2).length})