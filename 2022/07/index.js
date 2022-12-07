// https://adventofcode.com/2022/day/7

const fs = require("fs");

const commandsWithOutput = fs
    .readFileSync("input.txt", "utf8")
    .split("$")
    .map((c) =>
        c
            .split("\n")
            .map((i) => i.trim())
            .filter((i) => i !== "")
    )
    .slice(2);

const root = { name: "/", size: 0 };

const tree = [root];
const folders = [root];

for ([command, ...output] of commandsWithOutput) {
    if (command === "ls") {
        const splitOutputs = output.map((o) => o.split(" "));
        splitOutputs.forEach(([sizeOrDir, name]) => {
            if (sizeOrDir !== "dir") {
                tree[tree.length - 1].size += parseInt(sizeOrDir, 10);
            }
        });
    } else {
        const [_, parameter] = command.split(" ");
        if (parameter === "..") {
            const popped = tree.pop();
            tree[tree.length - 1].size += popped.size;
        } else {
            const folder = { name: parameter, size: 0 };
            tree.push(folder);
            folders.push(folder);
        }
    }
}

const popped = tree.pop();
tree[tree.length - 1].size += popped.size;

console.log({
    partOne: folders
        .filter((f) => f.size < 100000)
        .reduce((sum, f) => sum + f.size, 0),
});

const totalSpace = 70000000;
const neededSpace = 30000000;
const usedSpace = folders[0].size;

console.log({
    partTwo: folders
        .filter((f) => totalSpace - usedSpace + f.size > neededSpace)
        .reduce((min, f) => (f.size < min ? f.size : min), folders[0].size),
});
