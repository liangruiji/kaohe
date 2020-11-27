## 	ES6新加的数据类型Map、Set 

### Map

初始化Map需要一个**二维数组**，或者直接初始化一个空Map

~~~js
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
var m = new Map(); // 空Map

m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
~~~

```js
//多次对一个key放入value，后面的值会把前面的值冲掉：
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88
```

### Set

```js
s = new Set(![]); //返回参数数组去重后的Set
s.add(4);//添加
s.delete(4)//删除
s.has('Adam'); // 是否存在key 'Adam': true
```

