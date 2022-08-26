alert组件中

this.$slots访问当前组件的插槽

两种处理props还是插槽显示的方式

~~~vue
<span class="el-alert__title" :class="[ isBoldTitle ]" v-if="title || $slots.title">
	<slot name="title">{{ title }}</slot>
</span>

<p class="el-alert__description" v-if="$slots.default && !description"><slot></slot>		</p>
<p class="el-alert__description" v-if="description && !$slots.default">{{ description }}</p>
~~~

用props属性来拼接类名，

~~~vue
:class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
props: {
  type: {
        type: String,
        default: 'info'
      },	
}
computed: {
	typeClass() {
  	return `el-alert--${ this.type }`;
  },
}
~~~

