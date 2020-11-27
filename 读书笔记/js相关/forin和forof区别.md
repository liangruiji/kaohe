# [for…in和for…of的用法与区别](https://segmentfault.com/a/1190000022348279)

[javascript](https://segmentfault.com/t/javascript)

发布于 4月12日

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000022348279&referer=https%3A%2F%2Fsegmentfault.com%2Fblog%2Fmynotes&cb=b97a028419)

##### 一句话概括：for in是遍历（object）键名，for of是遍历（array）键值。

文章的内容大部分来自MDN。

## for...in

`for...in` 循环只遍历可枚举属性（包括它的原型链上的可枚举属性）。像 `Array`和`Object`使用内置构造函数所创建的对象都会继承自`Object.prototype`和`String.prototype`的不可枚举属性，例如 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String) 的 [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) 方法或 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)的[`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)方法。循环将遍历对象本身的所有可枚举属性，以及对象从其构造函数原型中继承的属性（更接近原型链中对象的属性覆盖原型属性）。

```
var obj = {a:1, b:2, c:3};
    
for (let key in obj) {
  console.log(key);
}

// a
// b
// c
```

## for...of

**`for...of`语句**在[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/iterable)（包括[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)，[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Map)，[`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)，[`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)，[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments) 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

```
const array1 = ['a', 'b', 'c'];

for (const val of array1) {
  console.log(val);
}

// a
// b
// c
```

**for of不可以遍历普通对象**，想要遍历对象的属性，可以用for in循环, 或内建的Object.keys()方法

## for...of与for...in的区别

无论是`for...in`还是`for...of`语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。

[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)语句以任意顺序迭代对象的[可枚举属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。

`for...of` 语句遍历[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables)定义要迭代的数据。

以下示例显示了与[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)一起使用时，`for...of`循环和`for...in`循环之间的区别。

```
Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```

总结：**for in 一般用来遍历对象的key**、**for of 一般用来遍历数组的value**

# [JavaScript数组遍历：for、foreach、for in、for of、$.each、$().each的区别](https://segmentfault.com/a/1190000017394445)

[javascript](https://segmentfault.com/t/javascript)[遍历](https://segmentfault.com/t/遍历)[数组方法](https://segmentfault.com/t/数组方法)

发布于 2018-12-16

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000017394445&referer=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000017394445&cb=c209826785)

## 一、for

Javascript中的for循环，它用来遍历数组

```
var arr = [1,2,3,4]
for(var i = 0 ; i< arr.length ; i++){
    console.log(arr[i])
}
//1,2,3,4
```

九九乘法表：

```
for ( var x = 1; x <= 9; x++) {
    var str="";
    for ( var y = 1; y <= x; y++) {
    str+=x + "*" + y + " = " + (x * y)+"  ";         
    }
    console.log(str);
}
```

## 二、foreach

forEach循环我们可以直接取到元素，同时也可以取到index值。但是forEach也有一些局限，不能continue跳过或者break终止循环

```
let arr = ['a', 'b', 'c', 'd']
arr.forEach(function (val, index, arr) {
    console.log('index:'+index+','+'val:'+val) // val是当前元素，index当前元素索引，arr数组
    console.log(arr)
})
//index:0,val:a
//["a", "b", "c", "d"]0: "a"1: "b"2: "c"3: "d"
//index:1,val:b
//["a", "b", "c", "d"]
//index:2,val:c
//["a", "b", "c", "d"]
//index:3,val:d
//["a", "b", "c", "d"]
```

------

```
[].forEach(function(value,index,array){     
　　　　//do something     
　　});          
 等价于：
 $.each([],function(index,value,array){     
　　　//do something     
　})
```

## 三、for in

for(var item in arr|obj){} 可以用于遍历数组和对象
遍历数组时，item表示索引值， arr表示当前索引值对应的元素 arr[item]
遍历对象时，item表示key值，arr表示key值对应的value值 obj[item]
for in一般循环遍历的都是对象的属性，遍历对象本身的所有可枚举属性，以及对象从其构造函数原型中继承的属性

```
var obj = {a:1, b:2, c:3};    
for (let item in obj) {
  console.log("obj." + item + " = " + obj[item]);
}
// obj.a = 1
// obj.b = 2
// obj.c = 3
var arr = ['a','b','c'];
for (var item in arr) {
    console.log(item) //0 1 2
    console.log(arr[item]) //a b c
}
```

## 四、for of

ES6中新增加的语法 for of 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 for of 循环，以替代 for in 和 forEach() ，并支持新的迭代协议。for of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。
**循环一个数组：**

```
let arr = ['A', 'B', 'C']
for (let val of arr) {
    console.log(val) 
}
// A B C
```

**循环一个字符串：**

```
let iterable = "abc";

for (let value of iterable) {
  console.log(value);
}
// "a"
// "b"
// "c"
```

**循环一个Map:**

```
let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);    
for (let [key, value] of iterable) {
  console.log(value);
}
// 1
// 2
// 3

for (let entry of iterable) {
  console.log(entry);
}
// [a, 1]
// [b, 2]
// [c, 3]
```

**循环一个 Set:**

```
let iterable = new Set([1, 1, 2, 2, 3, 3]);    
for (let value of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

**循环一个拥有enumerable属性的对象**
for of循环并不能直接使用在普通的对象上，但如果我们按对象所拥有的属性进行循环，可使用内置的Object.keys()方法：

```
for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}
```

**循环一个生成器(generators):**

```
function* fibonacci() { // a generator function
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  console.log(n);
  // truncate the sequence at 1000
  if (n >= 1000) {
    break;
  }
}
```

## 五、jQuery里面的$.each

$.each(arr|obj, function(k, v))
可以用来遍历数组和对象，其中k表示索引值或者key值，v表示value值

```
var arr = ['a','b','c']
$.each(arr, function(key, val) {
    console.log(key, val);
})
//0 a
//1 b
//2 c
```

## 六、jQuery里面的$().each()

\().each()在dom处理上面用的较多,主要是用来遍历DOMList。如果页面有多个input标签类型为checkbox，对于这时用\().each()来处理多个checkbox，例如：

```
$(“input[name=’checkbox’]”).each(function(i){
if($(this).attr(‘checked’)==true){
//操作代码
}
```

## 结论：

推荐在循环**对象属性**的时候使用**for in**,在遍历**数组**的时候的时候使用f**or of**；
for in循环出的是key，for of循环出的是value；
for of是ES6新引入的特性。修复了ES5的for in的不足；
for of不能循环普通的对象，需要通过和Object.keys()搭配使用。

跳出循环的方式有如下几种：
return 函数执行被终止；
break 循环被终止；
continue 循环被跳过。