# [js获取数组中的最大值/最小值](https://www.cnblogs.com/weiqinl/p/10945596.html)



目录

- [前言](https://www.cnblogs.com/weiqinl/p/10945596.html#前言)
- \1. 使用Math的静态方法max/min
  - [1.1 结合ES6的扩展运算符...使用](https://www.cnblogs.com/weiqinl/p/10945596.html#11-结合es6的扩展运算符使用)
  - [1.2 结合apply/call方法来使用](https://www.cnblogs.com/weiqinl/p/10945596.html#12-结合applycall方法来使用)
  - [1.3 结合reduce来使用](https://www.cnblogs.com/weiqinl/p/10945596.html#13-结合reduce来使用)
- \2. 排序获取
  - [2.1 只比较找出最大值](https://www.cnblogs.com/weiqinl/p/10945596.html#21-只比较找出最大值)
  - [2.2 将整个数组都排序，获取最大值](https://www.cnblogs.com/weiqinl/p/10945596.html#22-将整个数组都排序，获取最大值)
- [浏览器中运行结果](https://www.cnblogs.com/weiqinl/p/10945596.html#浏览器中运行结果)



## 前言

我们会经常在开发过程中，需要获取数组中的最大值或者最小值，可以从以下几个方面考虑：

1. 使用`Math.max()`、`Math.min()`方法
2. 排序之后，获取最大/最小值

下面我们来看看，如何获取下面数组的最大值（最小值类似获取）：

```
let arr = [1, 2, 5, 8, 10, 100, -1]
```

## 1. 使用Math的静态方法max/min

`Math.max()`函数返回给定的一组数中的最大值。
它的语法：`Math.max(value1[, value2, ...])`
使用此方法，需要注意，如果没有参数的话，则返回`-Infinity`。如果有任一参数无法被转换成数值，则返回`NaN`。

### 1.1 结合ES6的扩展运算符...使用

扩展运算符，可以将数组形式转换为逗号参数的形式。

```
Math.max(...arr) 
```

### 1.2 结合apply/call方法来使用

利用`apply()`方法的第一个参数可以改变this的指向，第二个参数是数组的形式，来完成这一需求。

```
Math.max.apply(null, arr) 
```

既然`apply()`方法可以使用，那么我们也可以使用`call()`方法，并配合扩展运算符使用。

```
Math.max.call(null, ...arr) 
```

### 1.3 结合reduce来使用

`reduce()`方法接收一个函数作为累加器，数组中的每一个值（从左到右）开始缩减，最终计算为一个值。
语法：`array.reduce(function(total, currentValue, currentIndex, arr), initialValue)`
在这里，这个累加器函数就是`getMax()`，比较两个数，返回其中的最大值，通过这样的缩减，最后返回整个数组的最大值。

```
function getMax(prev, next) {
    return Math.max(prev, next)
}
arr.reduce(getMax)
```

## 2. 排序获取

### 2.1 只比较找出最大值

假定数组中的第一个元素值最大max，循环数组，将max与其他元素做比较，大的值赋给max。循环结束之后，max的值即为最大值。

```
let max = arr[0]
arr.forEach(item => max = item > max ? item : max)
console.log(max) // 100
```

### 2.2 将整个数组都排序，获取最大值

利用`array.sort()`方法，指定排序函数，来排序数组。当然，你也可以使用其他排序方式，来排序数组。

```
let AS = arr.sort((a, b) => a - b) 
AS[arr.length-1]  // 获取最大值：100
AS[0] // 获取最小值： -1
```

## 浏览器中运行结果

![获取数组中的最大值](https://img2018.cnblogs.com/blog/564792/201905/564792-20190529185325594-884713220.png)

[完]