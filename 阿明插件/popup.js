/*
 * @Author: your name
 * @Date: 2021-06-11 11:44:28
 * @LastEditTime: 2021-06-11 11:45:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/阿明插件/popup.js
 */
fetch('http://amingtool.zhishuchacha.com/index/Tool/pop8_0_1',{method: 'POST'})
.then(res=>res.text())
.then(text=>{
    document.body.innerHTML=text;
}).catch(err=>console.log(err));
