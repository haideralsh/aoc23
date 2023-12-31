import data from "./data"

function isAsterisk(char) {
  return char === "*"
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

function getAstresiskPosition(line, lineBefore, lineAfter, begin, end, row) {
  for (let i = begin - 1; i < end + 1; i++) {
    if (lineBefore && isAsterisk(lineBefore.charAt(i))) {
      return { currentRow: row - 1, currentIndex: i }
    }
    if (lineAfter && isAsterisk(lineAfter.charAt(i))) {
      return { currentRow: row + 1, currentIndex: i }
    }
    if (line[i] && isAsterisk(line[i])) {
      return { currentRow: row, currentIndex: i }
    }
  }

  return null
}

function solve(data) {
  let lines = data.split("\n")
  let surroundedByAsterisks = new Map()
  let sum = 0

  for (let row = 0; row < lines.length; row++) {
    let line = lines[row]
    let groups = extractNumbers(line)

    for (let { value, indices } of groups) {
      let [begin, end] = indices

      let lineBefore = lines[row - 1]
      let lineAfter = lines[row + 1]

      let position = getAstresiskPosition(
        line,
        lineBefore,
        lineAfter,
        begin,
        end,
        row,
      )

      if (position) {
        let { currentRow, currentIndex } = position

        let arr = surroundedByAsterisks.has(`${currentRow}:${currentIndex}`)
          ? surroundedByAsterisks.get(`${currentRow}:${currentIndex}`)
          : []

        arr.push(value)
        surroundedByAsterisks.set(`${currentRow}:${currentIndex}`, arr)
      }
    }
  }

  surroundedByAsterisks.forEach((ratio) => {
    if (ratio.length > 1) sum += ratio.reduce((acc, value) => acc * value, 1)
  })

  return sum
}

console.log(solve(data))
