[TOC]



# JavaScript 判断空对象、空数组的方法

### 一、为什么判定空对象、空数据有点“难”？

首先，我们先看下下面的表格：

| `a`       | 取非 `!a` | 和自己比较 `a===null/undefined...` | 描述       | 数据类型  |
| --------- | --------- | ---------------------------------- | ---------- | --------- |
| null      | true      | true                               | 空对象     | Null      |
| undefined | true      | true                               | 未定义对象 | Undefined |
| 0         | true      | true                               | 数值0      | Number    |
| ""        | true      | true                               | 空字符串   | String    |
| []        | false     | false                              | 空数组     | Array     |
| {}        | false     | false                              | 空对象     | Object    |

从表格中，我们可以看出想要判断是不是`null`,   `undefined` , `""`, `0`，都比较容易， **非操作** 和 **比较操作** 都能实现。就是`{}`, `[]`比较顽固，两种方法都无效。

### 二、判定空数组的方法

**分析**：所谓空数组，就是数组的长度等于0。所以我们的难点就落在了怎么判断一个参数的数据类型是数组了。
 我们可以通过`isPrototypeOf()`方法实现。

```jsx
var obj = [];
Array.prototype.isPrototypeOf(obj); // true
```

isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。即判断 `Array` 是否存在于 `obj` 的原型链上。该方法属于 ES3 标准，现代浏览器均支持，包括 IE。

所以，完整的检验空数组的表达式如下：

```jsx
// 满足以下判断表达式的都是 空数组 []
Array.prototype.isPrototypeOf(obj) && obj.length === 0
```

### 三、判定空对象的方法

**分析**：和判断空对象类似的，我们只要能验证这个对象的`keys`长度是0，那就是个空对象了。我们依旧可以通过`isPrototypeOf()`方法实现判断一个数据是不是对象。

```dart
var obj = {};
Object.prototype.isPrototypeOf(obj); // true
```

完整的检验空对象的表达式如下：



```dart
// 满足以下判断表达式的都是 空对象
Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0
```

其中，`Object.keys()`方法会返回一个由给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 `for...in` 循环遍历该对象时返回的顺序一致（该方法属于 ES5 标准，IE9 以上和其它现代浏览器均支持）。
 若要兼容IE9以下，可以用 [`for...in`](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FStatements%2Ffor...in)替代，但要注意`for...in` 会将对象原型链上的属性也枚举出来，所以要借`hasOwnProperty()`方法来判断是不是对象本身的属性。



```jsx
function hasKeys(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            return true;
        }
    }
}
var obj1 = {a:'aa',b:'bb'};
var obj2 = {};
console.log(hasKeys(obj1)); // true
console.log(hasKeys(obj2)); // undefined
```

但要注意：在JavaScript 中一切皆是对象，也就是说，Object 也存在于数组的原型链上，因此在封装校验方法时，数组需要先于对象检验。



```jsx
Array.prototype.isPrototypeOf([]); // true
Array.prototype.isPrototypeOf({}); // false

Object.prototype.isPrototypeOf([]); // true
Object.prototype.isPrototypeOf({}); // true
```

*注意：`isPrototypeOf` 和 `instanceof operator` 是不一样的。在表达式 `obj instanceof AFunction` 中，检测的是 `AFunction.prototype` 是否在`obj` 的原型链中，而不是检测 `AFunction` 自身。*

### 四、一个判断参数为空的函数封装

结合上面的空对象、空数组检测方法，我们可以封装一个判断参数为空的函数。



```kotlin
function isEmpty(a){
            if (a === "") return true; //检验空字符串
            if (a === "null") return true; //检验字符串类型的null
            if (a === "undefined") return true; //检验字符串类型的 undefined
            if (!a && a !== 0 && a !=="") return true; //检验 undefined 和 null           
            if (Array.prototype.isPrototypeOf(a) && a.length === 0 ) return true; //检验空数组
            if (Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0 ) return true;  //检验空对象
            return false;
        }
```

#### 小小Tips：

**1. 一个讨巧判断空数组、空对象的方法：**



```jsx
var item = [];
console.log(JSON.stringify(item) === '[]'); // true
```



```jsx
var item = {};
console.log(JSON.stringify(item) === '{}');// true
```

**2. `null`,   `undefined`, `{}`, `[]`,`""` , `0`在非严格等于（即两个等号时`==`）情况下，他们互有“帮派”。**

1）`null`,   `undefined`为一组。



```jsx
console.log(null == undefined); // true
```

2）`[]`, `""` , `0`为一组。



```cpp
console.log("" == 0); // true
console.log("" == []); // true
console.log(0 == []); // true

// 但不要混淆，空数组不等于空数组
console.log([] == []); // false
```

所以在做判断的时候，严谨点要用严格等于`===`。



作者：celineWong7
链接：https://www.jianshu.com/p/cadcbab793d7
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。