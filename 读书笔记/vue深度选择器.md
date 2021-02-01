##### vue深度选择器

符号：

css中：>>> 

scss中：/deep/ 

作用：`scoped`局部样式中，选择器默认不会选中到子组件的类，使用深度选中器可以**选中子组件的css类**

~~~css
<style lang="scss" scoped>
.select {
  width: 100px;
 
  /deep/ .el-input__inner {
    border: 0;
    color: #000;
  }
}
</style>
~~~

