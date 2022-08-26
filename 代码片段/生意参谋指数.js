function getIndexMap(x=1000) {
    let obj = {}
    for (let i = 0; i <= x; i++) {
        let index = (10 * Math.log(i + 1) + 30) * i ** 0.5
        obj[index] = i
    }
    return obj
}
let aa = getIndexMap()
console.log(aa)