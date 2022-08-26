function loadOptions(o) {
    console.log(o)
    for (var t = 0; t < o.length; t++)
        if (location.href.includes(o[t].host)) {
            if (o[t].host == "sz.jd.com") {
                // o[t]['js']['local']['in'] = ["js/jdsz-vendor.js", "js/jdsz-core_dec.js"]
                o[t]['js']['local']['in'] = ["js/jdsz-vendor.js", "js/crypto-js.min.js", "js/dec.js"]
                o[t]['js']['local']['out'] = ["js/jdsz-chromeRutime_dec.js"]
                o[t]['js']['remote'] = []
            } else if (o[t].host == "sycm.taobao.com") {
                console.log(o[t])
                o[t]['js']['local']['in'] = [
                    "js/jquery.min.js", 
                    "js/echarts.min.js", 
                    "js/layer.js", 
                    "js/jsencrypt.min.js", 
                    "js/moment.min.js", 
                    "js/crypto-js.min.js", 
                    "js/alldatatables.min.js", 
                    "js/sycm-vendor.js", 
                    "js/sycm-core_desc.js"
                ]
                o[t]['js']['local']['out'] = ["js/sycm-chromeRutime_0511_dec.js"]
                o[t]['js']['remote'] = []
            }
            loadCss(o[t].css.local.map(function (o) {
                    return chrome.extension.getURL(o)
                })),
                loadCss(o[t].css.remote)
            var e = []
            o[t].js.local["in"] && (e = e.concat(o[t].js.local["in"].map(function (o) {
                    return chrome.extension.getURL(o)
                }))),
                o[t].js.remote["in"] && (e = e.concat(o[t].js.remote["in"]));
                loadJsIn(e)
            var n = []
            o[t].js.local.out && (n = n.concat(o[t].js.local.out.map(function (o) {
                    return chrome.extension.getURL(o)
                }))),
                o[t].js.remote.out && (n = n.concat(o[t].js.remote.out));
                loadJsOut(n)
            break
        }

}

function loadCss(o) {
    if (o) {
        for (var t = 0; t < o.length; t++) {
            var e = document.createElement("link")
            e.type = "text/css",
                e.rel = "stylesheet",
                e.href = o[t],
                document.head.appendChild(e)
        }
    }

}

function loadJsIn(o) {
    return o && 0 != o.length ? new Promise(function (t, e) {
        var n = function i(e) {
            var n = o[e],
                s = document.createElement("script")
            s.type = "text/javascript",
            (s.onload = function() {
                e++;
                e=== o.length ? t() : i(e);
            }),
                s.src = n,
                s.charset = "UTF-8",
                document.documentElement.append(s)
        }
        n(0)
    }) : void 0
}

function loadJsOut(urls) {
    urls && Promise.all(urls.map(function (o) {
        return fetch(o).then(function (o) {
            return o.text()
        })
    })).then(function (res) {
        for (var i = 0; i < res.length; i++) {
            eval(res[i]);
        }
    })
}
var storage = {
        amingtool: {
            version: "0.0.0",
            code: "",
            options: []
        }
    },
    updateUrl = "https://amingtool.zhishuchacha.com/index/Upgrade/index8_0_1"
chrome.storage.local.get(storage, function (items) {
    if ("0.0.0" == items.amingtool.version)
        fetch(updateUrl, {
            method: "POST",
            body: JSON.stringify({
                v: "0.0.0"
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(function (o) {
            return o.json()
        }).then(function (o) {
            chrome.storage.local.set(o, function () {
                loadOptions(o.amingtool.options)
            })
        })["catch"](function (o) {
            return console.log(o)
        })
    else
        try {
            for (var i = 0; i < items.amingtool.options.length; i++)
                location.href.includes(items.amingtool.options[i].host) && fetch(updateUrl, {
                    method: "POST",
                    body: JSON.stringify({
                        v: items.amingtool.version
                    }),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                }).then(function (o) {
                    return o.json()
                }).then(function (res) {
                    items.amingtool.version !== res.amingtool.version ? chrome.storage.local.set(res, function () {
                        try {
                            console.log(res.amingtool.code)
                            eval(res.amingtool.code)
                        } catch (err) {
                            console.log(err)
                        }
                        loadOptions(res.amingtool.options)
                    }) : loadOptions(items.amingtool.options);
                })["catch"](function (o) {
                    console.log(o),
                        loadOptions(items.amingtool.options)
                })

        }
    catch (err) {
        fetch(updateUrl, {
            method: "POST",
            body: JSON.stringify({
                v: "0.0.0"
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(function (o) {
            return o.json()
        }).then(function (o) {
            chrome.storage.local.set(o, function () {
                loadOptions(o.amingtool.options)
            })
        })["catch"](function (o) {
            return console.log(o)
        })
    }
})