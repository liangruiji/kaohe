# dom阻止a标签默认事件的几种简单方法

**w3c的方法是e.preventDefault()，IE则是使用 window.event.returnValue = false;;**

```
第一种： <a href = " javascript: void ( 0 ); ">百度</a> 或者<a href = " javascript:; ">百度</a>
第二种：<a href = " # ">百度</a> (最常见的，但是点击后页面会返回到顶部，不可用)；所以又有了<a href = " ## ">百度</a>或者<a href = " #! ">百度</a>
第三种： e.preventDefault();阻止默认事件(不支持IE)，IE中用window.event.returnValue = false; 阻止默认事件
第四种：在事件里返回false    return false
```

```js
	//在事件中添加 
 function stopDefault(e) {
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false; //兼容IE
      	return false
    }
```

# 