# [JS判断数组的N种方法](https://segmentfault.com/a/1190000022263724)

[javascript](https://segmentfault.com/t/javascript)

发布于 4月4日

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000022263724&referer=https%3A%2F%2Fsegmentfault.com%2Fblog%2Fmynotes&cb=6240114d49)

## 一、Array.isArray判断

**用法：Array.isArray(arr)**
**ES5中新增了Array.isArray方法,IE8及以下不支持**

**Array.isArray()** 用于确定传递的值是否是一个[Array], 返回布尔值 true；否则它返回 false。

```
let arr = [];
console.log(Array.isArray(arr)); // true
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array('a', 'b', 'c', 'd'))
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 
```

## 二、constructor判断

**用法：arr.constructor === Array**
**Object的每个实例都有构造函数 constructor，用于保存着用于创建当前对象的函数**

```
let arr = [];
console.log(arr.constructor === Array); // true
```

## 三、instanceof 判断

**用法：arr instanceof Array**
**instanceof 主要是用来判断某个实例是否属于某个对象**

```
let arr = [];
console.log(arr instanceof Array); // true
```

注：instanceof操作符的问题在于，它假定只有一个全局环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。（红宝书88页上的原话）

## 四、原型链上的isPrototypeOf判断

**用法：Array.prototype.isPrototypeOf(arr**)
**Array.prototype  属性表示 Array 构造函数的原型**
isPrototypeOf()可以用于测试一个对象是否存在于另一个对象的原型链上。

```
let arr = [];
console.log(Array.prototype.isPrototypeOf(arr)); // true
```

## 五、Object.prototype.toString

**用法：Object.prototype.toString.call(arr) === '[object Array]'**

Array继承自Object，JavaScript在Array.prototype上重写了toString，toString.call(arr)实际上是通过原型链调用了。

```
let arr = [];
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true
```

## 六、Array 原型链上的 isPrototypeOf

**用法：Array.prototype.isPrototypeOf(arr**)
**Array.prototype  属性表示 Array 构造函数的原型**

```
let arr = [];
console.log(Array.prototype.isPrototypeOf(arr)); // true
```

## 顺便复习一下typeof的用法：

对于引用类型，不能用typeof来判断，因为返回的都是object

```
// 基本类型
typeof 123;  //number
typeof "abc"; //string
typeof true; //boolean
typeof undefined; //undefined
typeof null; //object
var s = Symbol;
typeof s; //symbol

// 引用类型
typeof [1,2,3]; //object
typeof {}; //object
typeof function(){}; //function
typeof  Array; //function  Array类型的构造函数
typeof Object; //function  Object类型的构造函数
typeof Symbol; //function  Symbol类型的构造函数
typeof Number; //function  Number类型的构造函数
typeof String; //function  String类型的构造函数
typeof Boolean; //function  Boolean类型的构造函数
```