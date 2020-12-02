###  表格中的dialog取scope.row时只能取到最后一行的值得问题

只用一个变量控制dialog，多个dialog对话框叠在一起，看到的是最后一行的dialog

别把 dialog 定义在 table 中呀。。。

你把 dialog 和 table 搞成**同级**。

然后显示的时候把row传递进去，dialog使用传递进来的row渲染。

 赞

 已采纳

~~~html
<el-table>
<el-table-column>
// 点编辑时传入scope.row行数据，然后在editTodo点击事件处理函数里把scope.row行数据保存在变量中
 <el-button size="mini" @click="editTodo(scope.row)">编辑</el-button>
</el-table-colum>
</el-table>
// 在dialog中使用editTodo点击事件处理函数的保存行数据的变量进行渲染
<el-dialog></el-dialog>
~~~



# [element UI]记录一个“el-table里的el-dialog重叠问题”的解决

这里记录一个作为前端初学者使用vue+elementUI遇到的问题（犯的错误）。
在项目里，用一张表来展示所有的编译记录，每个文件的编译结果为一条记录。需要实现点击展示项目编译结果，如图,当点击log的时候，会弹出响应的log内容。

问题的重现,运行2个（或者多个）文件，然后点击log会发现出现弹出框重叠的现象。仔细看会发现上层dialog即当前真正点击的log的结果，底层的dialog是别的行的log, 按下F12查看页面html source可以发现html同时渲染了n个(n=table length) dialog，只是z-index不同，分析代码发现其实错误很浅显，即我用一个全局变量来控制dialog的显示，而且dialog标签被嵌套在el-table里，因此table有几行就有几个dialog,而且通过同一个变量来控制，那当然出问题：



记录下这个问题的解决办法：

1. 把<el-dialog>移出<el-table>，还是用一个全局变量来控制dialog的显示。 即全局只有一个el-dialog，适用于我这个项目的场景：一个时间只要显示一个log dialog。但不适用于你的项目本来就是要同时显示多个el-dialog.

2.table里每行都有dialog, table数据每一行都有个变量用于控制每行的dialog的显示。但是要注意vue的响应式数据更新机制，这个变量必须要在table数据声明的时候就一起声明。比如我必须在填塞table数据的时候就把这个变量写出来, 从而在点击log标题的click事件中去操作这个变量的true/false;
ts



```kotlin
 this.inputs.push({
            files: this.form.files,
            whList: this.form.whList,
            whString: whString,
            fileList: fileList,
            dialogVisible: false
        });
```

vue



```xml
<el-table>
...
<el-table-column prop="log" label="log" width="250px">
<template v-slot="scope">
                            <el-button type="text" @click="onPopupRunLog(scope.row)">{{scope.row.fullDisplayName}}
                            </el-button>
                            <el-dialog close-on-press-escape
                                    title="Build Log"
                                    :visible.sync="scope.row.dialogVisible" width="80%">
                                <pre>{{scope.row.log}}</pre>
                            </el-dialog>
                        </template>
</el-table-column>
</el-table>
```

1. 把2中vue的这串抽成一个component.所有的参数传入这个组件也能完美解决这个问题。实践发现这种方法最为优秀。



```xml
<template>
<div>
    <el-button style="padding:0px;font-size: 10px" type="text" @click="popupBuildLog()"
               :loading="loading" element-loading-text=""
               element-loading-spinner="el-icon-loading"
               element-loading-background="#c4d1d2ba" >
        {{buttonContent}}
    </el-button>
    <div style="display:inline-block; margin-top:4px" v-if="!stillBuilding && buildResult !== 'PENDING'">
        <span style="color:#afa7a7e6;margin-left:8px">{{startedAgoTime}}</span>
    </div>
    <el-dialog class="log-dialog" title="Build Log"
               :visible.sync="dialogShow"
               width="80%" append-to-body>
        <pre>{{log}}</pre>
    </el-dialog>
</div>
</template>
```