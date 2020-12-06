const fs = require('fs');

const part1 = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n\n')
  .map((group) => group.split('\n'))
  .map((person) =>
    person.reduce((set, answers) => {
      answers.split('').forEach((answer) => set.add(answer));
      return set;
    }, new Set()),
  )
  .reduce((sum, groupAnswers) => (sum += groupAnswers.size), 0);

console.log({ part1 });

const part2 = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n\n')
  .map((group) => group.split('\n'))
  .map((groupAnswers) =>
    groupAnswers.reduce(
      (groupResult, groupAnswer) => {
        groupResult.count++;
        groupAnswer.split('').forEach((answer) => {
          groupResult.dict.has(answer)
            ? groupResult.dict.set(answer, groupResult.dict.get(answer) + 1)
            : groupResult.dict.set(answer, 1);
        });
        return groupResult;
      },
      { count: 0, dict: new Map() },
    ),
  )
  .map(
    (groupAnswers) =>
      [...groupAnswers.dict.values()].filter((v) => groupAnswers.count === v)
        .length,
  )
  .reduce((sum, answerCounts) => {
    sum += answerCounts;
    return sum;
  }, 0);

console.log({ part2 });

/*
 * First try - imperative, done while watching TV - not successful
 */

// var groupAnswers = new Set();
// var groupAnswers2 = new Map();
// var sum = 0;
// var sum2 = 0;
// var groupSize = 0;
// for (var line of lines) {
//   if (line === '') {
//     sum += groupAnswers.size;
//     sum2 += Array.from(groupAnswers2.values()).filter((v) => v === groupSize)
//       .length;
//     groupSize = 0;
//     groupAnswers.clear();
//     groupAnswers2.clear();
//     continue;
//   }
//   groupSize++;
//   for (var c of line) {
//     groupAnswers.add(c);

//     console.log({ c, a: groupAnswers2.has(c), groupAnswers2 });
//     if (groupAnswers2.has(c)) groupAnswers2[c] = groupAnswers2[c] + 1;
//     else groupAnswers2[c] = 1;
//     // console.log({ groupAnswers2 });
//   }
// }

// console.log({ sum, sum2 });
