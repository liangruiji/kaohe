/* eslint-disable no-undef */
/*
 * @Author: your name
 * @Date: 2021-02-22 11:05:43
 * @LastEditTime: 2021-10-29 10:50:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/ops_cj/src/background/index.js
 */
localforage.getItem('ddd').then(res => {
  console.log(res)
})
fetch('chrome-extension://gaggekbfeokehnjejjaalckehaojjlcd/assets/js/localforage.js')
  .then(o => {
    return o.text()
  })
  .then(r => {
    localforage.setItem('localforage', { data: r })
  })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('监听', request)
  var type = request.type,
    data = request.data,
    act = request.act
  switch (act) {
    case 'getLocalforageData':
      getLocalforageData(type, data, sendResponse)
      break
    case 'setLocalforageData':
      setLocalforageData(type, data, sendResponse)
      break
    case 'getMixinsCode':
      getMixinsCode(type, data, sendResponse)
      break
  }

  return true // 如果有异步操作需要 return true ，否则会报错不行
})

function getMixinsCode(type, data, sendResponse) {
  // eslint-disable-next-line no-unused-vars
  localforage.getItem(type).then(res => {
    // if (res) {
    //   sendResponse(res)
    // } else {
    fetch(`chrome-extension://gaggekbfeokehnjejjaalckehaojjlcd/assets/js/${type}.js`)
      .then(o => {
        return o.text()
      })
      .then(res => {
        localforage.setItem(type, { data: res })
        sendResponse({ data: res })
      })
    // }
  })
}

function setLocalforageData(type, data, sendResponse) {
  console.log('setItem', type, data)
  localforage.setItem(type, data)
  sendResponse({ data })
}

function getLocalforageData(type, data, sendResponse) {
  localforage.getItem(type).then(data => {
    console.log('getItem', type, data)
    sendResponse({ data })
  })
}

// chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
//   // 可以针对sender做一些白名单检查
//   // sendResponse返回响应
//   var type = request.type,
//     data = request.data
//   console.log('request', request)
//   if (type == 'page=>bg') {
//     sendResponse({
//       type: 'page=>bg',
//       msg: {
//         externally_connectable: {
//           matches: ['*://*.taobao.com/*', '*://stackoverflow.com/*'],
//         },
//         text: `用户网页和Chrome插件bg之间的通信:
//         页面中 chrome.runtime.sendMessage(插件id, {type: '', msg: 'Hello, I am page~'},callback())
//         bg中 chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {}
//         manifest.json 中
//         "externally_connectable": {
//           "matches": ["*://*.example.com/*"]
//         }
//         注意：出于安全考虑，这里的matches配置，必须是具体的域名，不可以是通配符。
//         `,
//       },
//     })
//   }
// })

// chrome.runtime.onConnect.addListener(function(port) {
//   console.log('>>>>>.')
//   // 2. 监听信息
//   port.onMessage.addListener(function(msg) {
//     console.log('>>>>>.mapGetters')
//     let type = msg.type
//     switch (type) {
//       case '1': {
//         port.postMessage({ type: '1' })
//         break
//       }
//       case '2': {
//         port.postMessage({ type: '2' })
//         break
//       }
//       case 'inject_js': {
//         chrome.tabs.executeScript(
//           null,
//           {
//             code: 'var aa = 666',
//           },
//           function(e) {
//             console.log('66666')
//           },
//         )
//         break
//       }
//     }
//   })
// })

// chrome.tabs.executeScript({ code: 'let aa = 66' })
