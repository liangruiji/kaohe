https://www.jianshu.com/p/c0be35475e54

https://blog.csdn.net/lihongxun945/article/details/49031383

## export 与 import

### 基本用法

模块导入导出各种类型的变量，如字符串，数值，函数，类。

- 导出的函数声明与类声明必须要有名称（export default 命令另外考虑）。 
- 不仅能导出声明还能导出引用（例如函数）。
- export 命令可以出现在模块的任何位置，但必需处于模块顶层。
- import 命令会提升到整个模块的头部，首先执行。

### export default 命令

- 在一个文件或模块中，export、import 可以有多个，export default 仅有一个。
- export default 中的 default 是对应的导出接口变量。
- 通过 export 方式导出，在导入时要加{ }，export default 则不需要。
- export default 向外暴露的成员，可以使用任意变量来接收。

## import()

`import()`和`import`两者都是输入接口，区别在于前者是动态加载的，后者是静态加载的。即前者在代码执行到`import()`的时候才接入外部模块，而`import`在代码编译的时候就已经接入了。`import()`返回了一个`promise`,可以使用`解构赋值`的方式获取暴露的变量。



# 各种导入和导出方式总结

总结一下，ES6提供了如下几种导入方式：

from 后面跟的是文件路径名字符串，一般省略了后缀名

`import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径。如果不带有路径，只是一个模块名，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

export default 中的 default 是对应的导出接口变量

只能有一个默认导出，可以有多个导出

导入时，默认导出不用{}，普通导出需要用{导入的变量}

```js
// Default exports and named exports
import theDefault, { named1, named2 } from 'src/mylib';
import theDefault from 'src/mylib';
import { named1, named2 } from 'src/mylib';

// Renaming: import named1 as myNamed1
import { named1 as myNamed1, named2 } from 'src/mylib';

// Importing the module as an object
// (with one property per named export)
import * as mylib from 'src/mylib';

// Only load the module, don’t import anything
import 'src/mylib';
1234567891011121314
```

如下几种导出方式：

```js
 //命名导出
export var myVar1 = ...;
export let myVar2 = ...;
export const MY_CONST = ...;

export function myFunc() {
    ...
}
export function* myGeneratorFunc() {
    ...
}
export class MyClass {
    ...
}
// default 导出
export default 123;
export default function (x) {
    return x
};
export default x => x;
export default class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};
//也可以自己列出所有导出内容
const MY_CONST = ...;
function myFunc() {
    ...
}

export { MY_CONST, myFunc };
//或者在导出的时候给他们改个名字
export { MY_CONST as THE_CONST, myFunc as theFunc };

//还可以导出从其他地方导入的模块
export * from 'src/other_module';
export { foo, bar } from 'src/other_module';
export { foo as myFoo, bar } from 'src/other_module';
```

# ES6模块之export和import详解

![img](https://csdnimg.cn/release/blogv2/dist/pc/img/reprint.png)

[zc的救赎](https://blog.csdn.net/qq_28506819) 2017-07-22 15:45:27 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/articleReadEyes.png) 33081 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect.png) 收藏 17

分类专栏： [ES6学习心得](https://blog.csdn.net/qq_28506819/category_6889480.html) 文章标签： [ES6模块](https://www.csdn.net/gather_23/MtzaUg3sNTM2MS1ibG9n.html) [export](https://www.csdn.net/gather_21/MtTaEg0sMzM4NTYtYmxvZwO0O0OO0O0O.html) [import](https://www.csdn.net/gather_23/MtTaEg0sMjkxOTItYmxvZwO0O0OO0O0O.html) [module](https://www.csdn.net/gather_22/MtTaEg0sNTMzOTYtYmxvZwO0O0OO0O0O.html)

ES6中的模块即使一个包含JS代码的文件，在这个模块中所有的变量都是对其他模块不可见的，除非我们导出它。ES6的模块系统大致分为导出（export）和导入（import）两个模块。

## 1、模块导出（export）

你可以 `导出` 所有的最外层 `函数` 、 `类` 以及 `var` 、 `let` 或 `const` 声明的变量。

ES6模块只支持静态导入和导出，你只可以在模块的最外层作用域使用`import`和`export`，不可在条件语句中使用，也不能在函数作用域中使用`import`。所有导出的标识符一定要在源代码中明确地导出它们的名称，你不能通过编写代码遍历一个数组然后用数据驱动的方式导出一堆名称。如下导出是**错误的**。

```javascript
function squre() {};
if(true) {
	export {squre};
}
```

ES6的导出分为名字导出和默认导出

### 1、名字导出（name export）

名字导出可以在模块中导出多个声明。

```javascript
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
	return x * x;
}

export function add (x, y) {
	return x + y;
}
//------ main.js ------
import { square, add } from 'lib';
console.log(square(10)); //100
console.log(add(2,4));  //6
```

这样导入的变量名必须和导出的名称一致。以上对于每一个要导出的变量都加了export，我们也可以直接导出一个列表，例如上面的lib.js可以改写成：  

```javascript
//------ lib.js ------
const sqrt = Math.sqrt;
function square(x) {
	return x * x;
}
function add (x, y) {
	return x + y;
}
export {sqrt, square, add}
```

`export` 列表可以在模块文件最外层作用域的每一处声明，不一定非要把它放在模块文件的末尾。

也可以直接导入整个模块，此时的main.js模块将变成这样。

```javascript
//------ main.js ------
import * as lib from 'lib';
console.log(lib.square(10)); //100
console.log(lib.add(2,4));  //6
```

### 2、默认导出（default export）

一个模块只能有一个默认导出，对于默认导出，导入的名称可以和导出的名称不一致，这对于导出匿名函数或类非常有用。



```javascript
//------ myFunc.js ------
export default function() {...};
//------ main.js ------
import myFunc from 'myFunc';
myFunc();
```

注意这里默认导出不需要用{}。

当然也可以使用混合的导出。

```javascript
//------ lib.js ------
export default function() {...};
export function each() {...};
//------ main.js ------
import _,{ each } from 'lib';
```

## 2、重命名export和import

为了解决导出命名冲突的问题，ES6为你提供了重命名的方法解决这个问题，当你在导入名称时可以这样做：

```javascript
// 这两个模块都会导出以`flip`命名的东西。
// 要同时导入两者，我们至少要将其中一个的名称改掉。
import {flip as flipOmelet} from "eggs.js";
import {flip as flipHouse} from "real-estate.js";
```

同样，当你在导出的时候也可以重命名。你可能会想用两个不同的名称导出相同的值，这样的情况偶尔也会遇到：

```javascript
function v1() { ... }
function v2() { ... }
export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

对于默认导出，只是导出了一个特殊的名字叫 default，你也可以就直接用他的名字，把它当做命名导出来用，下面两种写法是等价的：

```javascript
import { default as foo } from 'lib';
import foo from 'lib';
```

也可以把名称as为default来默认导出：

```javascript
 //------ module1.js ------
export default 123;
//------ module2.js ------
const D = 123;
export { D as default };
```

## 3、作为中转模块导出

有时候为了避免上层模块导入太多的模块，我们可能使用底层模块作为中转，直接导出另一个模块的内容如下：

```javascript
//------ myFunc.js ------
export default function() {...};
//------ lib.js ------
export * from 'myFunc';
export function each() {...};
//------ main.js ------
import myFunc,{ each } from 'lib';
```

这样main.js只需导入lib模块即可，虽然myFunc模块从lib模块导出，但是lib却不能使用myFunc模块的内容。




参考链接：

http://www.infoq.com/cn/articles/es6-in-depth-modules

http://2ality.com/2014/09/es6-modules-final.html
http://blog.csdn.net/lihongxun945/article/details/49031383





[ES2020提案](https://github.com/tc39/proposal-dynamic-import) 引入`import()`函数，支持动态加载模块。

```javascript
import(specifier)
```

上面代码中，`import`函数的参数`specifier`，指定所要加载的模块的位置。`import`命令能够接受什么参数，`import()`函数就能接受什么参数，两者区别主要是后者为动态加载。

`import()`返回一个 Promise 对象。下面是一个例子。

```javascript
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

`import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，`import()`函数与所加载的模块没有静态连接关系，这点也是与`import`语句不相同。`import()`类似于 Node 的`require`方法，区别主要是前者是异步加载，后者是同步加载。

### 适用场合

下面是`import()`的一些适用场合。

（1）按需加载。

`import()`可以在需要的时候，再加载某个模块。

```javascript
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

上面代码中，`import()`方法放在`click`事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

（2）条件加载

`import()`可以放在`if`代码块，根据不同的情况，加载不同的模块。

```javascript
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

上面代码中，如果满足条件，就加载模块 A，否则加载模块 B。

（3）动态的模块路径

`import()`允许模块路径动态生成。

```javascript
import(f())
.then(...);
```

上面代码中，根据函数`f`的返回结果，加载不同的模块。