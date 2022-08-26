(()=>{
    var e = {
        757: (e,t,r)=>{
            e.exports = r(666)
        }
        ,
        666: e=>{
            var t = function(e) {
                "use strict";
                var t, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, a = o.iterator || "@@iterator", i = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag";
                function c(e, t, r) {
                    return Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }),
                    e[t]
                }
                try {
                    c({}, "")
                } catch (e) {
                    c = function(e, t, r) {
                        return e[t] = r
                    }
                }
                function s(e, t, r, n) {
                    var o = t && t.prototype instanceof m ? t : m
                      , a = Object.create(o.prototype)
                      , i = new j(n || []);
                    return a._invoke = function(e, t, r) {
                        var n = f;
                        return function(o, a) {
                            if (n === d)
                                throw new Error("Generator is already running");
                            if (n === h) {
                                if ("throw" === o)
                                    throw a;
                                return O()
                            }
                            for (r.method = o,
                            r.arg = a; ; ) {
                                var i = r.delegate;
                                if (i) {
                                    var u = S(i, r);
                                    if (u) {
                                        if (u === v)
                                            continue;
                                        return u
                                    }
                                }
                                if ("next" === r.method)
                                    r.sent = r._sent = r.arg;
                                else if ("throw" === r.method) {
                                    if (n === f)
                                        throw n = h,
                                        r.arg;
                                    r.dispatchException(r.arg)
                                } else
                                    "return" === r.method && r.abrupt("return", r.arg);
                                n = d;
                                var c = l(e, t, r);
                                if ("normal" === c.type) {
                                    if (n = r.done ? h : p,
                                    c.arg === v)
                                        continue;
                                    return {
                                        value: c.arg,
                                        done: r.done
                                    }
                                }
                                "throw" === c.type && (n = h,
                                r.method = "throw",
                                r.arg = c.arg)
                            }
                        }
                    }(e, r, i),
                    a
                }
                function l(e, t, r) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, r)
                        }
                    } catch (e) {
                        return {
                            type: "throw",
                            arg: e
                        }
                    }
                }
                e.wrap = s;
                var f = "suspendedStart"
                  , p = "suspendedYield"
                  , d = "executing"
                  , h = "completed"
                  , v = {};
                function m() {}
                function y() {}
                function g() {}
                var w = {};
                w[a] = function() {
                    return this
                }
                ;
                var b = Object.getPrototypeOf
                  , x = b && b(b(A([])));
                x && x !== r && n.call(x, a) && (w = x);
                var k = g.prototype = m.prototype = Object.create(w);
                function L(e) {
                    ["next", "throw", "return"].forEach((function(t) {
                        c(e, t, (function(e) {
                            return this._invoke(t, e)
                        }
                        ))
                    }
                    ))
                }
                function R(e, t) {
                    function r(o, a, i, u) {
                        var c = l(e[o], e, a);
                        if ("throw" !== c.type) {
                            var s = c.arg
                              , f = s.value;
                            return f && "object" == typeof f && n.call(f, "__await") ? t.resolve(f.__await).then((function(e) {
                                r("next", e, i, u)
                            }
                            ), (function(e) {
                                r("throw", e, i, u)
                            }
                            )) : t.resolve(f).then((function(e) {
                                s.value = e,
                                i(s)
                            }
                            ), (function(e) {
                                return r("throw", e, i, u)
                            }
                            ))
                        }
                        u(c.arg)
                    }
                    var o;
                    this._invoke = function(e, n) {
                        function a() {
                            return new t((function(t, o) {
                                r(e, n, t, o)
                            }
                            ))
                        }
                        return o = o ? o.then(a, a) : a()
                    }
                }
                function S(e, r) {
                    var n = e.iterator[r.method];
                    if (n === t) {
                        if (r.delegate = null,
                        "throw" === r.method) {
                            if (e.iterator.return && (r.method = "return",
                            r.arg = t,
                            S(e, r),
                            "throw" === r.method))
                                return v;
                            r.method = "throw",
                            r.arg = new TypeError("The iterator does not provide a 'throw' method")
                        }
                        return v
                    }
                    var o = l(n, e.iterator, r.arg);
                    if ("throw" === o.type)
                        return r.method = "throw",
                        r.arg = o.arg,
                        r.delegate = null,
                        v;
                    var a = o.arg;
                    return a ? a.done ? (r[e.resultName] = a.value,
                    r.next = e.nextLoc,
                    "return" !== r.method && (r.method = "next",
                    r.arg = t),
                    r.delegate = null,
                    v) : a : (r.method = "throw",
                    r.arg = new TypeError("iterator result is not an object"),
                    r.delegate = null,
                    v)
                }
                function E(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]),
                    2 in e && (t.finallyLoc = e[2],
                    t.afterLoc = e[3]),
                    this.tryEntries.push(t)
                }
                function _(e) {
                    var t = e.completion || {};
                    t.type = "normal",
                    delete t.arg,
                    e.completion = t
                }
                function j(e) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }],
                    e.forEach(E, this),
                    this.reset(!0)
                }
                function A(e) {
                    if (e) {
                        var r = e[a];
                        if (r)
                            return r.call(e);
                        if ("function" == typeof e.next)
                            return e;
                        if (!isNaN(e.length)) {
                            var o = -1
                              , i = function r() {
                                for (; ++o < e.length; )
                                    if (n.call(e, o))
                                        return r.value = e[o],
                                        r.done = !1,
                                        r;
                                return r.value = t,
                                r.done = !0,
                                r
                            };
                            return i.next = i
                        }
                    }
                    return {
                        next: O
                    }
                }
                function O() {
                    return {
                        value: t,
                        done: !0
                    }
                }
                return y.prototype = k.constructor = g,
                g.constructor = y,
                y.displayName = c(g, u, "GeneratorFunction"),
                e.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === y || "GeneratorFunction" === (t.displayName || t.name))
                }
                ,
                e.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g,
                    c(e, u, "GeneratorFunction")),
                    e.prototype = Object.create(k),
                    e
                }
                ,
                e.awrap = function(e) {
                    return {
                        __await: e
                    }
                }
                ,
                L(R.prototype),
                R.prototype[i] = function() {
                    return this
                }
                ,
                e.AsyncIterator = R,
                e.async = function(t, r, n, o, a) {
                    void 0 === a && (a = Promise);
                    var i = new R(s(t, r, n, o),a);
                    return e.isGeneratorFunction(r) ? i : i.next().then((function(e) {
                        return e.done ? e.value : i.next()
                    }
                    ))
                }
                ,
                L(k),
                c(k, u, "Generator"),
                k[a] = function() {
                    return this
                }
                ,
                k.toString = function() {
                    return "[object Generator]"
                }
                ,
                e.keys = function(e) {
                    var t = [];
                    for (var r in e)
                        t.push(r);
                    return t.reverse(),
                    function r() {
                        for (; t.length; ) {
                            var n = t.pop();
                            if (n in e)
                                return r.value = n,
                                r.done = !1,
                                r
                        }
                        return r.done = !0,
                        r
                    }
                }
                ,
                e.values = A,
                j.prototype = {
                    constructor: j,
                    reset: function(e) {
                        if (this.prev = 0,
                        this.next = 0,
                        this.sent = this._sent = t,
                        this.done = !1,
                        this.delegate = null,
                        this.method = "next",
                        this.arg = t,
                        this.tryEntries.forEach(_),
                        !e)
                            for (var r in this)
                                "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type)
                            throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(e) {
                        if (this.done)
                            throw e;
                        var r = this;
                        function o(n, o) {
                            return u.type = "throw",
                            u.arg = e,
                            r.next = n,
                            o && (r.method = "next",
                            r.arg = t),
                            !!o
                        }
                        for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                            var i = this.tryEntries[a]
                              , u = i.completion;
                            if ("root" === i.tryLoc)
                                return o("end");
                            if (i.tryLoc <= this.prev) {
                                var c = n.call(i, "catchLoc")
                                  , s = n.call(i, "finallyLoc");
                                if (c && s) {
                                    if (this.prev < i.catchLoc)
                                        return o(i.catchLoc, !0);
                                    if (this.prev < i.finallyLoc)
                                        return o(i.finallyLoc)
                                } else if (c) {
                                    if (this.prev < i.catchLoc)
                                        return o(i.catchLoc, !0)
                                } else {
                                    if (!s)
                                        throw new Error("try statement without catch or finally");
                                    if (this.prev < i.finallyLoc)
                                        return o(i.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r];
                            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                var a = o;
                                break
                            }
                        }
                        a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
                        var i = a ? a.completion : {};
                        return i.type = e,
                        i.arg = t,
                        a ? (this.method = "next",
                        this.next = a.finallyLoc,
                        v) : this.complete(i)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type)
                            throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg,
                        this.method = "return",
                        this.next = "end") : "normal" === e.type && t && (this.next = t),
                        v
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.finallyLoc === e)
                                return this.complete(r.completion, r.afterLoc),
                                _(r),
                                v
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.tryLoc === e) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    _(r)
                                }
                                return o
                            }
                        }
                        throw new Error("illegal catch attempt")
                    },
                    delegateYield: function(e, r, n) {
                        return this.delegate = {
                            iterator: A(e),
                            resultName: r,
                            nextLoc: n
                        },
                        "next" === this.method && (this.arg = t),
                        v
                    }
                },
                e
            }(e.exports);
            try {
                regeneratorRuntime = t
            } catch (e) {
                Function("r", "regeneratorRuntime = r")(t)
            }
        }
    }
      , t = {};
    function r(n) {
        var o = t[n];
        if (void 0 !== o)
            return o.exports;
        var a = t[n] = {
            exports: {}
        };
        return e[n](a, a.exports, r),
        a.exports
    }
    r.n = e=>{
        var t = e && e.__esModule ? ()=>e.default : ()=>e;
        return r.d(t, {
            a: t
        }),
        t
    }
    ,
    r.d = (e,t)=>{
        for (var n in t)
            r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    r.o = (e,t)=>Object.prototype.hasOwnProperty.call(e, t),
    (()=>{
        "use strict";
        function e(e, t, r, n, o, a, i) {
            try {
                var u = e[a](i)
                  , c = u.value
            } catch (e) {
                return void r(e)
            }
            u.done ? t(c) : Promise.resolve(c).then(n, o)
        }
        function t(t) {
            return function() {
                var r = this
                  , n = arguments;
                return new Promise((function(o, a) {
                    var i = t.apply(r, n);
                    function u(t) {
                        e(i, o, a, u, c, "next", t)
                    }
                    function c(t) {
                        e(i, o, a, u, c, "throw", t)
                    }
                    u(void 0)
                }
                ))
            }
        }
        function n(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++)
                n[r] = e[r];
            return n
        }
        function o(e) {
            return function(e) {
                if (Array.isArray(e))
                    return n(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                    return Array.from(e)
            }(e) || function(e, t) {
                if (e) {
                    if ("string" == typeof e)
                        return n(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name),
                    "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(e, t) : void 0
                }
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        var a = r(757)
          , i = r.n(a);
        const u = {
            getChromeApi: function() {
                return "undefined" == typeof sogouExplorer ? chrome : sogouExplorer
            },
            getChromeVersion: function() {
                try {
                    return /Chrome\/([0-9]+)/.exec(window.navigator.userAgent)[1]
                } catch (e) {}
                return null
            },
            Uint8ArrayToArray: function(e) {
                for (var t = [], r = 0; r < e.length; r++)
                    t.push(e[r]);
                return t
            },
            jqXHRToObj: function(e) {
                try {
                    var t = {
                        readyState: e.readyState,
                        status: e.status,
                        statusText: e.statusText,
                        headers: e.getAllResponseHeaders()
                    };
                    return e.responseText && (t.responseText = e.responseText),
                    e.responseJSON && (t.responseJSON = e.responseJSON),
                    t
                } catch (e) {
                    return e
                }
            },
            doResponse: function(e, t) {
                (t = t || null)instanceof Error ? e({
                    code: t.code ? t.code : 1e3,
                    msg: t.message
                }) : e({
                    code: 0,
                    data: t
                })
            },
            getFuncByPath: function(e) {
                var t = e.split(".")
                  , r = null;
                switch (t.shift()) {
                case "chrome":
                    r = amingtool.chromeApi;
                    break;
                case "window":
                    r = window
                }
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    if (!r[o])
                        throw new Error(e + "操作，" + o + "不存在");
                    r = r[o]
                }
                return r
            },
            callChromeApi: function(e, t) {
                return new Promise((function(r, n) {
                    var a = !1;
                    t = t.map((function(e) {
                        return "_callback_" !== e ? e : (a = !0,
                        function() {
                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                                t[n] = arguments[n];
                            r(t)
                        }
                        )
                    }
                    ));
                    try {
                        if (a)
                            return void e.apply(void 0, o(t));
                        r(e.apply(void 0, o(t)))
                    } catch (e) {
                        n(e)
                    }
                }
                ))
            }
        }
          , c = {
            listeners: {},
            dispatch: function(e, r) {
                var n = this;
                return t(i().mark((function t() {
                    var o, a, u, c, s;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if (e.action) {
                                    t.next = 2;
                                    break
                                }
                                throw new Error("操作指令不能为空");
                            case 2:
                                if ("new Function" !== e.action) {
                                    t.next = 5;
                                    break
                                }
                                return o = new Function("request","sender",e.args[0]),
                                t.abrupt("return", o(e, r));
                            case 5:
                                a = e.action,
                                u = Object.keys(n.listeners),
                                c = 0;
                            case 8:
                                if (!(c < u.length)) {
                                    t.next = 17;
                                    break
                                }
                                if (s = n.listeners[u[c]],
                                s.patterns.every((function(e) {
                                    return "string" == typeof e ? e === a : new RegExp(e).test(a)
                                }
                                ))) {
                                    t.next = 13;
                                    break
                                }
                                return t.abrupt("continue", 14);
                            case 13:
                                return t.abrupt("return", s.callback(e, r));
                            case 14:
                                c++,
                                t.next = 8;
                                break;
                            case 17:
                                throw new Error("not found action");
                            case 18:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                )))()
            },
            add: function(e, t) {
                var r = e;
                Array.isArray(r) || (r = [r]),
                this.listeners[r.toString()] = {
                    patterns: r,
                    callback: t
                }
            },
            remove: function(e) {
                var t = e;
                Array.isArray(t) || (t = [t]),
                delete this.listeners[t.toString()]
            }
        };
        function s(e) {
            return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        var l = "application/x-postmate-v1+json"
          , f = function(e, t) {
            return !!e.data && (("object" !== s(e.data) || "postmate"in e.data) && (e.data.type === l && e.data.postmate === t))
        }
          , p = []
          , d = {
            addListener: function(e) {
                if (p.push(e),
                !h) {
                    window.addEventListener("message", (function(e) {
                        if (!f(e, "request"))
                            return !1;
                        var t = ((e || {}).data || {}).value || {}
                          , r = function(t) {
                            window.postMessage({
                                postmate: "response",
                                type: l,
                                uid: e.data.uid,
                                value: t
                            })
                        };
                        p.forEach((function(e) {
                            e(t, {}, r)
                        }
                        ))
                    }
                    ), !1),
                    !0
                }
            },
            removeListener: function(e) {
                for (; ; ) {
                    var t = p.findIndex((function(t) {
                        return t === e
                    }
                    ));
                    if (t < 0)
                        return;
                    p.splice(t, 1)
                }
            }
        }
          , h = !1;
        function v(e, t) {
            for (var r = 0; r < t.length; r++) {
                var n = t[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        var m, y, g = "https://amingtool.zhishuchacha.com/index/loader/rule", w = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            var r, n, o, a, u, c, s, l, f, p, d, h, m, y, w;
            return r = e,
            n = null,
            o = [{
                key: "run",
                value: (w = t(i().mark((function t() {
                    var r, n, o, a, u;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2,
                                e.getRule();
                            case 2:
                                return r = t.sent,
                                n = r.rule,
                                o = r.isLocal,
                                t.next = 7,
                                e.getMatchRuleByLocationHref((null == n ? void 0 : n.list) || []);
                            case 7:
                                if (a = t.sent) {
                                    t.next = 10;
                                    break
                                }
                                return t.abrupt("return");
                            case 10:
                                if (o && e.checkVersion(n.version),
                                !((u = e.getContentScriptUrls(a)).length > 0)) {
                                    t.next = 17;
                                    break
                                }
                                return t.next = 15,
                                e.updateContentScript(u);
                            case 15:
                                return t.next = 17,
                                e.execContentScript();
                            case 17:
                                e.inject(a);
                            case 18:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function() {
                    return w.apply(this, arguments)
                }
                )
            }, {
                key: "getRule",
                value: (y = t(i().mark((function t() {
                    var r, n;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2,
                                e.getRuleFromLocal();
                            case 2:
                                if (r = t.sent,
                                n = !0,
                                r) {
                                    t.next = 10;
                                    break
                                }
                                return t.next = 7,
                                e.getRuleFromRemote();
                            case 7:
                                r = t.sent,
                                n = !1,
                                e.setRuleToLocal(r);
                            case 10:
                                return t.abrupt("return", {
                                    rule: r,
                                    isLocal: n
                                });
                            case 11:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function() {
                    return y.apply(this, arguments)
                }
                )
            }, {
                key: "getRuleFromLocal",
                value: (m = t(i().mark((function t() {
                    var r, n;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if (amingtool.chromeApi) {
                                    t.next = 2;
                                    break
                                }
                                return t.abrupt("return", null);
                            case 2:
                                return n = {
                                    _loaderRule_: null
                                },
                                t.next = 5,
                                e.getLocalStorage(n);
                            case 5:
                                return n = t.sent,
                                t.abrupt("return", (null === (r = n) || void 0 === r ? void 0 : r._loaderRule_) || null);
                            case 7:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function() {
                    return m.apply(this, arguments)
                }
                )
            }, {
                key: "getRuleFromRemote",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                      , t = {};
                    return e && (t.v = e),
                    fetch(g, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(t)
                    }).then((function(e) {
                        return e.json()
                    }
                    ))
                }
            }, {
                key: "setRuleToLocal",
                value: (h = t(i().mark((function t(r) {
                    var n;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if (amingtool.chromeApi) {
                                    t.next = 2;
                                    break
                                }
                                return t.abrupt("return");
                            case 2:
                                return n = {
                                    _loaderRule_: r
                                },
                                t.abrupt("return", e.setLocalStorage(n));
                            case 4:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function(e) {
                    return h.apply(this, arguments)
                }
                )
            }, {
                key: "getMatchRuleByLocationHref",
                value: (d = t(i().mark((function t(r) {
                    var n;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2,
                                e.getDisabledRuleIds();
                            case 2:
                                return n = t.sent,
                                t.abrupt("return", r.find((function(e) {
                                    return !(e.identify && n.includes(e.identify) || (!e.hosts || !e.hosts.some((function(e) {
                                        return location.href.includes(e)
                                    }
                                    ))) && (!e.regHosts || !e.regHosts.some((function(e) {
                                        return e.every((function(e) {
                                            return new RegExp(e).test(location.href)
                                        }
                                        ))
                                    }
                                    ))))
                                }
                                )));
                            case 4:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function(e) {
                    return d.apply(this, arguments)
                }
                )
            }, {
                key: "inject",
                value: function(t) {
                    var r = t.css
                      , n = t.js;
                    if (r) {
                        var o = (r.local || []).map((function(e) {
                            return amingtool.chromeApi.extension.getURL(e)
                        }
                        ));
                        o = o.concat((null == r ? void 0 : r.remote) || []),
                        e.injectCss(o)
                    }
                    if (n) {
                        var a, i, u = ((null == n || null === (a = n.local) || void 0 === a ? void 0 : a.in) || []).map((function(e) {
                            return amingtool.chromeApi.extension.getURL(e)
                        }
                        ));
                        u = u.concat((null == n || null === (i = n.remote) || void 0 === i ? void 0 : i.in) || []),
                        e.injectJs(u)
                    }
                }
            }, {
                key: "injectCss",
                value: function(e) {
                    e.forEach((function(e) {
                        var t, r, n, o, a = document.createElement("link");
                        a.type = "text/css",
                        a.rel = "stylesheet",
                        a.href = e,
                        null !== (t = document) && void 0 !== t && null !== (r = t.head) && void 0 !== r && r.append ? document.head.append(a) : null !== (n = document) && void 0 !== n && null !== (o = n.head) && void 0 !== o && o.appendChild && document.head.appendChild(a)
                    }
                    ))
                }
            }, {
                key: "injectJs",
                value: function(t) {
                    var r, n, o, a;
                    if (0 !== t.length) {
                        var i = t.shift()
                          , u = document.createElement("script");
                        u.type = "text/javascript",
                        u.src = i,
                        u.charset = "UTF-8",
                        u.onload = function() {
                            this.parentNode.removeChild(this),
                            e.injectJs(t)
                        }
                        ,
                        null !== (r = document) && void 0 !== r && null !== (n = r.documentElement) && void 0 !== n && n.append ? document.documentElement.append(u) : null !== (o = document) && void 0 !== o && null !== (a = o.documentElement) && void 0 !== a && a.appendChild && document.documentElement.appendChild(u)
                    }
                }
            }, {
                key: "getContentScriptUrls",
                value: function(e) {
                    var t, r, n = e.js;
                    return n ? ((null == n || null === (t = n.local) || void 0 === t ? void 0 : t.out) || []).map((function(e) {
                        return amingtool.chromeApi.extension.getURL(e)
                    }
                    )).concat((null == n || null === (r = n.remote) || void 0 === r ? void 0 : r.out) || []) : []
                }
            }, {
                key: "updateContentScript",
                value: (p = t(i().mark((function r(n) {
                    var o, a, u, c, s;
                    return i().wrap((function(r) {
                        for (; ; )
                            switch (r.prev = r.next) {
                            case 0:
                                return u = {
                                    _loaderContentScript_: {
                                        urls: null,
                                        scripts: null
                                    }
                                },
                                c = function() {
                                    var r = t(i().mark((function t() {
                                        var r;
                                        return i().wrap((function(t) {
                                            for (; ; )
                                                switch (t.prev = t.next) {
                                                case 0:
                                                    return t.next = 2,
                                                    Promise.all(n.map((function(e) {
                                                        return fetch(e).then((function(e) {
                                                            return e.text()
                                                        }
                                                        ))
                                                    }
                                                    )));
                                                case 2:
                                                    return r = t.sent,
                                                    u._loaderContentScript_.urls = n,
                                                    u._loaderContentScript_.scripts = r,
                                                    t.abrupt("return", e.setLocalStorage(u));
                                                case 6:
                                                case "end":
                                                    return t.stop()
                                                }
                                        }
                                        ), t)
                                    }
                                    )));
                                    return function() {
                                        return r.apply(this, arguments)
                                    }
                                }(),
                                r.next = 4,
                                e.getLocalStorage(u);
                            case 4:
                                if (u = r.sent,
                                s = (null === (o = u) || void 0 === o || null === (a = o._loaderContentScript_) || void 0 === a ? void 0 : a.urls) || null) {
                                    r.next = 10;
                                    break
                                }
                                return r.abrupt("return", c());
                            case 10:
                                if (JSON.stringify(s) === JSON.stringify(n)) {
                                    r.next = 12;
                                    break
                                }
                                return r.abrupt("return", c());
                            case 12:
                                return r.abrupt("return", !0);
                            case 13:
                            case "end":
                                return r.stop()
                            }
                    }
                    ), r)
                }
                ))),
                function(e) {
                    return p.apply(this, arguments)
                }
                )
            }, {
                key: "execContentScript",
                value: (f = t(i().mark((function t() {
                    var r, n, o, a;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return o = {
                                    _loaderContentScript_: {
                                        urls: [],
                                        scripts: []
                                    }
                                },
                                t.next = 3,
                                e.getLocalStorage(o);
                            case 3:
                                if (o = t.sent,
                                0 !== (a = (null === (r = o) || void 0 === r || null === (n = r._loaderContentScript_) || void 0 === n ? void 0 : n.scripts) || []).length) {
                                    t.next = 7;
                                    break
                                }
                                return t.abrupt("return");
                            case 7:
                                a.forEach((function(t) {
                                    try {
                                        new Function(t)()
                                    } catch (t) {
                                        e.updateContentScript([])
                                    }
                                }
                                ));
                            case 8:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function() {
                    return f.apply(this, arguments)
                }
                )
            }, {
                key: "checkVersion",
                value: (l = t(i().mark((function t() {
                    var r, n, o, a = arguments;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if (r = a.length > 0 && void 0 !== a[0] ? a[0] : null) {
                                    t.next = 8;
                                    break
                                }
                                return t.next = 4,
                                e.getRuleFromLocal();
                            case 4:
                                if (n = t.sent) {
                                    t.next = 7;
                                    break
                                }
                                return t.abrupt("return", !0);
                            case 7:
                                r = (null == n ? void 0 : n.version) || "0.0.0";
                            case 8:
                                return t.next = 10,
                                e.getRuleFromRemote(r);
                            case 10:
                                if ((o = t.sent).version !== r) {
                                    t.next = 13;
                                    break
                                }
                                return t.abrupt("return", !0);
                            case 13:
                                e.setRuleToLocal(o),
                                e.updateContentScript([]);
                            case 15:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function() {
                    return l.apply(this, arguments)
                }
                )
            }, {
                key: "getLocalStorage",
                value: function(e) {
                    return new Promise((function(t, r) {
                        try {
                            amingtool.chromeApi.storage.local.get(e, (function(e) {
                                t(e)
                            }
                            ))
                        } catch (e) {
                            r(e)
                        }
                    }
                    ))
                }
            }, {
                key: "setLocalStorage",
                value: function(e) {
                    return new Promise((function(t, r) {
                        try {
                            amingtool.chromeApi.storage.local.set(e, (function() {
                                t()
                            }
                            ))
                        } catch (e) {
                            r(e)
                        }
                    }
                    ))
                }
            }, {
                key: "getDisabledRuleIds",
                value: (s = t(i().mark((function t() {
                    var r, n;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return n = {
                                    _loaderDisabledIds_: []
                                },
                                t.next = 3,
                                e.getLocalStorage(n);
                            case 3:
                                return n = t.sent,
                                t.abrupt("return", (null === (r = n) || void 0 === r ? void 0 : r._loaderDisabledIds_) || []);
                            case 5:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function() {
                    return s.apply(this, arguments)
                }
                )
            }, {
                key: "setDisabledRuleIds",
                value: (c = t(i().mark((function t(r) {
                    var n;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return n = {
                                    _loaderDisabledIds_: r
                                },
                                t.abrupt("return", e.setLocalStorage(n));
                            case 2:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function(e) {
                    return c.apply(this, arguments)
                }
                )
            }, {
                key: "enableByRuleId",
                value: (u = t(i().mark((function t(r) {
                    var n, o;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2,
                                e.getDisabledRuleIds();
                            case 2:
                                n = t.sent;
                            case 3:
                                if (!((o = n.indexOf(r)) < 0)) {
                                    t.next = 7;
                                    break
                                }
                                return t.abrupt("return", e.setDisabledRuleIds(n));
                            case 7:
                                n.splice(o, 1),
                                t.next = 3;
                                break;
                            case 10:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function(e) {
                    return u.apply(this, arguments)
                }
                )
            }, {
                key: "disabledByRuleId",
                value: (a = t(i().mark((function t(r) {
                    var n;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                return t.next = 2,
                                e.getDisabledRuleIds();
                            case 2:
                                if (!(n = t.sent).includes(r)) {
                                    t.next = 5;
                                    break
                                }
                                return t.abrupt("return", !0);
                            case 5:
                                return n.push(r),
                                t.abrupt("return", e.setDisabledRuleIds(n));
                            case 7:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t)
                }
                ))),
                function(e) {
                    return a.apply(this, arguments)
                }
                )
            }],
            n && v(r.prototype, n),
            o && v(r, o),
            e
        }();
        window.amingtool = {
            action: c,
            onMessage: d,
            util: u,
            loader: w,
            chromeApi: u.getChromeApi()
        };
        var b = [];
        amingtool.action.add("$.ajax", (function(e) {
            var t = e.args;
            return new Promise((function(e, r) {
                try {
                    var n;
                    (n = $).ajax.apply(n, o(t)).done((function(t, r, n) {
                        e(amingtool.util.jqXHRToObj(n))
                    }
                    )).fail((function(t, r, n) {
                        e(amingtool.util.jqXHRToObj(t))
                    }
                    ))
                } catch (e) {
                    r(e)
                }
            }
            ))
        }
        )),
        amingtool.action.add("fetch", (function(e) {
            var t = e.args;
            return new Promise((function(e, r) {
                var n = null;
                return fetch.apply(void 0, o(t)).then((function(e) {
                    return n = e.clone(),
                    e.arrayBuffer()
                }
                )).then((function(t) {
                    for (var r = {}, o = n.headers.entries(); ; ) {
                        var a = o.next();
                        if (a.done)
                            break;
                        r[a.value[0]] = a.value[1]
                    }
                    e({
                        headers: r,
                        ok: n.ok,
                        redirected: n.redirected,
                        status: n.status,
                        statusText: n.statusText,
                        type: n.type,
                        url: n.url,
                        useFinalURL: n.useFinalURL,
                        uint8Array: amingtool.util.Uint8ArrayToArray(new Uint8Array(t))
                    })
                }
                )).catch((function(e) {
                    r(e)
                }
                ))
            }
            ))
        }
        )),
        amingtool.action.add(/^chrome\.cookies\./, (function(e) {
            var t = e.action
              , r = e.args;
            return new Promise((function(e, n) {
                r.push((function(t) {
                    e(t)
                }
                ));
                try {
                    amingtool.util.getFuncByPath(t).apply(void 0, o(r))
                } catch (e) {
                    n(e)
                }
            }
            ))
        }
        )),
        amingtool.action.add(/^chrome\.webRequest\.onBeforeSendHeaders\.addListener$/, (function(e) {
            var t = e.args;
            return new Promise((function(e, r) {
                try {
                    var n = JSON.stringify(t);
                    if (b.find((function(e) {
                        return e.args === n
                    }
                    )))
                        return void e();
                    var o = t.shift()
                      , a = function(e) {
                        var t = {};
                        o.setRequestHeader && (Object.keys(o.setRequestHeader).forEach((function(t) {
                            for (var r = !1, n = 0; n < e.requestHeaders.length; n++)
                                if (e.requestHeaders[n].name === t) {
                                    e.requestHeaders[n].value = o.setRequestHeader[t],
                                    r = !0;
                                    break
                                }
                            r || e.requestHeaders.push({
                                name: t,
                                value: o.setRequestHeader[t]
                            })
                        }
                        )),
                        t.requestHeaders = e.requestHeaders);
                        if (Object.keys(t).length > 0)
                            return t
                    };
                    t.unshift(a),
                    b.push({
                        args: n,
                        callback: a
                    }),
                    amingtool.chromeApi.webRequest.onBeforeSendHeaders.addListener(t[0], t[1], t[2]),
                    e()
                } catch (e) {
                    r(e)
                }
            }
            ))
        }
        )),
        amingtool.action.add(/^chrome\.webRequest\.onBeforeSendHeaders\.removeListener$/, function() {
            var e = t(i().mark((function e(t) {
                var r, n, o, a;
                return i().wrap((function(e) {
                    for (; ; )
                        switch (e.prev = e.next) {
                        case 0:
                            r = t.args,
                            n = JSON.stringify(r);
                        case 2:
                            if (!((o = b.findIndex((function(e) {
                                return e.args === n
                            }
                            ))) < 0)) {
                                e.next = 6;
                                break
                            }
                            return e.abrupt("return", !0);
                        case 6:
                            a = b.splice(o, 1),
                            amingtool.chromeApi.webRequest.onBeforeSendHeaders.removeListener(a[0].callback),
                            e.next = 2;
                            break;
                        case 10:
                        case "end":
                            return e.stop()
                        }
                }
                ), e)
            }
            )));
            return function(t) {
                return e.apply(this, arguments)
            }
        }()),
        null === (m = amingtool.chromeApi) || void 0 === m || m.runtime.onMessage.addListener((function(e, r, n) {
            return e.type ? function(e, t, r) {
                if (!e.type)
                    return !0;
                var n = e.request;
                return 1 === e.type ? Promise.all(n.map((function(e) {
                    return new Promise((function(t, r) {
                        var n = {}
                          , o = new XMLHttpRequest;
                        for (var a in o.open(e.method, e.url, !0),
                        e.requestHeaders)
                            o.setRequestHeader(a, e.requestHeaders[a]);
                        o.onreadystatechange = function() {
                            4 === this.readyState && (n.headers = {},
                            e.responseHeaders.map((function(e, t) {
                                n.headers[e] = o.getResponseHeader(e)
                            }
                            )),
                            200 === o.status && (n.data = o.responseText),
                            t(n))
                        }
                        ,
                        o.send(e.data)
                    }
                    ))
                }
                ))).then((function(e) {
                    r(e)
                }
                )) : 2 == e.type ? Promise.all(n.map((function(e) {
                    return "string" == typeof e ? fetch(e, {
                        credentials: "include"
                    }).then((function(e) {
                        var t = "utf-8";
                        return /charset=([^;]*)/.test(e.headers.get("content-type")) && (t = RegExp.$1),
                        Promise.all([e.arrayBuffer(), t])
                    }
                    )).then((function(e) {
                        return new TextDecoder(e[1]).decode(e[0])
                    }
                    )) : fetch(e.url, e.options).then((function(e) {
                        var t = "utf-8";
                        return /charset=([^;]*)/.test(e.headers.get("content-type")) && (t = RegExp.$1),
                        Promise.all([e.arrayBuffer(), t])
                    }
                    )).then((function(e) {
                        return new TextDecoder(e[1]).decode(e[0])
                    }
                    ))
                }
                ))).then((function(e) {
                    r(e)
                }
                )) : 3 === e.type && amingtool.chromeApi.cookies.get(n.RegExpinfo, (function(e) {
                    r(e.value)
                }
                )),
                !0
            }(e, 0, n) : (amingtool.action.dispatch(e, r).then((function(e) {
                amingtool.util.doResponse(n, e)
            }
            )).catch(function() {
                var r = t(i().mark((function t(r) {
                    var o, a;
                    return i().wrap((function(t) {
                        for (; ; )
                            switch (t.prev = t.next) {
                            case 0:
                                if ("not found action" === r.message) {
                                    t.next = 3;
                                    break
                                }
                                return amingtool.util.doResponse(n, r),
                                t.abrupt("return");
                            case 3:
                                return o = null,
                                t.prev = 4,
                                a = amingtool.util.getFuncByPath(e.action),
                                t.next = 8,
                                amingtool.util.callChromeApi(a, (null == e ? void 0 : e.args) || []);
                            case 8:
                                o = t.sent,
                                t.next = 14;
                                break;
                            case 11:
                                t.prev = 11,
                                t.t0 = t.catch(4),
                                o = t.t0;
                            case 14:
                                amingtool.util.doResponse(n, o);
                            case 15:
                            case "end":
                                return t.stop()
                            }
                    }
                    ), t, null, [[4, 11]])
                }
                )));
                return function(e) {
                    return r.apply(this, arguments)
                }
            }()),
            !0)
        }
        )),
        null === (y = amingtool.chromeApi) || void 0 === y || y.runtime.onInstalled.addListener((function(e) {
            "install" === e.reason && amingtool.chromeApi.tabs.create({
                url: "https://www.amingtool.com/welcome"
            })
        }
        )),
        amingtool.loader.checkVersion()
    }
    )()
}
)();
