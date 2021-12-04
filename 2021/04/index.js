// https://adventofcode.com/2021/day/4

const fs = require('fs');

const transpose = (matrix) => {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

const isBoardComplete = (board) => {
  return board.some(row => row.filter(v => v === -1).length === 5)
    || transpose(board).some(row => row.filter(v => v === -1).length === 5)
}

const markNumber = (board, number) => {
  return board.map(row => {
    return row.map(v => v === number ? -1 : v)
  })
}

const sumUnmarked = (board) => {
  return board.reduce((sumRows, row) => {
    const sumRow = row
      .filter(v => v !== -1)
      .reduce((sumRow, v) => {
        return sumRow + v
      }, 0)

    return sumRows + sumRow
  }, 0)
}

const lines = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')

const numbers = lines[0].split(',').map(v => parseInt(v))

var boards = lines
  // skip first two
  .slice(2)
  // remove empty lines
  .filter(line => line !== '')
  // split by whitespace, remove redundant whitespace, map into number
  .map(line => line.split(' ').filter(v => v !== '').map(v => parseInt(v)))
  // split into groups of 5
  .map((_, i, a) => i % 5 === 0 ? a.slice(i, i + 5) : null)
  // remove empty groups
  .filter(v => v)

const result1 = (() => {
  for (number of numbers) {
    boards = boards.map(board => markNumber(board, number))

    const completeBoard = boards.find(isBoardComplete)
    if (completeBoard) {
      return sumUnmarked(completeBoard) * number
    }
  }
})()

console.log({result1})

// no need to reset boards, we can just continue where we left off
// although the numbers will be repeated (I don't feel like storing
// the last number index)
const result2 = (() => {
  for (number of numbers) {
    boards = boards.map(board => markNumber(board, number))

    const completeBoard = boards.find(isBoardComplete)
    boards = boards.filter(b => !isBoardComplete(b))
    if (boards.length === 0) {
      return sumUnmarked(completeBoard) * number
    }
  }
})()

console.log({result2})