v-test

v-html



v-show

V-if

v-else

V-else-if



v-for与key属性



v-on

v-bind



v-model

限制：

- `<input>`
- `<select>`
- `<textarea>`
- components

修饰符：

- [`.lazy`](https://cn.vuejs.org/v2/guide/forms.html#lazy) - 取代 `input` 监听 `change` 事件
- [`.number`](https://cn.vuejs.org/v2/guide/forms.html#number) - 输入字符串转为有效的数字
- [`.trim`](https://cn.vuejs.org/v2/guide/forms.html#trim) - 输入首尾空格过滤

用法：

在表单控件或者组件上创建双向绑定。细节请看下面的教程链接。

v-slot

缩写：#

限用于

- `<template>`
- [组件](https://cn.vuejs.org/v2/guide/components-slots.html#独占默认插槽的缩写语法) (对于一个单独的带 prop 的默认插槽)

用法：提供具名插槽或需要接收 prop 的插槽

~~~html
<!-- 具名插槽 -->
<base-layout>
  <template v-slot:header>
    Header content
  </template>

  Default slot content

  <template v-slot:footer>
    Footer content
  </template>
</base-layout>

<!-- 接收 prop 的具名插槽 -->
<infinite-scroll>
  <template v-slot:item="slotProps">
    <div class="item">
      {{ slotProps.item.text }}
    </div>
  </template>
</infinite-scroll>

<!-- 接收 prop 的默认插槽，使用了解构 -->
<mouse-position v-slot="{ x, y }">
  Mouse position: {{ x }}, {{ y }}
</mouse-position>
~~~

V-once 

只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

v-pre 

在模板中跳过vue的编译

v-cloak

在vue渲染完指定的整个DOM后才进行显示。它必须和CSS样式一起使用，

```css
[v-cloak] {
  display: none;
}
<div v-cloak>
  {{ message }}
</div>
```