x = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "&"
      , n = {};
    return e.split(t).forEach((function(e) {
        var t = e.split("=")
          , r = t[0];
        n[r] = t[1]
    }
    )),
    n
}
w = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
      , n = [];
    for (var r in e) {
        var o = e[r]
          , i = "".concat(encodeURIComponent(r), "=").concat(encodeURIComponent(t ? encodeURIComponent(o) : String(o).slice(0, 512)));
        n.push(i)
    }
    return n.join("&")
}
function d() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
        var t = 16 * Math.random() | 0;
        return ("x" == e ? t : 3 & t | 8).toString(16)
    }
    ))
}
E = function() {
    for (var e = [], t = 0; t < 4; t++) {
        var n = Math.floor(256 * Math.random());
        e[t] = (n > 15 ? "" : "0") + n.toString(16)
    }
    return e.join("")
}

function f() {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 16, n = [], r = 0; r < e; r++) {
        var o = Math.floor(Math.random() * t);
        n[r] = o.toString(t)
    }
    return n.join("")
}
O = 1e3
function j() {
    var e = E()
      , t = Date.now()
      , n = O
      , r = f(1)
      , o = f(4);
    return O = O + 1 > 1e4 ? 1e3 : O + 1,
    e + t + n + r + o
}
var l = function(e, t) {
    for (var n in t)
        t.hasOwnProperty(n) && (e[n] = t[n]);
    return e
};

function aa(e) {
    let a = x(e)
    let obj = {}
    for (var r in a) {
        var o = a[r]
        obj[r] = decodeURIComponent(decodeURIComponent(o))
    }
    return obj
}
