import { input } from "./input"

let [instructions, groups] = input.split("\n\n")

groups = groups
  .split("\n")
  .map((group) => group.match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/))
  .reduce((result, reg) => ({ ...result, [reg[1]]: [reg[2], reg[3]] }), {})

let target = "AAA"
let steps = 0
let index = 0

while (target !== "ZZZ") {
  if (index === instructions.length) index = 0

  let [left, right] = groups[target]

  switch (instructions[index]) {
    case "R":
      target = right
      break

    case "L":
      target = left
      break
  }

  index++
  steps++
}

console.log(steps)
