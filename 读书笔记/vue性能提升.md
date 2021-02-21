#### Object.freeze()

Object.freeze() 方法用于冻结对象，禁止对于该对象的属性进行修改（由于`数组本质也是对象`，因此该方法可以对数组使用）。在 Mozilla MDN 中是如下介绍的：

> 可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改

该方法的返回值是其参数本身。



如果你有一个巨大的数组或Object，并且确信数据不会修改，使用Object.freeze()可以让性能大幅提升。

对于纯展示的大数据，都可以使用Object.freeze提升性能。

并且，Object.freeze()冻结的是值，你仍然可以将变量的引用替换掉。



#### 其他

**锁定对象的方法**

- Object.preventExtensions()

no new properties or methods can be added to the project 对象不可扩展, 即不可以新增属性或方法, 但可以修改/删除

- Object.seal()

same as prevent extension, plus prevents existing properties and methods from being deleted 在上面的基础上，对象属性不可删除, 但可以修改

- Object.freeze()

same as seal, plus prevent existing properties and methods from being modified 在上面的基础上，对象所有属性只读, 不可修改

以上三个方法分别可用Object.isExtensible(), Object.isSealed(), Object.isFrozen()来检测

## 


作者：Mr_Google
链接：https://juejin.cn/post/6844903922469961741
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

