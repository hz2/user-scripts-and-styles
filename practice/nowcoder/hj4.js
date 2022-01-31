while (line = readline()) {
  let word = line
  while (word.length > 8) {
    console.log(word.substring(0, 8))
    word = word.slice(8)
  }
  console.log(word.padEnd(8, 0))
}