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
    r = a.match(/Chrome\/(\d*)/); //92
  r && (r = +r[1]);
  var i = a.match(/Edge\/([\d]*)/), // 
    s = a.match(/Safari\/([\d]*)/),
    l = a.match(/Firefox\/([\d]*)/),
    c = a.match(/MSIE|Trident/);

  function u() {
    var e = "function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D";
    return "WebkitAppearance" in document.documentElement.style && escape(navigator.javaEnabled.toString()) === e
  }

  function d(t, o) { // fyModule 
    var n = "AWSC_SPECIFY_" + t.toUpperCase() + "_ADDRESSES"; // AWSC_SPECIFY_FYMODULE_ADDRESSES
    if (e[n]) return e[n];
    var a = {
      normalAddresses: [],
      brAddresses: []
    };
    for (var d in g_moduleConfig)
      if (g_moduleConfig.hasOwnProperty(d) && d === t) {
        //         fyModule: {
        //   grey: ["AWSC/fireyejs/1.215.0/fireyejs.js"],
        //   stable: ["AWSC/fireyejs/1.215.0/fireyejs.js"],
        //   greyBr: ["AWSC-br/fireyejs/1.215.0/fireyejs.js"],
        //   stableBr: ["AWSC-br/fireyejs/1.215.0/fireyejs.js"],
        //   ratio: 10000,
        //   greyConfig: {},
        //   stableConfig: {}
        // },
        var f = g_moduleConfig[d],
          m = Math.ceil(10000 * Math.random()) <= f.ratio; // true
        a.normalAddresses = m ? f.grey.slice() : f.stable.slice(), f.stableBr && f.greyBr && (a.brAddresses = m ? f.greyBr.slice() : f.stableBr.slice()), "etModule" === t && (i || r ? (a.normalAddresses.pop(), a.brAddresses.pop()) : s || l || c ? (a.normalAddresses.shift(), a.brAddresses.shift()) : u() ? (a.normalAddresses.pop(), a.brAddresses.pop()) : (a.normalAddresses.shift(), a.brAddresses.shift()));

        for (var b = 0; b < a.normalAddresses.length; b++) {
          var g = o ? "https://" + o + "/" : A; // https://g.alicdn.com/
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
    A = v(C()); // https://g.alicdn.com/

  function v(e) {
    var t = "https://g.alicdn.com/";
    if (!e) return t;
    if (/aliexpress/.test(location.href)) return "https://aeis.alicdn.com/";
    var o = y.exec(e);
    return o ? "https://" + o[3] + (o[4] ? ":" + o[4] : "") + "/" : t
  }

  function C() { // https://g.alicdn.com/??/AWSC/AWSC/awsc.js,/sd/baxia-entry/baxiaCommon.js?d=20210925
    for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) {
      var o = e[t],
        n = o.hasAttribute ? o.src : o.getAttribute("src", 4);
      if (/\/awsc\.js/.test(n)) return n
    }
  }
  // 返回n.features中有e的那一项 
  // {
  //     name: "fyModule",
  //     features: ["fy"],
  //     depends: [],
  //     sync: !1
  //   }
  function _(e) { // fy 
    for (var t = void 0, o = 0; o < n.length; o++) {
      for (var a = n[o], r = 0; r < a.features.length; r++)
        if (a.features[r] === e) {
          t = a;
          break
        } if (t) break
    }
    return t
  }
  // 返回 f 中 name ==  e的那一项
  function j(e) {
    for (var t = 0; t < f.length; t++) {
      var o = f[t];
      if (o.name === e) return o
    }
  }
  // 返回 n 中 name ==  e的那一项
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
  // 加载了 AWSC/fireyejs/1.215.0/fireyejs.js 
  function W(e, o, n) { // o: AWSC_fy ,n:false
    // e: {
    //   normalAddresses: [],
    //   brAddresses: []
    // }
    if (n)
      for (var a = 0; a < e.normalAddresses.length; a++) {
        var r = e.normalAddresses[a];
        t.write("<script src=" + r + "><\/script>")
      } else {
        function i(e, n, a) { // normalAddresses
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

  function w(t, o, n) { // "awsc_state", "feature=fyModul&state=loading&href=location.href
    var a = "https://acjs.aliyun.com/error?v=" + t + "&e=" + encodeURIComponent(o) + "&stack=" + encodeURIComponent(n),
      r = new Image,
      i = "_awsc_img_" + Math.floor(1000000 * Math.random());
    e[i] = r,
      r.onload = r.onerror = function () {
        try {
          delete e[i]
        } catch (t) {
          e[i] = null
        }
      },
      r.src = a
  }
  // 运行 u.callbacks中的函数
  function T(e, t) {
    Math.random() < 0.0001 && w("awsc_state", "feature=" + e.name + "&state=" + e.state + "&href=" + encodeURIComponent(location.href));

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

  function k(e, t, o, n) { // fy fn unde f
    // 返回n.features中有e的那一项 
    // {
    //     name: "fyModule",
    //     features: ["fy"],
    //     depends: [],
    //     sync: false
    //   }
    var a = _(e);
    if (!a) return "function" == typeof t && t("no such feature"), void 0;
    var r = o && o.cdn,
      i = o && o.sync,
      s = o && o.timeout || 5000;

    if (0 !== a.depends.length)
      for (var l = 0; l < a.depends.length; l++) {
        var c = a.depends[l];
        o && (delete o.sync, delete o.timeout, delete o.cdn), M(c, undefined, o)
      }

    var u = n || {};
    u.module = a,
      u.name = e,
      u.state = "loading",
      u.callbacks = u.callbacks || [],
      u.options = o,
      t && u.callbacks.push(t),
      u.timeoutTimer = setTimeout((function () { // 5s 后把state 设置为 timeout ，并 运行 回调函数
        u.state = "timeout", T(u, o && o.throwExceptionInCallback)
      }), s),
      n || f.push(u); // u 状态 装到 f数组中
    var m = a.sync,
      b;
    i && (m = i),
      W(d(a.name, r), "AWSC_" + a.name, m) // 加载 fireyejs.js 
  }

  function M(e, t, o) { // fy function
    var n = j(e); // f中name == fy的那一项
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
  // 回调函数 的入口
  function B(e, t, o) { //  fyModule , fy ,fyobj
    var n = false;
    try {
      var a = S(e);
      //   {
      //   name: "fyModule",
      //   features: ["fy"],
      //   depends: [],
      //   sync: !1,
      //   moduleLoadStatus : "loaded"
      // }
      a, a.moduleLoadStatus = "loaded";
      for (var r = void 0, i = 0; i < f.length; i++) {
        var s = f[i];
        s.module === a &&
          s.name === t &&
          (n = s.options && s.options.throwExceptionInCallback,
            r = s,
            clearTimeout(r.timeoutTimer), // 清除 5s 后把state 设置为 timeout 的定时器
            delete r.timeoutTimer,
            r.exportObj = o,  // 存储 fyobj 
            ("loading" === s.state || "timeout" === s.state) && (r.state = "loaded", setTimeout((function () {
              T(r, n) // 运行state更新状态后的回调函数
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
      // o: function (e) { // 回调函数
      //       setStore("getFYModule", e) // 设置window.__baxia__.getFYModule 的值
      //     }
      //      n{
      //     "Flag2": 1,
      //     "MaxMTLog": 20,
      //     "MaxNGPLog": 10,
      //     "MaxKSLog": 5,
      //     "MaxFocusLog": 3,
      //     "location": "cn"
      // }
      // a :3000
      var r = (location.protocol + "//" + location.host + location.pathname).substr(0, 128),
        i = new t;
      //  i ={
      // getFYToken,getUidToken,fyObj
      // }
      // 3s 后保存 i值到 window.__baxia__.getFYModule 
      if (a = a || 2000, "function" == typeof o) var s = e.setTimeout((function () {
        l()
      }), a);
      // 判断参数o 是否是函数，是的话就运行 o({}) ,
      function l() {
        "function" == typeof o && (o(i), e.clearTimeout(s))
      }

      return i.getFYToken = i.getUidToken = function () {
          return "defaultFY1_fyjs_not_loaded@@" + r + "@@" + (new Date).getTime()
        },
        e.fyglobalopt = n,
        e.AWSC.use("fy",
          (function (e, t) {
            "loaded" === e ?
              (i.getFYToken = i.getUidToken = function () {
                  return "defaultFY3_fyjs_not_initialized@@" + r + "@@" + (new Date).getTime()
                },
                i.fyObj = t,
                t.init(n, (function (e) { // 5-16 7-10 6-14 1-13
                  i.getFYToken = function () {
                      return this.fyObj.getFYToken(n) // this指向 t
                    },
                    i.getUidToken = function () {
                      return this.fyObj.getUidToken(n)
                    },
                    l()
                }))) :
              (i.getFYToken = i.getUidToken = function () {
                return "defaultFY2_load_failed with " + e + "@@" + r + "@@" + (new Date).getTime()
              }, l())
          })),
        "function" == typeof o ? undefined : i
    }
    e.AWSC.configFYEx = function (e, t, n) { // n :3000
        //      t {
        //     "Flag2": 1,
        //     "MaxMTLog": 20,
        //     "MaxNGPLog": 10,
        //     "MaxKSLog": 5,
        //     "MaxFocusLog": 3,
        //     "location": "cn"
        // }
        // e: function (e) { // 回调函数
        //       setStore("getFYModule", e) // 设置window.__baxia__.getFYModule 的值
        //     }
        return o(e, t, n) // e 是函数的话 返回undefined ，否则返回 {getFYToken,getUidToken}
      },
      e.AWSC.configFYSyncEx = function (e) {
        return o(null, e) // 返回 {getFYToken,getUidToken}
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

var baxiaCommon = function (a) { // {}
  "use strict";
  var n = location,
    i = document,
    // gif 上传？？
    e = function (a, e, o) {
      (void 0 === e && (e = 1), void 0 === o && (o = 1), 0 >= o || Math.random() < o) && function (a, n) {
        var i = [];
        for (var e in a) i.push(e + "=" + encodeURIComponent(a[e]));
        (new Image).src = n + i.join("&")
      }({
        code: e,
        msg: a + "",
        pid: "baxia-fast",
        page: n.href.split(/[#?]/)[0],
        query: n.search.substr(1),
        hash: n.hash,
        referrer: i.referrer,
        title: i.title,
        ua: navigator.userAgent
      }, "//gm.mmstat.com/fsp.1.1?")
    };

  var o = document,
    t = 1,
    // 加载完js后运行 n函数
    r = function (a, n, i) { // url fn
      if (!a) return n();
      var s = o.getElementsByTagName("script")[0],
        m = o.createElement("script");
      if (m.async = !0, m.src = a, a.indexOf("alicdn") > -1 && (m.crossOrigin = !0), m.onerror = function (o) {
          5 > t ? (t++, r(a, n, i)) : (m.onerror = null, e("function:loadJS. msg:" + a + "load error。props：" + JSON.stringify(i)))
        }, n) {
        var c = !1;
        m.onload = m.onreadystatechange = function () {
          c || m.readyState && !/loaded|complete/.test(m.readyState) || (m.onload = m.onreadystatechange = null, c = !0, n())
        }
      }
      s.parentNode.insertBefore(m, s)
    },
    s = window,
    // 返回 window.__baxia__[a]
    m = function (a, n) {
      var i = window.__baxia__ || {};
      return a ? i[a] || n : i
    },
    // window.__baxia__[a] = n
    c = function (a, n) {
      s.__baxia__ = s.__baxia__ || {}, s.__baxia__[a] = n
    },
    d = "1",
    x = Math.random(),
    u = ["/sd/baxia/1.1.7/baxiaCommon.js"];
  u.push("/sd/baxia/1.1.7/baxiaToken.js"), window.AWSC || u.push("/AWSC/AWSC/awsc.js");

  var f = location.href || "";
  f && -1 >= f.indexOf("passport.alibabacloud.com/mini_login.htm") && (d = "1",
    d = function (a, n, i) { // document.cookie, _bxjs_gray_ , ;
      void 0 === i && (i = "&");
      var e = RegExp(n + "=([^" + i + "]+)").exec(a);
      return e && e[1] ? e[1] : null
    }(document.cookie, "_bxjs_gray_", ";") || d, u = ["/sd/baxia/2.0.40/baxiaCommon.js"], .001 > x && (u = ["/sd/baxia/2.0.50/baxiaCommon.js"]), window.AWSC || u.push("/AWSC/AWSC/awsc.js"));

  var p = !1;
  f && (f.indexOf("login") > 0 || f.indexOf("passport") > 0) && (p = !0), (f.indexOf("auction/buy_now.jhtml") > -1 || f.indexOf("order/confirm_order.htm") > -1) && (u = ["/sd/baxia/1.1.20/baxiaCommon.js"], d = "0.3"), (f.indexOf("auction/buy_now.jhtml") > -1 || f.indexOf("order/confirm_order.htm") > -1) && (u = ["/sd/baxia/1.1.20/baxiaCommon.js"], d = "0.3"), f.indexOf("aliexpress") > -1 && (u = ["/sd/baxia/2.0.48/baxiaCommon.js"], .001 > x && (u = ["/sd/baxia/2.0.50/baxiaCommon.js"]), d = "1"), (f.indexOf("sycm.taobao.com/mc/mq/search_analyze") > -1 || f.indexOf("ipassport.homestyler.com/resetpassword.html") > -1) && (u = ["/sd/baxia/2.0.34/baxiaCommon.js"]);
  for (var b = 0, l = ["gtp-pc.damai.test", "gtp-m.damai.test", "ctp.damai.test", "pre-gtp.maitix.com", "pre-ctp.maitix.com", "gtp.maizuo6.com", "gtp2.maizuo6.com", "gtp3.maizuo6.com", "ctp.maizuo6.com", "ticket.hangzhou2022.cn", "ctp.hangzhou2022.cn"]; l.length > b; b++) {
    if (f.indexOf(l[b]) > -1) {
      u = ["/sd/baxia/2.0.48/baxiaCommon.js"], d = "1", .001 > x && (u = ["/sd/baxia/2.0.50/baxiaCommon.js"]);
      break
    }
  }

  var g = f.indexOf("/member/reg/fast/union_reg.htm") > -1 || f.indexOf("/alimeeting/web/webvc/videomeeting-web") > -1 || f.indexOf("/member/reg/fast/fast_reg.htm") > -1,
    h = "https://g.alicdn.com/??",

    _ = function () {
      if (document.currentScript) return document.currentScript;
      var a = null,
        n = document.getElementsByTagName("script"),
        i = null;
      try {
        throw Error()
      } catch (t) {
        var e, o = (/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(t.stack) || [!1])[1];
        for (e in n)
          if ((i = n[e]).src == o || "interactive" == i.readyState) return a = n[e], n[e]
      }
      return a
    }();

  if (_) {
    var v = _.src;
    v && v.indexOf("laz-g-cdn") > -1 ? h = "https://laz-g-cdn.alicdn.com/??" : v && v.indexOf("assets") > -1 && (h = "https://assets.alicdn.com/g/??")
  }

  var C = h + u.join(",");

  if (f.indexOf("_set_bx_v_") > -1) {
    var j = f.match(/_set_bx_v_=([^&]+)/);
    u = ["/sd/baxia/" + encodeURIComponent(j && j[1]) + "/baxiaCommon.js"], f.indexOf("_set_bx_v_=debug") > -1 && (C = "http://localhost:8064/build/baxiaCommon.js")
  }
  return "placeholder" in document.createElement("input") && parseFloat(d) > x &&
    (e(u.join(","), 13),
      r(C, function () {
        if (window.baxiaCommon) {
          var a = m("options", {}); // window.__baxia__.options
          if (1 > x) {
            if (!(a = m("options", ""))) return
          } else if (g && !m("options")) return;
          p && (a.addVersionToUrl = !0),
            window.baxiaCommon.init(a) // 加载完2.0.47后运行
        }
      })),
    a.init = function (a) {
      // window.__baxia__.options = a
      c("options", a), e("init", 11)
    },
    a.initNC = function (a) {
      a.type = "token",
        c("options", a), // window.__baxia__.options = a
        e("init", 11)
    }, a
}({});
// https://g.alicdn.com/dt/op-mc/1.6.44/vendors.js中调用
//  window.baxiaCommon.init({
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