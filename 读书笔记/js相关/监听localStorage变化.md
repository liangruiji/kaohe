**“当同源页面的某个页面修改了localStorage，其余的同源页面只要注册了storage事件，就会触发”**

所以，`localStorage` 的例子运行需要如下条件：

- 同一浏览器打开了两个同源页面
- 其中一个网页修改了 `localStorage`
- 另一网页注册了 `storage` 事件

**很容易犯的错误是，在同一个网页修改本地存储，又在同一个网页监听，这样是没有效果的。**

1、在同源的两个页面中，可以监听 `storage` 事件

```jsx
window.addEventListener("storage", function (e) {
        alert(e.newValue);
});
```

1. 在同一个页面中，对 `localStorage` 的 `setItem` 方法进行重写



```jsx
var orignalSetItem = localStorage.setItem;
localStorage.setItem = function(key,newValue){
      var setItemEvent = new Event("setItemEvent");
      setItemEvent.newValue = newValue;
      window.dispatchEvent(setItemEvent);
      orignalSetItem.apply(this,arguments);
}
window.addEventListener("setItemEvent", function (e) {
    alert(e.newValue);
});
localStorage.setItem("name","wang");
```



作者：__越过山丘__
链接：https://www.jianshu.com/p/519a1b42d659
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

