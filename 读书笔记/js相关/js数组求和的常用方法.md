# [JavaScript数组求和的常用方法](https://segmentfault.com/a/1190000023556599)

[javascript](https://segmentfault.com/t/javascript)

发布于 8月9日

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000023556599&referer=https%3A%2F%2Fsegmentfault.com%2Fblog%2Fmynotes&cb=4e9d2994cf)

JS数组求和的常用方法。

## 一、for循环

```
var arr = [1,2,3];
function sum(arr) {
  var s = 0;
  for (var i = 0;i<arr.length;i++) {
    s += arr[i];
  }
  return s;
}
console.log(sum(arr));//6
```

## 二、forEach遍历

```
var arr = [1,2,3];
function sum(arr) {
  var s = 0;
  arr.forEach(function(val, idx, arr) {
    s += val;
  }, 0);
  return s;
};
console.log(sum(arr));//6
```

## 三、reduce

```
var arr = [1,2,3];
function sum(arr) {
  return arr.reduce(function(acr, cur){
    return acr + cur;
  });
}
console.log(sum(arr));//6
```

## 四、递归

```
var arr = [1,2,3];
function sum(arr) {
  if(arr.length == 0){
    return 0;
  } else if (arr.length == 1){
    return arr[0];
  } else {
    return arr[0] + sum(arr.slice(1));
  }
}
console.log(sum(arr));//6
```

## 五、eval

```
var arr = [1,2,3];
function sum(arr) {
  return eval(arr.join("+"));
};
console.log(sum(arr));//6
```