import data from "./data";

const COLOR_lIMITS = {
	red: 12,
	green: 13,
	blue: 14,
};

function solve() {
	let possibleGames = new Set();
	let games = data.split("\n");

	for (let game of games) {
		let [gameNo, content] = game.split(": ");
		possibleGames.add(gameNo);

		let sets = content.split("; ");

		for (let set of sets) {
			for (let colorGroup of set.split(", ")) {
				let [countStr, color] = colorGroup.split(" ");
				let count = Number(countStr);

				if (count > COLOR_lIMITS[color]) {
					possibleGames.delete(gameNo);
				}
			}
		}
	}

	return Array.from(possibleGames)
		.map((game) => game.split(" "))
		.map(([, count]) => count)
		.map(Number)
		.reduce((sum, num) => num + sum, 0);
}

console.log(solve());
