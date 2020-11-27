## 三种事件处理程序

#### DOM0级事件处理程序

缺点：不支持多个相同事件处理程序，后面的会覆盖前面的。

~~~js
btn.onclick = function(){}
//删处DOM0级事件处理
btn.onclick = null;
~~~

#### DOM2级事件处理程序

优点：可以添加多个相同事件处理程序，顺序执行

~~~js
//添加DOM2级事件
btn.addEventListener('click',function(){},!flase);//第三个参数布尔值控制事件在哪个阶段发生，默认在冒泡阶段
//移除DOM2级事件
btn.removeEventListener('click',function(){},!flase);
~~~

#### IE事件处理程序

优点：可以添加多个相同事件处理程序，倒序执行，作用域在全局；

~~~js
btn.attachEvent('onclick',function(){});

btn.detachEvent('onclick',function(){})
~~~



