render(createElement,context){}

第一个参数为createElement函数，返回值是虚拟dom

第二个参数为context，组件没有this代替this的以访问数据



~~~js

<script>
export default {
  name: 'ColumnRender',
  functional: true,  // 1. functional标记为函数化组件
  render(h, ctx) {   // 2. render 第一个参数为createElement函数，返回值是虚拟dom，第二个参数是作为上下文
    return ctx.props.render
      ? ctx.props.render(h,ctx.props.scope)
      : ''
  },
}
</script>

<column-render :render="ddd" :scope="ss">使用组件时传入的属性组成了上下文</column-render>
~~~

我们将组件记为 functional，这意味它无状态（没有 data），无实例（没有 this 上下文）。
在添加 functional: true 之后，组件的 render 函数之间将增加 ctx 参数
组件需要的一切都是通过 ctx 传递，包括：

- props: 提供 props 的对象
- children: VNode 子节点的数组
- slots: slots 对象
- data: 传递给组件的 data 对象
- parent: 对父组件的引用

函数化组件不常用，它应该应用于以下场景：

- 需要通过编程实现在多种组件中选择一种。
- children、props 或者 data 在传递给子组件之前，处理它们。

https://www.jianshu.com/p/367ba1a7729b

https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6



基于模板的函数式组件可以这样声明：

<template functional> </template>