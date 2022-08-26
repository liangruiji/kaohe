//https://blog.csdn.net/Fabulous1111/article/details/120813325 方法来源
function getUrlKey(url, name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || ['', ''])[1].replace(/\+/g, '%20')) || null
}
// 版本1 重写 document.createElement 创建script时，为script重写src，覆盖构造函数的原型对象继承下来的src
function jsonp1() {
    let aa = 0
    let originalSrcSet = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').set
    var originalCreateElement = document.createElement
    function changeReqLink(script) {
        var src
        Object.defineProperty(script, 'src', {
            get: function() {
                return src
            },
            set: function(newVal) {
                src = newVal
                originalSrcSet.call(this, newVal)
                if (newVal.includes('callback=')) {
                    console.log(">>>wolanjie")
                    let name = getUrlKey(newVal, "callback")
                    let aa = window[name]
                    if (!window[name].flog) {
                        window[name] = function() {
                            console.log(arguments)
                            aa.apply(this, arguments)
                        }
                        window[name].flog = true
                    }
                }
            }
        })
    }
    document.createElement = function(tagName) {
        aa++
        console.log(aa)
        var dom = originalCreateElement.call(document, tagName)
        tagName.toLowerCase() === 'script' && (changeReqLink(dom))
        return dom
    }
}

// 版本2 重写 script的构造函数的原型对象 HTMLScriptElement.prototype 里 src 的set get函数
function jsonp2() {
    let originalSrcSet = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').set
    let originalSrcGet = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').get
    Object.defineProperty(HTMLScriptElement.prototype, 'src', {
        get() {
            return originalSrcGet.call(this)
        },
        set(newVal) {
            console.log(">>>wolanjies")
            if (newVal.includes('callback=')) {
                console.log(">>>wolanjie")
                let name = getUrlKey(newVal, "callback")
                let aa = window[name]
                if (!window[name].flog) {
                    window[name] = function() {
                        console.log(arguments)
                        aa.apply(this, arguments)
                    }
                    window[name].flog = true
                }
            }
            originalSrcSet.call(this, newVal)
        }
    })
}

// 初版本 //https://blog.csdn.net/Fabulous1111/article/details/120813325 方法来源
function jsonp3() {
    var originalCreateElement = document.createElement
    function changeReqLink(script) {
        var src
        Object.defineProperty(script, 'src', {
            get: function() {
                return src
            },
            set: function(newVal) {
                src = newVal
                script.setAttribute('src', newVal)
            }
        })
        var originalSetAttribute = script.setAttribute
        script.setAttribute = function() {
            var args = Array.prototype.slice.call(arguments)
            if (args[0] === 'src' && args[1].includes('callback=')) {
                // this.addEventListener('load', function(e) {
                    // console.log(e);
                    let name = getUrlKey(args[1], "callback")
                    let aa = window[name]
                    if (!window[name].flog) {
                        window[name] = function() {
                            console.log(arguments)
                            aa.apply(this, arguments)
                        }
                        window[name].flog = true
                    }

                // }, true);
                console.log(this)
                // console.log('请求地址: ' + args[1])
                // args[1] = args[1].replace(/test/g, 'test1')
                // console.log('修改后的地址: ' + args[1])

            }
            originalSetAttribute.call(script, ...args)
        }
    }
    document.createElement = function(tagName) {
        var dom = originalCreateElement.call(document, tagName)
        tagName.toLowerCase() === 'script' && (changeReqLink(dom))
        return dom
    }
}

jsonp2()