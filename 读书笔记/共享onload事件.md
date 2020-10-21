### 共享onload事件

网页加载完毕后立刻执行执行，不能在未加载完前执行，否则dom不完整，获得元素的方法可能出问题。

```javascript
// 1.需要绑定的函数不多时
window.onload = function () {
    firstFunction();
    secondFunction();
}

// 2.需要绑定的函数较多时，由 Simon Willison 编写的 addLoadEvent 函数
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func
    }else{
        window.onload = function (){
            oldonload();
            func();
        }
    }
}
```

