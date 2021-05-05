/*
 * @Author: your name
 * @Date: 2021-04-15 17:23:14
 * @LastEditTime: 2021-04-29 17:40:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/test_CJ/js/con.js
 */

// document.addEventListener("DOMContentLoaded", function(event) {
//     console.log("DOM ready!");
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log(request.info)
//     sendResponse('我收到了你的情书，popup~')
// })
var a = () => {
  console.log("test");
}
// window.localStorage.setItem("test", 'ffffff')
chrome.storage.local.set({test: 5995}, function() {
    console.log('Value is set to ');
});
// chrome.storage.local.get(['test'], (a) => {
//   console.log(a);
// })
window.postMessage({lll:"postmessage"},'*')

console.log("ddd");