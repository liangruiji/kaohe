#### class

##### 字符串语法



##### 对象语法

 v-bind:class="{ 类名: 布尔值 }"

类名存在与否将取决于布尔值

注意：

1.绑定的数据对象可以在模板内联中，也可以在data属性中、计算属性中

##### 数组语法

v-bind:class="类名变量1"

v-bind:class="[data中的类名变量1, 类名变量2，字符串，value?class1:class2，{ 类名: 布尔值 }]"

注意：

1.数组语法中也可以使用对象语法

v-bind:class="[{ 类名: 布尔值 }, 类名变量2]"

2.绑定的类名变量数组可以在模板内联中，也可以在data属性中、计算属性中



#### style

字符串语法

##### 对象语法

v-bind:style="{ color: data中变量, fontSize: data中变量 + 'px' }"

注意：

1.绑定的数据对象可以在模板内联中，也可以在data属性中、计算属性中

##### 数组语法

v-bind:style="data中的样式对象"

v-bind:style="[data中的样式对象1, data中的样式对象2]"

数组语法可以将多个样式对象应用到同一个元素上

~~~
   <el-switch
              v-show="t.hasOwnProperty('numStripe')"
              v-model="t.numStripe"
              class="switch"
              @change="
                e => {
                  return onSwitchChange(t, e, 'numStripe')
                }
              "
            ></el-switch>
~~~

