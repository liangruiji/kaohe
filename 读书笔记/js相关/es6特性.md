## 1.let 和 const 命令

## 2.变量的解构赋值

1. 数组的解构赋值
2. 对象的解构赋值
3. 字符串的解构赋值
4. 数值和布尔值的解构赋值
5. 函数参数的解构赋值
6. 圆括号问题
7. 用途

## 3.字符串的扩展

1. 字符的 Unicode 表示法
2. 字符串的遍历器接口
3. 直接输入 U+2028 和 U+2029
4. JSON.stringify() 的改造
5. 模板字符串
6. 实例：模板编译
7. 标签模板
8. 模板字符串的限制

## 6.正则的扩展

1. RegExp 构造函数
2. 字符串的正则方法
3. u 修饰符
4. RegExp.prototype.unicode 属性
5. y 修饰符
6. RegExp.prototype.sticky 属性
7. RegExp.prototype.flags 属性
8. s 修饰符：dotAll 模式
9. 后行断言
10. Unicode 属性类
11. 具名组匹配
12. 正则匹配索引
13. String.prototype.matchAll()

## 7.函数的扩展

1. 函数参数的默认值
2. rest 参数
3. 严格模式
4. name 属性
5. 箭头函数
6. 尾调用优化
7. 函数参数的尾逗号
8. Function.prototype.toString()
9. catch 命令的参数省略

## 8.数组的扩展

1. 扩展运算符
2. Array.from()
3. Array.of()
4. 数组实例的 copyWithin()
5. 数组实例的 find() 和 findIndex()
6. 数组实例的 fill()
7. 数组实例的 entries()，keys() 和 values()
8. 数组实例的 includes()
9. 数组实例的 flat()，flatMap()
10. 数组的空位
11. Array.prototype.sort() 的排序稳定性

## 9.对象的扩展

1. 属性的简洁表示法
2. 属性名表达式
3. 方法的 name 属性
4. 属性的可枚举性和遍历
5. super 关键字
6. 对象的扩展运算符
7. 链判断运算符
8. Null 判断运算符

## 10.对象的新增方法

1. Object.is()
2. Object.assign()
3. Object.getOwnPropertyDescriptors()
4. __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
5. Object.keys()，Object.values()，Object.entries()
6. Object.fromEntries()

## Symbol

1. [概述](https://es6.ruanyifeng.com/#docs/symbol#概述)
2. [Symbol.prototype.description](https://es6.ruanyifeng.com/#docs/symbol#Symbol.prototype.description)
3. [作为属性名的 Symbol](https://es6.ruanyifeng.com/#docs/symbol#作为属性名的 Symbol)
4. [实例：消除魔术字符串](https://es6.ruanyifeng.com/#docs/symbol#实例：消除魔术字符串)
5. [属性名的遍历](https://es6.ruanyifeng.com/#docs/symbol#属性名的遍历)
6. [Symbol.for()，Symbol.keyFor()](https://es6.ruanyifeng.com/#docs/symbol#Symbol.for()，Symbol.keyFor())
7. [实例：模块的 Singleton 模式](https://es6.ruanyifeng.com/#docs/symbol#实例：模块的 Singleton 模式)
8. [内置的 Symbol 值](https://es6.ruanyifeng.com/#docs/symbol#内置的 Symbol 值)

## Set 和 Map 数据结构

1. [Set](https://es6.ruanyifeng.com/#docs/set-map#Set)
2. [WeakSet](https://es6.ruanyifeng.com/#docs/set-map#WeakSet)
3. [Map](https://es6.ruanyifeng.com/#docs/set-map#Map)
4. [WeakMap](https://es6.ruanyifeng.com/#docs/set-map#WeakMap)

## Promise 对象

1. [Promise 的含义](https://es6.ruanyifeng.com/#docs/promise#Promise 的含义)
2. [基本用法](https://es6.ruanyifeng.com/#docs/promise#基本用法)
3. [Promise.prototype.then()](https://es6.ruanyifeng.com/#docs/promise#Promise.prototype.then())
4. [Promise.prototype.catch()](https://es6.ruanyifeng.com/#docs/promise#Promise.prototype.catch())
5. [Promise.prototype.finally()](https://es6.ruanyifeng.com/#docs/promise#Promise.prototype.finally())
6. [Promise.all()](https://es6.ruanyifeng.com/#docs/promise#Promise.all())
7. [Promise.race()](https://es6.ruanyifeng.com/#docs/promise#Promise.race())
8. [Promise.allSettled()](https://es6.ruanyifeng.com/#docs/promise#Promise.allSettled())
9. [Promise.any()](https://es6.ruanyifeng.com/#docs/promise#Promise.any())
10. [Promise.resolve()](https://es6.ruanyifeng.com/#docs/promise#Promise.resolve())
11. [Promise.reject()](https://es6.ruanyifeng.com/#docs/promise#Promise.reject())
12. [应用](https://es6.ruanyifeng.com/#docs/promise#应用)
13. [Promise.try()](https://es6.ruanyifeng.com/#docs/promise#Promise.try())

## Iterator 遍历器和 for...of 循环

1. [Iterator（遍历器）的概念](https://es6.ruanyifeng.com/#docs/iterator#Iterator（遍历器）的概念)
2. [默认 Iterator 接口](https://es6.ruanyifeng.com/#docs/iterator#默认 Iterator 接口)
3. [调用 Iterator 接口的场合](https://es6.ruanyifeng.com/#docs/iterator#调用 Iterator 接口的场合)
4. [字符串的 Iterator 接口](https://es6.ruanyifeng.com/#docs/iterator#字符串的 Iterator 接口)
5. [Iterator 接口与 Generator 函数](https://es6.ruanyifeng.com/#docs/iterator#Iterator 接口与 Generator 函数)
6. [遍历器对象的 return()，throw()](https://es6.ruanyifeng.com/#docs/iterator#遍历器对象的 return()，throw())
7. [for...of 循环](https://es6.ruanyifeng.com/#docs/iterator#for...of 循环)

## Generator 生成器函数的语法

1. [简介](https://es6.ruanyifeng.com/#docs/generator#简介)
2. [next 方法的参数](https://es6.ruanyifeng.com/#docs/generator#next 方法的参数)
3. [for...of 循环](https://es6.ruanyifeng.com/#docs/generator#for...of 循环)
4. [Generator.prototype.throw()](https://es6.ruanyifeng.com/#docs/generator#Generator.prototype.throw())
5. [Generator.prototype.return()](https://es6.ruanyifeng.com/#docs/generator#Generator.prototype.return())
6. [next()、throw()、return() 的共同点](https://es6.ruanyifeng.com/#docs/generator#next()、throw()、return() 的共同点)
7. [yield* 表达式](https://es6.ruanyifeng.com/#docs/generator#yield* 表达式)
8. [作为对象属性的 Generator 函数](https://es6.ruanyifeng.com/#docs/generator#作为对象属性的 Generator 函数)
9. [Generator 函数的this](https://es6.ruanyifeng.com/#docs/generator#Generator 函数的this)
10. [含义](https://es6.ruanyifeng.com/#docs/generator#含义)
11. [应用](https://es6.ruanyifeng.com/#docs/generator#应用)

## async 函数

1. [含义](https://es6.ruanyifeng.com/#docs/async#含义)
2. [基本用法](https://es6.ruanyifeng.com/#docs/async#基本用法)
3. [语法](https://es6.ruanyifeng.com/#docs/async#语法)
4. [async 函数的实现原理](https://es6.ruanyifeng.com/#docs/async#async 函数的实现原理)
5. [与其他异步处理方法的比较](https://es6.ruanyifeng.com/#docs/async#与其他异步处理方法的比较)
6. [实例：按顺序完成异步操作](https://es6.ruanyifeng.com/#docs/async#实例：按顺序完成异步操作)
7. [顶层 await](https://es6.ruanyifeng.com/#docs/async#顶层 await)

# Class 的基本语法

1. [简介](https://es6.ruanyifeng.com/#docs/class#简介)
2. [静态方法](https://es6.ruanyifeng.com/#docs/class#静态方法)
3. [实例属性的新写法](https://es6.ruanyifeng.com/#docs/class#实例属性的新写法)
4. [静态属性](https://es6.ruanyifeng.com/#docs/class#静态属性)
5. [私有方法和私有属性](https://es6.ruanyifeng.com/#docs/class#私有方法和私有属性)
6. [new.target 属性](https://es6.ruanyifeng.com/#docs/class#new.target 属性)

# Class 的继承

1. [简介](https://es6.ruanyifeng.com/#docs/class-extends#简介)
2. [Object.getPrototypeOf()](https://es6.ruanyifeng.com/#docs/class-extends#Object.getPrototypeOf())
3. [super 关键字](https://es6.ruanyifeng.com/#docs/class-extends#super 关键字)
4. [类的 prototype 属性和__proto__属性](https://es6.ruanyifeng.com/#docs/class-extends#类的 prototype 属性和__proto__属性)
5. [原生构造函数的继承](https://es6.ruanyifeng.com/#docs/class-extends#原生构造函数的继承)
6. [Mixin 模式的实现](https://es6.ruanyifeng.com/#docs/class-extends#Mixin 模式的实现)

# Module 的语法

1. [概述](https://es6.ruanyifeng.com/#docs/module#概述)
2. [严格模式](https://es6.ruanyifeng.com/#docs/module#严格模式)
3. [export 命令](https://es6.ruanyifeng.com/#docs/module#export 命令)
4. [import 命令](https://es6.ruanyifeng.com/#docs/module#import 命令)
5. [模块的整体加载](https://es6.ruanyifeng.com/#docs/module#模块的整体加载)
6. [export default 命令](https://es6.ruanyifeng.com/#docs/module#export default 命令)
7. [export 与 import 的复合写法](https://es6.ruanyifeng.com/#docs/module#export 与 import 的复合写法)
8. [模块的继承](https://es6.ruanyifeng.com/#docs/module#模块的继承)
9. [跨模块常量](https://es6.ruanyifeng.com/#docs/module#跨模块常量)
10. [import()](https://es6.ruanyifeng.com/#docs/module#import())