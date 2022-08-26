/*
 * @Author: your name
 * @Date: 2021-08-20 00:08:49
 * @LastEditTime: 2022-01-07 17:25:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nunu_cj/src/assets/js/mixins.js
 */
!(function () {
  let inject_cdn_script = function (url, fnStr, type, i,t =1) { // url fn
    if (!url) return eval(fnStr);
    var firstScript = document.getElementsByTagName("script")[0],
      newScript = document.createElement("script");
    if (type == 'async') {
      newScript.async = true
    } else if (type == 'defer') {
      newScript.defer = true
    } else {
      newScript.async = false
    }
    if (
      newScript.src = url,
      url.indexOf("alicdn") > -1 && (newScript.crossOrigin = true),
      newScript.onerror = function (o) {
        5 > t ? (t++, inject_cdn_script(url, n,type,i,t)) : (newScript.onerror = null, console.log("function:loadJS. msg:" + a + "load error。props：" + JSON.stringify(i)))
      },
      fnStr) {
      var c = false;
      newScript.onload = newScript.onreadystatechange = function () {
        c || newScript.readyState && !/loaded|complete/.test(newScript.readyState) || (newScript.onload = newScript.onreadystatechange = null, c = true, eval(fnStr))
      }
    }
    firstScript.parentNode.insertBefore(newScript, firstScript)
  }

  window.addEventListener('message', function (event) {
    if (event.data.act == 'inject_cdn_script') {
      inject_cdn_script(event.data.url, event.data.injectCb, event.data.type,event.data.name)
     
    }
    
  })

  //  window.logStr = false
  // window.switch = function() {
  //    window.logStr = !window.logStr
  // }
// let aaa = String.fromCharCode
// window.a1 = ''
//   window.a2 = ''
//   window.a3 = ''
// String.fromCharCode = function() {
//     let str = aaa.apply(this, arguments)
//   if (window.logStr) {
//     // console.dir(arguments)
//     console.dir(str)
//     window.a1 += str
//     }
   
//     return str
// }
// let bbb = String.fromCodePoint
// String.fromCodePoint = function() {
//     let str = bbb.apply(this, arguments)
//     // console.dir(arguments, str)
//     return str
// }
  
 

  
// let ccc = String.prototype.charAt
// String.prototype.charAt = function() {
//     let str = ccc.apply(this, arguments)
//    if (window.logStr) {
//     // console.dir(arguments)
//     //  console.trace()
//     console.dir(str)
//     window.a2 += str
//     }
//     return str
// }
// let ddd = String.prototype.charCodeAt
// String.prototype.charCodeAt = function() {
//     let str = ddd.apply(this, arguments)
//       if (window.logStr) {
//     console.dir(arguments)
//     console.dir(str)
//     window.a3 += str
//     }
//     return str
// }

  
// let eee = Array.prototype.push
//  Array.prototype.push = function() {
//     let str = eee.apply(this, arguments)
//    if (window.logStr) {
//     // console.dir(arguments)
//     //  console.trace()
//      if (this.length >= 400) {
//          console.dir(this)
//     }

    
//     }
//     return str
// }

  // let fff = HTMLCanvasElement.toDataURL
  // HTMLCanvasElement.toDataURL =  function() {
  //   let str = fff.apply(this, arguments)
  //     if (window.logStr) {
  //   console.dir(arguments)
  //   console.dir(str)
  //   // window.a3 += str
  //   }
  //   return str
  // }
//   let ggg = Array.prototype.concat
//    Array.prototype.concat =  function() {
//     let str = ggg.apply(this, arguments)
//       if (window.logStr) {
//     console.dir(arguments)
//     console.dir(str)
//     // window.a3 += str
//     }
//     return str
//    }
// let aa =  MutationObserver.prototype.takeRecords
//    MutationObserver.prototype.takeRecords=function(){

//      let str = aa.apply(this, arguments)
//      console.dir(str)
// return str
// }
//   let aa = Response.prototype.text
//   Response.prototype.text = function(){
//  console.log(this)
//  return aa.apply(this, arguments)
// }

//   let aa = String.prototype.match
//   String.prototype.match =function(){

//      let str = aa.apply(this, arguments)
//     if (this.valueOf().length <= 2000){console.dir(this.valueOf())}  
//     // console.dir(arguments[0])
// return str
// }

  
 // 恢复 console.log 的代码
  // let iframe = document.createElement('iframe')
  // iframe.style.display = 'none'
  // document.body.appendChild(iframe)
  // const console = iframe.contentWindow.console
  // window.console = console

// Function.prototype.constructor_bc=Function.prototype.constructor;
// Function.prototype.constructor=function(){
//   if (arguments[0] === "debugger") {
//             return
//           }  //利用arguments关键字的属性获取当前方法里面的参数
// 					else{
// 						return Function.prototype.constructor_bc.apply(this,arguments)  //跟上面处理debugger和定时器一起用的处理方法一样
// 					}
// 				}




  //  测试 inject页面发送信息给 bg
  // let page_bg = chrome.runtime.sendMessage(
  //   'gaggekbfeokehnjejjaalckehaojjlcd', // 插件的ID
  //   { type: 'page=>bg', msg: 'Hello, I am page~' },
  //   function (response) {
  //     console.log(response);
  //     if (response) {
  //       console.log(response.msg.text)
  //       console.log(new Date(), '>>>>>')
  //     } else {
  //       let error =  new Error("bg没有设置回应，或此网页没有在manifest.jso设置权限")
  //       let text = `用户网页和Chrome插件bg之间的通信:
  //       页面中 chrome.runtime.sendMessage(插件id, {type: '', msg: 'Hello, I am page~'},callback())
  //       bg中 chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {}
  //       manifest.json 中
  //       "externally_connectable": {
  //         "matches": ["*://*.example.com/*"]
  //       }
  //       注意：出于安全考虑，这里的matches配置，必须是具体的域名，不可以是通配符 如： <all_urls>、http://*/*、*://*.com/*、http://*.appspot.com/*。
  //       `
  //        console.error(error)
  //       console.log(text)
  //     }
  //   },
  // )
})()