# JS笔记(9): 关于this

### 一、this的7种情况

#### 1.给当前元素的某个事件绑定方法，当事件触发方法执行的时候，方法中的this是当前操作的元素对象

```
oBox.onclick = function(){
    // this: oBox
}
复制代码
```

#### 2.普通函数执行，函数中的this取决于执行的主体，谁执行的，this就是谁（执行主体：方法执行，看方法名前面是否有“`.`”，有的话，点前面是谁this就是谁，没有this是`window`

```
var obj = {
num:12;
    fn: function(){
        console.log(this); //=>obj
    }
};
obj.fn();
var fn = obj.fn();
fn();
复制代码
```

#### 3.自执行函数中的this ==>window

```
;function(){
console.log(this); //=>window
}();
复制代码
```

#### 4.定时器中的this

- setInterval setTimeout ==>window

```
setTimeout(function (){
console.log(this); //=>window
})();
复制代码
```

#### 5.构造函数中的this ==> 构造函数中的实例

function Foo(){ this.name = '于谦'; this.ago = 58; console.log(this); } var f = new Foo(); //=>操作符 构造实例

#### 6.箭头函数中的this ==> 箭头函数上级作用域中的this

```
var key = 13;
var obj2 = {
key:12,
fn:() => {
console.log(this.key); // 13
}
}
obj2.fn();
复制代码
```

#### 7.全局作用域中的this ==>window

#### 8.this一旦被函数包裹，this的指向就需要重新判断

### 二、this执行题：

#### 题目一：

```
function fn(){ //=>AAAFFF111
     console.log(1);
 }
 var obj = {
     fn:fn //=>AAAFFF111
 }

 //=> 执行的是相同的方法（不同的是 函数执行方法的this是不同的）
 obj.fn(); //=> this是obj
 fn(); //=> this是window
 ~function(){
    //=> this：window
 }();
复制代码
```

#### 题目二：

```
var length = 5;
var fn = function () {
    console.log(this);
    console.log(this.length)
};
var main = {
    fn: function (fn) {
        console.log(this); // {fn:function(fn){}}
        fn(); // window 5
        arguments[0](); // arguments 1
    },
    length: 10
};
main.fn(fn);
复制代码
```

#### 题目三：

```
function fn1() {
    console.log(this === ary);
}
function fn2() {
    console.log(this);
}
function fn3() {
}
function fn4() {
}
var ary = [fn1, fn2, fn3, fn4];
ary[1](); // ary
var arry = ary[1];
var arry = function fn2() {
    console.log(this); //window
};
arry();
复制代码
```

#### 题目四：

```
var num = 5; // 
var obj = {
    num: 4, // 
    fn: (function (num) {
        console.log(obj);
        num++;
        this.num++;
        var num = 2; // 3 
        return function () {
            num++;
            this.num++;
            console.log(num); // 
        };
    })()
};
var fn = obj.fn;
fn();
obj.fn();
obj.fn();
console.log(this.num, obj.num); // 6
复制代码
```

#### 题目五：

```
var num = 1; //3 5
var obj = { num: 2 }; // num = 4  
obj.fn = (function (num) {
    this.num += 2; 
    num--; // 0 -1 0
    return function (n) { // n = 1 2
        this.num += 2; 
        num--;  
        console.log(n + ++num); //1 2
        // 此时 num = 0  
    };
})(this.num);
var fn = obj.fn; 
fn(1); 
obj.fn(2); 
console.log(num, obj.num); //5 4

复制代码
```

#### 题目六：

```
 document.onclick = new new new fn;
function fn() {
    console.log(this); //此时是fn的实例new fn => fn{}
    return function () {
        console.log(this); // new fn的返回值是匿名函数f()  => {}(没有函数名)
        //第一个new 第三次执行，new {} => 报错
    };
};
复制代码
```

#### 题目七：

```
document.onclick = function () {
    setTimeout(() => {
        console.log(this);
        //document 定时器执行，不形成作用域 箭头函数的上级作用域是事件函数，不是定时器
        new fn;
    }, 1000);
};
function fn() {
    console.log(this);// fn{} 实例
};
复制代码
```

#### 题目八：

```
document.onclick = function () {
    setTimeout(function () {
        console.log(this);
        //window 此处this就是定时器的this 即window
        new fn;
    }, 1000);
};
function fn() {
    console.log(this);// fn{} 实例
};
```