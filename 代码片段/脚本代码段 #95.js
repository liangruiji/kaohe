let aaa = String.fromCharCode
String.fromCharCode = function() {
    let str = aaa.apply(this, arguments)
    console.dir(arguments, str)
    return str
}
let bbb = String.fromCodePoint
String.fromCodePoint = function() {
    let str = bbb.apply(this, arguments)
    console.dir(arguments, str)
    return str
}

let ccc = String.prototype.charAt
String.prototype.charAt = function() {
    let str = ccc.apply(this, arguments)
    console.dir(arguments, str)
    return str
}
let ddd = String.prototype.charCodeAt
String.prototype.charCodeAt = function() {
    let str = ddd.apply(this, arguments)
    console.dir(arguments, str)
    return str
}
