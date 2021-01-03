#### 路由作用：

监听地址栏的改变，在路由出口中渲染不同的组件

#### 概念

1.路由导航（根据不同地址在路由出口渲染不同组件）

2.路由出口（组件渲染的位置）



~~~html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link> <!-- 通过router-link标签使用路由导航 -->
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
~~~

~~~js
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。组件中的<router-view></router-view>为嵌套路由视图入口
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo<router-view></router-view></div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { name: 'foo', 
    path: '/foo', //访问的路径
   	component: Foo, // 路径对应的组件 
  	components: {}  // 命名视图组件
    redirect:'/fol' //重定向，当访问foo路径时会被重定向到fol路径，显示fol组件的内容
  	alias: '/f'     //访问f时，地址为f，但内容是Foo的组件
    children:[{//嵌套路由的的配置
   		// 当 /foo/foo 匹配成功，
      //  DOO组件会被渲染在 Foo组件下 的 <router-view> 中
      path: '/foo', //嵌套路由访问的路径
   		component: DOO, //嵌套路由路径对应的组件
    }]
  },
  { path: '/bar:id', component: Bar } //id为动态路径参数，参数在 ，以冒号开头，作用：某种模式匹配到的所有路由共用同一个组件
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router //在vue实例里注册路由
}).$mount('#app')

// 现在，应用已经启动了！
~~~

步骤

导入vue-router包

定义路由

注册

两个使用方法

声明式导航：通过router-link标签使用，

​						<router-link to="/foo">Go to Bar</router-link>

​						<router-link to="{path:'/foo}">Go to Bar</router-link>

​						<router-link to="{name:'foo'}">Go to Bar</router-link>

编程式导航





其他

##### 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

~~~html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
~~~

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

~~~js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
~~~



##### 路由嵌套

##### 动态路径参数

##### 路由传参





## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 几个守卫函数的参数及使用场景

