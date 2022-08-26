var baxiaFetchHandler = function () {
  "use strict";
  var e = function (t, n) {
    return (e = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function (e, t) {
        e.__proto__ = t
      } || function (e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
      })(t, n)
  };
  var t = function () {
      return (t = Object.assign || function (e) {
        for (var t, n = arguments, i = 1, o = arguments.length; o > i; i++)
          for (var a in t = n[i]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
        return e
      }).apply(this, arguments)
    },
    n = window,
    i = function (e, t) {
      var i = n.__baxia__ || {};
      return e ? i[e] || t : i
    },
    o = function (e, t) {
      n.__baxia__ = n.__baxia__ || {}, n.__baxia__[e] = t
    },
    a = function () {
      return navigator.userAgent.match(/.*(iPhone|iPad|Android|ios|SymbianOS|Windows Phone).*/i)
    };
  var r = {},
    s = i("events", {}),
    c = {
      on: function (e, t) {
        return (s[e] || (s[e] = [])).push(t), o("events", s), r
      },
      once: function (e, t) {
        var n = this,
          i = function () {
            t.apply(n, function (e) {
              for (var t = Array(e.length), n = 0; t.length > n; ++n) t[n] = e[n];
              return t
            }(arguments)), n.off(e, i)
          };
        return this.on(e, i), r
      },
      off: function (e, t) {
        if (!e && !t) return s = {}, r;
        var n = s[e];
        if (n)
          if (t)
            for (var i = n.length - 1; i >= 0; i--) n[i] === t && n.splice(i, 1);
          else delete s[e];
        return r
      },
      fire: function (e, t) {
        var n = (s = i("events", {}))[e];
        if (n)
          for (var o = 0, a = (n = n.slice()).length; a > o; o++) n[o](t);
        return r
      }
    },
    d = "@=_=@",
    l = null,
    u = null,
    h = null,
    p = [],
    f = {
      uid: 0,
      hid: -1,
      q: [],
      tm: 0,
      postMessage: function (e, t) {
        var n = ++f.uid,
          i = f.q,
          o = {
            name: +new Date + "" + n + "^" + document.domain + "&" + t,
            uid: n,
            target: e
          };
        i.push(o), f.tm || (f.tm = setInterval(function () {
          var e = f.q;
          if (0 !== e.length && e[0].uid > f.hid) {
            var t = e[0];
            f.hid = t.uid, t.target.name = t.name
          }
        }, 10))
      },
      ListenerMessage: function (e, t) {
        var n = "",
          i = /^(\d+?)\^(.+?)&(.*?)$/;
        setInterval(function () {
          if (!e) return !1;
          var o = e.name;
          if (o !== n) {
            f.q.shift(), n = o;
            var a = i.exec(o);
            if (!a) return;
            t && t({
              origin: a[2],
              data: a[3]
            })
          }
        }, 10)
      }
    };

  function g(e) {
    try {
      var t = e.data.split(d),
        n = void 0,
        i = void 0;
      t.length > 1 ? (n = t[0], i = t[1]) : (n = (t = JSON.parse(t[0])).type, i = t.content);
      for (var o = 0, a = p.length; a > o; o++) p[o].event === n && p[o].callback(i)
    } catch (r) {}
  }
  var m = {
    initListener: function (e) {
      u = e.originWin, h = e.msgTransfer, (l = e.currentWin) && u && h && (l.postMessage ? l.addEventListener ? l.addEventListener("message", g, !1) : l.attachEvent && l.attachEvent("onmessage", g) : f.ListenerMessage("fromFrame" == h ? u : l, g))
    },
    register: function (e, t) {
      p.push({
        event: e,
        callback: t
      })
    },
    send: function (e) {
      var t = e.type + d + e.content;
      l && u && h && (u.postMessage ? u.postMessage(t, "*") : f.postMessage("fromFrame" == h ? u : l, t))
    }
  };
  o("Messenger", m);

  function y(e, t) {
    return e + (e.indexOf("?") > -1 ? "&" : "?") + t
  }! function (e, t) {
    void 0 === t && (t = {});
    var n = t.insertAt;
    if (e && "undefined" != typeof document) {
      var i = document.head || document.getElementsByTagName("head")[0],
        o = document.createElement("style");
      o.type = "text/css", "top" === n && i.firstChild ? i.insertBefore(o, i.firstChild) : i.appendChild(o), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e))
    }
  }(".baxia-dialog {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 2147483647;\n}\n\n.baxia-dialog-mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: #000;\n  opacity: .5;\n  filter:alpha(opacity=50);\n}\n\n.sufei-dialog {\n  opacity: 0;\n}\n\n.baxia-dialog-close {\n  position: absolute;\n  top: 5px;\n  right: 10px;\n  cursor: pointer;\n  transform: scaleY(0.8);\n  -ms-transform: scaleY(0.8);\n  /* IE 9 */\n  -moz-transform: scaleY(0.8);\n  /* Firefox */\n  -webkit-transform: scaleY(0.8);\n  /* Safari 和 Chrome */\n  -o-transform: scaleY(0.8);\n  font-size: 18px;\n  padding:10px;\n}\n\n.baxia-dialog-content {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin: -160px 0 0 -210px;\n  min-width: 420px;\n  height: 320px;\n}\n\n.baxia-mobile .baxia-dialog-content {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  min-width: auto;\n  top: 0;\n  left: 0;\n}\n\n.baxia-dialog.map .baxia-dialog-content {\n  height: 100%;\n  width: 100%;\n  position: static;\n  margin: 0;\n  /* height: 700px;\n  min-width: 800px;\n  left: 50%;\n  top: 50%;\n  margin: -350px 0 0 -400px; */\n}\n.baxia-dialog.map  .baxia-dialog-mask{\n  display: none;\n}\n\n.baxia-dialog-content iframe {\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: #fff;\n}\n\n.baxia-ios-fix-fixed .baxia-dialog {\n  position: absolute;\n}\n@media screen and (max-height:720px) {\n  .baxia-dialog-content.map {\n    top: 50%;\n    left: 50%;\n    min-width: 520px;\n    height: 520px;\n    margin: -260px 0 0 -260px;\n  }\n}\n\n.custom-dialog-wrapper .nc-container .nc_scale span{\n  height: auto;\n}");
  var v = location,
    x = document,
    b = function (e, t, n) {
      (void 0 === t && (t = 1), void 0 === n && (n = .1), 0 >= n || Math.random() < n) && function (e, t) {
        var n = [];
        for (var i in e) n.push(i + "=" + encodeURIComponent(e[i]));
        (new Image).src = t + n.join("&")
      }({
        code: t,
        msg: (e + "").substr(0, 1e3) + ";v:2.0.47",
        pid: "baxia",
        page: v.href.split(/[#?]/)[0],
        query: v.search.substr(1),
        hash: v.hash,
        referrer: x.referrer,
        title: x.title,
        ua: navigator.userAgent
      }, "//gm.mmstat.com/fsp.1.1?")
    };
  var w = document,
    T = function (e, t, n) {
      if (!e) return t();
      var i = w.getElementsByTagName("script")[0],
        o = w.createElement("script");
      if (o.async = !0, o.src = e, e.indexOf("alicdn") > -1 && (o.crossOrigin = !0), o.onerror = function (t) {
          b("function:loadJS. msg:" + e + "load error。props：" + JSON.stringify(n)), o.onerror = null
        }, t) {
        var a = !1;
        o.onload = o.onreadystatechange = function () {
          a || o.readyState && !/loaded|complete/.test(o.readyState) || (o.onload = o.onreadystatechange = null, a = !0, t())
        }
      }
      i.parentNode.insertBefore(o, i)
    },
    C = null,
    _ = a(),
    S = function (e) {
      if (e.renderNC = e.renderNC || location.search.indexOf("renderNC") > -1, e.renderNC)
        if (function (e) {
            if (e && !document.getElementById(e.id)) return !1;
            var t = e && e.querySelector(".nc_wrapper"),
              n = e && e.querySelector("._nc");
            return !!t || !!n
          }(e.renderTo)) console.log("已经渲染或者 DOM 元素不存在");
        else {
          var t, n, i, a = "";
          e.cssLink && (t = e.cssLink, n = document.getElementsByTagName("head")[0], (i = document.createElement("link")).type = "text/css", i.rel = "stylesheet", i.href = t, n.appendChild(i)), _ ? (a = "register_h5", T("//g.alicdn.com/sd/nch5/index.js", function () {
            C = window.NoCaptcha, l.bannerHidden = !1, C.init(l), C.setEnabled(!0)
          })) : (a = "register", T("//g.alicdn.com/sd/ncpc/nc.js", function () {
            C = new window.noCaptcha(l)
          }));
          var r = e.verifiedCallback,
            s = e.showCallback,
            c = e.ncAppkey,
            d = e.ncToken,
            l = {
              renderTo: "#" + e.renderTo.id,
              appkey: void 0 === c ? "NCAPPKEY" : c,
              token: void 0 === d ? "NCTOKENSTR" : d,
              bannerHidden: !1,
              scene: a,
              replaceCallback: function (e, t, n) {
                var i, a = [];
                _ ? i = n.bind(this, "ok") : (i = e.success, t = e.data), a.push({
                  key: "bx-nc-ua",
                  value: t.n
                }), o("ncData", a), o("ncSlideData", t), i({
                  success: !0,
                  result: {
                    code: 0
                  }
                }), r && r()
              },
              language: e.ncLanguage
            };
          s && s()
        }
    },
    k = function (e) {
      return void 0 === e && (e = {}), "https://" + e.HOST + e.PATH
    };

  function N(e, t, n) {
    var i = function (e, t) {
      return {
        data: {
          slidedata: JSON.stringify(t.data),
          x5secdata: e.SECDATA
        },
        url: k(e) + "/_____tmd_____/slide"
      }
    }(e, t);
    O({
      url: i.url,
      type: "GET",
      dataType: "json",
      data: i.data,
      success: function (e, t) {
        n(!0)
      },
      error: function (e) {
        n(!1)
      }
    })
  }
  var O = function (e) {
      e = e || {};
      var t = [];
      for (var n in e.data) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e.data[n]));
      t.push(("v=" + Math.random()).replace(".", ""));
      var i = t.join("&"),
        o = new XMLHttpRequest;
      o.onreadystatechange = function () {
        if (4 === o.readyState) {
          var t = o.status;
          t >= 200 && 300 > t ? e.success && e.success(o.responseText, o.responseXML) : e.error && e.error(t)
        }
      }, "GET" === e.type ? (o.open("GET", e.url + "?" + i, !0), o.send(null)) : "POST" === e.type && (o.open("POST", e.url, !0), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), o.send(i))
    },
    E = document,
    q = window,
    M = a();

  function R(e) {
    return E.querySelector(e)
  }
  return function (t) {
    function n(e) {
      return t.call(this, e) || this
    }
    return function (t, n) {
      function i() {
        this.constructor = t
      }
      e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
    }(n, t), n.prototype.fail = function () {
      var e, t;
      this.forEachQueue(function (n) {
        (e = (t = n.baxiaData || {}).defer) && e.reject(t.response)
      })
    }, n.prototype.resend = function () {
      this.forEachQueue(function (e) {
        e && window.fetch(e.url, e)
      })
    }, n
  }(function () {
    function e(e) {
      this.queue = [];
      this.dialog = null, this.reset(), this.on = c.on
    }
    return e.prototype.handler = function (e) {
      this.props = this.formatProps(e), this.options = i("options") || {}, this.run(e)
    }, e.prototype.formatProps = function (e) {
      var t, n = e && e.result;
      if ("string" == typeof n && n) try {
        n = JSON.parse(n)
      } catch (i) {
        try {
          void 0 === (t = n) && (t = ""), n = t.substring(t.indexOf("{"), t.lastIndexOf("}") + 1), n = JSON.parse(n + "")
        } catch (i) {
          throw "baxia.js data error"
        }
      }
      return n.url = n.url || n.data && n.data.url || "", e.result = n, e
    }, e.prototype.showDialog = function (e) {
      if (e) {
        if (this.options && (this.options.language && (e = y(e, "language=" + this.options.language)), this.options.ncLanguage && (e = y(e, "ncLanguage=" + this.options.ncLanguage))), e && -1 === e.indexOf("http")) e = this.getDomain(this.currentRequest.url) + e;
        this.dialog || R("#baxia-dialog-content") ? this.show(e) : (this.render(e), this.show(e))
      }
    }, e.prototype.hide = function (e) {
      if (void 0 === e && (e = !1), e ? this.resend() : this.fail(), this.dialog) {
        if ("none" === this.dialog.style.display) return;
        this.dialog.style.display = "none"
      }
      c.fire("event:dialogHide@baxia", {
        validateSuccess: e
      }), this.reset(), this.closeSufei();
      this.options && this.options.hideCallback && this.options.hideCallback(e)
    }, e.prototype.closeSufei = function () {
      try {
        setTimeout(function () {
          q.parent.postMessage(JSON.stringify({
            type: "child",
            content: '{"smToken":"","sm":""}'
          }), "*")
        }, 200)
      } catch (e) {
        b("closeSufei" + e.message)
      }
    }, e.prototype.destroy = function () {
      this.reset(), this.dialog && (this.dialog.innerHTML = "", this.dialog = null), this.options && this.options.renderTo && (this.options.renderTo.innerHTML = "")
    }, e.prototype.show = function (e) {
      e && this.frame && this.frame.src != e && -1 >= e.indexOf("renderIframe") && (this.frame.src = e), this.dialog && (this.dialog.style.display = "block"), c.fire("event:dialogShow@baxia"), this.options && this.options.showCallback && this.options.showCallback(e)
    }, e.prototype.isCustomRenderTo = function () {
      return this.options.renderTo && !this.options.renderNC
    }, e.prototype.render = function (e) {
      var n = this,
        i = E.createElement("div"),
        o = this.options.renderTo;
      i.style.display = "none";
      var a = this.isCustomRenderTo(),
        r = "",
        s = E.body;
      a ? (s = o, r = this.getRenderContainer()) : r = '<div class="baxia-dialog-mask"></div><div class="baxia-dialog-content">\n      ' + this.getRenderContainer() + '\n      <div class="baxia-dialog-close">X</div>\n      </div>', i.innerHTML = r, s.appendChild(i);
      var c = R(".baxia-dialog-close");
      a || function (e, t, n, i) {
        if (void 0 === i && (i = !1), t.addEventListener) t.addEventListener(e, n, i);
        else if (t.attachEvent) t.attachEvent("on" + e, n)
      }("click", c, function () {
        n.hide()
      }), n.dialog = i, n.frame = R("#baxia-dialog-content"), n.frame && n.initMessenger(n.frame.contentWindow), n.dialogStyleFix(i), M && !a && n.mobileFix(), e.indexOf("/assist") > -1 && (c.style.display = "none", 800 > screen.width || (i.className = i.className + " map")), this.props.result.renderNC ? this.handleRenderNC(t({}, this.props.result)) : "renderIframe" !== this.props.result.url || this.handleShowIframeDialog()
    }, e.prototype.getRenderContainer = function () {
      var e = this.props.result.url;
      return this.props.result.renderNC ? '<div id="baxia-nc-container"></div>' : "renderIframe" === e ? '<iframe id="baxia-dialog-content" frameborder="none"></iframe>' : '<iframe id="baxia-dialog-content" frameborder="none" src="' + e + '"></iframe>'
    }, e.prototype.initMessenger = function (e) {
      var t = this;
      m.initListener({
        currentWin: q,
        originWin: e,
        msgTransfer: "fromFrame"
      }), m.register("msg:validateSuccess@sufei", function (e) {
        t.hide(!0)
      }), m.register("child", function (e) {
        if (!(e = JSON.parse(decodeURIComponent(e))).queryToken && !e.smToken) return t.hide();
        e.queryToken = "not-send" === e.smToken ? "" : "smToken=success", t.hide(!0)
      }), m.register("msg:changeHeight", function (e) {
        var t = R("#baxia-dialog-content");
        t.style.height = e + "px", t.style.position = "static"
      })
    }, e.prototype.dialogStyleFix = function (e) {
      this.isCustomRenderTo() ? e.className += " custom-dialog-wrapper" : (e.className = " baxia-dialog auto ", M && (e.className += " baxia-mobile"))
    }, e.prototype.reset = function () {
      this.currentRequest = null, this.queue = [], this.status = 0
    }, e.prototype.getDomain = function (e) {
      if (!e) return "";
      var t = e.match(/(https|http):\/\/([^\/]+)\//i);
      return t ? t[0] : ""
    }, e.prototype.mobileFix = function () {
      var e = E.body,
        t = 0,
        n = this.dialog,
        i = e.style.height,
        o = q.dpr || 1,
        a = document.documentElement.getBoundingClientRect(),
        r = Math.max(a.width, q.innerWidth) / o;
      n.style.cssText = ["-webkit-transform:scale(" + o + ") translateZ(0)", "-ms-transform:scale(" + o + ") translateZ(0)", "transform:scale(" + o + ") translateZ(0)", "-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0", "width:" + r + "px", "height:" + Math.max(a.height, q.innerHeight) / o + "px", "z-index:2147483647;position: fixed;left:0;top:0px", "background:" + (r > 800 ? "rgba(0,0,0,.5)" : "#FFF"), "display:none"].join(";"), c.on("event:dialogShow@baxia", function () {
        t = e.scrollTop, n.style.height = Math.max(q.innerHeight, e.scrollHeight) > q.screen.height ? q.screen.height + "px" : "100%", e.style.height = n.style.height, setTimeout(function () {
          e.scrollTop = 0
        }, 200)
      }), c.on("event:dialogHide@baxia", function () {
        e.scrollTop = t, e.style.height = i
      })
    }, e.prototype.run = function (e) {
      var t = e.result,
        n = e.config;
      200 !== this.status ? (this.currentRequest = this.currentRequest || n, this.status = 200, this.showDialog(t.url)) : this.queue.push(n)
    }, e.prototype.forEachQueue = function (e) {
      for (var t = [this.currentRequest].concat(this.queue), n = 0; t.length > n; n++)
        if (t[n]) {
          if (t[n].url && t[n].url.indexOf("reqeust=getpunishpage") > -1) return void location.reload();
          e(t[n])
        }
    }, e.prototype.handleShowIframeDialog = function () {
      var e = this.props.result.data;
      R("#baxia-dialog-content").contentDocument.write(e)
    }, e.prototype.handleRenderNC = function (e) {
      var n = this;
      S(t(t({}, e), {
        renderTo: R("#baxia-nc-container"),
        verifiedCallback: function (t) {
          N(e, {
            data: t
          }, function (e) {
            n.hide(e)
          })
        }
      }))
    }, e.prototype.handleAutoSubmit = function (e, t) {}, e.prototype.fail = function () {}, e.prototype.resend = function () {}, e
  }())
}();