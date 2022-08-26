let t = {}
async function getDate() {
    let o = await fetch("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js")
    let b = await o.text()
    await window.eval(b)

    let a = _
    let key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ50kaClQ5XTQfzkHAW9Ehi+iXQKUwVWg1R0SC3uYIlVmneu6AfVPEj6ovMmHa2ucq0qCUlMK+ACUPejzMZbcRAMtDAM+o0XYujcGxJpcc6jHhZGO0QSRK37+i47RbCxcdsUZUB5AS0BAIQOTfRW8XUrrGzmZWtiypu/97lKVpeQIDAQAB"
    r = window.CryptoJS
    s = function(e) {
        return r.enc.Base64.stringify(r.enc.Hex.parse(e))
    }
    u = function(e) {
        return r.enc.Hex.stringify(r.enc.Base64.parse(e))
    }
    l = new JSEncrypt()
    l.setPublicKey(key);
    var c = "w28Cz694s63kBYk4"
    f = "4kYBk36s496zC82w"
    d = r.enc.Utf8.parse(c)
    p = {
        iv: r.enc.Utf8.parse(f),
        mode: r.mode.CBC,
        padding: r.pad.Pkcs7
    }
    h = function(e) {
        if (!e || !a.isString(e))
            return !1;
        for (var t = e.toLowerCase().split(""), n = 0; n < t.length; n++) {
            var r = t[n];
            if ("0" !== r && "1" !== r && "2" !== r && "3" !== r && "4" !== r && "5" !== r && "6" !== r && "7" !== r && "8" !== r && "9" !== r && "a" !== r && "b" !== r && "c" !== r && "d" !== r && "e" !== r && "f" !== r)
                return !1
        }
        return !0
    }
    m = function(e, t) {
        var n = e;
        if (h(e))
            try {
                n = JSON.parse(r.AES.decrypt(s(e), d, p).toString(r.enc.Utf8))
            } catch (e) {
                return a.isFunction(t) && t(e),
                null
            }
        return n
    }

    t.decrypt = m;
    var v = function(e, t) {
        var n = e;
        if (a.isPlainObject(e) || a.isArray(e))
            try {
                n = u(r.AES.encrypt(JSON.stringify(e), d, p).toString())
            } catch (e) {
                return a.isFunction(t) && t(e),
                null
            }
        return n
    };
    t.encrypt = v;
    var g = function() {
        return {
            "Transit-Id": l.encrypt(c)
        }
    };
    t.getRequestHeader = g;
    var y = function(e) {
        if (a.isPlainObject(e)) {
            var t = Object.keys(e)
              , n = t.reduce(function(e, t, n) {
                return "magic-id" === t.toLowerCase() ? n : e
            }, -1);
            if (-1 === n)
                return !1;
            var r = a.get(e, t[n]);
            return !(!r || !h(r))
        }
        return !1
    };
    t.validateResponseHeader = y,
    t["default"] = {
        decrypt: m,
        encrypt: v,
        getRequestHeader: g,
        validateResponseHeader: y
    }

}
getDate()
