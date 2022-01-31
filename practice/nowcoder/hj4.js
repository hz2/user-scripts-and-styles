while (line = readline()) {
  let word = line
  while (word.length > 8) {
    console.log(word.substring(0, 8))
    word = word.slice(8)
  }
  console.log(word.padEnd(8, 0))
}


// solution 2

while (line = readline()) {
  let arr = line.split('').concat([0, 0, 0, 0, 0, 0, 0])
  while (arr.length >= 8) {
    print(arr.splice(0, 8).join(''))
  }
}