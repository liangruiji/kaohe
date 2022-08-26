~~~js
// https://blog.csdn.net/Fabulous1111/article/details/120813325 
 (function () {
  var originalCreateElement = document.createElement
  function changeReqLink (script) {
    var src
    Object.defineProperty(script, 'src', {
      get: function () {
        return src
      },
      set: function (newVal) {
        src = newVal
        script.setAttribute('src', newVal)
      }
    })
    var originalSetAttribute = script.setAttribute
    script.setAttribute = function () {
      var args = Array.prototype.slice.call(arguments)
      if (args[0] === 'src' && args[1].includes('callback=')) {
        console.log('请求地址: ' + args[1])
        args[1] = args[1].replace(/test/g, 'test1')
        console.log('修改后的地址: ' + args[1])
      }
      originalSetAttribute.call(script, ...args)
    }
  }
  document.createElement = function (tagName) {
    var dom = originalCreateElement.call(document, tagName)
    tagName.toLowerCase() === 'script' && (changeReqLink(dom))
    return dom
  }
})()
~~~

