# JS中的动态类数组和静态类数组

DOM操作：自己操作自己 是剪切

```
//HTML结构
<ul id="ul">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
复制代码
```

#### 一、动态类数组

- document.getElementById()
- document.getElementsByTagName()
- document.getElementsByClassName()
- document.getElementsByName()
- xx.children

```
//使用动态类数组操作DOM 循环数组时，会造成数组塌陷问题
let lis = document.getElementsByTagName('li');
for (let i = 0; i < lis.length; i++) {
    //会造成数组塌陷  原始数组[1,2,3,4,5]
    // 第一次：把数组第一项加入容器末尾 [2,3,4,5,1]
    // 第二次：把数组第二项加入容器末尾 [2,4,5,1,3]
    // 第三次：把数组第三项加入容器末尾 [2,4,1,3,5]
    // 第四次：把数组第四项加入容器末尾 [2,4,1,5,3]
    ul.appendChild(lis[i]); //24153 
    
    // ul.appendChild(lis[0]); //12345 
    //此时每次数组循环都把数组第一项（即索引为0）加入到容器末尾，即可按顺序排列，但数组塌陷问题仍然存在
};
复制代码
```

#### 二、静态类数组

- document.querySelectorAll()

```
 //使用静态类数组，数组不会变，所以尽量使用querySelectorAll获取元素
let lis = document.querySelectorAll('li');
for (let i = 0; i < lis.length; i++) {
    ul.appendChild(lis[i]); //12345
};
```