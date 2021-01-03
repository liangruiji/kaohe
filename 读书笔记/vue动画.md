## vue过渡与动画

#### 注意

这里的过渡是元素插入、移除时触发的

#### 使用

1.过渡的元素需要添加`transition`组件，使过渡元素被`<transition>`组件包裹着，有一个name属性，决定着css过渡类名的前缀，默认为v-

2.当过渡元素是整个列表时，使用 了`v-for`，要使用`<transition-group>` 组件包裹着

3.然后写一些css过渡类名，或js钩子函数，来自定义过渡动画

#### 机制：

当插入或删除包含在 `transition` 组件中的元素时，Vue 将会做以下处理：

1. 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
2. 如果过渡组件提供了 [JavaScript 钩子函数](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子)，这些钩子函数将在恰当的时机被调用。
3. 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作 (插入/删除) 在下一帧中立即执行。(注意：此指浏览器逐帧动画机制，和 Vue 的 `nextTick` 概念不同)





vue在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。包括以下工具：

- 在 CSS 过渡和动画中自动应用 class
- 可以配合使用第三方 CSS 动画库，如 Animate.css
- 在过渡钩子函数中使用 JavaScript 直接操作 DOM
- 可以配合使用第三方 JavaScript 动画库，如 Velocity.js



#### 可以触发过渡的几种情况

Vue 提供了 `transition` 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 `v-if`)

- 条件展示 (使用 `v-show`)

- 动态组件

- 组件根节点

  

#### `transition`组件使用



#### js钩子函数的使用

可以在transition attribute 中声明 JavaScript 钩子



#### 6个过渡的类名

**注意**：

**如果使用一个没有名字的 `<transition>`，则 `v-` 是这些类名的默认前缀。**

**如果使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。**



| 在style使用的类名 | 生效时间                                                     |
| ----------------- | ------------------------------------------------------------ |
| v-enter           | 插入元素时，过渡的开始状态                                   |
| v-enter-active    | 插入元素时，过渡的过程，用来定义进入过渡的过程时间，延迟和曲线函数。 |
| v-enter-to        | 插入元素时，过渡的结束状态                                   |
| v-leave           | 移除元素时，过渡的开始状态                                   |
| v-leave-active    | 移除元素时，过渡的过程，用来定义进入过渡的过程时间，延迟和曲线函数。 |
| v-leave-to        | 移除元素时，过渡的结束状态                                   |

![](/Users/telking/kaohe/读书笔记/img/vue transition.png)



#### css自定义过渡的类名

我们可以通过以下 attribute 来自定义过渡类名：

- `enter-class`
- `enter-active-class`
- `enter-to-class` (2.1.8+)
- `leave-class`
- `leave-active-class`
- `leave-to-class` (2.1.8+)

他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 [Animate.css](https://daneden.github.io/animate.css/) 结合使用十分有用。

~~~js
// 1.引入animate css的库
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    // 2.在transition中写自定义过渡类名属性
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
~~~

~~~js
new Vue({
  el: '#example-3',
  data: {
    show: true
  }
})
~~~

