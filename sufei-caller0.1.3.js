/* 2015-11-03 11:17:04 */ ! function e(t, n, i) { // fn {} [4]
  function r(o, a) {
    if (!n[o]) {
      if (!t[o]) {
        var u = "function" == typeof require && require;
        if (!a && u) return u(o, !0);
        if (s) return s(o, !0);
        throw new Error("Cannot find module '" + o + "'")
      }
      var c = n[o] = {
        exports: {}
      };
      t[o][0].call(c.exports, function (e) {
        var n = t[o][1][e];
        return r(n ? n : e)
      }, c, c.exports, e, t, n, i)
    }
    return n[o].exports
  }
  for (var s = "function" == typeof require && require, o = 0; o < i.length; o++) r(i[o]);
  return r
}({
  1: [function (e, t, n) {
    function i(e) {
      return this instanceof i || !l(e) ? void 0 : s(e)
    }

    function r(e) {
      var t, n;
      for (t in e) n = e[t], i.Mutators.hasOwnProperty(t) ? i.Mutators[t].call(this, n) : this.prototype[t] = n
    }

    function s(e) {
      return e.extend = i.extend, e.implement = r, e
    }

    function o() {}

    function a(e, t, n) {
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          if (n && -1 === d(n, i)) continue;
          "prototype" !== i && (e[i] = t[i])
        }
    }
    t.exports = i, i.create = function (e, t) {
      function n() {
        e.apply(this, arguments), this.constructor === n && this.initialize && this.initialize.apply(this, arguments)
      }
      return l(e) || (t = e, e = null), t || (t = {}), e || (e = t.Extends || i), t.Extends = e, e !== i && a(n, e, e.StaticsWhiteList), r.call(n, t), s(n)
    }, i.extend = function (e) {
      return e || (e = {}), e.Extends = this, i.create(e)
    }, i.Mutators = {
      Extends: function (e) {
        var t = this.prototype,
          n = u(e.prototype);
        a(n, t), n.constructor = this, this.prototype = n, this.superclass = e.prototype
      },
      Implements: function (e) {
        f(e) || (e = [e]);
        for (var t, n = this.prototype; t = e.shift();) a(n, t.prototype || t)
      },
      Statics: function (e) {
        a(this, e)
      }
    };
    var u = Object.__proto__ ? function (e) {
        return {
          __proto__: e
        }
      } : function (e) {
        return o.prototype = e, new o
      },
      c = Object.prototype.toString,
      f = Array.isArray || function (e) {
        return "[object Array]" === c.call(e)
      },
      l = function (e) {
        return "[object Function]" === c.call(e)
      },
      d = Array.prototype.indexOf ? function (e, t) {
        return e.indexOf(t)
      } : function (e, t) {
        for (var n = 0, i = e.length; i > n; n++)
          if (e[n] === t) return n;
        return -1
      }
  }, {}],
  2: [function (e, t, n) {
    t.exports = {
      app: "caller",
      style: "app/common/sufei-tb.css"
    }
  }, {}],
  3: [function (e, t, n) {
    var i = {},
      r = {};
    i.on = function (e, t) {
      var n = r[e] || (r[e] = []);
      return n.push(t), i
    }, i.off = function (e, t) {
      if (!e && !t) return r = {}, i;
      var n = r[e];
      if (n)
        if (t)
          for (var s = n.length - 1; s >= 0; s--) n[s] === t && n.splice(s, 1);
        else delete r[e];
      return i
    }, i.fire = function (e, t) {
      var n = r[e];
      if (n) {
        n = n.slice();
        for (var s = 0, o = n.length; o > s; s++) n[s](t)
      }
      return i
    }, t.exports = i
  }, {}],
  4: [function (e, t, n) {
    var i = e("./mod/sufei-caller"), // 7
      r = e("./config/sufei-caller"),// 2
      s = "0.1.0";
    r.version = s, r.style = "//g.alicdn.com/sd/sufei/" + s + "/" + r.style, new i(r)
  }, {
    "./config/sufei-caller": 2,
    "./mod/sufei-caller": 7
  }],
  5: [function (e, t, n) {
    t.exports = function () {
      "use strict";
      var e, t, n, i, r = {
          '"': '"',
          "\\": "\\",
          "/": "/",
          b: "\b",
          f: "\f",
          n: "\n",
          r: "\r",
          t: "	"
        },
        s = function (t) {
          throw {
            name: "SyntaxError",
            message: t,
            at: e,
            text: n
          }
        },
        o = function (i) {
          return i && i !== t && s("Expected '" + i + "' instead of '" + t + "'"), t = n.charAt(e), e += 1, t
        },
        a = function () {
          var e, n = "";
          for ("-" === t && (n = "-", o("-")); t >= "0" && "9" >= t;) n += t, o();
          if ("." === t)
            for (n += "."; o() && t >= "0" && "9" >= t;) n += t;
          if ("e" === t || "E" === t)
            for (n += t, o(), ("-" === t || "+" === t) && (n += t, o()); t >= "0" && "9" >= t;) n += t, o();
          return e = +n, isFinite(e) ? e : void s("Bad number")
        },
        u = function () {
          var e, n, i, a = "";
          if ('"' === t)
            for (; o();) {
              if ('"' === t) return o(), a;
              if ("\\" === t)
                if (o(), "u" === t) {
                  for (i = 0, n = 0; 4 > n && (e = parseInt(o(), 16), isFinite(e)); n += 1) i = 16 * i + e;
                  a += String.fromCharCode(i)
                } else {
                  if ("string" != typeof r[t]) break;
                  a += r[t]
                }
              else a += t
            }
          s("Bad string")
        },
        c = function () {
          for (; t && " " >= t;) o()
        },
        f = function () {
          switch (t) {
            case "t":
              return o("t"), o("r"), o("u"), o("e"), !0;
            case "f":
              return o("f"), o("a"), o("l"), o("s"), o("e"), !1;
            case "n":
              return o("n"), o("u"), o("l"), o("l"), null
          }
          s("Unexpected '" + t + "'")
        },
        l = function () {
          var e = [];
          if ("[" === t) {
            if (o("["), c(), "]" === t) return o("]"), e;
            for (; t;) {
              if (e.push(i()), c(), "]" === t) return o("]"), e;
              o(","), c()
            }
          }
          s("Bad array")
        },
        d = function () {
          var e, n = {};
          if ("{" === t) {
            if (o("{"), c(), "}" === t) return o("}"), n;
            for (; t;) {
              if (e = u(), c(), o(":"), Object.hasOwnProperty.call(n, e) && s('Duplicate key "' + e + '"'), n[e] = i(), c(), "}" === t) return o("}"), n;
              o(","), c()
            }
          }
          s("Bad object")
        };
      return i = function () {
          switch (c(), t) {
            case "{":
              return d();
            case "[":
              return l();
            case '"':
              return u();
            case "-":
              return a();
            default:
              return t >= "0" && "9" >= t ? a() : f()
          }
        },
        function (r, o) {
          var a;
          return n = r, e = 0, t = " ", a = i(), c(), t && s("Syntax error"), "function" == typeof o ? function u(e, t) {
            var n, i, r = e[t];
            if (r && "object" == typeof r)
              for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (i = u(r, n), void 0 !== i ? r[n] = i : delete r[n]);
            return o.call(e, t, r)
          }({
            "": a
          }, "") : a
        }
    }()
  }, {}],
  6: [function (e, t, n) {
    function i(e) {
      try {
        var t, n, i = e.data.split(a);
        i.length > 1 ? (t = i[0], n = i[1]) : (i = r(i[0]), t = i.type, n = i.content);
        for (var s = 0, o = l.length; o > s; s++) l[s].event === t && l[s].callback(n)
      } catch (u) {}
    }

    function r(e) {
      return o ? o(e) : s(e)
    }
    var s = e("./json_parse"),// 5
      o = window.JSON && JSON.parse,
      a = "@=_=@",
      u = null,
      c = null,
      f = null,
      l = [],
      d = {
        uid: 0,
        hid: -1,
        q: [],
        tm: 0,
        postMessage: function (e, t) {
          var n = ++d.uid,
            i = d.q,
            r = {
              name: +new Date + "" + n + "^" + document.domain + "&" + t,
              uid: n,
              target: e
            };
          i.push(r), d.tm || (d.tm = setInterval(function () {
            var e = d.q;
            if (!(0 === e.length || e[0].uid <= d.hid)) {
              var t = e[0];
              d.hid = t.uid, t.target.name = t.name
            }
          }, 10))
        },
        ListenerMessage: function (e, t) {
          function n() {
            if (!e) return !1;
            var n = e.name;
            if (n !== i) {
              d.q.shift(), i = n;
              var s = r.exec(n);
              if (!s) return;
              t && t({
                origin: s[2],
                data: s[3]
              })
            }
          }
          var i = "",
            r = /^(\d+?)\^(.+?)&(.*?)$/;
          setInterval(n, 10)
        }
      };
    window.SufeiMessenger = t.exports = {
      initListener: function (e) {
        u = e.currentWin, c = e.originWin, f = e.msgTransfer, u && c && f && (u.postMessage ? u.addEventListener ? u.addEventListener("message", i, !1) : u.attachEvent && u.attachEvent("onmessage", i) : "fromFrame" == f ? d.ListenerMessage(c, i) : d.ListenerMessage(u, i))
      },
      register: function (e, t) {
        l.push({
          event: e,
          callback: t
        })
      },
      send: function (e) {
        var t = e.type + a + e.content;
        u && c && f && (c.postMessage ? c.postMessage(t, "*") : "fromFrame" == f ? d.postMessage(c, t) : d.postMessage(u, t, "*"))
      }
    }
  }, {
    "./json_parse": 5
  }],
  7: [function (e, t, n) {
    function i(e, t) {
      var n, i = [];
      if ("string" == typeof t) i.push(t);
      else
        for (n in t) t.hasOwnProperty(n) && i.push(n + "=" + encodeURIComponent(t[n]));
      e = e + (-1 == e.indexOf("?") ? "?" : "&") + i.join("&");
      var r = "script",
        s = a.getElementsByTagName(r)[0],
        o = a.createElement(r);
      o.async = 1, o.src = e, s.parentNode.insertBefore(o, s)
    }
    var r = e("../emit"), // 3
      s = e("../sufei-base"), // 8
      o = window,
      a = document,
      u = o.sufei = o.sufei || {};
    u.on = r.on;
    var c = o._sufei_q || [],
      f = "_sufei_check",
      l = s.extend({
        initialize: function (e) {
          var t = this;
          l.superclass.initialize.call(t, e), t.cid = 0, t.id = "_sufei_caller_" + Math.floor(1e6 * Math.random()), t.setup()
        },
        setup: function () {
          var e = this;
          for (u.check = function () {
              e.check.apply(e, arguments)
            }, u.validate = e.validate, o[f] && (o[f] = u.check); c.length;) e.check.apply(e, c.shift())
        },
        getValidateURI: function (e) {
          var t, n = this;
          n.cid++, t = n.id + "_" + n.cid, o[t] = function (e) {
            n.status = 200, r.fire("event:showDialog@sufei", e.url);
            try {
              delete o[t]
            } catch (i) {}
          }, i(e, {
            callback: t
          })
        },
        resendRequest: function (e) {
          for (var t, n, s = this, o = [s.currentRequest].concat(s.queue), a = 0; a < o.length; a++) n = o[a], t = n.dataType, "json" === t && (n.url = s.addQueryToken(n.url, e), r.fire("event:resendRequest@sufei-caller", n)), "jsonp" === t && i(n.url, e);
          s.reset()
        },
        check: function (e, t, n) {
          var i, r, s = this;
          "string" == typeof e ? i = {
            url: e,
            dataType: "jsonp"
          } : (i = e || {}, i.dataType = i.dataType || "jsonp"), t = t || {}, n = n || i.success, r = s.validate(t), r.pass ? n && n.call(i.context || i, t) : s.run({
            url: t.url,
            config: i,
            im: r.immediate
          })
        }
      });
    t.exports = l
  }, {
    "../emit": 3,
    "../sufei-base": 8
  }],
  8: [function (e, t, n) {
    function i() {
      var e = u.createElement("b");
      return e.innerHTML = "<!--[if lte IE 7]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
    }

    function r(e) {
      return v ? v(e) : h(e)
    }

    function s(e, t) {
      function n() {
        i.onload = i.onreadystatechange = null, i = null, t()
      }
      e || t && t();
      var i = u.createElement("link");
      i.charset = "utf-8", i.rel = "stylesheet", i.href = e;
      var r = "onload" in i;
      m && !r && setTimeout(function () {
        o(i, t)
      }, 1), r ? i.onload = n : i.onreadystatechange = function () {
        /loaded|complete/.test(i.readyState) && n()
      }, c.appendChild(i), u.createStyleSheet && u.createStyleSheet(e)
    }

    function o(e, t) {
      var n, i = e.sheet;
      if (m) i && (n = !0);
      else if (i) try {
        i.cssRules && (n = !0)
      } catch (r) {
        "NS_ERROR_DOM_SECURITY_ERR" === r.name && (n = !0)
      }
      setTimeout(function () {
        n ? t() : o(e, t)
      }, 20)
    }
    var a = window,
      u = document,
      c = u.head || u.getElementsByTagName("head")[0] || u.documentElement,
      f = a.navigator.userAgent,
      l = e("./emit"), // 3
      d = e("./class"),// 1
      p = e("./messenger"),// 6
      h = e("./json_parse"),// 5
      v = a.JSON && JSON.parse,
      g = function () {},
      m = +f.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536,
      y = /iphone|ipad|ipod/.test(f.toLowerCase()),
      x = "rgv587_flag",
      w = "sm";
    t.exports = d.create({
      initialize: function (e) {
        var t = this;
        e = e || {}, t.app = e.app || "", t.version = e.version || "", t.style = e.style || "", t.dialog = null, t.reset(), t.listen()
      },
      reset: function () {
        var e = this;
        e.currentRequest = null, e.queue = [], e.status = 0
      },
      listen: function () {
        var e = this;
        l.on("event:cleanHijackQueue@sufei", function () {
          e.reset()
        }), l.on("event:showDialog@sufei", function (t) {
          e.dialog ? e.show(t) : s(e.style, function () {
            e.render(t), e.show()
          })
        }), l.on("msg:validateSuccess@sufei", function (t) {
          e.resendRequest(t), e.hide(), p.send({
            type: "msg:resetCheckCode@sufei",
            content: ""
          })
        })
      },
      initMessenger: function (e) {
        var t = this;
        p.initListener({
          currentWin: a,
          originWin: e,
          msgTransfer: "fromFrame"
        }), p.register("msg:validateSuccess@sufei", function (e) {
          l.fire("msg:validateSuccess@sufei", e)
        }), p.register("child", function (e) {
          e = r(decodeURIComponent(e));
          var n = t.validate(e);
          n.pass ? e.queryToken ? l.fire("msg:validateSuccess@sufei", e.queryToken) : t.hide() : l.fire("event:showDialog@sufei", e.url)
        })
      },
      show: function (e) {
        var t = this;
        e && t.frame.src != e && (t.frame.src = e), t.dialog && (t.dialog.style.display = "block"), p.send({
          type: "msg:refreshCheckCode@sufei",
          content: ""
        }), l.fire("event:dialogShow@sufei")
      },
      hide: function () {
        l.fire("event:cleanHijackQueue@sufei"), this.dialog && (this.dialog.style.display = "none"), l.fire("event:dialogHide@sufei")
      },
      render: function (e) {
        var t = this,
          n = u.createElement("div");
        n.style.display = "none", t.app ? n.className = "sufei-dialog sufei-dialog-" + t.app : n.className = "sufei-dialog", n.innerHTML = ['<div class="sufei-dialog-mask">', i() ? '<iframe frameborder="none" src="javascript:\'\'"></iframe>' : "", "</div>", '<div class="sufei-dialog-content">', '<iframe id="sufei-dialog-content" frameborder="none" src="' + e + '"></iframe>', '<div class="sufei-dialog-close" id="sufei-dialog-close">\u5173\u95ed</div>', "</div>"].join(""), u.body.appendChild(n);
        var r = u.getElementById("sufei-dialog-close");
        r.addEventListener ? r.addEventListener("click", function () {
          t.hide()
        }, !1) : r.attachEvent("onclick", function () {
          return t.hide(), !1
        }), t.dialog = n, t.frame = u.getElementById("sufei-dialog-content"), t.initMessenger(t.frame.contentWindow), y && t.iosFix(), t.render = function () {}
      },
      iosFix: function () {
        var e = u.body,
          t = "sufei-ios-fix-fixed",
          n = 0,
          i = this.dialog;
        e.classList.add(t), l.on("event:dialogShow@sufei", function () {
          n = e.scrollTop, e.scrollTop = 0, i.style.height = e.scrollHeight + "px", setTimeout(function () {
            e.scrollTop = 0
          }, 200)
        }), l.on("event:dialogHide@sufei", function () {
          e.scrollTop = n
        })
      },
      validate: function (e) {
        return !e || e[x] !== w && e[x + "0"] !== w ? {
          pass: !0
        } : {
          pass: !1,
          immediate: e[x] === w
        }
      },
      run: function (e) {
        var t = this;
        return t.status > 0 && !e.config.sufei ? void t.queue.push(e.config) : void(e.im ? (t.currentRequest = t.currentRequest || e.config, t.status = 200, l.fire("event:showDialog@sufei", e.url)) : (t.currentRequest = e.config, t.status = 100, t.getValidateURI(e.url)))
      },
      setup: g,
      getValidateURI: g,
      resendRequest: g,
      addQueryToken: function (e, t) {
        return e += /\?/.test(e) ? "&" + t : "?" + t
      },
      parseJSON: r
    })
  }, {
    "./class": 1,
    "./emit": 3,
    "./json_parse": 5,
    "./messenger": 6
  }]
}, {}, [4]);
//# sourceMappingURL=sufei-caller.js.map

// var f, d, p, h = function() {
//     return !(!location || !location.pathname || 0 !== location.pathname.indexOf("/mc/"))
// };
// if (h()) {
//     var m = (0,
//     o.default)().format("YYYYMMDD");
//     !function(e, t) {
//         var n = document.getElementsByTagName("script")[0]
//           , r = document.createElement("script");
//         if (r.async = 1,
//         r.src = e,
//         r.crossOrigin = !0,
//         t) {
//             var o = !1;
//             r.onload = r.onreadystatechange = function() {
//                 o || r.readyState && !/loaded|complete/.test(r.readyState) || (r.onload = r.onreadystatechange = null,
//                 o = !0,
//                 t())
//             }
//         }
//         r.onerror = function() {}
//         ,
//         n.parentNode.insertBefore(r, n)
//     }("https://g.alicdn.com/??/AWSC/AWSC/awsc.js,/sd/baxia-entry/baxiaCommon.js?d=".concat(m), (function() {
//         window.baxiaCommon.init({
//             checkApiPath: function(e) {
//                 return function(e) {
//                     return !(!e || !_.isString(e)) && (0 === e.indexOf("/mc/") || -1 !== e.indexOf("".concat(r.default.host, "/mc/")))
//                 }(e)
//             },
//             appendTo: "header",
//             uabOptions: {
//                 Flag2: 1
//             }
//         })
//     }
//     ))
// } else
//     f = document,
//     window.sufei || (d = f.getElementsByTagName("script")[0],
//     (p = f.createElement("script")).async = 1,
//     p.src = "//g.alicdn.com/sd/sufei/0.1.3/app/common/sufei-caller.js?" + Math.floor((new Date).getTime() / 36e5),
//     d.parentNode.insertBefore(p, d),
//     p.onload = function() {
//         window.sufei && window.sufei.on && window.sufei.on("event:resendRequest@sufei-caller", (function(e) {
//             var t = e.action
//               , n = e.resolve
//               , r = e.reject;
//             if ("function" != typeof window.SYCMRequest)
//                 throw new Error("[fetch-middleware] 未检测到 window.SYCMRequest，无法重发防爬请求");
//             try {
//                 var o = u(e.url.split("?"), 1)[0]
//                   , a = e.url.match(/smToken=([^&]*)/)[1]
//                   , i = e.url.match(/smSign=([^&]*)/)[1];
//                 window.SYCMRequest(c(c({}, t), {}, {
//                     url: "".concat(o, "?smToken=").concat(a, "&smSign=").concat(i)
//                 })).then((function(e) {
//                     n({
//                         action: t,
//                         result: {
//                             code: 0,
//                             data: e
//                         }
//                     })
//                 }
//                 )).catch((function(e) {
//                     r({
//                         action: t,
//                         error: e
//                     })
//                 }
//                 ))
//             } catch (e) {
//                 console.error("[sufei] sufei 验证后的 URL 中不包含 smTken 或 smSign")
//             }
//         }
//         ))
//     }
//     );