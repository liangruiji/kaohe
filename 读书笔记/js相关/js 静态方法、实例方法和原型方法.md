# 静态方法,实例方法,原型方法的区别

# 基础知识

静态方法和实例方法的定义

```
A static method (or static function) is a method defined as a member of an object but is accessible directly from an API object's constructor, rather than from an object instance created via the constructor.
静态方法（或静态函数）是定义为对象成员的方法，但可以直接从API对象的构造函数访问，而不是通过构造函数创建的对象实例访问。
Methods called on object instances are called instance methods.
在对象实例上调用的方法称为实例方法。
复制代码
```

[内容取自MDN,点击跳转连接](https://developer.mozilla.org/zh-CN/docs/Glossary/Static_method)

# 区别

三种方法的区别主要在于

1.是否可以被构造函数和实例对象调用

| 方法类别 | 是否可以被 构造函数 调用 | 是否可以被 实例化对象 调用 |
| -------- | ------------------------ | -------------------------- |
| 静态方法 | 可以                     | 不可以                     |
| 实例方法 | 不可以                   | 可以                       |
| 原型方法 | 不可以                   | 可以                       |

2.内存空间分配情况(待验证)

Q:跟后台同时沟通 java 中的静态方法和实例方法有内存分配的区别，前端暂时没有找到官方资料支持，待验证,以下是结论 静态方法随构造函数一同生成，存放集中 实例方法随实例化对象生成产生，存放较为离散

# 验证

```javascript
// 初始化构造函数
 const Parent = function() {
 	// 添加实例方法
	this.instanceFunc = function() {
	  console.log('可以访问实例方法');
	}
}
// 添加静态方法
 Parent.staticFunction = function() {
    console.log('可以访问静态方法');
 }
 // 添加原型方法
 Parent.prototype.protoFunc = function() {
    console.log('可以访问原型方法');
 }
 // 生成实例化对象
 const parent = new Parent()
 // 方法调用测试
 console.log('/* 静态方法测试 */');
 console.log('构造函数', Parent.staticFunction);
 console.log('实例化对象', parent.staticFunction);
 console.log('/* 实例方法测试 */');
 console.log('构造函数', Parent.instanceFunc);
 console.log('实例化对象', parent.instanceFunc);
 console.log('/* 原型方法测试 */');
 console.log('构造函数', Parent.protoFunc);
 console.log('实例化对象', parent.protoFunc);
 console.log(Parent.prototype);
复制代码
```

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1bf110209784c0ab21b6e71afe12b26~tplv-k3u1fbpfcp-watermark.image)

https://juejin.cn/post/6885253524125384717