import { input } from "./input"

let lines = input.split("\n").map((line) => line.split(" ").map(Number))

function findDifference(line) {
  let difference = []

  for (let i = 1; i < line.length; i++) {
    difference.push(line[i] - line[i - 1])
  }

  return difference
}

let sum = 0

for (let line of lines) {
  let differences = []

  while (!line.every((number) => number === line[0])) {
    differences.push(line)
    line = findDifference(line)
  }

  let [prequel] = line

  for (let difference of differences.toReversed()) {
    prequel = difference[0] - prequel
  }

  sum += prequel
}

console.log(sum)
