# dom事件停止冒泡行为

**w3c的方法是e.stopPropagation()、e.stopImmediatePropagation()，IE则是使用e.cancelBubble = true**

```js
//当需要停止冒泡行为时，可以使用
function stopBubble(e) { 
//如果提供了事件对象，则这是一个非IE浏览器 
if ( e && e.stopPropagation ) 
    //因此它支持W3C的stopPropagation()方法 
    e.stopPropagation(); 
else 
    //否则，我们需要使用IE的方式来取消事件冒泡 
    window.event.cancelBubble = true; 
}

//e.stopPropagation() 只阻止冒泡
//e.stopImmediatePropagation() 会阻止冒泡及该容器之后的所有点击事件
```

