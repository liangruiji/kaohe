/*
 * @Author: your name
 * @Date: 2021-04-15 17:16:32
 * @LastEditTime: 2021-04-25 09:20:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/test_CJ/js/bg.js
 */


 var a =  chrome.extension.getViews() 
console.log(a);
// window.setTimeout(() => {
//   chrome.tabs.query({
//     active: true,
//     currentWindow: true
//   }, (tabs) => {
//     let message = {
//       info: '来自popup的情书💌'
//     }
//       console.log(tabs);
//     chrome.tabs.sendMessage(tabs[0].id, message, res => {
//       console.log('popup=>content')
//       console.log(res)
//     })
//   })
// },10000)
