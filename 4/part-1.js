import data from "./data";

function parseCardNumbers(input) {
	return input
		.split("\n")
		.map((line) => line.split(": "))
		.map(([, numbers]) => numbers.split(" | "))
		.map((groups) =>
			groups.map((group) => group.split(" ").filter(Boolean).map(Number)),
		);
}

function winningCardsCount(winning, nums) {
	let count = 0;

	for (let num of nums) {
		if (winning.includes(num)) count++;
	}

	return count;
}

function solve(input) {
	let sum = 0;

	for (let [winning, nums] of parseCardNumbers(input)) {
		let count = winningCardsCount(winning, nums);
		if (count) sum += 2 ** (count - 1);
	}

	return sum;
}

console.log(solve(data));
