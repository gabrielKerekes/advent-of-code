// https://adventofcode.com/2022/day/2

const fs = require('fs');

const OPPONENT_ROCK = 'A'
const OPPONENT_PAPER = 'B'
const OPPONENT_SCISSORS = 'C'

const MY_ROCK = 'X'
const MY_PAPER = 'Y'
const MY_SCISSORS = 'Z'

const SHAPE_SCORE = {}
SHAPE_SCORE[MY_ROCK] = 1
SHAPE_SCORE[MY_PAPER] = 2
SHAPE_SCORE[MY_SCISSORS] = 3

SHAPE_SCORE[OPPONENT_ROCK] = 1
SHAPE_SCORE[OPPONENT_PAPER] = 2
SHAPE_SCORE[OPPONENT_SCISSORS] = 3

const EQUALITY_TABLE = {}
EQUALITY_TABLE[OPPONENT_ROCK] = MY_ROCK
EQUALITY_TABLE[OPPONENT_PAPER] = MY_PAPER
EQUALITY_TABLE[OPPONENT_SCISSORS] = MY_SCISSORS

const WIN_TABLE = {}
WIN_TABLE[OPPONENT_ROCK] = MY_PAPER
WIN_TABLE[OPPONENT_PAPER] = MY_SCISSORS
WIN_TABLE[OPPONENT_SCISSORS] = MY_ROCK

const LOSE_TABLE = {}
LOSE_TABLE[OPPONENT_ROCK] = MY_SCISSORS
LOSE_TABLE[OPPONENT_PAPER] = MY_ROCK
LOSE_TABLE[OPPONENT_SCISSORS] = MY_PAPER

const games = fs
  .readFileSync('input.txt', 'utf8')
  .split("\n")

const gameScores = games.map(shapes => {
  const [opponentShape, myShape] = shapes.split(' ')
  const myShapeScore = SHAPE_SCORE[myShape]
  const myGameScore = EQUALITY_TABLE[opponentShape] === myShape ? 3 : WIN_TABLE[opponentShape] === myShape ? 6 : 0
  return myShapeScore + myGameScore
})

const scoresSum = gameScores.reduce((sum, gameScore) => sum + gameScore)

console.log({ scoresSum })

const LOSE = 'X'
const DRAW = 'Y'
const WIN = 'Z'

const gamesScores2 = games.map(shapes => {
  const [opponentShape, desiredState] = shapes.split(' ')
  switch (desiredState) {
    case LOSE:
      return 0 + SHAPE_SCORE[LOSE_TABLE[opponentShape]]
    case DRAW:
      return 3 + SHAPE_SCORE[opponentShape]
    case WIN:
      return 6 + SHAPE_SCORE[WIN_TABLE[opponentShape]]
  }
})

const scoresSum2 = gamesScores2.reduce((sum, gameScore) => sum + gameScore)

console.log({ scoresSum2 })