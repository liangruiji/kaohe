## rem适配

在写移动端页面时，由于不同手机屏幕尺寸不一样，所以我们如果以px为单位，会造成我们的页面在不同的手机上展现地不一样，为此，我们使用rem来实现页面在不同屏幕上以相同的比例来展现的目的。

具体操作：

**1.设置meta：**

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
~~~



**2.将HTML根元素字体大小设置为屏幕的宽度：**

~~~js
window.onload = function() {

//获取屏幕区域的宽度

let width = document.documentElement.clientWidth;

//获取html

let htmlNode = document.querySelector('html')

//设置字体大小

htmlNode.style.fontSize = width + 'px'

}
~~~



***\**此时，屏幕的宽度已经被设置为1rem，我们可以使用rem去设置元素的尺寸，实现元素的大小始终与屏幕大小成比例，如：**

**...**

~~~html
<style>
* {
margin: 0;
padding: 0;
}
#box{
width: 0.5rem;
height: 0.5rem;
background-color: red;
}
</style>
</head>
<body>
<div id="box"></div>
</body>
~~~

那么，这个正方形无论在哪个设备上，其边长都为屏幕宽度的一半。