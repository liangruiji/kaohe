基本语法

~~~js
class aa extends OtherClass{
 
  constructor(...) { // 构造器
    super() // 继承类的 constructor 必须调用 `super(...)`，并且 (!) 一定要在使用 `this` 之前调用。
    this.mmm = 666  // 实例属性
		
    if (!this.__proto__.color) { 
    	this.__proto__.color = "red"; // 原型属性
    }
  }

  _waterAmount = 0; // 实例属性，相当于在constructor中写了this._waterAmount = 0
  #waterLimit = 200; // 私有属性 ，只能在类内部使用
  
	// 原型方法 相当于 aa.prototype.bbb = function(){}
  bbb() {
    super.stop(); // 调用父类的 stop
  }
  // 相当于 aa.prototype.something = 66
  get something(...) {
		return "66"
  } // getter 方法
  set something(...) {} // setter 方法
	

 
  
  static staticMethod() {  // 静态方法 aa.staticMethod = function(){}
    alert(this === User);
  }
  static publisher = "Levi Ding"; // 静态属性 相当于 aa.nn = "Levi Ding"
  
  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
}

// 静态属性与方法相当于 
aa.publisher = "Levi Ding";
~~~

然后使用 `new MyClass()` 来创建具有上述列出的所有方法的新对象。

`new` 会自动调用 `constructor()` 方法，因此我们可以在 `constructor()` 中初始化对象。

##### 重写方法

直接写父类已有的方法

子类里重写一个父类中已有的方法，方法中可

执行 `super.method(...)` 来调用一个父类方法。

执行 `super(...)` 来调用一个父类 constructor（只能在我们的 constructor 中）。

##### 重写 constructor

如果一个类扩展了另一个类并且没有 `constructor`，那么将生成下面这样的“空” `constructor`

```javascript
class Rabbit extends Animal {
  // 为没有自己的 constructor 的扩展类生成的
  constructor(...args) {
    super(...args);
  }
}
```

注意：

继承类的 constructor 必须调用 `super(...)`，并且 (!) 一定要在使用 `this` 之前调用。

##### 重写类字段:

一个棘手的注意要点



##### 静态属性和方法

静态属性和方法是可被继承的



##### 扩展内建类



##### 混入

在 JavaScript 中，我们只能继承单个对象。每个对象只能有一个 `[[Prototype]]`。并且每个类只可以扩展另外一个类。

但是有些时候这种设定（译注：单继承）会让人感到受限制。例如，我有一个 `StreetSweeper` 类和一个 `Bicycle` 类，现在想要一个它们的 mixin：`StreetSweepingBicycle` 类。

或者，我们有一个 `User` 类和一个 `EventEmitter` 类来实现事件生成（event generation），并且我们想将 `EventEmitter` 的功能添加到 `User` 中，以便我们的用户可以触发事件（emit event）

J_DcHead tb-shop banner-box