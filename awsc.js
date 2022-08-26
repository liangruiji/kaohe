! function (e, t) {
  var o = 1e4,
    g_moduleConfig = {
      uabModule: {
        grey: ["AWSC/uab/1.140.0/collina.js"],
        stable: ["AWSC/uab/1.140.0/collina.js"],
        greyBr: ["AWSC-br/uab/1.140.0/collina.js"],
        stableBr: ["AWSC-br/uab/1.140.0/collina.js"],
        ratio: 10000,
        greyConfig: {},
        stableConfig: {}
      },
      fyModule: {
        grey: ["AWSC/fireyejs/1.215.0/fireyejs.js"],
        stable: ["AWSC/fireyejs/1.215.0/fireyejs.js"],
        greyBr: ["AWSC-br/fireyejs/1.215.0/fireyejs.js"],
        stableBr: ["AWSC-br/fireyejs/1.215.0/fireyejs.js"],
        ratio: 10000,
        greyConfig: {},
        stableConfig: {}
      },
      nsModule: {
        grey: ["js/nc/60.js"],
        stable: ["js/nc/60.js"],
        ratio: 1e4,
        greyConfig: {},
        stableConfig: {}
      },
      umidPCModule: {
        grey: ["AWSC/WebUMID/1.88.4/um.js"],
        stable: ["AWSC/WebUMID/1.88.4/um.js"],
        greyBr: ["AWSC-br/WebUMID/1.88.3/um.js"],
        stableBr: ["AWSC-br/WebUMID/1.88.3/um.js"],
        ratio: 10000,
        greyConfig: {},
        stableConfig: {}
      },
      etModule: {
        grey: ["AWSC/et/1.62.0/et_f.js", "AWSC/et/1.62.1/et_n.js"],
        stable: ["AWSC/et/1.62.0/et_f.js", "AWSC/et/1.62.1/et_n.js"],
        greyBr: ["AWSC-br/et/1.62.0/et_f.js", "AWSC-br/et/1.62.1/et_n.js"],
        stableBr: ["AWSC-br/et/1.62.0/et_f.js", "AWSC-br/et/1.62.1/et_n.js"],
        ratio: 10000,
        greyConfig: {
          "whitelist": ["login.taobao.com/member/login.jhtml", "passport.alibaba.com/mini_login.htm", "login.taobao.com/member/loginByIm.do", "login.taobao.com/member/login_by_safe.htm", "login.taobao.com/member/vst.htm", "login.taobao.com/member/facebookLogin.do", "login.m.taobao.com/login.htm", "login.m.taobao.com/sendMsg.do", "login.m.taobao.com/msg_login.htm", "login.m.taobao.com/login_oversea.htm", "login.m.taobao.com/login_oversea_phone.htm", "login.m.taobao.com/newlogin/login.do", "login.m.taobao.com/newlogin/account/check.do", "login.m.taobao.com/newlogin/sms/send.do", "login.m.taobao.com/newlogin/sms/login.do", "buy.taobao.com/auction/buy_now.jhtml", "buy.taobao.com/auction/order/confirm_order.html", "buy.tmall.com/order/confirm_order.html", "buyertrade.taobao.com/trade/itemlist/list_bought_items.htm", "member1.taobao.com/member/fresh/account_security.htm", "member1.taobao.com/member/fresh/account_management.htm", "member1.taobao.com/member/fresh/weibo_bind_management.htm", "member1.taobao.com/member/fresh/deliver_address.htm", "h5.m.taobao.com/mlapp/olist.html", "h5.m.taobao.com/mlapp/odetail.html", "main.m.taobao.com/olist/index.html", "main.m.taobao.com/odetail/index.html", "h5.m.taobao.com/app/hongbao/www/detail/index.html", "market.m.taobao.com/app/dinamic/h5-tb-olist/index.html", "market.m.taobao.com/app/dinamic/h5-tb-odetail/index.html", "market.m.taobao.com/app/mtb/evaluation-list/pages/index2", "h5.m.taobao.com/qn/mobile/delivery.html", "h5.m.taobao.com/mlapp/odetail.html", "main.m.taobao.com/order/index.html", "buy.m.tmall.com/order/confirmOrderWap.htm", "h5.m.taobao.com/cart/order.html", "h5.m.tmall.hk/cart/order.html"]
        },
        stableConfig: {
          "whitelist": ["login.taobao.com/member/login.jhtml", "passport.alibaba.com/mini_login.htm", "login.taobao.com/member/loginByIm.do", "login.taobao.com/member/login_by_safe.htm", "login.taobao.com/member/vst.htm", "login.taobao.com/member/facebookLogin.do", "login.m.taobao.com/login.htm", "login.m.taobao.com/sendMsg.do", "login.m.taobao.com/msg_login.htm", "login.m.taobao.com/login_oversea.htm", "login.m.taobao.com/login_oversea_phone.htm", "login.m.taobao.com/newlogin/login.do", "login.m.taobao.com/newlogin/account/check.do", "login.m.taobao.com/newlogin/sms/send.do", "login.m.taobao.com/newlogin/sms/login.do", "buy.taobao.com/auction/buy_now.jhtml", "buy.taobao.com/auction/order/confirm_order.html", "buy.tmall.com/order/confirm_order.html", "buyertrade.taobao.com/trade/itemlist/list_bought_items.htm", "member1.taobao.com/member/fresh/account_security.htm", "member1.taobao.com/member/fresh/account_management.htm", "member1.taobao.com/member/fresh/weibo_bind_management.htm", "member1.taobao.com/member/fresh/deliver_address.htm", "h5.m.taobao.com/mlapp/olist.html", "h5.m.taobao.com/mlapp/odetail.html", "main.m.taobao.com/olist/index.html", "main.m.taobao.com/odetail/index.html", "h5.m.taobao.com/app/hongbao/www/detail/index.html", "market.m.taobao.com/app/dinamic/h5-tb-olist/index.html", "market.m.taobao.com/app/dinamic/h5-tb-odetail/index.html", "market.m.taobao.com/app/mtb/evaluation-list/pages/index2", "h5.m.taobao.com/qn/mobile/delivery.html", "h5.m.taobao.com/mlapp/odetail.html", "main.m.taobao.com/order/index.html", "buy.m.tmall.com/order/confirmOrderWap.htm", "h5.m.taobao.com/cart/order.html", "h5.m.tmall.hk/cart/order.html"]
        }
      },
      ncModule: {
        grey: ["AWSC/nc/1.85.0/nc.js"],
        stable: ["AWSC/nc/1.85.0/nc.js"],
        ratio: 10000,
        greyConfig: {},
        stableConfig: {}
      }
    },
    n = [{
      name: "umidPCModule",
      features: ["umpc", "um", "umh5"],
      depends: [],
      sync: !1
    }, {
      name: "uabModule",
      features: ["uab"],
      depends: [],
      sync: !1
    }, {
      name: "fyModule",
      features: ["fy"],
      depends: [],
      sync: !1
    }, {
      name: "nsModule",
      features: ["ns"],
      depends: [],
      sync: !1
    }, {
      name: "etModule",
      features: ["et"],
      depends: [],
      sync: !1
    }, {
      name: "ncModule",
      features: ["nc", "nvc", "ic"],
      depends: ["fy"],
      sync: !1
    }],
    a = navigator.userAgent,
    r = a.match(/Chrome\/(\d*)/);
  r && (r = +r[1]);
  var i = a.match(/Edge\/([\d]*)/),
    s = a.match(/Safari\/([\d]*)/),
    l = a.match(/Firefox\/([\d]*)/),
    c = a.match(/MSIE|Trident/);

  function u() {
    var e = "function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D";
    return "WebkitAppearance" in document.documentElement.style && escape(navigator.javaEnabled.toString()) === e
  }

  function d(t, o) {
    var n = "AWSC_SPECIFY_" + t.toUpperCase() + "_ADDRESSES";
    if (e[n]) return e[n];
    var a = {
      normalAddresses: [],
      brAddresses: []
    };
    for (var d in g_moduleConfig)
      if (g_moduleConfig.hasOwnProperty(d) && d === t) {
        var f = g_moduleConfig[d],
          m = Math.ceil(1e4 * Math.random()) <= f.ratio;
        a.normalAddresses = m ? f.grey.slice() : f.stable.slice(), f.stableBr && f.greyBr && (a.brAddresses = m ? f.greyBr.slice() : f.stableBr.slice()), "etModule" === t && (i || r ? (a.normalAddresses.pop(), a.brAddresses.pop()) : s || l || c ? (a.normalAddresses.shift(), a.brAddresses.shift()) : u() ? (a.normalAddresses.pop(), a.brAddresses.pop()) : (a.normalAddresses.shift(), a.brAddresses.shift()));
        for (var b = 0; b < a.normalAddresses.length; b++) {
          var g = o ? "https://" + o + "/" : A;
          "https://assets.alicdn.com/" === g && (g += "g/"), a.normalAddresses[b] = g + a.normalAddresses[b], a.brAddresses[b] && (a.brAddresses[b] = g + a.brAddresses[b])
        }
        return a
      }
  }
  var f = [],
    m = "loading",
    b = "loaded",
    g = "timeout",
    h = "unexpected",
    p = "no such feature",
    y = new RegExp("^([\\w\\d+.-]+:)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?([^?#]+)?(\\?[^#]*)?(#.*)?$"),
    A = v(C());

  function v(e) {
    var t = "https://g.alicdn.com/";
    if (!e) return t;
    if (/aliexpress/.test(location.href)) return "https://aeis.alicdn.com/";
    var o = y.exec(e);
    return o ? "https://" + o[3] + (o[4] ? ":" + o[4] : "") + "/" : t
  }

  function C() {
    for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) {
      var o = e[t],
        n = o.hasAttribute ? o.src : o.getAttribute("src", 4);
      if (/\/awsc\.js/.test(n)) return n
    }
  }

  function _(e) {
    for (var t = void 0, o = 0; o < n.length; o++) {
      for (var a = n[o], r = 0; r < a.features.length; r++)
        if (a.features[r] === e) {
          t = a;
          break
        } if (t) break
    }
    return t
  }

  function j(e) {
    for (var t = 0; t < f.length; t++) {
      var o = f[t];
      if (o.name === e) return o
    }
  }

  function S(e) {
    for (var t = void 0, o = 0; o < n.length; o++) {
      var a = n[o];
      if (a.name === e) {
        t = a;
        break
      }
      if (t) break
    }
    return t
  }

  function W(e, o, n) {
    if (n)
      for (var a = 0; a < e.normalAddresses.length; a++) {
        var r = e.normalAddresses[a];
        t.write("<script src=" + r + "><\/script>")
      } else {
        function i(e, n, a) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r],
              s = t.createElement("script");
            s.async = !1, s.src = i, s.id = o, s.onerror = n || function () {}, s.onload = a || function () {};
            var l = t.getElementsByTagName("script")[0];
            l && l.parentNode ? l.parentNode.insertBefore(s, l) : (l = t.body || t.head) && l.appendChild(s)
          }
        }
        i(e.normalAddresses)
      }
  }

  function w(t, o, n) {
    var a = "https://acjs.aliyun.com/error?v=" + t + "&e=" + encodeURIComponent(o) + "&stack=" + encodeURIComponent(n),
      r = new Image,
      i = "_awsc_img_" + Math.floor(1e6 * Math.random());
    e[i] = r, r.onload = r.onerror = function () {
      try {
        delete e[i]
      } catch (t) {
        e[i] = null
      }
    }, r.src = a
  }

  function T(e, t) {
    Math.random() < 1e-4 && w("awsc_state", "feature=" + e.name + "&state=" + e.state + "&href=" + encodeURIComponent(location.href));
    for (var o = void 0; o = e.callbacks.shift();) try {
      if ("function" == typeof o) o(e.state, e.exportObj);
      else if ("object" == typeof o) {
        var n = e.exportObj;
        n && "function" == typeof n.init && n.init(o)
      }
    } catch (o) {
      if (t) throw o;
      w(e.name, o.message, o.stack)
    }
  }

  function k(e, t, o, n) {
    var a = _(e);
    if (!a) return "function" == typeof t && t("no such feature"), void 0;
    var r = o && o.cdn,
      i = o && o.sync,
      s = o && o.timeout || 5e3;
    if (0 !== a.depends.length)
      for (var l = 0; l < a.depends.length; l++) {
        var c = a.depends[l];
        o && (delete o.sync, delete o.timeout, delete o.cdn), M(c, void 0, o)
      }
    var u = n || {};
    u.module = a, u.name = e, u.state = "loading", u.callbacks = u.callbacks || [], u.options = o, t && u.callbacks.push(t), u.timeoutTimer = setTimeout((function () {
      u.state = "timeout", T(u, o && o.throwExceptionInCallback)
    }), s), n || f.push(u);
    var m = a.sync,
      b;
    i && (m = i), W(d(a.name, r), "AWSC_" + a.name, m)
  }

  function M(e, t, o) {
    var n = j(e);
    if (n)
      if ("timeout" === n.state) k(e, t, o, n);
      else if ("loaded" === n.state) {
      if ("function" == typeof t) t(n.state, n.exportObj);
      else if ("object" == typeof t) {
        var a = n.exportObj;
        a && "function" == typeof a.init && a.init(t)
      }
    } else "loading" === n.state ? t && n.callbacks.push(t) : void 0;
    else k(e, t, o)
  }

  function B(e, t, o) {
    var n = !1;
    try {
      var a = S(e);
      a, a.moduleLoadStatus = "loaded";
      for (var r = void 0, i = 0; i < f.length; i++) {
        var s = f[i];
        s.module === a && s.name === t && (n = s.options && s.options.throwExceptionInCallback, r = s, clearTimeout(r.timeoutTimer), delete r.timeoutTimer, r.exportObj = o, ("loading" === s.state || "timeout" === s.state) && (r.state = "loaded", setTimeout((function () {
          T(r, n)
        }), 0)))
      }
      r || ((r = {}).module = a, r.name = t, r.state = "loaded", r.exportObj = o, r.callbacks = [], f.push(r))
    } catch (e) {
      if (n) throw e;
      w("awsc_error", e.message, e.stack)
    }
  }

  function U(e) {
    function t(t, o, n, a) {
      var r = location.protocol + "//" + location.host + location.pathname,
        i = new e.AWSCFY;
      e._umopt_npfp = 0;
      var s = !1;
      i.umidToken = "defaultToken1_um_not_loaded@@" + r + "@@" + (new Date).getTime(), e.AWSC.use("um", (function (e, t) {
        "loaded" === e ? (i.umidToken = "defaultToken3_init_callback_not_called@@" + r + "@@" + (new Date).getTime(), t.init(o, (function (e, t) {
          i.umidToken = "success" === e ? t.tn : "defaultToken4_init_failed with " + e + "@@" + r + "@@" + (new Date).getTime(), s = !0, u()
        }))) : (i.umidToken = "defaultToken2_load_failed with " + e + "@@" + r + "@@" + (new Date).getTime(), s = !0, u())
      }));
      var l = !1;
      if (i.getUA = function () {
          return "defaultUA1_uab_not_loaded@@" + r + "@@" + (new Date).getTime()
        }, e.AWSC.use("uab", (function (e, t) {
          l = !0, "loaded" === e ? (i.uabModule = t, i.uabConfig = n, i.getUA = function () {
            return this.uabModule.getUA(this.uabConfig)
          }) : i.getUA = function () {
            return "defaultUA2_load_failed with " + e + "@@" + r + "@@" + (new Date).getTime()
          }, u()
        })), null != t) var c = e.setTimeout((function () {
        u(!0)
      }), a || 2e3);

      function u(o) {
        null != t && (l && s || o) && (t(i), e.clearTimeout(c))
      }
      return null == t ? i : void 0
    }
    e.AWSCFY = function () {}, e.AWSC.configFY = function (e, o, n, a) {
      return t(e, o, n, a)
    }, e.AWSC.configFYSync = function (e, o) {
      return t(null, e, o)
    }
  }

  function D(e) {
    var t = function () {};

    function o(o, n, a) {
      var r = (location.protocol + "//" + location.host + location.pathname).substr(0, 128),
        i = new t;
      if (a = a || 2e3, "function" == typeof o) var s = e.setTimeout((function () {
        l()
      }), a);

      function l() {
        "function" == typeof o && (o(i), e.clearTimeout(s))
      }
      return i.getFYToken = i.getUidToken = function () {
        return "defaultFY1_fyjs_not_loaded@@" + r + "@@" + (new Date).getTime()
      }, e.fyglobalopt = n, e.AWSC.use("fy", (function (e, t) {
        "loaded" === e ? (i.getFYToken = i.getUidToken = function () {
          return "defaultFY3_fyjs_not_initialized@@" + r + "@@" + (new Date).getTime()
        }, i.fyObj = t, t.init(n, (function (e) {
          i.getFYToken = function () {
            return this.fyObj.getFYToken(n)
          }, i.getUidToken = function () {
            return this.fyObj.getUidToken(n)
          }, l()
        }))) : (i.getFYToken = i.getUidToken = function () {
          return "defaultFY2_load_failed with " + e + "@@" + r + "@@" + (new Date).getTime()
        }, l())
      })), "function" == typeof o ? void 0 : i
    }
    e.AWSC.configFYEx = function (e, t, n) {
      return o(e, t, n)
    }, e.AWSC.configFYSyncEx = function (e) {
      return o(null, e)
    }
  }

  function E(e) {
    var t = g_moduleConfig.etModule,
      o, n = Math.ceil(1e4 * Math.random()) <= t.ratio ? t.greyConfig.whitelist : t.stableConfig.whitelist,
      a;
    new RegExp(("^" + n.join("$|^") + "$").replace(/\*/g, ".*")).test(location.host + location.pathname) && (window.etrprtrt = .01, e.AWSC.use("et"))
  }

  function x(e) {
    e.AWSC || (e.AWSC = {}, e.AWSC.use = M, e.AWSCInner = {}, e.AWSCInner.register = B, U(e), D(e), E(e))
  }
  x(e)
}(window, document);