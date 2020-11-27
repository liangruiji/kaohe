## [¶](https://element.eleme.cn/#/zh-CN/component/layout#layout-bu-ju)Layout 布局

### Row Attributes

| 参数    | 说明                                  | 类型   | 可选值                                      | 默认值 |
| :------ | :------------------------------------ | :----- | :------------------------------------------ | :----- |
| gutter  | 栅格间隔                              | number | —                                           | 0      |
| type    | 布局模式，可选 flex，现代浏览器下有效 | string | —                                           | —      |
| justify | flex 布局下的水平排列方式             | string | start/end/center/space-around/space-between | start  |
| align   | flex 布局下的垂直排列方式             | string | top/middle/bottom                           | top    |
| tag     | 自定义元素标签                        | string | *                                           | div    |

### [¶](https://element.eleme.cn/#/zh-CN/component/layout#col-attributes)Col Attributes

| 参数   | 说明                                   | 类型                                        | 可选值 | 默认值 |
| :----- | :------------------------------------- | :------------------------------------------ | :----- | :----- |
| span   | 栅格占据的列数                         | number                                      | —      | 24     |
| offset | 栅格左侧的间隔格数                     | number                                      | —      | 0      |
| push   | 栅格向右移动格数                       | number                                      | —      | 0      |
| pull   | 栅格向左移动格数                       | number                                      | —      | 0      |
| xs     | `<768px` 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| sm     | `≥768px` 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| md     | `≥992px` 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| lg     | `≥1200px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| xl     | `≥1920px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| tag    | 自定义元素标签                         | string                                      | *      | div    |

## Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<el-container>`：外层容器。当子元素中包含 `<el-header>` 或 `<el-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<el-header>`：顶栏容器。

`<el-aside>`：侧边栏容器。

`<el-main>`：主要区域容器。

`<el-footer>`：底栏容器。

以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<el-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<el-container>`。

### Container Attributes

| 参数      | 说明             | 类型   | 可选值                | 默认值                                                       |
| :-------- | :--------------- | :----- | :-------------------- | :----------------------------------------------------------- |
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `el-header` 或 `el-footer` 时为 vertical，否则为 horizontal |

### [¶](https://element.eleme.cn/#/zh-CN/component/container#header-attributes)Header Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| :----- | :------- | :----- | :----- | :----- |
| height | 顶栏高度 | string | —      | 60px   |

### [¶](https://element.eleme.cn/#/zh-CN/component/container#aside-attributes)Aside Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| :---- | :--------- | :----- | :----- | :----- |
| width | 侧边栏宽度 | string | —      | 300px  |

### [¶](https://element.eleme.cn/#/zh-CN/component/container#footer-attributes)Footer Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| :----- | :------- | :----- | :----- | :----- |
| height | 底栏高度 | string | —      | 60px   |

###  Font-family 代码

```css
font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
```

