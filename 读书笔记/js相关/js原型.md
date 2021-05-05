现在不需要深究，只需要这三点

1.函数有prototype属性，指向原型，是当他作为构造函数时，能继承给实例的内容，原型中的方法，所有实例都能继承，为公共方法，比如Array.prototype中存有很多数组的方法

2.实例对象有\__proto__属性，是构造函数继承过来的内容，指向构造函数的prototype属性(即是指向原型)

3.原型的constructor属性指向构造1函数





**通俗的理解这几个的关系：**

> JavaScript引擎是个工厂。
> 最初，工厂做了一个最原始的产品原型。
> 这个原型叫Object.prototype，本质上就是一组无序key-value存储（{}）
>
> 之后，工厂在Object.prototype的基础上，研发出了可以保存一段“指令”并“生产产品”的原型产品，叫函数。
> 起名为Function.prototype，本质上就是[Function: Empty]（空函数）
>
> 为了规模化生产，工厂在函数的基础上，生产出了两个构造器：
> 生产函数的构造器叫Function，生产kv存储的构造器叫Object。
>
> 你在工厂定制了一个产品，工厂根据Object.prototype给你做了一个Foo.prototype。
> 然后工厂发现你定制的产品很不错。就在Function.prototype的基础上做了一个Foo的构造器，叫Foo。
>
> 工厂在每个产品上打了个标签\__proto__，以标明这个产品是从哪个原型生产的。
> 为原型打了个标签constructor，标明哪个构造器可以依照这个原型生产产品。
> 为构造器打了标签prototype，标明这个构造器可以从哪个原型生产产品。
>
> 所以，我觉得先有Function还是Object，就看工厂先造谁了。其实先做哪个都无所谓。因为在你定制之前，他们都做好了。
>
> ![原型链示意图](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype5.png)

![img](https://img2018.cnblogs.com/blog/1468878/201908/1468878-20190812152433941-1980632255.png)

![protos2](https://www.liaoxuefeng.com/files/attachments/1024700039819712/l)

![img](https://pic2.zhimg.com/80/0c8883d6ec7d29e65f53c82f8473e3a9_1440w.jpg?source=1940ef5c)

~~~js
16:00:28.950 typeof Object.prototype
16:00:28.950 "object"
16:01:09.467 typeof Function.prototype
16:01:09.471 "function"
16:01:38.483 typeof Object.__proto__
16:01:38.489 "function"
16:02:06.867 typeof Function.__proto__
16:02:06.874 "function"


16:14:53.738 Object.__proto__===Function.prototype
16:14:53.743 true
16:15:16.866 Function.prototype===Function.__proto__
16:15:16.874 true
16:15:40.347 Object.__proto__===Function.__proto__
16:15:40.354 true
16:16:38.069 Object.__proto__===Function.prototype===Function.__proto__
16:16:38.077 false
16:16:45.575 Object.__proto__==Function.prototype==Function.__proto__
16:16:45.584 false

function b(){}
16:32:55.141 b.__proto__===Function.__proto__
16:32:55.149 true
16:33:15.023 b.__proto__===Function.prototype
16:33:15.031 true
//说明所有函数包括（构造函数Function Array Object)只有一个原型，就是Function.prototype
17:15:14.794 Function instanceof Object
17:15:14.794 true
17:15:33.204 Object instanceof Function
17:15:33.212 true
~~~

null+object+function





理解：

函数prototype属性，是指函数构建的对象能继承的属性
对象有_ proto _属性，是指继承下来的属性



Object中与原型有关的静态方法
**Object.getPrototypeOf()**  返回一个对象的继承下来属性_ proto _,即是构造函数可以继承的属性prototype

**Object.setPrototypeOf()**设置一个对象的_ proto _属性，即为现有对象设置原型，然后返回一个新对象。这个可以接收两个参数，第一个是现有对象，第二个是原型对象。

**Object.create()** 从原型对象生成新的对象实例,可以代替new命令。它接受一个参数，这个参数为所要继承的原型对象，然后返回一个实例对象。

Object中与原型有关的原型方法

**Object.prototype.isPrototypeOf()** 用于判断一个对象对象是否是另外一个对象的原型。





控制台打印对象
颜色暗淡的是不可枚举属性，可使用`Object.defineProperty(obj, prop, descriptor)`进行设置,Object.getOwnPropertyDescriptor(object1, 'property1')查看
颜色正常的是可枚举属性

~~~javascript
Object.defineProperty(obj, prop, descriptor) //创建、修改新属性

obj：{}, // 需要修改的对象

prop："", // 需求修改或创建的属性

descriptor:{// 属性描述符：数据描述符和存取描述符,两种不能同时存在

configurable:false, //为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
enumerable:false , // 为 true 时，该属性才会出现在对象的枚举属性中。

// 数据描述符
value:undefined // 属性值
writable:false // 为 true 时，属性值才能被赋值运算符改变。
// 存取描述符
get:function(){} // 属性的 getter 函数,如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。该函数的返回值会被用作属性的值。

set:function(){}//属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值）
}

~~~

~~~
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42
~~~

![image-20210401234609708](/web/www/kaohe/读书笔记/img/image-20210401234609708.png)

![图片描述](https://segmentfault.com/img/bVlvcE)

