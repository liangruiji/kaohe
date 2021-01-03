# JS笔记(11): call & apply & bind

- call & apply & bind
- 用来改变某一个函数中的this关键字指向

### 一、call

- 语法：[fn].call([this],[param]...)
- fn.call =>当前实例（函数fn）通过原型链的查找机制，找到Function.prototype上的call方法 =>`function call(){ [native code] }`
- fn.call() 把找到的call方法执行
- 当call方法执行的时候，内部处理了一些事情
  - 1.首先把要操作的函数中的this变为cal方法第一个传递的实参值
  - 2.把call方法第二个及第二个以后的实参获取到
  - 3.把要操作的函数执行，并且把第二个以后传递进来的实参传给函数

#### 内置call的原理

```
Function.prototype.call = function () {
    let param1 = arguments[0];
    let paramOther = [ ]; //把arg中除了第一个以外的实参获取到
    // this:fn 当前要操作的函数（函数类的一个实例）
    // 把fn中的this关键字修改为param1 => 把this（call中）中的this关键字修改为param1

    // 把fn执行，把paramOther分别传递给fn
    // this(paramOther)
};
fn.call(obj);
复制代码
let sum = function (a,b) {
    console.log(this);
};
let opt = { n: 20 };

// sum.call(opt, 20, 30); //=>call执行 call中的this是sum 把sum中的this关键字改为opt => sum中的this： opt a=20 b=30
sum.call.call(opt);

// 1.sum.call => 找到Function.prototype上的call方法（也是一个函数，也是函数类的一个实例，也可以继续调用call/apply等方法） ==>A（函数）
// 2.A.call(opt) => 继续找原型上的call方法，把call方法执行：把A中的this关键字修改为opt，把A执行
复制代码
```

#### 关于call执行题：

- 如果不懂可以记住以下规律
  - call => 就是让call中的this执行
  - 一个call，是让call前面的元素执行
  - 两个及两个以上的call，是让call后面的元素执行

```js
// 原理分析：
Function.prototype.call = function callAA(){
    //1.把this中的“this”关键字修改为第一个参数值obj
    //2.把this(fn)执行，把第二个及以后接受的参数值传递给函数（10,20）
    //this(10,20)
};
fn.call(obj,10,20);

复制代码
//执行题
 function fn1(){
    console.log(1); 
};
function fn2(){
    console.log(2);
};

fn1.call(fn2); //找到callAA 把它执行，callAA中的this是fn1，第一个参数传递的是fn2 => 在callAA中执行的是fn1 => 1

fn1.call.call(fn2); // 找到callAA让它执行，callAA中的this是fn1.call,第二个参数是fn2 （把fn1.call中的this变为fn2，再让fn1.call执行 => 先找到callAA，把它执行，只不过此时它中的this是fn2 => 让fn2中的this变为undefined，因为执行fn1.call的时候没有传递参数值，然后让fn2执行） => 2

Function.prototype.call(fn1); // 找到callAA让它执行,它中的this是Function.prototype => 让Function.prototype中的this变为fn1，然后让Function.prototype执行 => F.P是个匿名函数也是一个空函数，所以执行没有任何输出

Function.prototype.call.call(fn1); //它中的this是F.P.call => 把F.P.call中的this修改为fn1，让F.P.call执行 => F.P.call(callAA)第二次把它执行（此时它里面的this已经是fn1 => 这一次在callAA中是让fn1执行 => 1
复制代码
```

### call中的细节：

- 1.非严格模式下，如果不传参数，或者第一个参数传的是null或者undefined，this都指向window
- 2.在严格模式下，第一个参数是谁，this就指向谁（包括null和undefined），不传this就是undefined

```
 //非严格模式
let fn = function (a, b) {
    console.log(this, a, b);
};
let obj = {
    name: 'obj'
};
fn.call(obj, 10, 20);  // this:{...} a:10 b:20
fn.call(10, 20); // this:{10} a:20 b:undefined
fn.call(); // this:window a,b都是undefined
fn.call(null); // this:window  a,b都是undefined
fn.call(undefined); // this:window  a,b都是undefined
复制代码
"use strict" //严格模式
let fn = function (a, b) {
    console.log(this, a, b);
};
let obj = {
    name: 'obj'
};
fn.call(obj, 10, 20);  // this:{...} a:10 b:20
fn.call(10, 20); // this:{10} a:20 b:undefined
fn.call(); // this:undefined  a,b都是undefined
fn.call(null); // this:null  a,b都是undefined
fn.call(undefined); // this:undefined  a,b都是undefined
复制代码
```

### 二、apply

- apply：和call基本一模一样，只有一个区别：传参方式
  - fn.call(obj,10,20)
  - fn.apply(obj,[10,20])
- apply 把需要传递给fn的参数放到一个数组或者类数组中传递进去，虽然写的是一个数组，但是也相当于给fn一个个传递的

#### 基于apply获取数组中的最值

- 需求：获取数组中的最大值&最小值

##### 1.先排序（从小到大）=>sort

```
const arr = [9, 6, 5, 60, 1, 20, 4, 16];
arr.sort(function (a, b) { //原地排序 不会返回新数组
    return a - b;
});
console.log(arr);
console.log(arr[0]); // 最小值1
console.log(arr[arr.length - 1]); // 最大值60
复制代码
```

##### 2.假设循环比较

```
const ary = [9, 6, 5, 60, 1, 20, 4, 16];
let min = ary[0]; // 假设第一个是最小的
let max = ary[0]; // 假设第一个是最大的
for (let i = 1; i < ary.length; i++) {
    let item = ary[i];
    item < min ? min = ary[i] : null;
    item > max ? max = ary[i] : null;
};
console.log(min);
console.log(max);
复制代码
```

##### 3.Math

获取一堆数中的最大值&最小值, 我们需要将要比较的数字，要以一个一个实参的形式 传递到Math.max的方法里 才能正常使用

- 1. ES6扩展运算符 ...对象

- 1. apply 利用apply传参形式（数组或者类数组形式） apply让Math.min执行，并且以数组的形式给传参

- 1. 数组转换成字符串，再进行字符串拼接

  - evel 相当于小型JS解释器：把字符串当做JS代码执行
  - 数组和字符串拼接的时候 会默认调用自身的toString方法将自己转换成字符串 再拼接

```
//ES6扩展运算符 ...对象
var ary1 = [9, 6, 5, 60, 1];
console.log(Math.min(ary1)); // NaN
console.log(Math.min(...ary1)); // 1
console.log(Math.max(...ary1)); // 60
复制代码
//利用apply传参形式
var ary2 = [9, 6, 5, 60, 1];
console.log(Math.min.apply(null, ary2)); // 1
console.log(Math.max.apply(null, ary2)); // 60
console.log(Math.max.apply(null, [2, 6, 9])); // 9
复制代码
//数组转换成字符串，再进行字符串拼接
var ary3 = [9, 6, 5, 60, 1];
// var str = ary3.toString(); //'9, 6, 5, 60, 1' 
var str2 = `Math.min(${ary3})`; //=>Math.min(9, 6, 5, 60, 1)
// var str2 = "Math.min("+ary3+")"; //=>Math.min(9, 6, 5, 60, 1)
console.log(eval(str2));
复制代码
```

### 三、bind

- bind:语法和call一模一样，唯一的区别在于立即执行还是等待执行
  - fn.call(obj,10,20); //=> 改变fn中的this，并且把fn立即执行
  - fn.bind(obj,10,20); //=> 改变fn中的this，但是此时的fn并没有执行（不兼容IE6~8)

```
"use strict"
let fn = function (a, b) {
    console.log(this);
};
let obj = {
    name: 'obj'
};  

// document.onclick = fn; //=> 把fn绑定给点击事件，点击的时候执行fn,此时this:
// document.onclick = fn(); //=> 在绑定的时候，先把fn执行，把执行的返回值（此处的返回值是undefined）绑定给事件，当点击的时候执行的是undefined

//=> 需求：点击的时候执行fn，让fn中的this是obj
// document.onclick = fn; //=> this:obj
// document.onclick = fn.call(obj); //=> 虽然this确实改为obj，但是绑定的时候就把fn执行了（call是立即执行函数），点击的时候执行的是fn的返回值undefined
document.onclick = fn.bind(obj); //=> bind属于把fn中的this预处理为obj，此时fn没有执行，当点击的时候才会把fn执行 此时this:{name: "obj"}
复制代码
```

