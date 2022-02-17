

const isPrime = num => {
    let r = true ;
    for ( let i = 2 ; i**2 <= num; i ++ ) {
        if ( num % i === 0 ) {
            r = false
        }
    }
    return r
}

while (line = readline()) {
    var line2 = readline()
    let arr = line2.split(' ').map(x=>Number(x))
    let arr1 = arr.filter(x=> x%2)
    let arr2 = arr.filter(x=> !(x%2))
    const r = []
    for ( let x of arr1 ) {
        const i2 = arr2.findIndex(y=>  isPrime(x+y) )
        if ( i2 !== -1 ) {
            const ry = arr2[i2]
            const isInnerResultIndex = r.findIndex( ([oldx,oldy])=> oldy === ry );
            if ( isInnerResultIndex !== -1 ) {
                const [oldx,oldy] = r[isInnerResultIndex]
                const i3 = arr2.findIndex((y,j)=> j > i2 && isPrime(oldx+y) )
                if ( i3 !== -1 ) {
                    const newItem = [ oldx, arr2[i3] ]
                    r[isInnerResultIndex] = newItem
                    r.push([x, ry])
                    arr2.splice(i3, 1 )
                }
                    continue
                
            } else {
                    r.push([x, ry])
                    arr2.splice(i2, 1 )
                    continue
            }
        }
    }
    print(r.length)
    
}
