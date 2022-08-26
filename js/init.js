/*
 * @Author: your name
 * @Date: 2021-06-01 08:49:43
 * @LastEditTime: 2021-06-01 09:30:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xws_cj/src/components/SimulateClick/src/init.js
 */
function loadOptions(o) {
  for (var t = 0; t < o.length; t++)
    if (location.href.includes(o[t].host)) {
      // 加载css
      loadCss(
        o[t].css.local.map(function(o) {
          return chrome.extension.getURL(o)
        }),
      ),
        loadCss(o[t].css.remote)

      // 插入网页js
      var e = []
      o[t].js.local['in'] &&
        (e = e.concat(
          o[t].js.local['in'].map(function(o) {
            return chrome.extension.getURL(o)
          }),
        )),
        o[t].js.remote['in'] && (e = e.concat(o[t].js.remote['in'])),
        loadJsIn(e)
      // 加载
      var n = []
      o[t].js.local.out &&
        (n = n.concat(
          o[t].js.local.out.map(function(o) {
            return chrome.extension.getURL(o)
          }),
        )),
        o[t].js.remote.out && (n = n.concat(o[t].js.remote.out)),
        loadJsOut(n)
      break
    }
}
// 加载css
function loadCss(o) {
  if (o)
    for (var t = 0; t < o.length; t++) {
      var e = document.createElement('link')
      ;(e.type = 'text/css'), (e.rel = 'stylesheet'), (e.href = o[t]), document.head.appendChild(e)
    }
}
// 插入网页js
function loadJsIn(o) {
  return o && 0 != o.length
    ? new Promise(function(t, e) {
        var n = function i(e) {
          var n = o[e],
            s = document.createElement('script')
          ;(s.type = 'text/javascript'),
            (s.onload = function() {
              // 加载完成后加载下一个，并移除标签
              e++, e === o.length ? t() : i(e), this.parentNode.removeChild(this)
            }),
            (s.src = n),
            (s.charset = 'UTF-8'),
            document.documentElement.append(s)
        }
        n(0)
      })
    : void 0
}
// 加载内容页面
function loadJsOut(urls) {
  urls &&
    Promise.all(
      urls.map(function(o) {
        return fetch(o).then(function(o) {
          return o.text()
        })
      }),
    ).then(function(res) {
      // https://codecdn.zhishuchacha.com/production_new/sy…10531170529/sycm-chromeRutime.js?v=20210531170529
      for (var i = 0; i < res.length; i++) eval(res[i])
    })
}
var storage = {
    amingtool: {
      version: '0.0.0',
      code: '',
      options: [],
    },
  },
  updateUrl = 'https://amingtool.zhishuchacha.com/index/Upgrade/index8_0_1'
chrome.storage.local.get(storage, function(items) {
  // 版本是0.0.0时
  if ('0.0.0' == items.amingtool.version)
    fetch(updateUrl, {
      method: 'POST',
      body: JSON.stringify({
        v: '0.0.0',
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(function(o) {
        return o.json()
      })
      .then(function(o) {
        chrome.storage.local.set(o, function() {
          loadOptions(o.amingtool.options)
        })
      })
      ['catch'](function(o) {
        return console.log(o)
      })
  // 版本不是0.0.0时
  else
    try {
      for (var i = 0; i < items.amingtool.options.length; i++)
        // in: ["https://codecdn.zhishuchacha.com/production_new/sy…ne/20210531170529/sycm-vendor.js?v=20210531170529",
        //      "https://codecdn.zhishuchacha.com/production_new/sy…line/20210531170529/sycm-core.js?v=20210531170529"]
        //out: ["https://codecdn.zhishuchacha.com/production_new/sy…10531170529/sycm-chromeRutime.js?v=20210531170529"]
        location.href.includes(items.amingtool.options[i].host) &&
          fetch(updateUrl, {
            method: 'POST',
            body: JSON.stringify({
              v: items.amingtool.version,
            }),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          })
            .then(function(o) {
              return o.json()
            })
            .then(function(res) {
              items.amingtool.version !== res.amingtool.version
                ? chrome.storage.local.set(res, function() {
                    try {
                      // 如果版本不一致，则运行返回的的代码 ，一样则加载配置里的js
                      eval(res.amingtool.code)
                    } catch (err) {
                      console.log(err)
                    }
                    loadOptions(res.amingtool.options) // 加载 返回来的配置里的js
                  })
                : loadOptions(items.amingtool.options) // 加载 插件storage里的配置 js
            })
            ['catch'](function(o) {
              console.log(o), loadOptions(items.amingtool.options)
            })
    } catch (err) {
      fetch(updateUrl, {
        method: 'POST',
        body: JSON.stringify({
          v: '0.0.0',
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(function(o) {
          return o.json()
        })
        .then(function(o) {
          chrome.storage.local.set(o, function() {
            loadOptions(o.amingtool.options)
          })
        })
        ['catch'](function(o) {
          return console.log(o)
        })
    }
})
