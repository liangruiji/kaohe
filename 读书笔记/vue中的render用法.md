render用法：不是很明白

~~~js
new Vue({
  el: '#app',
  router,
  store,
  //render: h => h(App)的作用是：使用App作为这个Vue实例的template(同时一并注册了App组件)
  //等价于template:<App></App>,components:{App}
  render: h => h(App),
  // eslint-disable-next-line eol-last
})
~~~

