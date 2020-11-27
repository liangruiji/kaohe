JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。

~~~js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 结果是 ???
~~~

执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

**1.函数的作用域基于函数创建的位置。**

