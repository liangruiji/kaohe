#### vue监听路由的变化的几种方式

##### 1.watch

```
watch: {
  $route(to, from){
    console.log(to, from)
  }
}
```

to , from 分别表示从哪跳转到哪，都是一个对象 to.path ( 表示的是要跳转到的路由的地址 eg: /home );



监听 $route.path属性

```
 watch:{
      '$route.path':function(newVal,oldVal){
        //console.log(newVal+"---"+oldVal);
        if(newVal === '/login'){
          console.log('欢迎进入登录页面');
        } else if(newVal === '/register'){
          console.log('欢迎进入注册页面');
        }
      }
 }
```

**注意**：

watch监听路由只有在书写这个watch的**组件存在**(在生命周期create之后)的时候，才能生效，

也就是说只能监听子路由或者当前路由的参数有变化时，如query有变化

刷新不能触发，因为刷新先摧毁再创建，而且创建后路由参数没有变化

不能监听同级路由，



##### 2.组件守卫 `beforeRouteEnter`

**注意**：

1.只有是路由视图组件中才能使用组件守卫

