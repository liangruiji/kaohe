# [JavaScript各种错误类型](https://segmentfault.com/a/1190000022924060)

[javascript](https://segmentfault.com/t/javascript)

[![img](https://avatar-static.segmentfault.com/187/723/1877232408-57f7aca75d721_big64)**沉静地闪光**](https://segmentfault.com/u/007008)

-  **9.9k**

发布于 6月13日

javascript错误类型有以下几种：

①SyntaxError: 语法错误
②ReferenceError: 引用错误 要用的东西没找到
③RangeError: 范围错误 专指参数超范围
④TypeError: 类型错误 错误的调用了对象的方法
⑤EvalError: eval()方法错误的使用
⑥URIError: url地址错误

##### 1.SyntaxError

解析代码时发生的语法错误

```
var 2b;
//Uncaught SyntaxError: Unexpected number
```

##### 2.ReferenceError

引用了一个不存在的变量

```
console.log(a);
//Uncaught ReferenceError: Invalid left-hand side in assignment
```

##### 3.RangeError

超出有效范围

```
var a= new Array(-1);
//Uncaught RangeError: Invalid array length
```

##### 4.TypeError

情况一：变量或参数不是预期类型，比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。

```
var a= new abc;
//Uncaught TypeError: abc is not a function
```

情况二：调用对象不存在的方法

```
var b;
b.c();
//Uncaught TypeError: Cannot read property c of undefined
```

##### 5.URLError（URL错误）

与url相关函数参数不正确，主要是encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。

```
decodeURI('%2')
//Uncaught URIError: URI malformed
```

##### 6.EvalError（eval错误）

eval函数没有被正确执行

```
eval(2b)
//Uncaught SyntaxError: Invalid or unexpected token
```

##### 抛出自定义错误: throw new Error("错误信息")

如果不想使用系统设置的错误信息(例如前面提到的6种)，可以自定义错误，例如让一个函数需要传入一个字符串，但是传入了空值，可以`new`不同的错误类型，并自定义错误提示语来让系统抛出信息。

```
function check(string){
    if(!string){
        throw new Error("内容不存在");
        //throw new TypeError("内容不存在")
    }
}
```