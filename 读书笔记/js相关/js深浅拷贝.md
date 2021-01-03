[TOC]



## 深浅拷贝的区分

首先说下，在js中，分为基础数据类型和复杂数据类型，

基础数据类型：Undefined、Null、Boolean、Number、String、Symbol

复杂数据类型：Object、Array、Function、Date等

基础数据类型值，存储在栈(stack)中，拷贝的话，会重新在栈中开辟一个相同的空间存储数据。而复杂数据类型，值存储在堆(heap)中，栈中存储对值的引用地址。深浅拷贝，只针对复杂数据类型来说的。

**浅拷贝ShallowCopy**，是一个对象的逐位副本。创建一个新对象，该对象具有原始对象中的精确副本。如果对象的任何字段是对其他对象的引用，则只复制引用地址，即只复制内存地址，而不复制对象本身，新旧对象还是共享同一块堆内存。改变其中一个对象，另一个也会受影响。如果有修改，会失去原始数据。

**深拷贝DeepCopy**，复制出一个全新的对象实例，新对象跟原对象不共享内存，两者操作互不影响。

简单点区分，

浅拷贝拷贝引用；

深拷贝拷贝实例。

## ShallowCopy浅拷贝的实现方式

### 1. 赋值

先来说说，简单的赋值情况，

```
var o1 = { a : 1, b : 2 }
var o2 = o1
console.log(o2 === o1) // true
o1.a = 2
console.log(o1) // {a: 2, b: 2}
console.log(o2) // {a: 2, b: 2}
```

赋值，这里是对对象地址的引用，改变一个对象的值，拷贝的另一个对象的值也跟着变化，所以这是浅拷贝。

### 2. Array.concat()

concat方法用于合并两个或多个数组。该方法不会更改现有的数组，而仅仅会返回被连接数组的一个副本。

```
var o1 =  [1, [2], 3]

var o2 = o1.concat([]) // 这里会返回一个o1对象的浅拷贝对象

console.log(o2) //  [1, [2], 3]

console.log(o1 === o2) // false
```

o2数组就是一个新数组。如果改变o1数组对象，会不会影响o2数组对象呢？

```
o1[0] = 11

console.log(o1) // [11, [2], 3]

console.log(o2) // [1, [2], 3]
```

以上这种情况，没有改变o2数组值。这是因为，o2中第一个元素和o1中的第一个元素，不是同一个内存地址。

```
o1[1][0] = 22

console.log(o1) // [11, [22], 3]

console.log(o2) // [1, [22], 3]
```

而修改o1变量中的引用的值，o2数组值也跟随着变化。这说明，o2中第二个元素和o1中的第二个元素引用相同的内存地址。

根据以上的说明，可以得出结论，如果数组是一维数组，则可以算是深拷贝。如果是多维数组，则是浅拷贝。

### 3. Array.slice()

slice方法可从已有的数组中返回选定的元素。

```
var o1 = [1, [2], 3]

var o2 = o1.slice(0)

console.log(o1) // [1, [2], 3]

console.log(o2) // [1, [2], 3]
```

该方法不会修改数组，而是返回一个子数组。

```
o1[0] = 11

console.log(o1) // [11, [2], 3]

console.log(o2) // [1, [2], 3]
```

从结果看出，只修改了o1的值，o2的值没有修改。

```
o1[1][0] = 22

console.log(o1) // [11, [22], 3]

console.log(o2) // [1, [22], 3]
```

从结果看出，o1、o2两个变量的值，都发生了变化。说明，两者引用指向同一个内存地址。

以上，说明是浅拷贝。

### 4. Object.assign()

Object.assign()方法用于将所有可枚举的自有属性的值从一个或多个源对象复制到目标对象。 它将返回目标对象

```
var o1 =  { a : 1, b : { c : 2, d : 3} }

var o2 = Object.assign({}, o1)

console.log(o1) // { a : 1, b : { c : 2, d : 3} }

console.log(o2) // { a : 1, b : { c : 2, d : 3} }

console.log(o2 === o1) // false    说明实现了浅拷贝



o1.a = 11

console.log(o2) // { a : 1, b : { c : 2, d : 3} }    o1和o2内部包含的基本类型值，拷贝的是其实例，不会相互影响



o1.b.c = 22

console.log(o1) // { a : 11, b : { c : 22, d : 3} }

console.log(o2) // { a : 1, b : { c : 22, d : 3} }    o1和o2内部包含的引用类型值，拷贝的是其引用，会相互影响
```

### 5. 使用jQuery中的extend函数

```
// Shallow copy

jQuery.extend({},OriginalObject)
// Deep copy 
jQuery.extend(true, {},OriginalObject)
```

`jQuery.extend( [deep ], target, object1 [, objectN ] )`，其中deep为Boolean类型，如果是true，则进行深拷贝。

```
var $ = require('jquery')

var o1 = { a : 1, b : { c : 2 } }

var o2 = $.extend({}, o1)

console.log(o1.b === o2.b) // true

console.log(o1.a === o1.a) // false
```

### 6. lodash中的 _.clone()

利用结构化拷贝算法。支持拷贝arrays,array buffers,booleans, data objects, maps,

numbers, `Object` objects, regexes, sets, strings, symbols, and typed
arrays. `arguments`对象的可枚举属性被拷贝为普通对象。
为不可拷贝的值(如错误对象、函数、DOM节点和弱映射)返回一个空对象。

浅拷贝： `_.clone()`

深拷贝：`_.cloneDeep()`

```
var objects = [{ 'a': 1 }, { 'b': 2 }]; 

var shallow = _.clone(objects);

console.log(shallow[0] === objects[0]); // true

objects[0].a = 11

console.log(shallow[0]) // { a : 11}
```

## DeepCopy深拷贝的实现方式

### 1. 手动复制

要实现拷贝出来的副本，不受原本影响，那么可以这么实现

```
var o1 = { a : 1, b : 2 }
var o2 = { a : o1.a, b : o1.b }
console.log(o2 === o1) // false
o1.a = 2
console.log(o1) // {a: 2, b: 2}
console.log(o2) // {a: 1, b: 2}
```

将每个引用对象都通过复制值来实现深拷贝。

### 2. 对象只有一层的话。可以用object.assign({},obj1)

Es6的object.assign()是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身

所以只能实现一层基本类型属性的拷贝 当obj1中属性是引用类型时，就会发现，修改其中一个属性值，另一个值也发生变化。 如下所示：

```
  let obj1 = {a: 1, b: { c: 2}}
  let obj2 = Object.assign({},obj1)
    // 或者 obj2 = {...obj1}
  obj2.b.c = 4
  console.log(obj1) //{ a: 1, b: { c: 4 } }
```


作者：微雨飞燕
链接：https://juejin.cn/post/6844904178934874126
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### 3. 转成json再转换回来   JSON.parse(JSON.stringify(object_array))

- JSON.stringify(): 把对象转换为字符串
- JSON.parse():把字符串转换为对象

```
var o1 = { a : 1, b : { c : 2} }

var o2 = JSON.parse(JSON.stringify(o1))

console.log(o1 === o2) // false
console.log(o1.b === o2.b) // false

o1.b.c = 22

o1.a = 11

console.log(o1) //   { a : 11, b : { c : 22} }

console.log(o2) //   { a : 1, b : { c : 2} }
```

这种方式，只针对可以转换为JSON对象的类型，比如Array,Object。如果遇到Function就不适用了。

#### 4. 递归拷贝

递归深拷贝的实现：

```
  var deepCopy = function(obj) {
  if (typeof obj !== 'object') return
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
复制代码
```

缺点： 相互引用会出现死循环，深拷贝的做法是遇到对象就进行递归 复制，那么结果只能无限循环下去

#### 5. object.create()方法

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

也就是说，现有对象是新的对象的构造函数的prototype.其实现过程如下：

```
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
```


作者：微雨飞燕
链接：https://juejin.cn/post/6844904178934874126
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### 6. 再次遇见jQuery.extend()方法

`jQuery.extend( [deep ], target, object1 [, objectN ] )`，其中deep为Boolean类型，如果是true，则进行深拷贝。

```
// jQuery.extend()源码
jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {}, // 定义变量，获取第一个参数。默认为空对象。
        i = 1,
        length = arguments.length,
        deep = false;
 
    // Handle a deep copy situation 处理深拷贝
    if ( typeof target === "boolean" ) {
        deep = target;
 
        // Skip the boolean and the target
        // 跳过布尔和目标，重新赋值target
        target = arguments[ i ] || {};
        i++;
    }
 
    // Handle case when target is a string or something (possible in deep copy)
    // 当目标是字符串或其他的时候(在深度拷贝中可能用到)处理用例
    // 当目标非对象并且是非函数的时候处理方式
    if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
        target = {};
    }
 
    // Extend jQuery itself if only one argument is passed
    // 如果只传递一个参数，则扩展jQuery本身
    if ( i === length ) {
        target = this;
        i--;
    }
 
    for ( ; i < length; i++ ) {
 
        // Only deal with non-null/undefined values
        // 只处理non-null/undefined的值
        if ( ( options = arguments[ i ] ) != null ) {
 
            // Extend the base object
            // 展开基本/源对象
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];
 
                // Prevent never-ending loop
                // 防止无限循环
                if ( target === copy ) {
                    continue;
                }
 
                // Recurse if we're merging plain objects or arrays
                // 如果要合并纯对象或数组，使用递归
                if ( deep && copy && ( jQuery.isPlainObject( copy ) || ( copyIsArray = Array.isArray( copy ) ) ) ) {
 
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && Array.isArray( src ) ? src : [];
 
                    } else {
                        clone = src && jQuery.isPlainObject( src ) ? src : {};
                    }
 
                    // Never move original objects, clone them
                    // 不移动原始对象，拷贝他们
                    target[ name ] = jQuery.extend( deep, clone, copy );
 
                // Don't bring in undefined values
                // 不引入未定义的值
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }
    // Return the modified object
    // 返回修改后的对象
    return target;
};
```

### 7. lodash中的_.cloneDeep()

利用第三方库lodash，它的深拷贝函数cloneDeep()，这个函数还是比较靠谱的，大多数需求都能满足。

```
var o1 =  { a : 1, b : { c : 2} }
var o2 = _.cloneDeep(o1)
console.log(o1 === o2) // false
o1.a = 11
o1.b.c = 22
console.log(o1) // { a : 11, b : { c : 22} }
console.log(o2) // { a : 1, b : { c : 2} }
```

### 8. 自己实现深拷贝

针对Array和Object两种复杂类型，自己实现深拷贝。自己实现的深拷贝，对比jquery的。没有考虑undefined和null值。

```
// 检测数据类型的函数

function typeString(obj) {

    var cons =   Object.prototype.toString.call(obj).slice(8, -1) 

    return (cons === 'Array' || cons === 'Object')

}

// 实现深度拷贝 Array/Object

function deepClone(oldObj) {

    if(typeString(oldObj)) {

        var newObj = oldObj.constructor()

        for(let i in oldObj) {

            if (oldObj.hasOwnProperty(i)) {

                newObj[i] = typeString(oldObj[i]) ? deepClone(oldObj[i]) : oldObj[i]

            }

        }

        return newObj;

    } else {

        return oldObj

    }

}



// 测试

var o1 = [1, 2, [3, 4]]

var o2 = deepClone(o1)

console.log(o1 === o2) // false

o1[2][0] = 2018

console.log(o2) // [1, 2, [3, 4]]

console.log(o1) // [1, 2, [2018, 4]]
```

## 深浅拷贝总结

拷贝之后，是否会相互影响，是个重要的指标。以上讨论的深浅拷贝，针对的范围比较小，大部分只考虑了Object和Array类型，但是能在大多数场合使用。
Function、Data、RegExp等没有考虑。如果需要考虑这些，可以针对特定的情况，来具体实现，比如lodash的_.clone，就是使用的结构化拷贝算法，针对不同情况来拷贝的。