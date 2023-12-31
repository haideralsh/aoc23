import data from "./data"

function isSymbol(char) {
  return isNaN(char) && char !== "." && char !== ""
}

function extractNumbers(line) {
  let groups = []
  let regex = /\d+/g
  let match

  while ((match = regex.exec(line)) !== null) {
    groups.push({
      value: Number(match[0]),
      indices: [match.index, match.index + match[0].length],
    })
  }

  return groups
}

function isSurroundedBySymbol(line, lineBefore, lineAfter, begin, end) {
  for (let i = begin - 1; i < end + 1; i++) {
    if (
      (lineBefore && isSymbol(lineBefore.charAt(i))) ||
      (lineAfter && isSymbol(lineAfter.charAt(i))) ||
      (line[i] && isSymbol(line[i]))
    ) {
      return true
    }
  }

  return false
}

function solve(data) {
  let lines = data.split("\n")
  let sum = 0

  for (let row = 0; row < lines.length; row++) {
    let line = lines[row]
    let groups = extractNumbers(line)

    for (let { value, indices } of groups) {
      let [begin, end] = indices

      let lineBefore = lines[row - 1]
      let lineAfter = lines[row + 1]

      if (isSurroundedBySymbol(line, lineBefore, lineAfter, begin, end)) {
        sum += value
      }
    }
  }

  return sum
}

console.log(solve(data))
