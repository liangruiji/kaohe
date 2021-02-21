#### WebStorage、cookie 和 IndexedDB之间的区别

| 特性           | vuex         | cookie                                 | localStorage             | sessionStorage | indexDB                  |
| -------------- | ------------ | -------------------------------------- | ------------------------ | -------------- | ------------------------ |
| 数据生命周期   | 刷新就会丢失 | 一般有服务器生成                       | 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在 |
| 数据存储大小   |              | 4K                                     | 5M                       | 5M             | 无限                     |
| 与服务器端通信 |              | 每次都会在header中，对于请求性能有影响 | 不参与                   | 不参与         | 不参与                   |
|                |              |                                        |                          |                |                          |
|                |              |                                        |                          |                |                          |

从上表可以看到，cookie 已经不建议用于存储。如果没有大量数据存储需求的话，可以使用 localStorage 和 sessionStorage 。对于不怎么改变的数据尽量使用 localStorage 存储，否则可以用 sessionStorage 存储。



### localStorage

注意：只能以字符串的形式储存

| 名称                 | 作用                                         |
| -------------------- | -------------------------------------------- |
| clear                | 清空localStorage上存储的数据                 |
| getItem              | 读取数据                                     |
| hasOwnProperty       | 检查localStorage上是否保存了变量x，需要传入x |
| key                  | 读取第i个数据的名字或称为键值(从0开始计数)   |
| length               | localStorage存储变量的个数                   |
| propertyIsEnumerable | 用来检测属性是否属于某个对象的               |
| removeItem           | 删除某个具体变量                             |
| setItem              | 存储数据                                     |
| toLocaleString       | 将（数组）转为本地字符串                     |
| valueOf              | 获取所有存储的数据                           |

#### 1.清空localStorage

```javascript
localStorage.clear()    // undefined    
localStorage            // Storage {length: 0}
```

#### 2.存储数据

```javascript
localStorage.setItem("name","caibin") //存储名字为name值为caibin的变量
localStorage.name = "caibin"; // 等价于上面的命令
localStorage // Storage {name: "caibin", length: 1}
```

#### 3.读取数据

```javascript
localStorage.getItem("name") //caibin,读取保存在localStorage对象里名为name的变量的值
localStorage.name // "caibin"
localStorage.valueOf() //读取存储在localStorage上的所有数据
localStorage.key(0) // 读取第一条数据的变量名(键值)
//遍历并输出localStorage里存储的名字和值
for(var i=0; i<localStorage.length;i++){
    console.log('localStorage里存储的第'+i+'条数据的名字为：'+localStorage.key(i)+',值为：'+localStorage.getItem(localStorage.key(i)));
}
```

#### 4.删除某个变量

```javascript
localStorage.removeItem("name"); //undefined
localStorage // Storage {length: 0} 可以看到之前保存的name变量已经从localStorage里删除了
```

#### 5.检查localStorage里是否保存某个变量

```javascript
// 这些数据都是测试的，是在我当下环境里的，只是demo哦～
localStorage.hasOwnProperty('name') // true
localStorage.hasOwnProperty('sex')  // false
```

#### 6.将数组转为本地字符串

```javascript
var arr = ['aa','bb','cc']; // ["aa","bb","cc"]
localStorage.arr = arr //["aa","bb","cc"]
localStorage.arr.toLocaleString(); // "aa,bb,cc"
```

#### 7.将JSON存储到localStorage里

```javascript
var students = {
    xiaomin: {
        name: "xiaoming",
        grade: 1
    },
    teemo: {
        name: "teemo",
        grade: 3
    }
}

students = JSON.stringify(students);  //将JSON转为字符串存到变量里
console.log(students);
localStorage.setItem("students",students);//将变量存到localStorage里

var newStudents = localStorage.getItem("students");
newStudents = JSON.parse(students); //转为JSON
console.log(newStudents); // 打印出原先对象
```

#### 8.过期时间

很遗憾，localstorage原生是不支持设置过期时间的，想要设置的话，就只能自己来封装一层逻辑来实现：

```
function set(key,value){
  var curtime = new Date().getTime();//获取当前时间
  localStorage.setItem(key,JSON.stringify({val:value,time:curtime}));//转换成json字符串序列
}
function get(key,exp)//exp是设置的过期时间
{
  var val = localStorage.getItem(key);//获取存储的元素
  var dataobj = JSON.parse(val);//解析出json对象
  if(new Date().getTime() - dataobj.time > exp)//如果当前时间-减去存储的元素在创建时候设置的时间 > 过期时间
  {
    console.log("expires");//提示过期
  }
  else{
    console.log("val="+dataobj.val);
  }
}
```

改变的方式，就是相当于给对应的key重新赋值，就会把原来的值覆盖掉

