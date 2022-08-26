/*
 * @Author: your name
 * @Date: 2021-08-03 11:21:03
 * @LastEditTime: 2021-08-03 14:05:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/努努工具/js/init.js
 */
import test from '../vue/test.vue'
var s = document.createElement('script')
window.flag = true
var modjs =
  '(' + function () {
    window.addEventListener('message', function (event) {
      console.log(event);
    })
  }.toString() + ')();'
s.type = 'text/javascript'
s.setAttribute('id', '_0xb670xf')
s.textContent = modjs;
(document.head || document.documentElement).appendChild(s)
// $('#_0xb670xf').remove()

$('body').append("<div id='nunu'></div>")
new Vue({
  el: '#nunu',
  //  template: "<div id='llll'> hi </div>"
     render: h => h(test),
})