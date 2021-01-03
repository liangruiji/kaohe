

### 1.key

- **预期**：`number | string | boolean (2.4.2 新增) | symbol (2.5.12 新增)`

  `key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

  有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。

  #### 使用场景

  ##### 1 在v-for中使用

  最常见的用例是结合 `v-for`：

  ```html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  ##### 2.用来触发过渡使用

  它也可以用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：

  - 完整地触发组件的生命周期钩子
  - 触发过渡

  例如：

  ```html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  当 `text` 发生改变时，`<span>` 总是会被替换而不是被修改，因此会触发过渡。

2.ref

`ref` 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

使用：

1.在元素或子组件标签使用，ref="a"

2.在父组件用this.$refs.a表示该dom元素或者组件实例



3.is

4.slot

5.slot-scope

6.scope

**被 2.5.0 新增的 [slot-scope](https://cn.vuejs.org/v2/api/#slot-scope) 取代。推荐 2.6.0 新增的 [v-slot](https://cn.vuejs.org/v2/api/#v-slot)。**

用法：除了 `scope` 只可以用于 `<template>` 元素，其它和 [`slot-scope`](https://cn.vuejs.org/v2/api/#slot-scope) 都相同。

