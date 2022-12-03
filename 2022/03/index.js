// https://adventofcode.com/2022/day/3

const fs = require('fs');

const getPriority = (item) => {
  const ordinal = item.charCodeAt('0')
  return ordinal >= 'a'.charCodeAt(0) ?
    ordinal - 'a'.charCodeAt(0) + 1 :
    ordinal - 'A'.charCodeAt(0) + 27
}

const partOne = fs
  .readFileSync('input.txt', 'utf8')
  .split("\n")
  .map(rucksackString => [...rucksackString])
  .map(rucksackItems => {
    const halfSize = rucksackItems.length / 2
    return [rucksackItems.slice(0, halfSize), rucksackItems.slice(halfSize, rucksackItems.length)]
  })
  .map(([firstHalf, secondHalf]) => {
    const secondHalfSet = new Set(secondHalf)
    const commonItem = firstHalf.find(item => secondHalfSet.has(item))
    return getPriority(commonItem)
  })
  .reduce((sum, itemOrdinal) => sum + itemOrdinal, 0)

console.log({ rucksacks: partOne })

const lines = fs
  .readFileSync('input.txt', 'utf8')
  .split("\n")
  .map(rucksackString => [...rucksackString])

const groups = []
while (lines.length) {
  groups.push(lines.splice(0, 3))
}

const partTwo = groups.
  map(group => {
    const secondSet = new Set(group[1])
    const thirdSet = new Set(group[2])
    const common = group[0].find(item => secondSet.has(item) && thirdSet.has(item))
    return getPriority(common)
  })
  .reduce((sum, itemOrdinal) => sum + itemOrdinal, 0)

console.log({ partTwo })