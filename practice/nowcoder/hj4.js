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


// solution 3

while (line = readline()) {
  let a = line.concat('0000000');
  let i = 0;
  while (a.length > i + 7) {
    print('' + a[i] + a[i + 1] + a[i + 2] + a[i + 3] + a[i + 4] + a[i + 5] + a[i + 6] + a[i + 7])
    i += 8
  }
}

while (line = readline()) {
  let a = line.concat('0000000');
  let i = 0;
  while (a.length > i + 7) {
    print(a.substring(i, i + 8))
    i += 8
  }
}