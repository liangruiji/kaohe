# js 中in 的不同用法

## for-in 一般用来遍历对象, 也可以用来遍历数组

```
    var obj = {
       name: "xiaoming",
       age: 8
       };
        for(var k in obj) {
        // 此处使用 点运算符，不能获取到相应的值：
        // . 的作用：访问对象的属性
        console.log("键为：" + k + ", 值为：" + obj[k]);
       }
    
       var arr = [1, 3, 5];
      for(var k in arr) {
        console.log("键为：" + k + ", 值为：" + arr[k]);
   }
    
复制代码
```

## in 运算符作用：

就是判断 属性是否存在于对象中，如果存在，返回值为：true 如果不存在，则为：false 语法：属性 in 对象

```
var obj = {
             name1: "jack",
             age: 9,
             abc: undefined
         };
        
 
         如果是name，要注意：window有name属性

       console.log("name1" in obj); // true
         console.log("age" in obj);
         console.log("age123" in obj);

         如果是对象中存在的成员或者是原型中的成员，此时，返回的结果就是 true
         console.log("toString" in obj);
         console.log(obj.toString());
         console.log("abc" in obj);
复制代码
```

## in运算符判断数组

```
     对于数组来说，索引号 就是属性
复制代码
   var arr = [1];
         console.log("1" in arr); // false
         console.log("0" in arr); // true
         console.log(0 in arr); // true

         访问数组的成员：
         可以使用 数组索引 也可以使用 字符串
        console.log(arr[0]);
        console.log(arr["0"]);
```