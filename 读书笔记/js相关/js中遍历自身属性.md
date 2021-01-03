## 遍历一个对象的所有自身属性

在看开源项目的过程中，经常会看到类似如下的源码。`for...in`循环对象的所有枚举属性，然后再使用`hasOwnProperty()`方法来忽略继承属性。

```js
var buz = {
    fog: 'stack'
};

for (var name in buz) {
    if (buz.hasOwnProperty(name)) {
        alert("this is fog (" + name + ") for sure. Value: " + buz[name]);
    }
    else {
        alert(name); // toString or something else
    }
}
  
```

## 注意 `hasOwnProperty` 作为属性名

JavaScript 并没有保护 `hasOwnProperty` 属性名，因此，可能存在于一个包含此属性名的对象，有必要使用一个可扩展的`hasOwnProperty`方法来获取正确的结果：

```js
var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，可以直接使用原型链上真正的 hasOwnProperty 方法
// 使用另一个对象的`hasOwnProperty` 并且call
({}).hasOwnProperty.call(foo, 'bar'); // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```

