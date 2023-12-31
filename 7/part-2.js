import { input } from "./input"

let countedHands = new Map()

let strength = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
}

function count(hand) {
  if (countedHands.has(hand)) return countedHands.get(hand)

  let countedHand = hand.reduce(
    (count, card) => ({ ...count, [card]: count[card] ? ++count[card] : 1 }),
    {},
  )

  let jokerCount = countedHand["J"] ?? 0

  let highest = { card: null, count: 0 }

  for (let card in countedHand) {
    if (countedHand[card] > highest.count && card != "J") {
      highest = { card, count: countedHand[card] }
    }
  }

  countedHand[highest.card] = countedHand[highest.card] + jokerCount
  countedHands.set(hand, countedHand)

  return countedHand
}

function uniques(hand, occurances) {
  let counted = count(hand)

  if (counted["J"] === 5) return 5

  return Object.entries(counted).filter(
    ([card, counts]) => card !== "J" && counts === occurances,
  ).length
}

function estimate(hand) {
  // Five of a kind, where all five cards have the same label: AAAAA
  if (uniques(hand, 5)) return 7

  // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
  if (uniques(hand, 4)) return 6

  // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
  if (uniques(hand, 3) && uniques(hand, 2)) return 5

  // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
  if (uniques(hand, 3)) return 4

  // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
  if (uniques(hand, 2) === 2) return 3

  // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
  if (uniques(hand, 2)) return 2

  // High card, where all cards' labels are distinct: 23456
  return 1
}

let games = input
  .split("\n")
  .map((line) => line.split(" "))
  .map(([hand, bid]) => ({ hand: hand.split(""), bid: Number(bid) }))

for (let game of games) {
  let { hand } = game
  let value = estimate(hand)

  game.value = value
}

let total = games
  .sort((a, b) => {
    if (a.value !== b.value) return a.value > b.value

    for (let i = 0; i < a.hand.length; i++) {
      if (strength[a.hand[i]] === strength[b.hand[i]]) continue

      if (strength[a.hand[i]] > strength[b.hand[i]]) return 1

      return -1
    }
  })
  .reduce((total, { bid }, index) => total + (index + 1) * bid, 0)

console.log(total)
