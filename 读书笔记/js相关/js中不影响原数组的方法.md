https://jinlong.github.io/2017/02/04/javascript-array-methods-mutating-vs-non-mutating/

原文

https://juejin.cn/post/6844903614918459406?utm_source=gold_browser_extension%3Futm_source%3Dgold_browser_extension#heading-25

### 改变原数组的方法(9个):

```
    let a = [1,2,3];
    ES5:
     a.splice()/ a.sort() / a.pop()/ a.shift()/  a.push()/ a.unshift()/ a.reverse()
    ES6:
    a.copyWithin() / a.fill
复制代码
```

对于这些能够改变原数组的方法，要注意避免在循环遍历中改变原数组的选项，比如: 改变数组的长度，导致遍历的长度出现问题。

### 不改变原数组的方法(8个):

```
    ES5：
    slice、join、toLocateString、toStrigin、cancat、indexOf、lastIndexOf、
    ES7：
    includes
```

### 遍历方法(12个):

js中遍历数组并不会改变原始数组的方法总共有12个:

```
    ES5：
    forEach、every 、some、 filter、map、reduce、reduceRight、
    ES6：
    find、findIndex、keys、values、entries
复制代码
```

#### 关于遍历：

- 关于遍历的效率，可以看一下这篇[详解JS遍历](http://louiszhai.github.io/2015/12/18/traverse/#测试各方法效率)
- 尽量不要在遍历的时候，修改后面要遍历的值
- 尽量不要在遍历的时候修改数组的长度（删除/添加）

