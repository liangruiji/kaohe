/*
 * @Author: your name
 * @Date: 2021-10-28 11:59:07
 * @LastEditTime: 2022-01-07 17:43:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nunu_cj/src/options/init_end.js
 */
// eslint-disable-next-line no-undef
console.log('>>>>>>>init_end', option)
setTimeout(() => {
  console.log('>>>>>>>init_end66')
}, 0)
chrome.runtime.sendMessage({ act: 'getLocalforageData', type: 'injectOption' }, res => {
  window.option = res.data
  console.log(res)
  if (res.data) {
    res.data.map(item => {
      if (item.switch == true && item.run_at == 'document_end') {
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

          window.postMessage({ name, matches, run_at, act, injectCb, url: '', type }, '*')
        }
      }
    })
  }
})
