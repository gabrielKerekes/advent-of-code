const fs = require('fs');

const instructions = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((i) => i.split(' '))
  .map((i, index) => {
    return {
      instruction: i[0],
      argument: i[1],
      id: index,
      triedChanging: false,
    };
  });

var accumulator = 0;
var instruction = 0;
var executedInstructions = new Set();
var instructionsInOrder = [];
var toggledInstruction = null;

const goBack = () => {
  executedInstructions.delete(currentInstruction.id);

  if (currentInstruction.instruction === 'acc')
    parseInt((accumulator -= currentInstruction.argument));

  currentInstruction = instructionsInOrder.pop();
};

const toggleInstruction = (instruction) => {
  instruction.instruction = instruction.instruction === 'nop' ? 'jmp' : 'nop';
};

while (true) {
  var currentInstruction = instructions[instruction];

  if (executedInstructions.has(currentInstruction.id)) {
    // uncomment for part 1
    // break;

    // part 2
    currentInstruction = instructionsInOrder.pop();

    if (toggledInstruction) {
      while (currentInstruction.id !== toggledInstruction.id) {
        goBack();
      }
      toggleInstruction(toggledInstruction);
      goBack();
    }

    while (
      currentInstruction.instruction === 'acc' ||
      currentInstruction.triedChanging
    ) {
      goBack();
    }

    toggleInstruction(currentInstruction);

    currentInstruction.triedChanging = true;
    executedInstructions.delete(currentInstruction.id);

    toggledInstruction = currentInstruction;
    instruction = currentInstruction.id;
    continue;
  }

  switch (currentInstruction.instruction) {
    case 'acc':
      accumulator += parseInt(currentInstruction.argument);
      instruction++;
      break;
    case 'nop':
      instruction++;
      break;
    case 'jmp':
      instruction += parseInt(currentInstruction.argument);
      break;
  }

  if (instruction === instructions.length) {
    break;
  }

  executedInstructions.add(currentInstruction.id);
  instructionsInOrder.push(currentInstruction);
}

console.log({ accumulator });
