https://vuejs.org/v2/guide/render-function.html#JSX
https://github.com/vuejs/jsx-next

##### 内容

```
render() {
  return <p>hello</p>
}
```

动态内容

```
render() {
  return <p>hello { this.message }</p>
}
```

自闭标签

```
render() {
  return <input />
}
```

带组件

```
import MyComponent from './my-component'

export default {
  render() {
    return <MyComponent>hello</MyComponent>
  },
}
```

##### 属性

```
render() {
  return <input type="email" />
}
```

动态属性

```
render() {
  return <input
    type="email"
    placeholder={this.placeholderText}
  />
}
```

使用扩展运算符（对象需要与[Vue Data Object](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)兼容）：

```
render() {
  const inputAttrs = {
    type: 'email',
    placeholder: 'Enter your email'
  }

  return <input {...{ attrs: inputAttrs }} />
}
```

##### 插槽

命名插槽

```
render() {
  return (
    <MyComponent>
      <header slot="header">header</header>
      <footer slot="footer">footer</footer>
    </MyComponent>
  )
}
```

带数据的插槽

```
render() {
  const scopedSlots = {
    header: () => <header>header</header>,
    footer: () => <footer>footer</footer>
  }

  return <MyComponent scopedSlots={scopedSlots} />
}
```

##### 指令

```
<input vModel={this.newTodoText} />
```

带修饰符

```
<input vModel_trim={this.newTodoText} />
```

带click参数的指令

```
<input vOn:click={this.newTodoText} />
```

带参数和修饰符的指令

```
<input vOn:click_stop_prevent={this.newTodoText} />
```

v-html:

```
<p domPropsInnerHTML={html} />
```

##### 功能组件

返回一个功能组件

```
export default ({ props }) => <p>hello {props.message}</p>
```

```
const HelloWorld = ({ props }) => <p>hello {props.message}</p>
```