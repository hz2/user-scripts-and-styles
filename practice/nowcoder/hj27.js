
const sortStr = str => str.split('').sort().join()
while (line = readline()) {
  const [len, ...container] = line.split(' ');
  const [i, str, ...list] = container.reverse();
  const r = list.filter(x => x !== str && sortStr(x) === sortStr(str)).sort()
  console.log(r.length)
  if (r[Number(i-1)]) {
    console.log(r[Number(i-1)])
  }
}