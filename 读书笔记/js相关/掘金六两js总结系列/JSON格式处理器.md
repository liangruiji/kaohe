# JS笔记(14): JSON格式处理器

### 一、关于JSON

- JSON格式相关规定:
  - 1.复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
  - 2.原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
  - 3.字符串必须使用双引号表示，不能使用单引号。
  - 4.对象的键名必须放在双引号里面。
  - 5.数组或对象最后一个成员的后面，不能加逗号

- JSON格式处理器：
  - 用来处理普通值和JSON文本之间的转换
- JSON字符串：
  - 用JSON格式写的文本
- JSON处理器有两个静态方法：
  - 1.`JSON.parse()`
  - 2.`JSON.stringify()`

### 二、JSON.stringify()

```
JSON.stringify()
```

- 将其他类型的值转换为JSON字符串
- JSON的第二个参数（不常用到，这部分可忽略）：
  - 1.用来指定可以转换成JSON字符串的属性(只对普通对象有效)
  - 2.也可以是一个函数，转换的JSON字符串会变味函数的返回值；此处，函数可以有两个参数(key,value),分别为对象键值对的属性名和属性值，如果属性值是数字，可以做数学处理，返回处理后的字符串
- JSON还有第三个参数，也不常用到，感兴趣的朋友可参考其他文档

```
console.log(JSON.stringify(123)); //'123'
console.log(JSON.stringify('123')); //'"123"'
console.log(JSON.stringify(true)); // 'true'
console.log(JSON.stringify('true')); //'"true"'
console.log(JSON.stringify(null)); //'null'
console.log(JSON.stringify({ name: 'Tom' })); //'{"name":"Tom"}'
console.log(JSON.stringify({ undefined, name: 'Tom' })); //'{"name":"Tom"}' 对象中的undefined被浏览器过滤掉
console.log(JSON.stringify([1, { name: 'Tom' }])); //'[1,{"name":"Tom"}]'
console.log(JSON.stringify([undefined, { name: 'Tom' }])); //'[null,{"name":"Tom"}]' 数组中的undefined转为null
console.log(JSON.stringify(/^\d$/)); //{} 正则会转为空对象
复制代码
 //JSON的第二个参数:指定可以转换成JSON字符串的属性
let obj = {
    name: 'Tom',
    age: 18,
    id: 123
}
console.log(JSON.stringify(obj, ['name', 'id'])); //'{"name":"Tom","id":123}'
复制代码
//JSON.stringify方法的第二个参数是函数的情况
function fn() {
    return 123
};
console.log(JSON.stringify({ a: 1 }, fn)); //'123'

function fn1(key, value) {
    typeof value === 'number' ? value++ : null; //为什么这非得先判断一下呢，直接写下面的value++就不可以 ，我也不明白为什么
    // value++
    return value
};
console.log(JSON.stringify({ a: 1, b: 2 }, fn1)); //{"a":2,"b":4} 

function fn3(key, value) {
    typeof value === 'string' ? value = 'Jerry' : null;
    // value = 'Jerry'
    return value
};
console.log(JSON.stringify({ name: 'Tom' }, fn3)); //{"name":"Jerry"}
复制代码
```

### 三、JSON.parse()

- `JSON.parse()` 将 JSON 字符串转换成其他值
- JSON.parse()的第二个参数（不常用到，可忽略）： 可以是个函数，函数返回值会改变对象的属性值

```
console.log(JSON.parse('123')); //123
console.log(JSON.parse('"123"')); //"123"
console.log(JSON.parse('true')); //true
console.log(JSON.parse('null')); //null
console.log(JSON.parse('{"name":"Tom"}')); //{name: "Tom"}
复制代码
//JSON.parse()的第二个参数是函数的情况
function f(key, value) {
    if (key === 'a') {
        return value + 10;
    }
    return value;
}
console.log(JSON.parse('{"a": 1, "b": 2}', f)); // {a: 11, b: 2}
```