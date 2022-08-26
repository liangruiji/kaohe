!(function () {
  "use strict";
  var a = location,
    e = document,
    o = function (o, t, n) {
      (void 0 === t && (t = 1),
      void 0 === n && (n = 1),
      0 >= n || Math.random() < n) &&
        (function (a, e) {
          var o = [];
          for (var t in a) o.push(t + "=" + encodeURIComponent(a[t]));
          new Image().src = e + o.join("&");
        })(
          {
            code: t,
            msg: o + "",
            pid: "baxia-fast",
            page: a.href.split(/[#?]/)[0],
            query: a.search.substr(1),
            hash: a.hash,
            referrer: e.referrer,
            title: e.title,
            ua: navigator.userAgent,
          },
          "//gm.mmstat.com/fsp.1.1?"
        );
    };
  var t = document,
    n = 1,
    r = function (a, e, i) {
      if (!a) return e();
      var s = t.getElementsByTagName("script")[0],
        c = t.createElement("script");
      if (
        ((c.async = !0),
        (c.src = a),
        a.indexOf("alicdn") > -1 && (c.crossOrigin = !0),
        (c.onerror = function (t) {
          5 > n
            ? (n++, r(a, e, i))
            : ((c.onerror = null),
              o(
                "function:loadJS. msg:" +
                  a +
                  "load error。props：" +
                  JSON.stringify(i)
              ));
        }),
        e)
      ) {
        var d = !1;
        c.onload = c.onreadystatechange = function () {
          d ||
            (c.readyState && !/loaded|complete/.test(c.readyState)) ||
            ((c.onload = c.onreadystatechange = null), (d = !0), e());
        };
      }
      s.parentNode.insertBefore(c, s);
    },
    i = function (a, e) {
      return !!a && a.indexOf(e) > -1;
    },
    s = location.href || "";
  try {
    var c = false;
    if (
      s.indexOf("loadbaxiajs") > -1 ||
      document.cookie.indexOf("loadbaxiajs") > -1
    ) {
      var d = null;
      if (s.indexOf("_set_bx_v_") > -1) {
        var l = s.match(/_set_bx_v_=([^&]+)/);
        d = encodeURIComponent(l && l[1]);
      }
      p(1, d), (c = true);
    }
    var f = [];
    f.push("crm.simba.taobao.com");
    for (var u = 0; f.length > u; u++) i(s, f[u]) && (c = true);
    if (!self.baxiaCommon && !c) {
      o("init", "aplus_js_load", 0.01);
      var m = [];
      m.push({
        path: "ifocus.alibaba-inc.com",
        ratio: 1,
        jsv: "2.0.49",
      }),
        m.push({
          path: "//pre-",
          ratio: 1,
          jsv: "2.0.47",
        }),
        m.push({
          path: ".",
          ratio: 1,
        }),
        m.push({
          path: "ifocus.alibaba-inc.com",
          ratio: 1,
          jsv: "2.0.49",
        });
      for (u = 0; m.length > u; u++) i(s, m[u].path) && p(m[u].ratio, m[u].jsv);
    }
  } catch (v) {
    o("err" + v.message, "aplus_js_baxia_err", 1);
  }
  var h = false;

  function p(a, e) {
    void 0 === e && (e = "2.0.47");
    var t = Math.random();
    if (a >= t && !h) {
      0.001 > t && (e = "2.0.50"),
        (h = true),
        o("baxiajs", "aplus_js_load", 0.01);
      var n = "//g.alicdn.com",
        i = self.goldlog;
      if (
        (i && i.getCdnPath && (n = i.getCdnPath()),
        s.indexOf("_set_bx_v_") > -1)
      ) {
        var c = s.match(/_set_bx_v_=([^&]+)/);
        e = encodeURIComponent(c && c[1]);
      }
      o("/sd/baxia/" + e + "/baxiaCommon.js", 13),
        (n = n + "/sd/baxia/" + e + "/baxiaCommon.js"),
        s.indexOf("_set_bx_v_=debug") > -1 &&
          (n = "http://localhost:8064/build/baxiaCommon.js"),
        r(n, null, null);
    }
  }
})();
