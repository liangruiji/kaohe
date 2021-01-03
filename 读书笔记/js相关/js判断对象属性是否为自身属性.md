## 判断对象中是否包含某个属性名

[TOC]



### 1.indexOf

 可以判断数组是否包含某个值，返回该值对应的下标；对于不存在的值，返回-1；

ES6还提供了其他几种判断对象是否包含属性名的方法：

### 2.in

属性名 in 对象（判断属性名是否存在对象中存在，返回一个布尔值）；

```
var obj = {
        name:'张三',
        age:22,
      sex:'male'
  };
console.log('name' in obj); /true
console.log('personal' in obj); //false
```

### 3.hasOwnProperty

对象.hasOwnProperty(属性名) （判断对象中是否含有某个属性名，返回一个布尔值）；

```
var obj= {
   name:'张三',
    age:22,
    sex:'male'
    };
console.log(obj.hasOwnProperty('age')); //true
console.log(obj.hasOwnProperty('personal')); //false
```

### 一、js判断一个对象是否为空

  **方法一：**使用for...in

for...in... 遍历属性，为真则为“非空数组”；否则为“空数组”

```
let obj1 = {}
let obj2 = {a:1}
function empty(obj){
  for (let key in obj){
    return false;    //非空
}
  return true;       //为空
}
console.log(empty(obj1)) //true为空
console.log(empty(obj2)) //false非空复制代码
```

  **方法二：**通过 JSON 自带的 stringify() 方法来判断:

`JSON` 自带的 `stringify()` 方法，用于将 `JavaScript` 值转换为 `JSON` 字符串

```
let obj1 = {}
if(JSON.stringify(obj1) == "{}"){
   console.log("空对象")
}else {
   console.log("非空对象")
}复制代码
```

  **方法三：**Object.keys(obj) 返回一个给定对象自身可枚举属性组成的数组。

`ES6` 新增的方法 `Object.keys()：``Object.keys()` 方法会返回一个由一个给定对象的自身可枚举属性组成的数组。

如果我们的对象为空，他会返回一个空数组，如下：

```
var a = {}
Object.keys(a) // []
```

可以依靠Object.keys()这个方法通过判断它的长度来知道它是否为空

```js
let obj1 = {}
if (Object.keys(obj1).length == 0){   
   console.log("空对象")
}else {
   console.log("非空对象")
}

// 我们可以封装一个函数，类似这样：
function checkNullObj (obj) {
if (Object.keys(obj).length === 0) {
return false; // 如果为空,返回false
}
return true; // 如果不为空，则会执行到这一步，返回true
}
// 但这样写，还是太累赘了。可以写成这样：

function checkNullObj (obj) { return Object.keys(obj).length === 0 }
```

**方法四 ：**Object.getOwnPropertyNames()方法

此方法是使用Object对象的getOwnPropertyNames方法，获取到对象中的属性名，存到 一个数组中，返回数组对象，我们可以通过判断数组的length来判断此对象是否为空

**注意：此方法不兼容ie8，其余浏览器没有测试**

~~~js
var data = {};

var arr = Object.getOwnPropertyNames(data);

console.log( arr.length == 0 ); //true
~~~

##### **方法五** ：jquery的isEmptyObject方法

此方法是jquery将2方法(for in)进行封装，使用时需要依赖jquery

```js
var data = {};
var b = $.isEmptyObject(data);
alert(b);//true
```

### 二、js判断对象中是否有某个属性

#### 方法一： **.** 或 [ ]   有适用条件

当此属性的值为false、undefined、NaN、null、0、"" 时，此方法不适用。

```
if (obj2.a){
   console.log("对象有此属性")
}else {
   console.log("对象无此属性")
}复制代码
```

#### 方法二： in运算符   判断自身属性与继承属性

如果某属性在指定对象或其原型链上则返回true，只需判断自身属性时，此方法不适用。

```
let obj2 = {a:1}
if ("a" in obj2){
   console.log("对象或其原型链上有此属性")
}else {
   console.log("对象或其原型链上无此属性")
}复制代码
```



#### 方法三：obj.hasOwnProperty()  判断自身属性是否存在

​	对象自身属性中含有某属性，返回true。

```
let obj2 = {a:1}if (obj2.hasOwnProperty("a")){
   console.log("对象上有此属性")
}else {
   console.log("对象上无此属性")
}
```


