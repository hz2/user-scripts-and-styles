let arr = []
let max = null;

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', (line) => {
  const num = line
  if (max === null) {
    max = num * 1;
    return
  }
  if (arr.length < max) {
    if (arr.indexOf(num) === -1) {
      arr.push(num);
    } else {
      arr.push(null);
    }
  }
  if (arr.length === max) {
    max = null;
    for (const x of arr.sort((a, b) => a - b)) {
      if (x !== null) console.log(x)
    }
    arr = [];
  }


});