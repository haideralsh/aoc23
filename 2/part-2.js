import data from "./data"

function solve() {
  let gamesMin = 0
  let games = data.split("\n")

  for (let game of games) {
    let minimums = new Map()
    let [, content] = game.split(": ")

    let sets = content.split("; ")

    for (let set of sets) {
      for (let colorGroup of set.split(", ")) {
        let [countStr, color] = colorGroup.split(" ")

        let current = minimums.has(color) ? minimums.get(color) : 0
        minimums.set(color, Math.max(Number(countStr), current))
      }
    }

    gamesMin +=
      minimums.get("red") * minimums.get("green") * minimums.get("blue")
  }

  return gamesMin
}

solve()
