let bb = Function

Function = function() {
    let a = arguments[0]
    console.log(a)
    console.log(this)
    return bb.apply(this, arguments)
}
// Function.constructor = Function
