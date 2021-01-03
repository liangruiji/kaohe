# vue文本识别 “ \n ” 的换行问题

### 实现方法：

#### 1：通过 `css属性`实现

- 即：设置 `white-space: pre-wrap;`，（代码如下）：

  ```
  <el-row>
     <el-col>职位描述：</el-col>
     <el-col style="white-space: pre-wrap;">{{resumeDetails.postDescribe}}</el-col>
  </el-row> 
  1234
  ```

#### 2：使用`v-html`实现

- 首先，将字符串里的`\n`替换为`<br>`，然后用`v-html`指令渲染字符串为`innerHTML`。

- 部分代码如下：

  ```
  // JS部分
  this.text = res.data.replace(/\n/g, '<br>')
  
  // HTML部分
  <div v-html="text"></div>
  ```

