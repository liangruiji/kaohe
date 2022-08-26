// 设置localStorage中的AM_MONITOR_CACHE
let IcxY = (function() {
    var i = 'XWS_CACHE'
    function getCache(key, cb) {
        var n = localStorage.getItem(i)
          , r = null
        if (n)
            try {
                r = JSON.parse(n)
            } catch (e) {
                r = null
            }
        cb(key ? (r && 'object' === typeof r && r.hasOwnProperty(key) ? r[key] : null) : r)
    }

    function setCache(key, value, resolve) {
        getCache(null, function(e) {
            e = e || {}
            null !== value ? (e[key] = value) : delete e[key]
            localStorage.setItem(i, JSON.stringify(e))
            resolve && resolve(!0)
        })
    }
    return {
        getItem: function(key, t) {
            return t ? (getCache(key, function(e) {
                t(e)
            }),
            !0) : new Promise(function(resolve) {
                getCache(key, function(e) {
                    resolve(e)
                })
            }
            )
        },
        setItem: function(key, value) {
            return new Promise(function(resolve) {
                setCache(key, value, resolve)
            }
            )
        },
        removeItem: function(n) {
            return new Promise(function(resolve) {
                setCache(key, null, resolve)
            }
            )
        },
    }
}
)()
