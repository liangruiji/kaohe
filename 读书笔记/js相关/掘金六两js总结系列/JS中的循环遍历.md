# JS笔记(2) JS中的循环遍历

#### 一、for循环

for(循环起始条件;循环终止条件;每次循环累加的条件){ 循环体代码 };

- `var i = 0;` =>全局变量，可以省略（在全局下已经设置初始值的情况下）
- `let i = 0;` => let形成块级作用域，i即为块级作用域中的私有变量

```
let ary = [10,20,30]
for (var i = 0; i < ary.length; i++) {
    console.log(ary[i]); //10 20 30
    console.log(typeof i); //number
};
复制代码
```

for循环中的两个关键词（进行流程控制）：break continue

- `break:` 强制结束整个循环，后面的代码不再执行，循环结束
- `continue:` 结束本轮循环，contiune后面的代码不再执行，继续执行下一轮循环

```
num = 0;
for (var i = 0; i < 10; i++) {
if (i < 5) {
    num++;
    continue;
};
if (i === 5) {
    num--;
    break;
    };
    num *= 2;
};
console.log(num); //4
复制代码
```

#### 二、for in 循环

- for in 用来循环遍历当前对象可枚举的属性

  - 可枚举：可遍历
  - 1.对象的私有属性(自己写的）可枚举
  - 2.浏览器内置的属性一般都是不可枚举的（比如`__pproto__`）
  - 3.自己在类的原型上设置的属性也是可枚举的，for in也会遍历出来（一般情况下是不想遍历原型上的公有属性的），所以一般会先加入下代码

  ```
  if(obj.hasOwnProperty(key){ //一般使用for in遍历对象时，我们加一个私有属性的验证，只有是私有的属性，才继续操作
      console.log(key)
  }
  复制代码
  ```

- for in遍历循环有自己的顺序，先遍历数字属性名（按照从小到大），再遍历字符串属性名（按照书写顺序）

```
//循环遍历一个对象
let obj = { name: 'Tom', age: 23, id: 6 };
for (let keys in obj) {
    console.log(keys); // name age id
    console.log(obj[keys]); // Tom 23 6;  
    console.log(typeof keys); //string
};
复制代码
//循环遍历一个数组
let ary = [10, 20, 30];
for (let keys in ary) {
    console.log(keys); // name age id
    console.log(ary[keys]); // Tom 23 6;
    console.log(typeof keys); // string
};
复制代码
 let obj = {
    zdy: 'Tom', //私有属性
    id:13, //私有属性
};
Object.prototype.say = function(){ //公有属性，即原型上的属性方法
    console.log(1);
};

for(let attr in obj){
    // 如果attr是obj的私有属性为true，就执行
    if(obj.hasOwnProperty(attr)){
        console.log(obj[attr])
    }
}
复制代码
```

> for循环和for in循环的区别：
>
> 1. for循环通常用来循环数组，循环出索引i都是number数据类型
> 2. for in循环通常用来循环一个对象的可枚举属性 2.1 当for in循环数组时，循环出索引i是string类型，不能直接使用，同时会降低代码执行效率

#### 三、forEach 循环

- for Each 循环：数组内置遍历方法，专门用来循环数组的。
- 两个参数:
  - 第一个参数: 函数-> function(){} function(数组中的每个值,索引值,整个数组){ }
  - 第二个参数: 改变this指向,写啥是啥（如果写个null,undefined还是为window）
- forEach循环没有返回值
- forEach会一直循环完所有元素，没有跳出条件，即没有break和continue

> 如果想要在forEach循环中跳出循环，可以使用try catch语句 try...catch 可以测试代码中的错误。try 部分包含需要运行的代码，而 catch 部分包含错误发生时运行的代码。

```
let arr = [true, 'haha', 10, {}, [1, 2, 3]];
arr.forEach(function (item, i, all) {
    // console.log(item);//数组中的每项
    // console.log(i); //索引
    // console.log(all); // 整个数组
    console.log(this); //第二个参数如果没有，则this是window
}, arr);
复制代码
try {
    var array = ["first", "second", "third", "fourth"];
    array.forEach(function (item, index) {
    if (item == "third") {
        var a = aaaa; // first second 后就报错，就跳出循环了
        throw new Error("ending");//报错，就跳出循环
    } else {
    console.log(item);
};
});
} catch (e) {
    if (e.message == "ending") {
        console.log("结束了");
    } else {
        console.log(e.message);
    };
};
复制代码
```

#### 四、map循环

map循环：数组内置遍历方法，它的返回值为新的数组

- function(item,i,all){ return 新数组的每项 };

```
var ary = [1, 2, 3, 4, 5];
var a2 = ary.map(function (item, index, ary) {
    // item 当前这一项
    // index 当前项的索引
    // ary原数组 ary === a
    return item * 2; //每次指定的返回值被作为新数组中的内容
});
console.log(a2);//[2,4,6,8,10]
复制代码
```

#### 五、for of循环

for of循环：Es6 中新增的语句 for…of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串）

```
// 循环数组
let arr = [true, 'haha', 10, {}, [1, 2, 3]];
for(let item of arr){
    if(typeof item === 'number'){
        console.log(item); //10
        continue;
    };
    if(typeof item === 'object'){
        console.log(item); //{}
        break;
    };
    console.log(item); // true haha
};
复制代码
// 循环字符串
let str = 'hello';
for(let item of str){
    console.log(item); // h e l l o
};
复制代码
// 循环类数组
function fn() {
    for (let item of arguments) {
        console.log(item); //宝石眼 猫肚子 猫尾巴
        };
};
fn('宝石眼', '猫肚子', '猫尾巴');
复制代码
// for of不能直接遍历对象 ，可以使用Object.keys()
// Object.keys()可以将对象里的所以的属性名取出来放到一个数组中
let obj = { name: 'Tom', age: 33, id: 6 };
for (let item of Object.keys(obj)) {
    console.log(item + ':' + obj[item]); // name:Tom age:33 id:6
};
复制代码
```

#### 六、while循环

while(循环条件){ // 只要条件为true 就一直循环下去 }；

```
var n = 0;
while (n < 5) {
    console.log(n);// 只要条件为true 就一直循环下去
    n++;
};
复制代码
// 遍历数组
let ary = ['a', 'b', 'c', 'd'];
let i = 0;
while (ary[i]) {
    console.log(ary[i]);
    i++;
};
复制代码
```

#### 七、do while循环

do/while 循环是 while 循环的变体。该循环会执行一次代码块，在检查条件是否为真之前，然后如果条件为真的话，就会重复这个循环。

- do { 需要执行的代码 } while (条件);

```
let ary = ['a', 'b', 'c', 'd'];
let i = 0;
do {
    console.log(ary[i]);
    i++;
}
while(ary[i]);
复制代码
```

#### 八、filter：数组过滤

- 数组的过滤，过滤条件成立的这个值
- 参数： function(item,i,all){ return 条件成立的某一项 }
- 函数返回值为过滤后的新数组

```
//过滤大于10小于30的数字
let arr = [3, 10, 18, 38, 48, 26];
let ary = arr.filter(function (item, i) {
    return item >= 10 && item < 30
})
console.log(ary);
复制代码
```

#### 九、some：检测数组中的元素是否满足指定条件

- 查看数组中某项数据是否满足某个条件，只要有一个满足条件，就返回true；如果所有项条件都不成立，则返回false，返回的是一个布尔值
- some() 不会对空数组进行检测。
- some() 不会改变原始数组。

```
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

#### 十、every：检测数组中是否每一项都满足指定条件

- 判断数组中是不是每一项都符合某个条件，全部都符合返回true，只要有一项不符合就返回false
- 参数：function ( item , i , all ) { return }

```
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
复制代码
```

#### 十一、Object.keys() & Object.getOwnPropertyNames()

- `Object.keys()` 遍历对象 返回一个包括对象属性名的数组 （可枚举的属性名）
- `Object.getOwnPropertyNames()`
- keys getOwnPropertyNames 是Object基类上的内置属性
- 但Object.keys不能返回不可枚举的属性；Object.getOwnPropertyNames能返回不可枚举的属性。

```
let obj = { name: 'Tom', age: 33, id: 6 };
console.log(Object.keys(obj)); // ["name", "age", "id"]
console.log(Object.getOwnPropertyNames(obj)); // ["name", "age", "id"]
```