https://segmentfault.com/a/1190000000410506

[TOC]

### 数组的sort()方法

sort() 方法用于对数组的元素进行排序。

语法: arrayObject.sort(sortby)

参数： **sortby可选。规定排序顺序，必须是函数**。

**compare函数每次取数组里两个元素，然后根据 return 的值是否大于0来决定是否要交换这两个元素的位置**

注： 如果调用该方法时没有使用参数，将按**字母顺序**对数组中的元素进行排序，

说得更精确点，是按照字符编码的顺序进行排序，要实现这一点，

首先应把数组的元素都转换成字符串(如有必要)，再进行比较。

如果想按照其他标准进行排序，就需要**提供比较函数**，**返回值必须为数字**，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数a和b, 其返回值如下：

若a小于b, 在排序后的数组中a应该出现在b之前，则返回一个小于0的值。

若a等于b, 则返回0;

若a大于b, 则返回一个大于0的值。



### 对象数组的排序

**当然如果想根据数组对象中的某个属性值进行排序呢？**

`sort`方法接收一个函数作为参数，这里嵌套一层函数用来接收对象属性名，其他部分代码与正常使用`sort`方法相同。

```js
var arr = [
    {name:'zopp',age:0},
    {name:'gpp',age:18},
    {name:'yjj',age:8}
];

function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
console.log(arr.sort(compare('age')))
```