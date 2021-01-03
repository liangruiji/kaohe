### component组件

#### 作用：

根据is属性值渲染不同的组件

~~~vue

<component :is="组件名变量"></component>

<component is="组件名"></component>

<component v-bind=obj></component>

{
	data:{
		obj:{
			is:'组件名'或者 组件名变量,
			name: '',//其他属性
		}
	}
}
~~~

