/*
 * @Author: your name
 * @Date: 2021-10-28 11:48:40
 * @LastEditTime: 2021-12-14 08:45:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nunu_cj/src/options/init_start.js
 */
// 第一个css 之后
console.log('>>>>>>>init_start')
const option = [
  {
    name: 'jq',
    url: ['https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js'],
    matches: ['.*://.*.taobao.com/.*'],
    switch: true,
    run_at: 'document_start',
    act: 'inject_cdn_script',
    injectCb:
      '(' +
      function bb() {
        console.log(666)
      }.toString() +
      ')()',
    type: '',
  },
]
var s = document.createElement('script')
// console.log(res)
let modjs = `
  // 恢复 console.log 的代码
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  ;(document.head || document.documentElement).appendChild(iframe)
  const console = iframe.contentWindow.console
  window.console = console
  
  `
s.type = 'text/javascript'
s.setAttribute('id', '_6666')
s.textContent = modjs
;(document.head || document.documentElement).appendChild(s)

chrome.runtime.sendMessage({ act: 'getMixinsCode', type: 'mixins' }, res => {
  var s = document.createElement('script')
  // console.log(res)
  let modjs = res.data
  s.type = 'text/javascript'
  s.setAttribute('id', '_0xb670xf')
  s.textContent = modjs
  ;(document.head || document.documentElement).appendChild(s)

  chrome.runtime.sendMessage({ act: 'getLocalforageData', type: 'injectOption' }, res => {
    window.option = res.data
    console.log(res)
    if (res.data) {
      res.data.map(item => {
        if (item.switch == true && item.run_at == 'document_start') {
          let arr = item.matches
          let val = arr.some(i => {
            let re = new RegExp(i)
            if (re.test(window.location.href)) {
              return true
            }
            return false
          })
          if (val) {
            let { name, matches, run_at, act, injectCb, type } = item

            item.url.map(i => {
              window.postMessage({ name, matches, run_at, act, injectCb, url: i, type }, '*')
            })
          }
        }
      })
    } else {
      chrome.runtime.sendMessage({ act: 'setLocalforageData', type: 'injectOption', data: option }, res => {
        console.log(res)
        res.data.map(item => {
          if (item.switch == true && item.run_at == 'document_start') {
            let arr = item.matches
            let val = arr.some(i => {
              let re = new RegExp(i)
              if (re.test(window.location.href)) {
                return true
              }
              return false
            })
            if (val) {
              let { name, matches, run_at, act, injectCb } = item

              item.url.map(i => {
                window.postMessage({ name, matches, run_at, act, injectCb, url: i }, '*')
              })
            }
          }
        })
      })
    }
  })
})
