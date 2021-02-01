1.VUE+ElementUI更改导航菜单选中背景颜色

~~~scss
  .el-menu-item {
      color: #777f8f;
    }
    .el-menu-item.is-active {
      color: #6681fa;
      background-color: #eaeeff;
    }
~~~

2element-ui 中 table 鼠标悬停时 背景颜色的修改

~~~scss
两种方式：
第一种：
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #c6cfdf !important;
}
第二种： 
.el-table__body tr:hover>td{
    background-color: #c6cfdf!important;
  }
  .el-table__body tr.current-row>td{
    background-color: #c6cfdf!important;
  }
~~~

3.button添加属性disabled，造成el-tooltip失效的解决方法

button包个div即可解决

