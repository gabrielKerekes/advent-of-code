// https://adventofcode.com/2021/day/5

const fs = require('fs');

const coords = fs
  .readFileSync('smallInput.txt', 'utf8')
  .split('\n')
  .map(line => line.split(' -> '))
  .map(([start, end]) => [start.split(',').map(v => parseInt(v)), end.split(',').map(v => parseInt(v))])
  .map(([start, end]) => {return {start: {x: start[0], y: start[1]}, end: {x: end[0], y: end[1]}}})

const board = []
for (var i = 0; i < 1000; i++) {
  board.push([])
  for (var j = 0; j < 1000; j++) {
    board[i].push(0)
  }
}

for (const {start, end} of coords) {
  if (start.x === end.x || start.y === end.y) {
    const [smaller, larger] = start.x === end.x ? (start.y > end.y ? [end, start] : [start, end]) : (start.x > end.x ? [end, start] : [start, end])
    for (var x = smaller.x; x <= larger.x; x++) {
      for (var y = smaller.y; y <= larger.y; y++) {
        board[y][x]++ 
      }
    }
  }
}

console.log({resul1: board.flat().filter(v => v >= 2).length})

const board2 = []
for (var i = 0; i < 1000; i++) {
  board2.push([])
  for (var j = 0; j < 1000; j++) {
    board2[i].push(0)
  }
}

for (const {start, end} of coords) {
  const isHorizontal = start.y === end.y
  const isVertical = start.x === end.x
  const isDiagonal = !isHorizontal && !isVertical

  if (isHorizontal || isVertical) {
    const [smaller, larger] = start.x === end.x ? (start.y > end.y ? [end, start] : [start, end]) : (start.x > end.x ? [end, start] : [start, end])

    for (var x = smaller.x; x <= larger.x; x++) {
      for (var y = smaller.y; y <= larger.y; y++) {
        board2[y][x]++ 
      }
    }
  } else {
    // right, down
    if (start.x < end.x && start.y < end.y) {
      console.log('right down')
      var {x, y} = start
      while (x <= end.x && y <= end.y) {
        console.log({x, y})
        board2[y][x]++ 
        x++
        y++
      }
    // right, up
    } else if (start.x < end.x && start.y > end.y) {
      console.log('right up')
      var {x, y} = start
      while (x <= end.x && y >= end.y) {
        console.log('right up', {x, y})
        board2[y][x]++
        x++
        y--
      }
    // left, down
    } else if (start.x > end.x && start.y < end.y) {
      console.log('left down')
      var {x, y} = start
      while (x >= end.x && y <= end.y) {
        console.log({x, y})
        board2[y][x]++
        x--
        y++
      }
    // left, up
    } else if (start.x > end.x && start.y > end.y) {
      console.log('left up')
      var {x, y} = start
      while (x >= end.x && y >= end.y) {
        console.log({x, y})
        board2[y][x]++
        x--
        y--
      }
    }
    console.log('end')
  }
}

console.log({resul2: board2.flat().filter(v => v >= 2).length})