### sync 修饰符

作用：父子传参双向绑定数据的语法糖，

vue 提供 `update:my-prop_name` 的模式触发事件。

```html
//子组件
close(){
    this.isShow = false
    this.$emit('update:visible', false)
}

//父组件
<button @click='show = !show'></button>
<drag :visible='show'  @update:visible="val => show = val" />
：xx.sync = "total"等价于 :xx="total" v-on : undate :xx= "total=$event"

```

为了方便起见，vue 还提供了一种缩写形式， 即 `.sync` 修饰符

```
//父组件
<button @click='show = !show'></button>
<drag :visible.sync='show'  />

```

通过这种写法，当子组件执行 `close` 事件的时候，不仅改变了自己内部的 `isShow` 的值，而且还将 父组件的 `visible`的状态发生了改变.

vue 修饰符sync的功能是：当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。也可以props传初始值，然后事件监听

#### 实现组件通信双向绑定的方法

三种

1.`update:my-prop_name` 的模式触发事件

步骤：



2.使用 `.sync` 修饰符的语法糖，和方法一是一样的

3.也可以props传初始值，然后事件监听，传回来更新