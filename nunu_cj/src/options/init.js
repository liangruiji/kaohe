/* eslint-disable no-undef */
/*
 * @Author: your name
 * @Date: 2021-08-03 11:21:03
 * @LastEditTime: 2021-10-28 14:23:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/努努工具/js/init.js
 */
import test from './init/test.vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)

import StateSymbol from '@/components/StateSymbol'
Vue.component('StateSymbol', StateSymbol)
import PublicTable from '@/components/PublicTable2'
Vue.component('PublicTable', PublicTable)
// 注入页面的 js
// chrome.runtime.sendMessage({ type: 'run' }, res => {
//   var s = document.createElement('script')
//   // console.log(res)
//   let modjs = res.data
//   s.type = 'text/javascript'
//   s.setAttribute('id', '_0xb670xf')
//   s.textContent = modjs
//   ;(document.head || document.documentElement).appendChild(s)
// })

// window.flag = true
// var modjs =
//   '(' +
//   function() {
//     window.addEventListener('message', function(event) {
//       if (event.data.act == 'run') {
//         let y = document.createElement('script')
//         y.type = 'text/javascript'
//         y.src = event.data.url
//         document.getElementsByTagName('head')[0].appendChild(y)
//         y.onload = () => {
//           console.dir(event.data.url)
//         }
//         console.log('我运行了')
//       }
//     })
//   }.toString() +
//   ')();'

// $('#_0xb670xf').remove()

// eslint-disable-next-line no-undef
$('body').append("<div id='nunu'></div>")
// eslint-disable-next-line no-undef
new Vue({
  el: '#nunu',
  //  template: "<div id='llll'> hi </div>"
  render: h => h(test),
})
console.log('>>>>init')
// 注入css 看看还有哪种方式注入
const cssUrl = chrome.runtime.getURL('/css/init.css')
fetch(cssUrl)
  .then(res => {
    return res.text()
  })
  .then(r => {
    const styleEl = document.createElement('style')
    styleEl.setAttribute('id', 'nunu_css')
    styleEl.innerHTML = r
    document.head.appendChild(styleEl)
  })

// 测试通讯的
// window.port = chrome.runtime.connect({ name: 'test' })
// // 3.第一次发送信息
// // port.postMessage({ type: '1' })
// // 4.监听回应信息
// port.onMessage.addListener(function(msg) {
//   console.log(msg)
//   // 5.有回应后再发信息
//   let type = msg.type
//   switch (type) {
//     case '1': {
//       console.log('type', type)
//       break
//     }
//     case '2': {
//       console.log('type', type)
//       break
//     }
//   }
// })
// port.postMessage({
//   type: 'inject_js',
// })

var s = document.createElement('script')

var modjs =
  '(' +
  function() {
    function getUrlKey(url, name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || ['', ''])[1].replace(/\+/g, '%20')) || null
    }
    function ajaxEventTrigger() {
      let response = JSON.parse(this['response'])

      // 流量-我的搜索分析-用户搜索词
      if (this['responseURL'].indexOf('https://eye2.oa.com/api/mongo_dms/exec_shell/') >= 0) {
        if (response.code == 200 && response.data) {
          window.postMessage(
            {
              act: 'setLocal',
              xws_data: response.data,
              url: this['responseURL'],
            },
            '*',
          )
        }
      }
    }
    var oldXHR = window.XMLHttpRequest
    function newXHR() {
      var realXHR = new oldXHR()
      realXHR.addEventListener(
        'load',
        function() {
          ajaxEventTrigger.call(this, 'ajaxLoad')
        },
        false,
      )
      return realXHR
    }
    window.XMLHttpRequest = newXHR
  }.toString() +
  ')();'
s.type = 'text/javascript'
s.setAttribute('id', '_0xb670xf')
s.textContent = modjs
;(document.head || document.documentElement).appendChild(s)

$('#_0xb670xf').remove()

const db = new Dexie('myDatabase')
db.version(1).stores({
  test: '[env+pid+url+col+stype+page+limit+query]', // Primary key and indexed props
})
window.addEventListener(
  'message',
  function(event) {
    if (event.data != '' && event.data.data != undefined) {
      var data = event.data
      var act = data.act
      if (act == 'setLocal') {
        console.log('act', act)
        data = data.data
        console.log(data)
      }
    }
  },
  false,
)
