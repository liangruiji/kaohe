function aa(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let pivotIndex = Math.floor(arr.length / 2);
    let pre = arr.splice(pivotIndex, 1)[0];
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pre) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return aa(left).concat([pre], aa(right))

}
aa([2, 1, 8, 5, 6, 3, 4, 2, 50, 40, 30])
