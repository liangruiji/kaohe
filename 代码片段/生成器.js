let c = function*(b, o) {
    let s, u, i
    s = 0
    u = {}
    i = function*() {
        let i, r, t, n, a, l

        i = 2000 * s
        r = 2000 + i
        t = {}
        n = true

        Object.keys(b).forEach(function(e) {
            t[e] = b[e].slice(i, r)
            0 < t[e].length && (n = !1)
        })
        if (n) {
            return 'break'
        }
        a = {
            cateId: o,
            data: t,
        }
        if (o) {
            l = yield fetch("https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js").then(e=>{
                return e.text()
            }
            ).catch(function(e) {
                throw e
            })
            if (l.msg) {
                throw l
            }
            a.data = l
        } else {
            l = yield fetch("https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js").then(e=>{
                return e.json()
            }
            )
            if (l.msg) {
                throw l
            }
            a.sign = l.sign
        }

        if (void 0 === l) {
            throw new Error('指数转化结果undefined')
        }
        Object.keys(l).forEach(function(e) {
            u.hasOwnProperty(e) || (u[e] = []),
            (u[e] = u[e].concat(l[e]))
        }),
        s++
    }
    console.log(">>>>>.")
    while (0 <= s) {
        let data = yield*i()
        if (data == 'break') {
            break
        }
    }
    return 0 < Object.keys(u).length ? u : null
}
async function nn() {

    await c({ddd:[4444]}).next()

}

nn()

// c({ddd:[4444]}).next()