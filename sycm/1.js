 function dd(e, t, n) {
   "use strict";
   n.r(t);
   var r = n(1),
     o = n.n(r),
     i = n(0),
     a = ("https://gm.mmstat.com".concat("/arms.1.1"),
       "arms_uid");

   function c(e) {
     return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
         return typeof e
       } :
       function (e) {
         return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
       }
     )(e)
   }

   function u() { // 生成arms_uid
     return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (e) {
       var t = 16 * Math.random() | 0;
       return ("x" == e ? t : 3 & t | 8).toString(16)
     }))
   }
   var s, l = function () {
       var e;
       if ("object" === ("undefined" == typeof document ? "undefined" : c(document)))
         try {
           if (e = new RegExp("arms_uid=([^;]+)").exec(document.cookie))
             return e[1] || "";
           var t = u();
           return document.cookie = "".concat(a, "=").concat(t, "; max-age=").concat(15552e3),
             t
         } catch (e) {
           return ""
         }
       return ""
     },
     f = function () {
       var e, t = "object" === ("undefined" == typeof wx ? "undefined" : c(wx)) && wx || "object" === ("undefined" == typeof my ? "undefined" : c(my)) && my || "object" === ("undefined" == typeof dd ? "undefined" : c(dd)) && dd;
       if (t && "function" == typeof t.getStorageSync)
         try {
           var n = "object" === ("undefined" == typeof wx ? "undefined" : c(wx)) ? t.getStorageSync(a) : null === (e = t.getStorageSync({
             key: a
           })) || void 0 === e ? void 0 : e.data;
           if (n && "string" == typeof n)
             return n;
           if ("function" == typeof t.setStorageSync)
             return n = u(),
               "object" === ("undefined" == typeof wx ? "undefined" : c(wx)) ? t.setStorageSync(a, n) : t.setStorageSync({
                 key: a,
                 data: n
               }),
               n
         } catch (e) {
           return ""
         }
       return ""
     },
     d = n(2),
     p = n.n(d);

   function h(e) { // 返回类型
     return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
         return typeof e
       } :
       function (e) {
         return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
       }
     )(e)
   }
   var m = "1.2.7";
   t.default = function (e, t) {
     var n = i.shadowMerge({
         useSendBeacon: !0,
         errorEnable: !0,
         ignoreErrors: [],
         enableAllRejection: !1
       }, e),
       r = n.plugins || [];
     if (!0 === n.errorEnable && r.push([p.a, {
         ignoreErrors: n.ignoreErrors,
         enableAllRejection: n.enableAllRejection
       }]),
       n.plugins = r,
       s)
       return s;
     var a = new o.a(n, t);
     s = a;
     var c = "object" === ("undefined" == typeof wx ? "undefined" : h(wx)) && wx || "object" === ("undefined" == typeof my ? "undefined" : h(my)) && my || "object" === ("undefined" == typeof dd ? "undefined" : h(dd)) && dd,
       u = 1;
     try {
       u = function (e) {
         if ("function" == typeof e) {
           var t = /[^(]+\(([^)]*)?\)/gm.exec(Function.prototype.toString.call(e));
           return t && t[1] ? t[1].length : 0
         }
         return 0
       }(c.request)
     } catch (e) {
       console.error(e)
     }
     return c && "function" == typeof c.request && u && u > 0 ? (a.getUidFromCookie = f,
         a.send = function (t) {
           t.sdk_version = m;
           var n = i.getSendInfo(t.type, e.aplusUrl).APLUS_URL,
             r = i.toQueryParams(t, !0);
           c.request({
             url: n,
             data: JSON.stringify({
               gmkey: "OTHER",
               gokey: r,
               logtype: "2"
             }),
             method: "post",
             dataType: "base64",
             header: {
               "content-type": "application/json"
             },
             success: function (e) {}
           })
         }
       ) : n.useSendBeacon && "object" === ("undefined" == typeof navigator ? "undefined" : h(navigator)) && "function" == typeof navigator.sendBeacon ? (a.getUidFromCookie = l,
         a.send = function (t) {
           t.sdk_version = m;
           var n = i.getSendInfo(t.type, e.aplusUrl).APLUS_URL,
             r = i.toQueryParams(t, !0);
           navigator.sendBeacon(n, JSON.stringify({
             gmkey: "OTHER",
             gokey: r,
             logtype: "2"
           }))
         }
       ) : "object" === ("undefined" == typeof window ? "undefined" : h(window)) && window && "object" === ("undefined" == typeof document ? "undefined" : h(document)) && document && (a.getUidFromCookie = l,
         a.send = function (t) {
           t.sdk_version = m;
           var n = i.getSendInfo(t.type, e.aplusUrl).APLUS_URL,
             r = i.toQueryParams(t, !1);
           (new Image).src = n + "?" + r
         }
       ),
       a
   }
 }