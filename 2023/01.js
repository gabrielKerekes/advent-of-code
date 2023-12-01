const fs = require("fs");

const digitStrings = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const isDigit = (c) => {
  const charCode = c.charCodeAt(0);
  return charCode >= "0".charCodeAt(0) && charCode <= "9".charCodeAt(0);
};

const getDigitString = (line, start) =>
  digitStrings[
    Object.keys(digitStrings).filter(
      (key) => key === line.substring(start, start + key.length)
    )[0]
  ];

const sum = fs
  .readFileSync("01.txt", "utf8")
  .split("\n")
  .map((line) => [...line].filter((c) => isDigit(c)))
  .map((line) => parseInt(`${line[0]}${line[line.length - 1]}`, 10))
  .reduce((sum, num) => sum + num, 0);

console.log({ sum });

const sum2 = fs
  .readFileSync("01.txt", "utf8")
  .split("\n")
  .map((line) =>
    [...line]
      .map((c, i) => (isDigit(c) ? c : getDigitString(line, i)))
      .filter((c) => c != null)
  )
  .map((line) => parseInt(`${line[0]}${line[line.length - 1]}`, 10))
  .reduce((sum, num) => sum + num, 0);

console.log({ sum2 });
