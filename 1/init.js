// 利用script标签插入代码
window.injectjs = function(aa) {
    let script = document.createElement('script')
    script.textContent = '(' + aa.toString() + ')()';
    (document.head || document.documentElement).appendChild(script)
    script.onload = function() {
        // this.parentNode.removeChild(this)
    }
}
// 利用按钮插入代码
window.injectjs1 = function(aa) {
    let button1 = document.createElement('button')
    button1.setAttribute('onclick', '(' + aa.toString() + ')()')
    button1.click()
}
function bb() { 
  
  Function.prototype.constructor_bc = Function.prototype.constructor;
  Function.prototype.constructor = function() {
    if (arguments[0] === "debugger") {
      // Function.prototype.constructor.prototype.bind=Function.prototype.constructor.bind
      Function.prototype.constructor_bc.apply(this)
        // "什么都不做"
    }//利用arguments关键字的属性获取当前方法里面的参数
    else {
        return Function.prototype.constructor_bc.apply(this, arguments)
        //跟上面处理debugger和定时器一起用的处理方法一样
    }
    Function.prototype.constructor.prototype = Function.prototype
    // console.log('>>>>>>>>44')
  }
        //https://blog.csdn.net/Fabulous1111/article/details/120813325 方法来源
function getUrlKey(url, name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || ['', ''])[1].replace(/\+/g, '%20')) || null
}
// 版本1 重写 document.createElement 创建script时，为script重写src，覆盖构造函数的原型对象继承下来的src
function jsonp1() {
    
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
                    let name = getUrlKey(newVal, "callback")
                    let aa = window[name]
                    if (window[name]&&!window[name].flog) {
                        window[name] = function() {
                            window.postMessage({act:'test',data:arguments[0]},'*')
                            aa.apply(this, arguments)
                        }
                        window[name].flog = true
                    }
                }
            }
        })
    }
    document.createElement = function (tagName) {
        var dom = originalCreateElement.call(document, tagName)
        tagName.toLowerCase() === 'script' && (changeReqLink(dom))
        return dom
    }
}
jsonp1()

}
injectjs1(bb)

function cc() {
    console.dir('>>>>>>>>准备恢复console0')
  
    
   window.addEventListener('load', (event) => {
       let iframe = document.createElement('iframe')
   iframe.style.display = 'none'
    document.body.appendChild(iframe)
    const console_1 = iframe.contentWindow.console
    window.console = console_1
    console.dir('>>>>>>>>已恢复console')
  
});


}
injectjs(cc)

window.addEventListener('message', function (e) { 
    console.log(e.data)
})