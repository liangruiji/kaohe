# Array.apply生成数组小结

### 总结:

1. map,forEach, reduce方法并**不会遍历数组中没有初始化**或者被delete的元素
2. Array(10)和new Array(10)的返回值是一个有length属性的**空数组**，其中的每个元素还没有被赋值(初始化)，map,forEach, reduce方法会跳过这些元素
3.  Array.apply(null, {length: 10})相当于 Array(undefined, undefined, undefined, ...)



## 发现问题

今天在学习vue时，在文档的一个例子中发现一个代码片段

```js
  Array.apply(null, { length: 20 }).map(function () {
    return createElement('p', 'hi')
  })
  // 目的是为了创建一个20次的循环
复制代码
```

这让我想起来之前在学习中写demo时，想要用forEach来做一个若干次的循环（觉得写for循环麻烦），当时是这样写的

```js
  Array(10).forEach(function(){
    // do something
  })
复制代码
```

结果是并不会进入循环，后来查询mdn原因如下：

> forEach 方法按升序为数组中含有效值的每一项执行一次callback 函数，那些已删除（使用delete方法等情况）或者未初始化的项将>>被跳过（但不包括那些值为 undefined 的项）（例如在稀疏数组上）。

##### 划重点： `未初始化的项将被跳过`

原来因为通过 Array(10) 或者 new Array(10) 方式创建的数组是一个有length属性的空数组，其中的每个元素还没有被赋值（初始化），所以会变forEach map 等方法跳过

```js
  Array(10) // [empty × 10] length: 10
  new Array(10) // [empty × 10] length: 10
复制代码
```

## 解决问题

但是通过今天看到的这个方法就可以创建一个可以被forEach等方法遍历的数组，这是为什么呢？

```js
  // 这三个方法返回的是一个长度为10的数组，且每一个元素都被赋值成undefined
  Array.apply(null, {length: 10}) 
  Array.apply(null, Array(10)) 
  Array.apply(null, new Array(10)) 

  // [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
复制代码
```

这里先复习一下Array构造函数的用法，下面是mdn的引用

> Array 构造器会根据给定的元素创建一个 JavaScript 数组， 但是当仅有一个参数且为数字时除外: 一个范围在 0 到 232-1 之间的整数， 此时将返回一个 length 的值等于 arrayLength 的数组对象（言外之意就是该数组此时并没有包含任何实际的元素， 不能理所当然地认为它包含 arrayLength 个值为 undefined 的元素）。 注意，后面这种情况仅适用于用 Array 构造器创建数组，而不适用于用方括号创建的数组字面量。

划重点 `但是当仅有一个参数且为数字时，组此时并没有包含任何实际的元素，不能理所当然地认为它包含 arrayLength 个值为 undefined 的元素` `就是说创建出来的数组中的元素并没有被赋值（初始化）`

然后再复习一下Array.apply方法的使用

> Array.apply() 方法接收两个参数， 第一个为调用时指定的上下文（context）； 第二个为一个数组或者一个类数组对象；

```js
  Array.apply(null, {length: 10})
  Array.apply(null, Array(10))
  Array.apply(null, new Array(10))

  // 这三个方法相当于

  Array(undefined, undefined, undefined, ...)
复制代码
```

因为Array构造函数会根据给定的arguments来创建一个数组(如果不是仅有一个参数且为数字的话)， 通过Array.apply传入一个length为10的空数组则相当于， 把一个空数组中的每一个元素的值逐个传入Array()方法， 而空数组中的每一个元素 比如： emptyArr[0] 的值都是 undefined

为了便于理解这里写一个伪代码； 伪代码：

```js
  var arrayLike = {length: 2}
          ↓↓
  Array.apply(null, arrayLike)
          ↓↓
  Array(arrayLike[0], arrayLike[1]) // 把一个空数组中的每一个元素的值逐个传入Array()方法
          ↓↓
  Array(undefined, undefined) // 而空数组中的每一个元素的值都为undefined

  //最终输出 [undefined, undefined]
复制代码
```

这也就是为什么可以通过Array.apply()方法可以生成一个可供forEach等方法遍历的数组

```js
  Array.apply(null, {length: 5}) 
  // 上面这样写实际上等于下面这样写
  Array(undefined, undefined, undefined, undefined, undefined)

  // [undefined, undefined, undefined, undefined, undefined]
  // 生成的数组里的元素都被初始化成了undefined，就可以被forEach等方法遍历了
复制代码
```

另外es6提供了一个新的api，Array.from()也可以做到相同的结果

以下是阮一峰老师的[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)的引用

> Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的>对象，都可以通过Array.from方法转为数组

```js
  Array.from({length: 5})
  // [undefined, undefined, undefined, undefined, undefined]
复制代码
```

es6的另一种写法

```js
  Array(...Array(5))
  // 或者
  [...Array(10)]
  // [undefined, undefined, undefined, undefined, undefined]
```

https://juejin.cn/post/6844903818056957960

# [分析Array.apply(null, { length: 20 })](https://segmentfault.com/a/1190000011435501)

[apply方法](https://segmentfault.com/t/apply方法)[数组](https://segmentfault.com/t/数组)[javascript](https://segmentfault.com/t/javascript)

发布于 2017-10-01

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000011435501&referer=https%3A%2F%2Fwww.google.com%2F&cb=84a91c475b)

## 背景

在阅读VueJS教程时有这么段[demo code](https://cn.vuejs.org/v2/guide/render-function.html#约束)：

```js
render: function (createElement) {
  return createElement('div',
    Array.apply(null, { length: 20 }).map(function () {
      return createElement('p', 'hi')
    })
  )
}
```

其中这个表达式`Array.apply(null, { length: 20 })`有点让人费解。第一感觉这个表达式就是为了创建一个长度为20的数组，但表达式`Array(20)`也可以实现这个功能啊，为啥非要写那么复杂呢？看来情况没那么简单。。。

## 表达式Array.apply(null, { length: 2 })的值

先温故下基础(**为了方便验证将表达式改成Array.apply(null, { length: 2 })，即length的值改成2**):

### 基础1: Array构造函数

直接调用Array函数跟new方式调用是等价的，即:

```js
var a = Array(2); // 等价于var a = new Array(2);
```

表示：创建一个长度为2的数组，**注意该数组的元素并没有被初始化**，即：

```js
console.log(0 in a); // false
console.log(1 in a); // false, 因为数组下标0，1还未初始化
console.log(a[0]); // undefined, 因为数组下标0还未初始化,访问不存在的属性返回undefined
```

### 基础2: apply函数

ES5开始`apply`函数的第二个参数除了可以是数组外，还可以是类数组对象（即包含length属性，且length属性值是个数字的对象）。对象`{length: 2}`就是一个类数组对象，因为没有初始化下标0，1的值，所以获取0，1下标的值得到的都是undefined。

```js
console.log(a[0]); // undefined
console.log(a[1]); // undefined
// 可以转成真正的数组
var a = Array.prototype.slice.call({length: 2});
console.log(Array.isArray(a)) // true
```

### 再看表达式Array.apply(null, { length: 2})的值

温故了基础后再看表达式`Array.apply(null, { length: 2 })`他就等价于：

```js
// 1 熟悉一点: {length: 2}作为Array.apply第二个参数等同于[undefined, undefined]作为Array.apply第二个参数
Array.apply(null, [undefined, undefined]); 
// 2 再熟悉一点：apply方法的执行结果
Array(undefined, undefined); 
// 3 再再熟悉一点：Array方法直接调用和new方式调用等价
new Array(undefined, undefined); 
```

这样就很容易知道该表达式的值是**一个长度为2，且每个元素值都被初赋值为undefined的数组（\*注意此时不是数组元素没有初始化，而是初始化成undefined，这就是跟Array(2)的区别\*）**。

## 为啥非要写那么复杂呢？

回到最初的问题：为啥非要写那么复杂呢？回答这个问题前还得温故下map方法（[来自MDN描述](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)）:

> It is not called for missing elements of the array (that is, indexes that have never been set, which have been deleted or which have never been assigned a value).

即map函数并不会遍历数组中没有初始化或者被delete的元素（有相同限制还有forEach, reduce方法）。OK，疑问到此终于真相大白了：写这么“复杂”就是为了实现：**创建一个长度为20，且每个元素都被初始化的数组**。这样map方法就可以循环20次了。

```js
// 被初始化的数组
Array.apply(null, {length: 20}).map(function(val, index){
   console.log(index); // 循环20次
});
// 未被初始化的数组
Array(20).map(function(val, index){
   console.log(index); // 不会被执行
});
```

其实这已经是实现该功能很简洁的写法了，不得不佩服vuejs文档作者的基础功力。

1. 如果为了少写几个字的话还可以把该表达式修改成：

   ```js
   Array.apply(null, Array(20)); // 第二个参数用Array(20)代替{length: 20}
   ```

2. 还可以使用ES6 API更直观表达意图：

   ```js
   // 方法1：
   Array.from({length: 20})
   
   // 方法2
   Array(20).fill(null)
   ```

## 其他

Array(2) 等价于[,,]，不等价于[undefined, undefined]