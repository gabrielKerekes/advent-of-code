// https://adventofcode.com/2021/day/2

const fs = require('fs');

const result1 = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(line => line.split(' '))
  .map((splitLine) => [splitLine[0], parseInt(splitLine[1])])
  .reduce(([y, x], [direction, steps]) => {
    switch(direction) {
      case 'forward':
        x += steps
        break
      case 'down':
        y += steps
        break
      case 'up':
        y -= steps
        break
    }
    return [y, x]
  }, [0, 0])

console.log({result1: result1[0] * result1[1]})

const result2 = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(line => line.split(' '))
  .map((splitLine) => [splitLine[0], parseInt(splitLine[1])])
  .reduce(([y, x, aim], [direction, steps]) => {
    switch(direction) {
      case 'forward':
        x += steps
        y += steps * aim
        break
      case 'down':
        aim += steps
        break
      case 'up':
        aim -= steps
        break
    }
    return [y, x, aim]
  }, [0, 0, 0])

console.log({result2: result2[0] * result2[1]})