定义表单类

```python
# 1.导入FlaskForm
from flask_wtf import FlaskForm
# 2.导入字段
from wtforms import (StringField, SubmitField, BooleanField, PasswordField)
# 3.导入验证器
from wtforms.validators import (DataRequired, Length, EqualTo, InputRequired)
# 4.定义表单类继承FlaskForm
class AddTodo(FlaskForm):
    cont = StringField(validators=[DataRequired()])
    status= StringField(validators=[DataRequired()])
    group = StringField(validators=[DataRequired()])
    id = StringField(validators=[DataRequired(),Regexp(r'[0-9a-f]{24}')])#正则验证
    #       validator参数来传入验证器
    #     =字段类型（validators=[验证器1，！验证器2]）
```

使用

~~~python
from flask import Blueprint, request
@api.route('/',methods=['POST'])
def api_add():
    form=AddTodo()
    if form.validate_on_submit():
    	...验证成功
    else:
    	...验证失败
      5fbd1a661e17354485823e48
~~~





## 字段类型（待）



WTForms同样提供了大量内置的验证规则，它们都放在`wtforms.validators`包下。这里我们就来列举一下：

| 验证规则     | 说明                                                         |
| :----------- | :----------------------------------------------------------- |
| DataRequired | 验证必填项                                                   |
| Email        | 验证邮件地址格式                                             |
| EqualTo      | 验证必须同另一个字段值相同，它需传入另一个字段的名称”fieldname” |
| Length       | 验证输入字符串长度，它有两个参数：”min”最小长度，”max”最大长度，缺省的话就不检查 |
| NumberRange  | 验证输入数值的范围，它有两个参数：”min”最小值，”max”最大值，缺省的话就不检查 |
| URL          | 验证URL格式                                                  |
| IPAddress    | 验证IP地址格式，默认IPV4，你可以传入”ipv6=True”来验证IPV6地址 |
| MacAddress   | 验证Mac地址格式                                              |
| AnyOf        | 传入一个列表作为参数，验证是否匹配列表中的任一值             |
| NoneOf       | 传入一个列表作为参数，验证是否与列表中的所有值都不同         |
| Regexp       | 正则表达式验证，需传入一个正则表达式，它还有一个flags参数，如果你传入”re.IGNORECASE”，就会忽略大小写 |

所有的”validator”都有一个`message`参数，用来指定当验证失败时抛出的错误消息，不指定的话WTForms就会使用默认错误消息。

# 自定义验证器（待）