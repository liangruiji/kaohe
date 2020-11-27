https://testerhome.com/topics/12066  todo api 学习网站

作用：用来响应请求

浏览器和服务器上的flask程序的交互概括为以下几步

1.用户在浏览器输入url访问某个资源

2.flask接受用户请求并分析请求的url

3.为这个url找到对应的处理函数

4.执行函数并生成响应，返回给浏览器

5.浏览器接受并解析响应，将信息显示到页面中

#### 基本使用

~~~python
#1.导入flask
from flask import Flask
#2.创建flask实例，参数为应用模块的名称
app = Flask(__name__)
#3.使用装饰器 route() 告诉 Flask 哪个 URL 才能触发我们的函数。
@app.route('/')    #默认只能get，使用post设置参数  methods=['GET', 'POST']
def hello_world(): #4.访问url时触发的视图函数，
    return 'Hello World!'    # 返回到浏览器body里的内容

if __name__ == '__main__':
    # 若不配置host和port，则默认是localhost，端口为5000
    # 若配置，如写作app.run("",8000)，就是localhost，端口8000   
    app.run() #启动本第服务器运行应用
~~~

那么这段代码做了什么？

1. 首先我们导入了类 [`Flask`](http://www.pythondoc.com/flask/api.html#flask.Flask) 。这个类的实例化将会是我们的 WSGI 应用。第一个参数是应用模块的名称。 如果你使用的是单一的模块（就如本例），第一个参数应该使用 __name__。因为取决于如果它以单独应用启动或作为模块导入， 名称将会不同 （ `'__main__'` 对应于实际导入的名称）。获取更多的信息，请阅读 [`Flask`](http://www.pythondoc.com/flask/api.html#flask.Flask) 的文档。
2. 接着，我们创建一个该类的实例。我们传递给它模块或包的名称。这样 Flask 才会知道去哪里寻找模板、静态文件等等。
3. 我们使用装饰器 [`route()`](http://www.pythondoc.com/flask/api.html#flask.Flask.route) 告诉 Flask 哪个 URL 才能触发我们的函数。
4. 定义一个函数，该函数名也是用来给特定函数生成 URLs，并且返回我们想要显示在用户浏览器上的信息。
5. 最后我们用函数 [`run()`](http://www.pythondoc.com/flask/api.html#flask.Flask.run) 启动本地服务器来运行我们的应用。`if __name__ == '__main__':` 确保服务器只会在该脚本被 Python 解释器直接执行的时候才会运行，而不是作为模块导入的时候。

Flask通过`request.form['name']`来获取表单的内容。

#### 重定向

需要两个模块

~~~
from flask import redirect, url_for
~~~

`redirect`函数用于重定向。 `url_for`参数是视图函数函数的名字，它会根据视图函数的名字找到装饰次视图的路由。

~~~python
from flask import Flask
from flask import abort, redirect, url_for

app = Flask(__name__)


@app.route('/')  # 代表首页
def index():  # 视图函数
    return 'my index !'  # 返回内容


@app.route('/center')  # 代表个人中心页
def center():  # 视图函数
    return 'my flask!'  # 返回内容


@app.route('/login')  # 代表登录
def login():  # 视图函数

    return redirect(url_for('index'))


if __name__ == '__main__':
    # 0.0.0.0代表任何能代表这台机器的地址都可以访问
    app.run(host='0.0.0.0', port=5000)  # 运行程序

~~~

#### 请求方式

在路由装饰器上改变请求方式

~~~python
#两种方式
#1.改变路由的methods属性和不同视图函数来处理不同的请求
@app.route('/login',methods=['POST']) 
	def change()
  
@app.route('/login',methods=['GET']) 
	def get()
#2.通过方法视图（MethodView类）
~~~

请求方式类型

GET

PUT

PATCH

POST

DELETE

#### 路由地址变量

~~~python

@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return 'User %s' % username

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id
~~~



#### 请求对象request

使用时，应先导入

~~~
from flask import request
~~~



访问当前请求方法 用 `method` 属性

访问表单数据 用 `form` 属性

~~~python
@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    #访问当前请求方法
    if request.method == 'POST':
      	#访问表单数据
        if valid_login(request.form['username'],
                       request.form['password']):
            return log_the_user_in(request.form['username'])
        else:
            error = 'Invalid username/password'
    # the code below this is executed if the request method
    # was GET or the credentials were invalid
    return render_template('login.html', error=error)
~~~

接收在 URL ( `?key=value` ) 中提交的参数用 `args` 属性

~~~
searchword = request.args.get('key', '')
~~~



#### 渲染模板render_template

1.导入方法

2.使用`render_template()`来渲染模版，提供模版的名称以及你想要作为关键字参数传入模板的变量

~~~
from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
~~~

Flask 将会在 templates 文件夹中寻找模版