原文https://juejin.cn/post/6844903833655574536

https://juejin.cn/post/6844903764449558542

[Flask之旅](https://spacewander.github.io/explore-flask-zh/index.html)  https://spacewander.github.io/explore-flask-zh/index.html

flask入门教程  https://juejin.cn/post/6844903730710577160

# 蓝图（二十四）

> 知识点： 1、蓝图

### 一、概况

从前面的知识点能看出来，我们所有的视图函数都写在了一个文件当中，当我们的业务越来复杂的时候。视图函数也会变得越来越多，导致阅读不方便，维护起来困难等难题。比如下面这样：

```
from flask import Flask
from flask_script import Manager

app = Flask(__name__)


@app.route('/')
def index():
    return 'index page'

# home视图
@app.route('/home')
def home():
    return 'home page'

# center视图
@app.route('/center')
def center():
    return 'center page'

# order视图
@app.route('/order')
def order():
    return 'order page'

# cart视图
@app.route('/cart')
def cart():
    return 'cart page'


if __name__ == '__main__':
    # 0.0.0.0代表任何能代表这台机器的地址都可以访问
    app.run(host='0.0.0.0', port=5000, debug=True)  # 运行程序

复制代码
```

能看出来，当我们业务有新的需求的时候，我们还会往这个里面添加视图函数。

### 二、使用装饰器解决

例如我们把上面的home视图抽出来，放到单独的一个home.py文件中。在此文件只写一个没有被装饰器装饰的视图函数。

```
def home():
    return 'home page'
复制代码
```

然后在Flask的启动程序文件中，把home视图在重新用装饰器装饰起来。

```
from flask import Flask
from home import home

app = Flask(__name__)

# 装饰home视图
app.route('/home')(home)


@app.route('/')
def index():
    return 'index page'


if __name__ == '__main__':
    # 0.0.0.0代表任何能代表这台机器的地址都可以访问
    app.run(host='0.0.0.0', port=5000, debug=True)  # 运行程序

复制代码
```

我们在浏览器调试一下：

![在这里插入图片描述](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1240" height="232"></svg>)

可以发现，这样完全是可以的。其他的功能视图也可以这么做。但是这么做有个缺点，就是我们去单独home.py看的时候，根本不知道这个视图函数对应的路径是什么？如果想知道，我们必须要去Flask启动文件中去查看。



### 三、蓝图

- 什么是蓝图 Flask中的蓝图有点像Django框架的app的意思。就是把一个项目模块化，每个模块所用的视图、静态文件、模板放在一个盒子里。
- 使用蓝图 在使用蓝图之前，我们需要先创建蓝图，继续那我们上面的home视图函数举例，把home.py文件里面的代码修改如下：

```python
from flask import Blueprint
# 1.创建蓝图
# app_home值蓝图的名称，
# __name__指蓝图所在模块
app_home = Blueprint('app_home', __name__)


# 2.注册蓝图路由，可以设置HTTP方法
@app_home.route('/home',！methods=['GET'])
def home():
    return 'home page'

复制代码
```

Flask的启动程序文件中，导入蓝图并注册蓝图：

```python
from flask import Flask
# 3.导入蓝图
from home import app_home

app = Flask(__name__)


# 4.注册蓝图,可以url_prefix设置路由地址前缀
app.register_blueprint(app_home,url_prefix='/user')


@app.route('/')
def index():
    return 'index page'


if __name__ == '__main__':
    # 0.0.0.0代表任何能代表这台机器的地址都可以访问
    app.run(host='0.0.0.0', port=5000, debug=True)  # 运行程序

复制代码
```

我们在浏览器调试一下：

![在这里插入图片描述](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1240" height="325"></svg>)

##### 共同前缀 url_prefix='/user'

我们访问一些网站地址的时候会发现url知道，比如访问用户中心地址是/user/center/;比如访问用户信息地址是/user/info/。这些地址有一个相同的前缀。在Flask中用url_prefix可以给蓝图模块添加一个共同的地址。

```
app.register_blueprint(app_home, url_prefix='/user')
复制代码
```

我们在浏览器调试一下：

![在这里插入图片描述](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1240" height="381"></svg>)



### 四、以蓝图模块导入

我们还可以把Flask中的蓝图用python中包的概念管理起来。还是上面的例子，我们创建一个home文件夹(包)：

![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/5/4/16a819cf03ceca0a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

那这个文件夹里面可以就放home模块所用到的视图函数、模板、静态文件等。 在__init__.py文件中创建蓝图：



```
from flask import Blueprint

# app_home值蓝图的名称，
# __name__指蓝图所在模块
app_home = Blueprint('app_home', __name__)

from .views import home

复制代码
```

在views.py文件中注册蓝图路由:

```
from . import app_home


# 注册蓝图路由
@app_home.route('/home')
def home():
    return 'home page'

复制代码
```

在Flask启动文件导入蓝图：

```
from flask import Flask
# 导入蓝图
from home import app_home

app = Flask(__name__)

# 注册蓝图
app.register_blueprint(app_home, url_prefix='/user')


@app.route('/',methods=['GET'])
def index():
    return 'index page'


if __name__ == '__main__':
    # 0.0.0.0代表任何能代表这台机器的地址都可以访问
    app.run(host='0.0.0.0', port=5000, debug=True)  # 运行程序

复制代码
```

我们在浏览器调试一下：

![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/5/4/16a819cf03ac4226?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如果想使用蓝图中自己的模板，比如我们在蓝图中创建一个模板：

![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/5/4/16a819cf03b600ec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

必须要在创建蓝图的时候，指定模板路径，否则会找不到模板。静态文件是一样的。

![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/5/4/16a819cf3435a969?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

我们修改一下home的视图函数,改成加载模板：



```
from . import app_home
from flask import render_template


# 注册蓝图路由
@app_home.route('/home')
def home():
    return render_template('home.html')

复制代码
```

我们在浏览器调试一下：



![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/5/4/16a819cf36bb89be?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

温馨提示：根及的templates大于蓝图中templates。也就是说我们把home.html移动到根及的templates，视图函数是照样可以找到模板的。因为是先去根及找，再去蓝图中找。

![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/5/4/16a819cf3bfd9a60?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)