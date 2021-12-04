// https://adventofcode.com/2021/day/4

const fs = require('fs');

const transpose = (matrix) => {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

const isBoardComplete = (board) => {
  // rows
  const anyRow = board.some(row => {
    const r = row.filter(v => v === -1).length === 5
    return r
  })
  if (anyRow) return true

  // columns
  const anyColumn = transpose(board).some(row => row.filter(v => v === -1).length === 5)
  if (anyColumn) return true

  // diagnoals
  // var topBottom  = 0
  // var bottomTop = 0
  // for (var i = 0; i < board.length; i++) {
  //   if (board[i][i] === -1) topBottom++
  //   if (board[i][board.length - i - 1] === -1) bottomTop++
  // }

  // return topBottom === 5 || bottomTop === 5
  return false
}

const findInBoard = (board, v) => {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (board[i][j] === v) return {row: i, column: j}
    }
  }
  return {row: -1, column: -1}
}

const sumUnmarked = (board) => {
  return board.reduce((sumRows, row) => {
    const sumRow = row.reduce((sumRow, v) => {
      if (v === -1) return sumRow
      return sumRow + v
    }, 0)
    return sumRows + sumRow
  }, 0)
}

const lines = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')

const numbers = lines[0].split(',').map(v => parseInt(v))

const boardLines = lines.slice(2)

const boards = []
for (var i = 0; i < boardLines.length; i++) {
  const board = []
  for (var j = 0; j < 5; j++, i++) {
    board.push(boardLines[i].split(' ').filter(v => v !== '').map(v => parseInt(v)))
  }
  boards.push(board)
}

var boards2 = [...boards]

var done = false
for (var i = 0; i < numbers.length; i++) {
  for (board of boards) {
    const {row, column} = findInBoard(board, numbers[i])
    if (row !== -1 && column !== -1) {
      board[row][column] = -1
    }
    const boardComplete = isBoardComplete(board)
    if (boardComplete) {
      console.log({result1: sumUnmarked(board) * numbers[i]})
      done = true
      break
    }
  }
  if (done) break
}

if (!done) console.log({result1: -1})

for (var i = 0; i < numbers.length; i++) {
  for (var j = 0; j < boards2.length; j++) {
    const {row, column} = findInBoard(boards2[j], numbers[i])
    if (row !== -1 && column !== -1) {
      boards2[j][row][column] = -1
    }
    const boardComplete = isBoardComplete(boards2[j])
    if (boardComplete) {
      const deleted = boards2.splice(j, 1)
      j--
      if (boards2.length === 0) {
        console.log({result2: sumUnmarked(deleted[0]) * numbers[i]})
        return
      }
    }
  }
}