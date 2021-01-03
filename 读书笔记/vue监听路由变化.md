##### vue监听路由的变化

```
watch: {
  $route(to, from){
    console.log(to, from)
  }
}
```

to , from 分别表示从哪跳转到哪，都是一个对象 to.path ( 表示的是要跳转到的路由的地址 eg: /home );

