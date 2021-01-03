具体有十几种之多，网上都可以找到，这里记录一些个人认为比较常用的

**1.for**

性能最好

**2.foreach**

foreach有三个参数：arr.foreach(（数组元素，索引值（可选），数组本身（可选））=> { } ），无返回值。

**3.for in 和 for of**

工作中for in用的比较多，这两个还是有很大区别的

（1）for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。

（2）for in会遍历数组所有的可枚举属性，包括原型；for of遍历的只是数组内的元素，而不包括数组的原型属性method和索引name.

（3）for in可以遍历数组和对象；for of只能遍历数组。

（4）for in 可以用

**4.some和every**

两者都是对数组中的每一项运行给定函数。some：如果该函数对任一项返回true，则返回true； every:如果该函数对每一项返回true,则返回true。

 

 

这里记录一个奇怪的问题：

在Google浏览器中:

var arr = [1,2,3,4,5,6]

arr.some(item => item == 4)  //true

arr.some(item => {item == 4} )   //false

只是多了一对大括号，不知道有没有人试过，纠结中。。。