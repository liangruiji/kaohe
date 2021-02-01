#### white-space

**控制空白字符的显示**，同时还能控制是否自动换行。它有五个值：`normal | nowrap | pre | pre-wrap | pre-line`

|                | 换行符 | 空格和制表符 | 文字换行 | 行尾空格 | </br>、nbsp; |
| :------------- | :----- | :----------- | :------- | -------- | ------------ |
| `normal`       | 合并   | 合并         | 换行     | 删除     | 保留         |
| `nowrap`       | 合并   | 合并         | 不换行   | 删除     | 保留         |
| `pre`          | 保留   | 保留         | 不换行   | 保留     | 保留         |
| `pre-wrap`     | 保留   | 保留         | 换行     | 挂起     | 保留         |
| `pre-line`     | 保留   | 合并         | 换行     | 删除     | 保留         |
| `break-spaces` | 保留   | 保留         | 换行     | 换行     | 保留         |

#### word-break

**控制单词如何被拆分换行**。它有三个值：`normal | break-all | keep-all`

#### word-wrap（overflow-wrap）

**控制长度超过一行的单词是否被拆分换行**，是`word-break`的补充，它有两个值：`normal | break-word`

