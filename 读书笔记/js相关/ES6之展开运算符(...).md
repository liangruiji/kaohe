# ES6之展开运算符(...)

### 展开运算符,将一个数组或类数组对象转为用逗号分隔的参数序列

```js
function boo(...arr){
	console.log(arr)//[5,7,9,12]
}

boo(5,7,9,12)
```

##### 常量

const

##### 块作用域

let

##### 解构赋值

~~~js
//数组中的结构赋值
var [a,b,c] = [1,5,7] //a=1、b=5、c=7
//对象中的结构赋值
// 1.变量与属性名一致时
var child = {
  name: '小屁孩',
  age: 15,
  gao: 368
};
var {name,age} = child;

// 2.变量与属性名不一致时，语法  属性名:变量名 来设置变量名

var{name,age,gao:height} =child;

// 3. 不存在的属性时，设置默认值

var {name,age,gao:height,weight = "40kg"}


~~~

使用场景

1. 交换两个变量

2. 获取当前页面的域名和路径

   ```js
   var {hostname:domain, pathname:path} = location;
   ```

3. 函数传对象参数时。没懂

   ~~~js
   function buildDate({year, month, day, hour=0, minute=0, second=0}) {
       return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
   }
   ~~~


##### generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。

~~~js
function* lll() {
      yield 1;
      yield 5;
  		return 7;
    }
    console.log(lll().next()); //{value: 1, done: false} 
    console.log(lll().next()); //	{value: 1, done: false}	说明返回的是一个对象，两次打印直接调用lll();返回的两个对象，所以打印的结果都是第一个。
    
		var a = lll();
    console.log(a.next()); {value: 1, done: false}
    console.log(a.next());{value: 5, done: false}
 		console.log(a.next());{value: 7, done: true}
~~~

1. 生成器直接调用时，返回一个生成器对象，需要用一个变量装这个对象。

2. 获得返回值得方法

   ~~~js
   //第一种方法是不断的调用generator对象的next()方法：
   生成器对象.next();
   //第二个方法是直接用for ... of循环迭代generator对象，这种方式不需要我们自己判断done：
   for(var x of 生成器对象){
   //操作
   }
   ~~~

   

   