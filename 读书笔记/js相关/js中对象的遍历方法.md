***方法一：通过Object.keys(obj)遍历`返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含Symbol属性).`***Object.values() Object.entries()

```
Object.keys(obj).forEach(function(key){
    console.log(key,obj[key]); 
})
```

***方法二：通过for..in.. 遍历`循环遍历对象自身的和继承的可枚举属性(不含Symbol属性).`***

```
for(let i in obj){
    console.log(i,obj[i]);
}
```

***方法三：通过Object.getOwnPropertyNames(obj)遍历`返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性).`***

```
Object.getOwnPropertyNames(obj).forEach( key => {
    console.log(key,obj[key]);
})
```

***方法四：通过Reflect.ownKeys()遍历`返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.`***

```
Reflect.ownKeys(obj).forEach( key => {
    console.log(key,obj[key]);
})
```



从ES 6开始，属性的顺序是基于一个特殊的规则的，除非特指按照时间排序。通过两个新方法`Object.getOwnPropertyNames`和`Reflect.ownKeys`来编写示例讲解这一属性排序规则。

- **数字**：当属性的类型时数字类型时，会按照数字的从大到小的顺序进行排序；
- **字符串**：当属性的类型是字符串时，会按照时间的先后顺序进行排序；
- **Symbol**：当属性的类型是Symbol时，会按照时间的先后顺序进行排序。

如果需要有序集合，建议将数据存储到数组或`Set`中。

## 总结

`Object.values()` 和`Object.entries()` 是为JS开发人员提供新的标准化辅助函数的另一个改进步骤。

`Object.entries()`最适用于数组解构赋值，其方式是将键和值轻松分配给不同的变量。 此函数还可以轻松地将纯JS对象属性映射到`Map`对象中。、

注意，`Object.values()`和`Object.entries()`返回数据的顺序是不确定的，所以不要依赖该方式。

