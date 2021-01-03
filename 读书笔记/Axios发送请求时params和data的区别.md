# Axios发送请求时params和data的区别

在使用axios时，注意到配置选项中包含params和data两者，以为他们是相同的，实则不然。

> params是添加到url的请求字符串中的，用于get请求。 data是添加到请求体（body）中的， 用于post请求。

比如对于下面的get请求：

```
axios ({
  method: "get",
  url: "http://www.tuling123.com/openapi/api?key=20ff1803ff65429b809a310653c9daac",
  params: {
  info: "你好中国！"
  },
})
复制代码
```

如果我们将params修改为data，显然是不能请求成功的，因为get请求中不存在data这个选项。

