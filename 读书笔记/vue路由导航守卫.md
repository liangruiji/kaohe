https://zhuanlan.zhihu.com/p/54112006

#### 导航守卫是什么

导航守卫就是路由跳转过程中的一些钩子函数，再直白点路由跳转是一个大的过程，这个大的过程分为跳转前中后等等细小的过程，在每一个过程中都有一函数，这个函数能让你操作一些其他的事儿的时机，这就是导航守卫。

#### 作用：

在路由跳转的过程中，可以操作一些事

#### 导航解析流程

1. 导航被触发

2. 组件路由守卫 `beforeRouteLeave` 守卫（在失活的组件里调用）。

3. 调用全局前置守卫: `beforeEach` 

4. 组件路由守卫 `beforeRouteUpdate` 守卫 (在重用的组件里调用)。

5. **独享路由钩子** `beforeEnter`（在路由配置里调用）。

6. 解析异步路由组件。

7. 组件路由守卫 `beforeRouteEnter`（在被激活的组件里调用）。

8. 全局解析守卫 `beforeResolve` 守卫 (2.5+)。

9. 导航被确认。

10. 全局后置守卫 `afterEach` 。

11. 触发 DOM 更新。

11.1 组件生命周期beforeCreate

11.2 组件生命周期created

11.3 组件生命周期beforeMount

11.4 组件生命周期mounted

12. 组件路由守卫`beforeRouteEnter` 的 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

#### 导航守卫分分类：

全局的、单个路由独享的、组件内的三种。

##### 1.全局守卫：是指路由实例上直接操作的钩子函数

特点：所有路由配置的组件都会触发，直白点就是触发路由就会触发这些钩子函数

有三个：

全局前置守卫: `beforeEach`   这个钩子作用主要是用于登录验证

全局解析守卫 `beforeResolve` 

全局后置守卫 `afterEach`

位置：路由实例直接调用

~~~js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
~~~



##### 2.路由独享守卫：是指在单个路由配置的时候也可以设置的钩子函数

特点：跳转到 有设置了路由独享守卫的路由 才会触发

只有一个：

独享路由守卫: `beforeEnter`

位置：在相应路由配置中配置，自动在某个时间调用

~~~js
//如
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
~~~

##### 3.组件路由守卫：是指在组件内执行的钩子函数，类似于组件内的生命周期，相当于为配置路由的组件添加的生命周期钩子函数。

特点：

三个：

组件守卫 `beforeRouteLeave` 守卫（在失活的组件里调用）

组件守卫 `beforeRouteUpdate` 守卫 (在重用的组件里调用)。

组件守卫 `beforeRouteEnter`（在被激活的组件里调用）



位置：在组件内配置，自动在某个时间调用

**注意**：

1.只有在路由配置中对应的组件中才能使用

2.`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。







**全局路由钩子：beforeEach(to,from, next)、beforeResolve(to,from, next)、afterEach(to,from)；**

**独享路由钩子：beforeEnter(to,from, next)；**

**组件内路由钩子：beforeRouteEnter(to,from, next)、beforeRouteUpdate(to,from, next)、beforeRouteLeave(to,from, next)**



#### 导航守卫回调参数

to：目标路由对象；

from：即将要离开的路由对象；

next：他是最重要的一个参数，他相当于佛珠的线，把一个一个珠子逐个串起来。以下注意点务必牢记：

1.但凡涉及到有next参数的钩子，必须调用next() 才能继续往下执行下一个钩子，否则路由跳转等会停止。

2.如果要中断当前的导航要调用next(false)。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到`from`路由对应的地址。（主要用于登录验证不通过的处理）

3.当然next可以这样使用，next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。意思是当前的导航被中断，然后进行一个新的导航。可传递的参数与[router.push](https://link.zhihu.com/?target=https%3A//router.vuejs.org/zh/guide/essentials/navigation.html)中选项一致。

4.在beforeRouteEnter钩子中next((vm)=>{})内接收的回调函数参数为当前组件的实例vm，这个回调函数在生命周期mounted之后调用，也就是，他是所有导航守卫和生命周期函数最后执行的那个钩子。

5.next(error): (v2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 `router.onError()` 注册过的回调。





**当点击切换路由时：beforeRouterLeave-->beforeEach-->beforeEnter-->beforeRouteEnter-->beforeResolve-->afterEach-->beforeCreate-->created-->beforeMount-->mounted-->beforeRouteEnter的next的回调**

**当路由更新时：beforeRouteUpdate**

