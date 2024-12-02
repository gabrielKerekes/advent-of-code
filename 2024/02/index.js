// https://adventofcode.com/2024/day/1

const fs = require("fs");

const test = (report) => {
  const reportData = report
    .map((v, i) => {
      if (i === report.length - 1) return null;
      const diff = v - report[i + 1];
      if (Math.abs(diff) > 3) return null;
      return [diff, diff > 0 ? "down" : diff < 0 ? "up" : "zero"];
    })
    .filter((v) => v != null);

  const up = reportData.filter(([diff, direction]) => direction === "up");
  const down = reportData.filter(([diff, direction]) => direction === "down");

  return up.length === report.length - 1 || down.length === report.length - 1;
};

const reports = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(" ").map(Number))
  .map(test)
  .filter((v) => v).length;

console.log({ reports });

const reports2 = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(" ").map(Number))
  .map((report) => {
    const r = test(report);
    if (r) return true;
    for (let i = 0; i < report.length; i++) {
      const copy = [...report];
      copy.splice(i, 1);
      if (test(copy)) return true;
    }
    return false;
  })
  .filter((v) => v).length;

console.log({ reports2 });
