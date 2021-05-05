/*
 * @Author: your name
 * @Date: 2021-04-25 09:11:21
 * @LastEditTime: 2021-04-25 09:39:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/test_CJ/js/test.js
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.info)
    sendResponse('test收到了你的情书，popup~')
})
window.addEventListener(
  "message" ,
  function(e) {
    console.log(e);
  },false
)