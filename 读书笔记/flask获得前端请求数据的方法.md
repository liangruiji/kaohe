前端发送的HTTP请求，后端在flask中的获取的方法

```python
# 1.导入
from flask import request
# 2.获得表单数据。返回的是ImmutableMultiDict对象，需要通过to_dict()变为字典
form = request.form  
form = form.to_dict #变为字典
```

# 待查

- werkzeug.ImmutableMultiDict 的方法()

