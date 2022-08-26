/*
 * @Author: your name
 * @Date: 2021-06-01 08:48:21
 * @LastEditTime: 2021-06-01 08:48:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xws_cj/src/components/SimulateClick/src/bg.js
 */

chrome.runtime.onInstalled.addListener(function(e) {
  'install' == e.reason
    ? chrome.tabs.create({
        url: 'https://www.amingtool.com/welcome',
      })
    : 'update' == e.reason
}),
  chrome.runtime.onMessage.addListener(function(e, t, r) {
    if (!e.type) return !0
    var n = e.request
    return (
      1 == e.type
        ? Promise.all(
            n.map(function(e) {
              return new Promise(function(t, r) {
                var n = {},
                  a = new XMLHttpRequest()
                a.open(e.method, e.url, !0)
                for (var o in e.requestHeaders) a.setRequestHeader(o, e.requestHeaders[o])
                ;(a.onreadystatechange = function() {
                  4 === this.readyState &&
                    ((n.headers = {}),
                    e.responseHeaders.map(function(e, t) {
                      n.headers[e] = a.getResponseHeader(e)
                    }),
                    200 == a.status && (n.data = a.responseText),
                    t(n))
                }),
                  a.send(e.data)
              })
            }),
          ).then(function(e) {
            r(e)
          })
        : 2 == e.type
        ? Promise.all(
            n.map(function(e) {
              return 'string' == typeof e
                ? fetch(e, {
                    credentials: 'include',
                  })
                    .then(function(e) {
                      var t = 'utf-8'
                      return /charset=([^;]*)/.test(e.headers.get('content-type')) && (t = RegExp.$1), Promise.all([e.arrayBuffer(), t])
                    })
                    .then(function(e) {
                      var t = new TextDecoder(e[1])
                      return t.decode(e[0])
                    })
                : fetch(e.url, e.options)
                    .then(function(e) {
                      var t = 'utf-8'
                      return /charset=([^;]*)/.test(e.headers.get('content-type')) && (t = RegExp.$1), Promise.all([e.arrayBuffer(), t])
                    })
                    .then(function(e) {
                      var t = new TextDecoder(e[1])
                      return t.decode(e[0])
                    })
            }),
          ).then(function(e) {
            r(e)
          })
        : 3 == e.type &&
          chrome.cookies.get(n.RegExpinfo, function(e) {
            r(e.value)
          }),
      !0
    )
  }),
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(e) {
      for (var t = {}, r = e.requestHeaders, n = 0, a = r.length; a > n; ++n)
        if ('User-Agent' == r[n].name) {
          r[n].value = 'MTOPSDK/3.0.5.4 (Android;7.1.2;Xiaomi;Redmi 5A)'
          break
        }
      return (t.requestHeaders = r), t
    },
    {
      urls: ['https://api.m.taobao.com/gw/mtop.alimama.moon.provider.detail.orders.get*'],
    },
    ['blocking', 'requestHeaders'],
  )
