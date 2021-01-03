vue-router中的this.$route和this.$route的区别

打印this可以直观的看到区别

### $route 表示(当前路由信息对象)

表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录）。
 路由信息对象：即$router会被注入每个组件中，可以利用它进行一些信息的获取。

```bash
**1.$route.path**
      字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。
**2.$route.params**
      一个 key/value 对象，包含了 动态片段 和 全匹配片段，
      如果没有路由参数，就是一个空对象。
**3.$route.query**
      一个 key/value 对象，表示 URL 查询参数。
      例如，对于路径 /foo?user=1，则有 $route.query.user == 1，
      如果没有查询参数，则是个空对象。
**4.$route.hash**
      当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。锚点
**5.$route.fullPath**
      完成解析后的 URL，包含查询参数和 hash 的完整路径。
**6.$route.matched**
      数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
**7.$route.name    当前路径名字**
**8.$route.meta  路由元信息
```

出现的地方：

1.在组件内，即this.route

2.导航守卫的参数

3.在路由观察者回调内 router.match(location) 的返回值

~~~js
router.beforeEach((to, from, next) => {
  // to 和 from 都是 路由信息对象
})
watch: {
  $route(to, from) {
     // to 和 from 都是 路由信息对象
  }
}
~~~

### 2. $router对象

全局的路由实例，是router构造方法的实例。
在 Vue 实例内部，你可以通过 $router 访问路由实例

2.1 全局挂载路由实例

```php
// 全局注册的路由
Vue.use(VueRouter)
```

2.2 路由实例方法push



```kotlin
// 字符串
      this.$router.push('home')
// 对象
      this.$router.push({ path: 'home' })
// 命名的路由
      this.$router.push({ name: 'user', params: { userId: 123 }})
// 带查询参数，变成 /register?plan=123
      this.$router.push({ path: 'register', query: { plan: '123' }})
```

push方法其实和<router-link :to="...">是等同的。
 注意：push方法的跳转会向 history 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面。
 2.2 路由实例方法go



```kotlin
// 页面路由跳转 前进或者后退
this.$router.go(-1) // 后退
```

2.3 路由实例方法replace

```kotlin
//push方法会向 history 栈添加一个新的记录，而replace方法是替换当前的页面，
不会向 history 栈添加一个新的记录

<router-link to="/05" replace>05</router-link>

// 一般使用replace来做404页面
this.$router.replace('/')
```