#### 插槽

#### 作用：

向子组件传替内容，如：`<子组件> 传替的内容 </子组件>`

#### 几个概念

插槽内容

匿名插槽

具名插槽

有默认内容的插槽

带数据的插槽：父组件上使用子组件，在插槽里，使用子组件的数据

解构插槽 Prop

有内容的插槽会被渲染

#### 使用：

##### 1.先在子组件的模板中使用 slot组件，作为内容分发插槽

~~~js
<template>
  <div>
    <h1>我是子组件</h1>
		//我是插槽
    <slot></slot>
		//我是带有默认值的插槽
		<slot>默认值</slot>
		// 我是带有默认值的具名插槽
		<slot name="具名插槽的名字">默认值</slot>
		// 我是带有数据的具名插槽
		<slot name="名字2" v-bind="aaa"></slot>
  </div>
</template>
<script>
	data() {
  	return {
      aaa: {dd:'我是数据',vv:"我还是数据"},
    }
  },  
</script>
~~~

##### 2.在父组件中使用子组件，

###### 2.1在`<template>` 元素中使用v-slot指令

语法：

1.匿名插槽就直接插入内容

2.具名插槽

v-slot:插槽名字 

3.带数据的具名插槽 

v-slot:插槽名字="自定义名 "   

 自定义名：是子组件带数据插槽绑定的所有数据的对象aaa

4.带数据的匿名插槽

 v-slot:default="自定义名字"  简写 v-slot="自定义名字"

**注意**：

1. **`v-slot` 只能添加在 `<template>` 上** (只有[一种例外情况](https://cn.vuejs.org/v2/guide/components-slots.html#独占默认插槽的缩写语法))，和slot和slot-scope属性不同，他们可以加到普通元素中
2. `<template>` 元素中的所有内容都将会被传入相应的具名插槽,
3. 任何没有包裹在带有 `v-slot` 的 `<template>` 中的内容都会被视为默认插槽的内容。
4. 带数据的匿名插槽使用    v-slot:default="自定义名字"  简写 v-slot="自定义名字"
5. 使用解构赋值获得一部分数据dd和vv  v-slot:default="{dd,vv}" 
6. 只能有一个匿名插槽
7. 父组件插槽中能使用子组件的类名，也可以使用父组件里的类名，两者都有时，看选择器权重，权重相同时，父组件会覆盖子组件

~~~js
<father>
  示例1
	<child>我是匿名插槽的内容</child>  //内容会覆盖到所有的匿名插槽中，不显示其他没有内容的插槽

	示例2
	<child>
  <div>匿名插槽的内容</div>                //内容会覆盖到所有的匿名插槽中
	<template v-slot:具名插槽的名字>				  //内容会覆盖到名字一样的具名插槽中
    <div>具名插槽的内容</div> 
	</template>            		
  </child>

  示例3
	<child>
    <template v-slot:具名插槽的名字="shuju">	
	  	<div>{{ shuju.dd }}</div>	 //插槽内容使用了子组件才有的数据aaa，
		</template>  
  </child>

</father>
~~~



或者

###### 2.2使用废弃的属性slot slot-scope

语法：

1.匿名插槽就直接插入内容

2.具名插槽就使用slot属性，slot="具名插槽的名字"

3.带数据的插槽使用slot-scope属性，slot-scope="自定义名  代表着子组件带数据插槽绑定的所有数据的对象"

~~~js
<father>
  示例1
	<child>我是匿名插槽的内容</child>  //内容会覆盖到所有的匿名插槽中，不显示其他没有内容的插槽
	示例2
	<child>
  <div>匿名插槽的内容</div>                         //内容会覆盖到所有的匿名插槽中
  <div slot='具名插槽的名字'>具名插槽的内容</div>			//内容会覆盖到名字一样的具名插槽中
  </child>
  示例3
	<child>
	  <div slot='名字2' slot-scope="shuju">{{ shuju.dd }}</div>	//插槽内容使用了子组件才有的数据aaa，
  </child>

</father>
~~~

~~~
//sycm.taobao.com/ipoll/live/rank/getCompetitorHotOfferRank.json?competitorUserId=1758914218&device=0&index=gmv&limit=15&page=1
//sycm.taobao.com/ipoll/live/rank/getCompetitorHotOfferRank.json?competitorUserId=1758914218&device=0&index=uv&limit=15&page=1


//sycm.taobao.com/ipoll/datawar/getUvRank.json?device=1&limit=30&page=1
//sycm.taobao.com/ipoll/datawar/getPayamtRank.json?device=0&limit=30&page=1
~~~

