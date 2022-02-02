const obj = {}

while (line = readline()) {
  const [k, v] = line.split(' ').map(Number);
  if (v) {
    const prev = obj[k] || 0
    obj[k] = prev + v
  }
}
for (k in obj) {
  print(k, obj[k])
}