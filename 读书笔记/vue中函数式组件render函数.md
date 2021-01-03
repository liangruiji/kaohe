`createElement` 接受的参数：(标签名,！属性数据对象,！子节点)

1.全局组件中使用

```js
Vue.component('全局组件名',{
  render(createElement){
	// @returns {VNode} 返回虚拟dom节点对象
	return createElement(
  	// {String | Object | Function}
  	// 一个 HTML 标签名、组件选项对象，或者
 	 	// resolve 了上述任何一种的一个 async 函数。必填项。
  	'div',

  	// {Object}
  	// 一个与模板中 attribute 对应的数据对象。可选。
  	{
   		// 这里可以设置class之类的属性
  	},

  	// {String | Array}
  	// 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  	// 也可以使用字符串来生成“文本虚拟节点”。可选。
  	[
    	'先写一些文字',
    	createElement('h1', '一则头条'),
    	createElement(MyComponent, {
      	props: {
        	someProp: 'foobar'
      	}
    	})
  	]
	)
  },
  //这里声明需要父传子的属性，可以设置验证，类型验证等
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

2.在局部组件中使用

步骤1.在子组件中使用render()函数和createElement()函数生成虚拟dom节点对象

~~~js
<script>
export default {
  render(h, y) {
    console.log(y)
    return h('div', { class: 'kkl' }, [
      h('h2', 'render函数的使用,第一个参数h()'),
      h('h3', 'h(标签名,！属性数据对象,！子节点)'),
      h(
        'h4',
        '子节点可以使用字符串生成文本节点，也可以由h()生成，多个子节点用数组表示',
      ),
    ])
  },
}
export const child3 = {
  render(h) {
    return h('div', {}, [
      h('h2', '使用了默认插槽'),
      this.$slots.default,
    ])
  },
}
export const child4 = {
  render(h) {
    return h('div', { style: { color: 'red' } }, [
      h('h2', '使用了作用域插槽'),
      h('h2', this.test),
      this.$scopedSlots.default({ a: 1 }),
    ])
  },
  props: {
    test: String,
  },
}
export const child5 = {
  render(h) {
    return (
      <div>
        <h2>可以直接return标签</h2>
      </div>
    )
  },
}
</script>
~~~

步骤2.在父组件中导入虚拟dom节点对象

步骤3.在其中声明为局部组件

~~~html
<template>
	<child1></child1>
	<child3>我是默认插槽</child3>
	<child4 v-slot="a" test="我是父传子的参数">{{ a }}</child4>
	<child5></child5>
</template>
<script>
  import child1, { child3, child4, child5 } from './child1'
  export default {
  	name: 'Test',
  	components: {
    	child5,
    	child4,
    	child3,
    	child1,
    	child,
  	}
  	}
</script>
~~~





概念

0.渲染函数

1.标签名

2.VNode 数据对象

3.子节点（即是标签内容），多个子节点用数组表示，三种子节点的表示方法

4.子节点中插槽的使用





VNode 数据对象

~~~js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
~~~

子节点

由 `createElement()` 构建而成，也可以使用字符串来生成“文本虚拟节点”

