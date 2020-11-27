原文https://juejin.cn/post/6867833320550432775

# Flask老王整理

#### helloworld

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'
复制代码
```

#### URL参数

```python
@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % escape(username)

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return 'Subpath %s' % escape(subpath)
复制代码
```

#### 路由

> `projects` 的 URL 是中规中矩的，尾部有一个斜杠，看起来就如同一个文件夹。 访问一个没有斜杠结尾的 URL 时 Flask 会自动进行重定向，帮你在尾部加上一个斜杠。
>
> `about` 的 URL 没有尾部斜杠，因此其行为表现与一个文件类似。如果访问这个 URL 时添加了尾部斜杠就会得到一个 404 错误。这样可以保持 URL 唯一，并帮助 搜索引擎避免重复索引同一页面。

```python
@app.route('/projects/')
def projects():
    return 'The project page'

@app.route('/about')
def about():
    return 'The about page'
复制代码
# route源码
def route(self, rule, **options):

  def decorator(f):
    endpoint = options.pop("endpoint", None)
    self.add_url_rule(rule, endpoint, f, **options)
    return f

  return decorator
复制代码
```

> 如果为提供`endpoint`则使用视图函数的名称作为`endpoint`

```python
def _endpoint_from_view_func(view_func):
    """Internal helper that returns the default endpoint for a given
    function.  This always is the function name.
    """
    assert view_func is not None, "expected view func if endpoint is not provided."
    return view_func.__name__
复制代码
```

#### URL构建

> `url_for()`函数用于构建指定函数的 URL。它把函数名称作为第一个 参数。它可以接受任意个关键字参数，每个关键字参数对应 URL 中的变量。未知变量 将添加到 URL 中作为查询参数

```python
url_for()
复制代码
```

#### HTTP方法

> Web 应用使用不同的 HTTP 方法处理 URL 。当你使用 Flask 时，应当熟悉 HTTP 方法。 缺省情况下，一个路由只回应 `GET` 请求。 可以使用 `route()`装饰器的 `methods` 参数来处理不同的 HTTP 方法:

```python
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return do_the_login()
    else:
        return show_the_login_form()
复制代码
```

#### 静态文件

```python
url_for('static', filename='style.css')
# 这个静态文件在文件系统中的位置应该是 static/style.css
复制代码
```

#### 渲染模板

```python
@app.route('/')
def hello_world():
    return """
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
</head>
<body>
    <h1 style="color: red;">hello wolrd</h1>
</body>
</html>
    """
复制代码
@app.route('/home')
def home():
    return render_template('index.html')
复制代码
```

#### 模板转义

```python
@app.route('/home')
def home():
    label = Markup("<a href='http://www.baidu.com'>百度</a>")
    print(label)
    return render_template('index.html', label=label)
复制代码
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
</head>
<body>
    <h1 style="color: green;">hello wolrd</h1>
    {{ label }}
</body>
</html>
复制代码
```

or

```python
@app.route('/home')
def home():
    label = "<a href='http://www.baidu.com'>百度</a>"
    return render_template('index.html', label=label)
复制代码
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
</head>
<body>
    <h1 style="color: green;">hello wolrd</h1>
    {{ label | safe }}
</body>
</html>
复制代码
```

#### Jinja2

```python
@app.route('/')
def hello_world():
    a = 1
    b = 2
    age = 23
    name = 'wanghaha'
    nums = [1, 8, 28, 33]
    info = {'name': '王哈哈', 'age': 23}
    users = [
        {'name': '迪丽热巴', 'age': 27},
        {'name': '古力娜扎', 'age': 26}
    ]

    return render_template('index.html', **locals())
复制代码
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
</head>
<body>
    {# 这里是注释内容 #}
    {# 渲染一个变量, 并做计算   #}
    <p>a+b={{ a + b }}</p>

    {#  for循环遍历列表  #}
    <ul>
        {% for item in nums %}
            <li>{{ item }}</li>
        {% endfor %}
    </ul>
  

    {# if判断   #}
    {% if age >=18 and age <=100 %}
        <p>你成年了</p>
    {% elif age <18 and age >0 %}
        <p>未成年</p>
    {% else %}
        <p>年龄不合法</p>
    {% endif %}
  

    {# 遍历字典   #}
    {% for key, val in info.items() %}
        <p>key: {{ key }}   val:{{ val }}</p>
    {% endfor %}
  

    {# 遍历字典数组  #}
    {% for user in users %}
        {% for key, val in user.items() %}
            <p>key: {{ key }}   val: {{ val }}</p>
        {% endfor %}
    {% endfor %}
  

    {# 过滤器使用   大小写转换#}
    <p>{{ name | upper }}</p>
    <p>{{ name | upper | lower}}</p>

  
    {# 定义宏  #}
    {% macro input(type, name, placeholder) %}
        <div>
            <label for="{{ name }}">{{ name }}</label>
            <input type='{{type}}' id="{{ name }}" name="{{ name }}"  placeholder="{{ placeholder }}">
        </div>
    {% endmacro %}

    {# 调用宏   #}
    <p>{{ input('text', 'username', '请输入用户名') }}</p>
    <p>{{ input('password', 'password', '请输入密码') }}</p>

</body>
</html>
复制代码
```

模板继承

```python
@app.route('/')
def hello_world():
    return render_template('index.html')
复制代码
base.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}{% endblock %}</title>
    {% block head_region %}{% endblock %}
</head>
<body>
    {% block content %}
        <h1>welcome</h1>
    {% endblock %}
    {% block footer_region %}{% endblock %}
</body>
</html>
复制代码
public.html
<h1>public.html 内容</h1>
复制代码
index.html
{% extends 'base.html' %}

{% block title %}首页{% endblock %}

{% block content %}
    {{ super() }}
    <h1>hello world</h1>

    {#  导入其它html文件内容  #}
    {% include "public.html" %}
{% endblock %}

{% block footer_region %}
    <script>
        alert('hello');
    </script>
{% endblock %}
复制代码
```

#### 自定义模板函数，过滤器

```python
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


# 定义全局函数，在模板中使用
@app.add_template_global
def my_sum(a, b):
    return a + b


# 自定义过滤器
@app.template_filter()
def my_filter(arg):
    return arg.upper()


if __name__ == '__main__':
    app.run(debug=True)
复制代码
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <p>1 + 5 = {{ my_sum(1, 5) }}</p>
    <p>{{ "hello" | my_filter }}</p>
</body>
</html>
复制代码
```

#### 请求

```python
@app.route('/home')
def home():
    print('cookies:', request.cookies)      # 获取cookies
    print('headers:', request.headers)      # 获取请求头信息
    print('method:', request.method)        # 请求方法
    print('url:', request.url)              # URL全部内容，请求地址加参数
    print('url_rule:', request.url_rule)    # 请求URL不含请求地址和参数
    print('url_root:', request.url_root)    # 请求地址
    print('host_url:', request.host_url)    # 与url_root类似
    print('base_url:', request.base_url)    # 请求地址和URL和，不含参数
    print('path:', request.path)            # 请求URL

    print('values:', request.values)        # 包含GET, POST请求的参数
    print('args:', request.args)            # 获取URL参数
    print('form:', request.form)            # 获取POST提交formdata的参数
    print('files:', request.files)          # 获取提交的文件
    print('json:', request.json)            # 获取header为applicaiton/json提交的数据

    return 'home page'
复制代码
```

#### 响应

```python
from flask import Flask, render_template, make_response,  abort, Response, send_file, redirect, url_for

app = Flask(__name__)


@app.route('/page1')
def page1():
    return 'page1'


@app.route('/page2')
def page2():
    return render_template('index.html')


@app.route('/page3')
def page3():
    resp = make_response('<h1>hello world</h1>')
    resp.headers['name'] = 'hello'
    return resp


@app.route('/page4')
def page4():
    resp = make_response(render_template('index.html'))
    return resp


@app.route('/page5')
def page5():
    info = {'name': 'wanghaha', 'age': 23}
    resp = make_response(info)
    resp.headers['Content-Type'] = 'application/json'
    return resp


@app.route('/page6')
def page6():
    abort(403)


@app.route('/page7')
def page7():
    return Response('Hello World!', status=200, mimetype='text/html')


@app.route('/page8')
def page8():
    return send_file('mn.jpg')


@app.route('/page9')
def page9():
    return redirect(url_for('page8'))


if __name__ == '__main__':
    app.run(debug=True)

复制代码
```

#### 文件上传

```python
from flask import Flask, request

app = Flask(__name__)


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'GET':
        return """
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
</head>
<body>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit">
    </form>
</body>
</html>"""
    elif request.method == 'POST':
        file = request.files['file']
        file.save(file.filename)
        return 'upload successful'


if __name__ == '__main__':
    app.run(debug=True)

复制代码
```

#### cookies

```python
from flask import Flask, request, make_response

app = Flask(__name__)


@app.route('/page1')
def page1():
    resp = make_response('<h1>hello world</h1>')
    resp.set_cookie('name', 'wanghaha')
    return resp


@app.route('/page2')
def page2():
    name = request.cookies.get('name')
    return f'cookies name: {name}'


if __name__ == '__main__':
    app.run(debug=True)

复制代码
```

#### 重定向和错误

```python
from flask import Flask, redirect, url_for, abort

app = Flask(__name__)


@app.route('/index')
def index():
    return 'index page'


@app.route('/page1')
def page1():
    return redirect(url_for('index'))


# 永久重定向，浏览器缓存下来不经过服务器端处理直接跳转
@app.route('/page2')
def page2():
    return redirect(url_for('index')), 301


@app.route('/abort500')
def abort500():
    abort(500)


@app.errorhandler(404)
def not_found_page(code_or_exception):
    return '找不到页面', 404


@app.errorhandler(500)
def server_error(code_or_exception):
    return '服务器错错误', 500


if __name__ == '__main__':
    app.run()
复制代码
```

#### JSON格式API

```python
from flask import Flask, jsonify, json, make_response

app = Flask(__name__)


@app.route('/page1')
def page1():
    info = {'name': 'wanghaha', 'age': 23}
    resp = make_response(info)
    resp.headers['Content-Type'] = 'application/json'
    return resp


@app.route('/page2')
def page2():
    info = {'name': 'wanghaha', 'age': 23}
    return jsonify(info)


if __name__ == '__main__':
    app.run()

复制代码
```

#### session

```python
from flask import Flask, session
from os import urandom

app = Flask(__name__)
app.secret_key = urandom(25)


@app.route('/page1')
def page1():
    session['u'] = 'admin'
    return 'page1 page'


@app.route('/page2')
def page2():
    return f"session u:{session.get('u')}"


if __name__ == '__main__':
    app.run()

复制代码
```

#### 闪现

```python
from flask import Flask, flash, get_flashed_messages
from os import urandom

app = Flask(__name__)
app.secret_key = urandom(25)


@app.route('/page1')
def page1():
    flash('hello')
    flash('world')
    flash('welcome', 'success')
    return 'page1 page'


@app.route('/page2')
def page2():
    print(get_flashed_messages())
    return 'page2 page'


@app.route('/page3')
def page3():
    print(get_flashed_messages(with_categories=True))
    return 'page3 page'


if __name__ == '__main__':
    app.run()

复制代码
```

#### 日志

#### 蓝图

```python
from flask import Flask, Blueprint


api = Blueprint('api', 'api')
admin = Blueprint('admin', 'admin')


@api.route('/page1')
def page1():
    return 'api page1'


@admin.route('/page2')
def page2():
    return 'admin page2'


app = Flask(__name__)
app.register_blueprint(api)
app.register_blueprint(admin)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
复制代码
```

#### 钩子函数

```python
from flask import Flask

app = Flask(__name__)


@app.route('/page1')
def page1():
    return 'page1'


@app.route('/page2')
def page2():
    return 'page2'


@app.before_request
def first_request():
    print('请求进入视图函数之前')


@app.after_request
def after_request(response):
    print('视图函数结束之前调用')
    return response


if __name__ == '__main__':
    app.run()

复制代码
```

#### CBV

```python
from flask import Flask, views, request

app = Flask(__name__)


class Index(views.MethodView):
    def get(self):
        return 'get method page'

    def post(self):
        return 'post method page'


class Upload(views.MethodView):
    methods = ['GET', 'POST']
    def get(self):
        return """
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
</head>
<body>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit">
    </form>
</body>
</html>"""

    def post(self):
        file = request.files['file']
        file.save(file.filename)
        return 'upload successful'


app.add_url_rule('/index', view_func=Index.as_view(name='index'))
app.add_url_rule('/upload', view_func=Upload.as_view(name='upload'))


if __name__ == '__main__':
    app.run(debug=True)

复制代码
```

#### 配置

```python
# 默认配置
default_config = ImmutableDict(
        {
            "ENV": None,
            "DEBUG": None,
            "TESTING": False,
            "PROPAGATE_EXCEPTIONS": None,
            "PRESERVE_CONTEXT_ON_EXCEPTION": None,
            "SECRET_KEY": None,
            "PERMANENT_SESSION_LIFETIME": timedelta(days=31),
            "USE_X_SENDFILE": False,
            "SERVER_NAME": None,
            "APPLICATION_ROOT": "/",
            "SESSION_COOKIE_NAME": "session",
            "SESSION_COOKIE_DOMAIN": None,
            "SESSION_COOKIE_PATH": None,
            "SESSION_COOKIE_HTTPONLY": True,
            "SESSION_COOKIE_SECURE": False,
            "SESSION_COOKIE_SAMESITE": None,
            "SESSION_REFRESH_EACH_REQUEST": True,
            "MAX_CONTENT_LENGTH": None,
            "SEND_FILE_MAX_AGE_DEFAULT": timedelta(hours=12),
            "TRAP_BAD_REQUEST_ERRORS": None,
            "TRAP_HTTP_EXCEPTIONS": False,
            "EXPLAIN_TEMPLATE_LOADING": False,
            "PREFERRED_URL_SCHEME": "http",
            "JSON_AS_ASCII": True,
            "JSON_SORT_KEYS": True,
            "JSONIFY_PRETTYPRINT_REGULAR": False,
            "JSONIFY_MIMETYPE": "application/json",
            "TEMPLATES_AUTO_RELOAD": None,
            "MAX_COOKIE_SIZE": 4093,
        }
    )
复制代码
class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URI = 'sqlite:///:memory:'

class ProductionConfig(Config):
    DATABASE_URI = 'mysql://user@localhost/foo'

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
复制代码
app.config.from_object('configmodule.ProductionConfig')
复制代码
```

#### 项目布局

#### 部署

```
uwsgi.ini
[uwsgi]
http=0.0.0.0:5000
socket=0.0.0.0:8001
chdir = /root
wsgi-file = main.py
stats = 127.0.0.1:9191
callable = app
processes = 4
threads = 10
复制代码
location / {
    include  uwsgi_params;
    uwsgi_pass 127.0.0.1:8001;
}
复制代码
```

#### 扩展

#### Flask-session

#### flask-migrate

```python
from flask import Flask
from api import api as api_blueprint
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from models import db
import config

app = Flask(__name__)
app.config.from_object(config)

app.register_blueprint(api_blueprint)

db.init_app(app)

manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
复制代码
python3 manage.py db init
python3 manage.py db migrate
python3 manage.py db upgrade
复制代码
```

#### flask-sqlalchemy

将结果集转为`json`格式

```python
# sqlalchemy结果转json
from sqlalchemy.orm import class_mapper


# 将sqlalchemy结果转为json
def mapper(model):
    columns = [c.key for c in class_mapper(model.__class__).columns]
    return dict((c, getattr(model, c)) for c in columns)


# 判断是结果是多个还是一个
def to_json(model):
    if isinstance(model, list):
        data = []
        [data.append(mapper(item)) for item in model]
        return data
    return mapper(model)
复制代码
```

#### flask-script

#### flask-login

#### flask-rbac

#### Flask-debugToolbar

#### flask-restful

#### flask-admin

#### flask-cli

#### flask-mail

#### flask-cors

```python
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
复制代码
# 单独蓝图配置
api_v1 = Blueprint('API_v1', __name__)
CORS(api_v1) 
复制代码
```

#### 返回SQLAlchemy对象

在`模型`中添加如下方法

```python
def to_json(self):
        dict = self.__dict__
        if "_sa_instance_state" in dict:
            del dict["_sa_instance_state"]
        return dict
复制代码
```

在返回数据是通过to_json方法放到列表中

```python
@app.route('/comments', methods=['GET'])
def comments():
    comments = db.session.query(Comment).all()
    result = []
    for comment in comments:
        result.append(comment.to_json())
    return jsonify(result), 200
```