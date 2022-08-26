https://segmentfault.com/a/1190000022730362

##### 作用：

 eval和new Function都可以将一段字符串解析成一段JS脚本并执行。

##### 使用：

eval作为一个方法，直接传入要解析的字符串即可。

new Function() 可以接n个参数，**最后一个参数作为函数体**。

~~~js
const foo = "foo"; // 定义了一个变量foo
const str = "console.log(foo)";
eval(str); // 解析str字符串中包含JS脚本并执行，输出foo
~~~



~~~js
let foo = new Function("name", "console.log(name)");
// 创建的函数指向Function的原型
console.log(foo.__proto__ === Function.prototype); // true

// 等价于
function foo(name) {
    console.log(name);
}
~~~

##### 区别：

eval中的代码执行时的作用域为**当前作用域**。**它可以访问到函数中的局部变量**。
new Function中的代码执行时的作用域为**全局作用域**，**不论它的在哪个地方调用的**，**它访问的都是全局变量**。

当然如果使用的是**window.eval()**或者**global.eval()**那么访问到的也始终是全局作用域中的变量

~~~js
let foo = "foo";
function bar() {
    let foo = "bar";
    eval("console.log(foo)"); // 输出bar
    new Function("console.log(foo)")(); // 输出foo
}
bar();
~~~

~~~js
let foo = "foo";
function bar() {
    let foo = "bar";
    window.eval("console.log(foo)"); // 输出foo
    new Function("console.log(foo)")(); // 输出foo
}
bar();
~~~

##### 使用场景

**在Vue生成渲染函数的时候会使用到**，Vue中进行模板编译的时候，最终会将模板编译成一段可执行JS字符串，**然后传递给new Function生成渲染函数**，渲染(挂载)的时候，执行这个渲染函数拿到对应的虚拟DOM节点，如:

```javascript
// template模板
<div id="app" style="color: red;background: blue;"><p>hello {{name}}</p>{{msg}}</div>
// 解析模板生成一段字符串,即渲染函数要执行的字符串
let code = _c("div", {id: "app",style: {"color":" red","background":" blue"}},_c("p", undefined,_v("hello"+_s(name))),_v(_s(msg)))
// 将渲染函数要执行的字符串传入new Function()生成渲染函数
let renderFn = new Function(`with(this) {return ${code}}`);
```

等到渲染的时候，就会执行渲染函数，即renderFn()，此时就会执行code所指的字符串，拿到对应的虚拟DOM节点，进行patch最终更新真实的DOM节点

