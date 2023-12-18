import input from "./data";

/*
Turns this:
	"Card   8:  7 70 72 13 23  1 48 18 40 94 | 48 70 93 99 20 23 17 40 72 35 21  7 71  3 42 59 87 55 18 41 94  1 13 22 90"

Into this:
	{
	  "8": {
	    winning: [ 7, 70, 72, 13, 23, 1, 48, 18, 40, 94 ],
	    all: [ 48, 70, 93, 99, 20, 23, 17, 40, 72, 35, 21, 7, 71, 3, 42, 59, 87, 55, 18, 41, 94, 1, 13, 22, 90 ]
	  },
	}
*/
let cards = input
	.split("\n")
	.map((line) => line.split(": "))
	.map(([card, numbers]) => [card.match(/\d+/)[0], numbers.split(" | ")])
	.map(([cardNumber, groups]) => [
		cardNumber,
		groups.map((group) => group.split(" ").filter(Boolean).map(Number)),
	])
	.reduce(
		(cards, [cardNumber, groups]) => ({
			...cards,
			[cardNumber]: { winning: groups[0], all: groups[1] },
		}),
		{},
	);

// Every card is there at least once...
let cardCount = Object.keys(cards).reduce((counts, cardNumber) => ({ ...counts, [cardNumber]: 1}), {})

// Use a look-up table to not calculate count everytime
let winningCardsCount = {}

function countWinningCards(cardNumber) {
	if (winningCardsCount.hasOwnProperty(cardNumber)) {
		return winningCardsCount[cardNumber]
	}

	let count = 0
	for (let number of cards[cardNumber].all) {
		if (cards[cardNumber].winning.includes(number)) count++;
	}
	winningCardsCount[cardNumber] = count

	return winningCardsCount[cardNumber]
}

function updateCardCounts(cardNumber) {
	let count = countWinningCards(cardNumber)

	for (let i = +cardNumber + 1; i <= +cardNumber + count; i++) {
		let nextCardNumber = String(i);

		cardCount[nextCardNumber]++;
		updateCardCounts(nextCardNumber);
	}
}

for (let cardNumber in cards) {
	updateCardCounts(cardNumber);
}

const totalCards = Object.values(cardCount).reduce((sum, v) => sum + v, 0)

console.log(totalCards)
