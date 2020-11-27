# JS判断数组中是否包含某个值

### 方法一：`array.indexOf`

> 此方法判断数组中是否存在某个值，如果存在，则返回数组元素的**下标**，否则返回-1。

```
var arr=[1,2,3,4];
var index=arr.indexOf(3);
console.log(index);
复制代码
```



![img](https://user-gold-cdn.xitu.io/2019/10/26/16e05a7c244140f0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### 方法二：`array.includes(searcElement[,fromIndex])`

> 此方法判断数组中是否存在某个值，如果存在返回`true`，否则返回`false`

```
var arr=[1,2,3,4];
if(arr.includes(3))
    console.log("存在");
else
    console.log("不存在");
复制代码
```



![img](https://user-gold-cdn.xitu.io/2019/10/26/16e05ac4547a6df2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### 方法三：`array.find(callback[,thisArg])`

> 返回数组中满足条件的**第一个元素的值**，如果没有，返回`undefined`

```
var arr=[1,2,3,4];
var result = arr.find(item =>{
    return item > 3
});
console.log(result);
复制代码
```



![img](https://user-gold-cdn.xitu.io/2019/10/26/16e05b0f3a3de7a6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果元素是对象：



```
var items=[
    {id:1,name:'yxy'},
    {id:2,name:'whc'},
    {id:3,name:'hzj'},
    {id:4,name:'fyq'}
];
var result = items.find(item=>{
    return item.id == 3;
});
console.log(result);
result.name = '我变了';
console.log(result);
console.log(items);
```



![img](https://user-gold-cdn.xitu.io/2019/10/26/16e05b6ae4f09217?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### 方法四：`array.findeIndex(callback[,thisArg])`

> 返回数组中满足条件的第一个元素的**下标**，如果没有找到，返回**-1**

```
var arr=[1,2,3,4];
var result = arr.findIndex(item =>{
    return item > 3
});
console.log(result);
复制代码
```



![img](https://user-gold-cdn.xitu.io/2019/10/26/16e05b2d8ee11f92?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### 方法五：当然不能忘了养大我们的for循环和if

```
var arr=[1,2,3,4];
var k=0;
for(var i=0;i<arr.length;i++){
    if(arr[i]==3)
        k=1;
}
if(k)
    console.log("存在");
else
    console.log("不存在");
复制代码
```



![img](https://user-gold-cdn.xitu.io/2019/10/26/16e05badb640cc6e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)