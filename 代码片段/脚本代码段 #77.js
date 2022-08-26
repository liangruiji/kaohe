let toArray = function(e) {
    for (var t = Array(e.length), n = 0; t.length > n; ++n)
        t[n] = e[n];
    return t
}
let hookFunctionAndArguments = function(e, t, n, r) {
    var o = e[t];
    e[t] = function() {
        var e = toArray(arguments);
        if (n && !r && !1 === n.apply(this, e))
            return;
        return r && (e = n.apply(this, e)),
        o.apply(this, e)
    }
}
function aa(e) {
    return e
}
aa.bb = function(e) {
    console.log(e)
    return e
}
aa.bb('测试')
// hookFunctionAndArguments(aa, 'bb', function(e) {
//     console.log('>>>>>')
//     return ['66']
// }, true)

let hookFunction = function(e, t, n) {
    var r = e[t];
    e[t] = function() {
        var e = toArray(arguments);
        if (n && !1 === n.apply(this, e))
            return;
        return r.apply(this, e)
    }
}
hookFunction(aa, 'bb', function(e) {
    console.log('>>>>>>')
    return '666'
})
aa.bb('测试')
