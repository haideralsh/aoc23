import { input } from "./input.js"

let [time, distance] = input
  .split("\n")
  .map((line) => Number(line.match(/\d+/g).join("")))

let marginError = 1
let newRecords = 0
let record = distance

for (let speed = 1; speed < time - 1; speed++) {
  let time_left = time - speed
  let distance = time_left * speed

  if (distance > record) {
    newRecords++
  }
}

marginError *= newRecords

console.log(marginError)
