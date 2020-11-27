# JS笔记(1) 数组Array方法

### 一、数组

- 一组数据的集合，数组里可以存储任何类型的数据
- var ary = [2,'hello',true,{name:'珠峰'},['web前端']
- 索引：方便我们找到数组中的某一项，索引就是从0开始排列 数字属性名
- length：数组的长度，数组中元素个数,能读能写
- length - 1 ：获取数组中最后一项
- 数组写法：
  - 1. let arr = new Array;
  - 1. let arr = [];
- 数组中获取每个值可以通过下标操作 [1,2.3][2] //=>3
- 清空数组：arr.length = 0; //=> 不要写arr = [];

#### 小结：

```js
// 向数组末尾添加arr.push(x)
arr.splice(arr.length, 0, x)
arr[arr.length] = x

// 向数组开头添加arr.unshift(x)
arr.splice(0, 0, x)

// 删除数组开头第一项arr.shift()
arr.splice(0, 1)

// 删除数组最后一项arr.pop()
arr.length--arr.length-=1arr.splice(-1)
arr.splice(arr.length - 1, 1)

// 清空数组arr.splice(0)
arr.length = 0

// 数组克隆arr.slice()/arr.slice(0)
arr.concat()

// 能够改变原数组的方法
push
shift
unshift
pop
sort
splice
reverse
复制代码
```

### 二、数组的方法

- 数组中提供了很多内置的属性方法（函数）供我们使用

- 这些数组方法都保存在对象上 Array.prototype

  ![5b9313b0fbf4f89da4ee3395beedd53f.png]()

#### 1）push：向数组的末尾添加一项或者多项

```
-  返回值：添加后的数组长度
-  原数组 发生了改变（修改原数组）
复制代码
```

#### 2）unshift：向数组开头添加一项或者多项

```
- 返回值：添加后的数组长度
ary.unshift(20,30);
复制代码
```

#### 3）pop：删除数组中最后一项

```
- 返回值：删除的那一项
ary.pop()
复制代码
```

#### 4）shift：删除数组中的第一项

```
 - 返回值：删除的那一项
 - ary.shift()
复制代码
```

#### 5) splice：删除、添加 直接修改原数组

- 返回值：删除的内容组成的新数组
- 如果第二位为0（即未删除），则返回空数组

```js
// 情况一：只有一个参数
// splice(x) 一个参数，从索引x处开始，一直删除到末尾
// 返回值：删除后的内容 组成的新数组
var arr = [10,20,30,50,60]
var res4 = arr.splice(2); //一个参数，从索引1处开始，一直删除到末尾

复制代码
// 情况二：两个参数
// splice(x,y) 两个参数，从索引x处开始，一直删除y个
// 返回值：删除的内容 组成的新数组

var arr1 = [10,20,30,50,60,90];
var res5 = arr1.splice(1,3);

var arr2 = [10,20,30,50,60,90];
var res6 = arr2.splice(1,0); // 从索引1开始，删除0个（即一个都不删除）

复制代码
//  情况三：多个参数
// splice(x,y,a,b,c)  从索引x开始，删除y个，将第三项及后面几项添加到删除的位置
// 返回值：删除后的内容组成的新数组


var n = [10,20,30,50,60,90];
var res7 = n.splice(1,2,100,200,500); // 从索引1开始，删除两个（即20,30），将第三项及后面几项插入到删除的位置


var n = [10,20,30,50,60,90];
var res7 = n.splice(1,0,100,200,500); // 从索引1开始，一项都不删除，将第三项及后面几项插入到删除的位置


var a = [10,20,30,50,60,90];
var res8 = a.splice(a.length,0,2,3,4); // 向数组末尾添加


var b = [10,20,30,50,60,90];
var res9 = b.splice(0,0,2,3,4); // 向数组开头添加

复制代码
```

#### 6）indexOf & lastIndexOf 查找数组索引

- 1）

  ```
  indexOf
  ```

   

  查找某项 在数组中首次出现的索引位置

  - 返回值：查找到的索引值
  - 如果返回-1，数组中不存在这一项

```
var n = [10,20,30,50,60,20,30,90];
var nn = n.indexOf(30); //=>2
复制代码
```

- 2）

  ```
  lastIndexOf
  ```

  ：查找某项，在数组中最后一次出现的索引位置

  - 返回值：查找到的索引值
  - 如果返回-1，数组中不存在这一项

```js
var a = [10,20,30,50,60,20,30,90];
var aa = a.lastIndexOf(30); //=>6
复制代码
```

#### 7）slice：截取

- 截取数组中的内容组成新数组，不会修改原数组
- 1）**slice() slice(0) slice(null) slice(undefined)** 完全克隆 ，返回值是克隆的新数组，不会影响原数组

```js
var a = [10,20,30];
var aa = a.slice(null); //返回克隆的新数组
复制代码
```

- 2）**slice(x)** 从索引x处截取到数组末尾，将截取到的内容组成新的数组返回

```js
var b = [10,20,30,40,50];
var bb = b.slice(2); //30,40,50
复制代码
```

- 3）**slice(x,y)** :从索引x处开始截取到y处，但不包括y这一项，将截取到的内容组成新的数组返回

```js
var c = [10,20,30,40,50];
var cc = c.slice(2,4); //30,40
复制代码
```

- 4）**slice(-x,-y)** ：索引支持负数，slice(length-x,length-y)

```js
var d = [10,20,30,40,50];
var dd = d.slice(-2); //40,50

var e = [10,20,30,40,50];
var ee = e.slice(-3,-1); //20,30

复制代码
```

#### 8）sort：数组的排序

- sort 排序 原数组发生改变，从小到大排序（10以内）
- sort默认排序是按照unicode编码来排序的
- 也可以使用自定义排序，sort中需要传入一个函数，形参（a,b）
- arr.sort(function(a,b){ return 一定是返回一个数字 })
- 原理：a: 数组中的当前项 b：数组中的下一项
  - return a - b 数组当前项减去下一项，如果返回值>0，则a，b交换位置，否则<=0，什么都不做，实现升序
  - return b - a 数组下一项减去当前项，如果返回值>0，则a，b交换位置，否则<=0，什么都不做，实现降序
  - return 1 如果返回值为一个数字（大于0），则数组当前项和后一项交换位置，即实现数组倒序（倒着排列）

```js
var ary = [{ age: 1 }, { age: 12 }, { age: 13 }, { age: 11 }, { age: 21 }, { age: 18 }];

ary.sort(function(a,b){
    return a.age - b.age
})

console.log(ary); //0: {age: 1} {age: 11} {age: 12} {age: 1}3 {age: 18} {age: 21}
复制代码
var a = [4,6,2,8,3,1]
var aa = a.sort(); //=>1,2,3,4,6,8
a === aa ; //=>true 返回值和原数组一样

var b = [4,60,2,86,15,1,101]
var bb = b.sort(); //=>1, 101, 15, 2, 4, 60, 86


let arr = [10, 3, 18, 38, 48, 26];
// 从小到大排序
let ary = arr.sort(function (n,m) {
console.log(n-m) //前一项数字减后一项数字的结果
return n-m;  // -7 15 8 28 20 30 10 8 -22 -12
});
console.log(ary); //排序后的新数组



// 从大到小排序
arr.sort(function(n, m){
    return m - n
})
console.log(arr)

复制代码
// sort默认可以按照拼音字母顺序 排序
var arr = [3, 1, 5, 'c', 'd', 'a', 'b']
arr.sort()
console.log(arr)
['abc', 'ace', 'aae']
['aae', 'abc', 'ace']

// 从小到大排序
arr.sort(function(a, b) {
return a - b
})

// 从大到小
arr.sort(function(a, b) {
return b - a
})

复制代码
```

#### 9） resverse ： 倒序

- 将原数组倒着排列 原数组改变 返回的是原数组

```js
var a = [3, 1, 24, 5, 11, 22, 12, 101];
var ss = a.reverse(); //=>101, 12, 22, 11, 5, 24, 1, 3
a === ss //=>true
复制代码
```

#### 10）concat：数组的拼接

- concat()
  - 返回值：拼接好的新数组，不会影响原数组

```js
var a = [1,2,3];
var b = [4,5,6];
var ss = a.concat(b); //=>1,2,3,4,5,6
复制代码
var a = [1,2,3];
var b = [4,5,6];
var ss = b.concat(a); //=>4,5,6,1,2,3
复制代码
  concat默认只能展开一层
  var res = [30].concat([10, 15], 20, 'hello')
  console.log(res) // [30, 10, 15, 20, "hello"]
 
// concat默认只能展开一层数组
var a3 = [1]
var res = a3.concat([[2, 3, 4]], [5, 6])
console.log(res) // [1, [2, 3, 4], 5, 6]
复制代码
var a4 = [1,2,3];
var ss1 = a4.concat(); //没有参数，相当于克隆一个新数组返回
a4 === ss1 //=>false
复制代码
```

#### 11）join & toString：数组类型转换：将数组转换成字符串

- toString()
  - 返回值：转换后的字符串，不会影响原数组

```js
var a = [1,2,3];
var aa = a.toString();
复制代码
```

- **join()** ：可以通过指定的连接符或分隔符将数组中的每一项连接成为一个字符串

```js
var b = [1,2,3];
var bb = b.join();
var bb1 = b.join('');
var bb2 = b.join('+'); // 可以变成其他符号
复制代码
```

#### 12）evel：数组求和

- eval():将字符串当做js 表达式来运行
- 相当于小型js解释器

```js
var a = [1, 2, 3, 4, 5]
// 对数组进行求和
var str = a.join('+') // "1+2+3+4+5"
console.log(eval(str)) // eval("1+2+3+4+5") => 15
// eval("1*2*3*4*5")
console.log(eval(a.join('*'))) // 120
复制代码
```

#### 13）forEach & map：数组遍历

- 1）把数组中的每一项取出来

```js
// for循环
var a = [1, 2, 3, 4, 5]
for (var i = 0;i<a.length;i++){
console.log(i,a[i]);
};
复制代码
```

- 2）**forEach**：数组内置遍历方法 forEach: 专门用来循环数组的。 两个参数:

1. 第一个参数: 函数-> function(){} function(数组中的每个值,索引值,整个数组){ }
2. 第二个参数: 改变this指向,写啥是啥（如果写个null,undefined还是为window）

```js
let arr = [true, 'haha', 10, {}, [1, 2, 3]];
arr.forEach(function (item, i, all) {
console.log(item);//数组中的每项
// console.log(i); //索引
// console.log(all); // 整个数组
// console.log(this); //第二个参数如果没有，则this是window
},arr);

复制代码
```

- 3）**map**：循环数组，它的返回值为新的数组

function(item,i,all){ return 新数组的每项,长度和原始数组一样 }

```js
var a = [1, 2, 3, 4, 5];
var a2 = a.map(function(item,index,ary){
// item 当前这一项
// index 当前项的索引
// ary原数组 ary === a
return item * 2; //每次指定的返回值被作为新数组中的内容
});


<ul id="ul"></ul>

const ul = document.getElementById('ul');
let html = '';
let arr = [1, '你好', '哈哈', '呵呵'];
let newArr = arr.map(function (item, i) {
return '<li>' + item + '</li>';
});
ul.innerHTML = newArr.join('');
console.log(newArr.join(''));
console.log(newArr);

复制代码
```

#### 14）filter：数组过滤

- 数组的过滤，过滤条件成立的这个值
- 参数： function(item,i,all){ return 成立的布尔值 }
- filter方法返回值 为过滤后的新数组

```js
//过滤大于10小于30的数字
let arr = [3, 10, 18, 38, 48, 26];
let ary = arr.filter(function (item, i) {
    return item >= 10 && item < 30
})
console.log(ary);

复制代码
```

#### 15）some：检测数组中的元素是否满足指定条件

- 查看数组中某项数据是否满足某个条件，只要有一个满足条件，就返回true；如果所有项条件都不成立，则返回false，返回的是一个布尔值
- some() 不会对空数组进行检测。
- some() 不会改变原始数组。

```js
let arr = [1, 2, 3, 4, 5];
//查看数组中是否有6，明显没有，就返回false
let res = arr.some(function (item) {
    return item === 6
});
console.log(res); // flase(数组中没有6)

let res1 = arr.indexOf(6);
console.log(res1); //-1(数组中没有6)

复制代码
```

#### 16）every：检测数组中是否每一项都满足指定条件

- 判断数组中是不是每一项都符合某个条件，全部都符合返回true，只要有一项不符合就返回false
- 参数：function ( item , i , all ) { return }

```js
let arr = ['62',[],NaN,{},(function(){})(),/^$/,2333];
let arr1 = [1,2,3,4,5,6];
let res = arr.every(function(item,i){
    return item;
});
let res1 = arr1.every(function(item,i){
    return item;
});
console.log(res); //false (不是所有项都为true)
console.log(res1); //true (所有项都为true)
```

