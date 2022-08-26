##### 元素属性中的距离有以下6对：

~~~js
scrollLeft: 设置或获取位于对象左边界和窗口中可见内容的最左端之间的距离
scrollTop: 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离

offsetHeight: 获得对象的可视区域的高度，包括边框
offsetWidth: 获得对象的可视区域的宽度，包括边框

clientHeight: 获得对象边框内部分的高度
clientWidth: 获得对象边框内部分的宽度

offsetLeft: 获取对象相对于版面或由offsetParent属性指定的父坐标的计算左侧位置
offsetTop: 获取对象相对于版面或由offsetTop属性指定的父坐标的计算顶端位置

clientTop: 获取对象顶部边框宽度
clientLeft: 获取对象左侧边框宽度

scrollWidth: 获取对象的滚动宽度
scrollHeight: 获取对象的滚动高度。
~~~

##### 鼠标事件中的各种“距离”

~~~
event.clientX：相对浏览器左上角的水平坐标
event.clientY：相对浏览器左上角的垂直坐标

event.offsetX：相对于事件源(event.target||event.srcElement)左上角水平偏移
event.offsetY：相对于事件源(event.target||event.srcElement)左上角垂直偏移

event.pageX：相对于document左上角的水平坐标
event.pageY：相对于document左上角的垂直坐标

event.layerX：相对于offsetParent左上角的水平偏移
event.layerY：相对于offsetParent左上角的水平偏移

event.movementX：相对于前一次事件中screenX的偏移
event.movementY：相对于前一次事件中screenY的偏移

event.screenX：相对于屏幕左上角的水平坐标
event.screenY：相对于屏幕左上角的垂直坐标

x：和pageX一样，用于兼容IE8及以前浏览器
y：和pageY一样，用于兼容IE8及以前浏览器
~~~

##### getBoundingClientRect()

`getBoundingClientRect`用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。`getBoundingClientRect`是`DOM`元素到浏览器可视范围的距离（不包含文档卷起的部分）。

该函数返回一个`Object`对象，该对象有6个属性：`top,lef,right,bottom,width,height`；

这里的top、left和css中的理解很相似，width、height是元素自身的宽高;

但是right，bottom和css中的理解有点不一样。right是指元素右边界距窗口最左边的距离，bottom是指元素下边界距窗口最上面的距离。

和下面两个相似

event.clientX：相对浏览器左上角的水平坐标
event.clientY：相对浏览器左上角的垂直坐标



##### js设置滚动条的位置

如设置滚动条到网页顶部:

```
document.documentElement.scrollTop = 0;
```

浏览器窗口的滚动条的位置

```
window.pageYOffset
```

##### 浏览器窗口的滚动条的位置

监听浏览器窗口的滚动条的位置，在vue中放在created中执行。

```
window.onscroll = function() {
  console.log(window.pageYOffset)
}
```

基于vue写实时聊天室，让滚动条始终处于最底部的方法

```
this.$nextTick(()=>{
   this.$refs.ulTxtBox.scrollTop = this.$refs.ulTxtBox.scrollHeight
})
```

~~~
//获取可视区宽高 // 三个还是有区别的
var w =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
var h =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

// 屏幕尺寸
window.screen.width; //ie 不明
window.screen.height; //ie 不明
~~~

~~~
function getStyle(ele, cla) {
  return window.getComputedStyle ? window.getComputedStyle(ele, cla || null) : ele.currentStyle
}
~~~

