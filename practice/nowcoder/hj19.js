const r = new Map()
while (line = readline()) {
    const arr = line.split(/[ \\]/g)
    const linenum = arr[arr.length - 1]
    const err = arr[arr.length - 2]
    const errtext = err.substring(err.length - 16, err.length)
    const key = `${errtext}_${linenum}`
    let count = 1
    if (r.has(key)) {
        count += r.get(key)
    }
    r.set(key, count)
}
const fullArr = Array.from(r);
const result = fullArr.filter((_x, i) => i >= fullArr.length - 8)
result.forEach(x => {
    const [key, val] = x
    const [text, num] = key.split('_')
    print(text, num, val)
})