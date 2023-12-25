import { input } from "./input.js"

let [times, distances] = input.split("\n").map(line => line.match(/\d+/g).map(Number))

let marginError = 1

for (let i = 0; i < times.length; i++) {
	let newRecords = 0
	let record = distances[i]

	for (let speed = 1; speed < times[times.length - 1]; speed++) {
		let time_left = times[i] - speed
		let distance = time_left * speed

		if (distance > record) {
			newRecords++
		}
	}

	marginError *= newRecords
}

console.log(marginError)

