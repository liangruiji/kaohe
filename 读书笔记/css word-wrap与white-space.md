[TOC]



##### white-space

**控制空白字符的显示**，同时还能控制是否自动换行。它有五个值：`normal | nowrap | pre | pre-wrap | pre-line`

|                | 换行符 | 空格和制表符 | 文字换行 | 行尾空格 | </br>、nbsp; |
| :------------- | :----- | :----------- | :------- | -------- | ------------ |
| `normal`       | 合并   | 合并         | 换行     | 删除     | 保留         |
| `nowrap`       | 合并   | 合并         | 不换行   | 删除     | 保留         |
| `pre`          | 保留   | 保留         | 不换行   | 保留     | 保留         |
| `pre-wrap`     | 保留   | 保留         | 换行     | 挂起     | 保留         |
| `pre-line`     | 保留   | 合并         | 换行     | 删除     | 保留         |
| `break-spaces` | 保留   | 保留         | 换行     | 换行     | 保留         |

##### word-break

**控制单词如何被拆分换行**。它有三个值：`normal | break-all | keep-all`

##### word-wrap（overflow-wrap）

**控制长度超过一行的单词是否被拆分换行**，是`word-break`的补充，它有两个值：`normal | break-word`

##### 单行换行

~~~css
p {
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
~~~

##### 多行换行

###### 1 WebKit内核浏览器解决办法

~~~css
p {
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    display: -webkit-box; 
    -webkit-line-clamp: 2; // 行数
    -webkit-box-orient: vertical;
}
~~~

###### 2 其他浏览器的解决方案

~~~css
p {
    position:relative;
    line-height:1.5em;
    /* 高度为需要显示的行数*行高，比如这里我们显示两行，则为3 */
    height:3em;
    overflow:hidden;
}
p:after {
    content:"...";
    position:absolute;
    bottom:0;
    right:0;
    padding: 0 5px;
    background-color: #fff;
}

~~~



