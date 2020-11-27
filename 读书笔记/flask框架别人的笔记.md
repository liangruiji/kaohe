原文https://juejin.cn/post/6844903740466544654

# 十分钟学会Flask

### 什么是Flask

- Flask是一个基于Python并且依赖于Jinja2模板引擎和Werkzeug WSGI服务的一个微型框架
- Flask中包含一个轻量级的web 服务器主要用于在开发阶段测试使用
- Falsk使用MTV框架模式

### MTV框架模式

- M : Models , 模型层 , 主要负责根据数据库建模
- T : Templates , 模板层 ,处理用户的显示的内容的,如:html
- V : Views ,视图 , 处理与用户交互的内容(请求和响应)

下面我们从Templates、Views和Models这三个部分来了解下Flask框架

### Templates

Templates这部分主要讲解以下几个部分：

- 过滤器
- 标签（for循环遍历可迭代对象）
- 宏
- 继承
- 自定义404/500等错误页面

#### 过滤器

```
语法：
{{变量|过滤器}}

Jinja2模板中常用的过滤器有：
capitalize     首字符变大写,其他字符变小写
lower          将值转换为小写字符
upper          将值转换为大写字符
title          将值中的每个单词的首字符变大写
trim           去掉值两端的空格
复制代码
```

#### 标签

```
{% for 变量 in 列表|元组|字典 %}
{% endfor %}
for标签中的内置对象loop
loop.index 获取下标
loop.index0 从0开始的下标
loop.first True/False
loop.last  True/False
复制代码
```

#### 宏

```
下面是一个关于Flask中宏的用法的实例：
<!-- 声明宏:接收一个字符串作为参数,将参数放p中打印输出 -->
{% macro showP(str) %}
    <h3>使用宏显示的内容:</h3>
    <p>{{str}}</p>
{% endmacro %}

<!-- 使用宏 -->
<div>
    {% for name in params.list %}
        {{showP(name)}}
    {% endfor %}
</div>
<!-- 引入外部的宏 -->
{% import 'macros.html' as ms %}
{% for name in params.list %}
    {{ms.show_p(name)}}
{% endfor %}
复制代码
```

#### 继承

```
父模板中：
{% block title %}
    父模板中的内容
{% endblock %}

子模板中：
{% extends '父模板.html' %}
{% block title %}
    子模板中的内容
{% endblock %}

子模板中的内容会覆盖父模板中的内容
复制代码
```

#### 自定义404/500等错误页面

```
1.404 的错误处理
	@app.errorhandler(404)
	def page_not_fount(e):
		return render_template('404.html'),404
2.500 的错误处理
	@app.errorhandler(500)
	def internal_server_error(500):
		return render_template('500.html'),500
404.html 和 500.html 需要自定义
复制代码
```

### Views

Views这部分主要讲解以下几个部分：

- 路由
- 请求方法
- url反向解析
- request对象
- 响应response
- 文件上传
- cookies
- session

#### 路由

```
一：基本路由的配置：
#http://127.0.0.1:5000/
@app.route('/')
def index():
	return "xxx"

二：带参数路由的配置：
1.基本带参数的路由
@app.route('/show/<name>')
def show1(name):
	name:表示的就是地址栏上传递的数据
	pass
2.指定参数类型的路由
@app.route('/show/<name>/<int:age>')
def show(name,age):
	name : 字符串
	age : 整数
可选的参数类型为 int float path(字符串，可以有斜杠/)

三：多个路由的配置：
@app.route('/地址1')
@app.route('/地址2')
....
def index():
	pass
复制代码
```

#### 请求方法

在Flask中默认只能接收get请求，post请求无法接收，但是可以手动设置请求的接收方式。

```
下面的函数既能接收get请求又能接收post请求
@app.route('/xxx',methods=['POST','GET'])
def  xxx():
    pass
复制代码
```

#### url反向解析

```
正向解析:程序自动解析,根据@app.route()中的访问路径,来匹配处理函数
反向解析:通过视图处理函数的名称自动生成对应的访问路径

在Flask中要实现反向解析:
	url_for(funName,args)
		funName:要生成地址的函数名
		args:该地址中需要的参数
复制代码
```

#### request对象

```
request中的常用成员
	1.scheme:获取请求方案(协议)
	2.method:获取请求方式(重点,取值为 post 或 get)
	3.args : 获取使用get请求方式提交过来的数据(重点)
	4.form : 获取使用post请求方式提交过来的数据(重点)
	5.cookies : 获取cookies中的相关信息
	6.headers : 获取请求消息头的相关信息
	7.files : 获取上传的文件
	8.path : 获取请求的资源的具体路径(不带参数)
	9.full_path : 获取完整的请求资源的具体路径(带参数)
	10.url : 获取完整的请求地址,从协议开始
复制代码
```

#### 响应response

```
响应有下面的三种方法：
1.返回响应模板（可带上参数）
@app.route('/')
from flask import render_template
def index1():
    return render_template('xxx.html', params=locals())
    
2.构建响应对象，并返回
from flask import make_response
@app.route('/')
def index2():
    resp = make_response('响应内容')
    resp = make_response(render_template('xxx.html'))
    return resp
    
3.重定向
from flask import redirect
@app.route('/')
def index3():
    return redirect('/login')
复制代码
```

#### 文件上传

html文件：

```
<form action="/01-file" method="post" enctype="multipart/form-data">
    <p>
        用户姓名: <input type="text" name="uname">
    </p>
    <p>
        用户图像: <input type="file" name="uimg">
    </p>
    <p>
        <input type="submit" value="提交">
    </p>
</form>
复制代码
```

后台代码：

```
@app.route('/01-file',methods=['GET','POST'])
def file_views():
    if request.method == 'GET':
        return render_template('01-file.html')
    else:
        #处理的上传的文件
        #1.得到上传的文件
        f = request.files['uimg']
        #2.将文件保存进指定的目录处[相对路径]
        # print('文件名称:'+f.filename)
        # f.save('static/'+f.filename)

        #3.将文件保存进指定的目录处[绝对路径]
        #获取当前文件的所在目录名
        basedir = os.path.dirname(__file__)
        #print('当前文件所在目录的绝对路径:'+basedir)
        #获取当前的时间拼成字符串,再拼上扩展名
        ftime=datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")
        #获取文件的扩展名 (b04.jpg)
        ext = f.filename.split('.')[1]
        filename = ftime + "." + ext
        upload_path = os.path.join(basedir,'static/upload',filename)
        # print('完整的上传路径:'+upload_path)
        f.save(upload_path)
        return "Save OK"
复制代码
```

#### cookies

```
增：
    resp=make_response('保存cookie成功')
    resp.set_cookie('uname','test',3600)
删：
    响应对象.delete_cookie('key')
查询：
    uname = request.cookies.get('key')
    request.cookies['key']
    request.cookies   # 拿到所有的cookies
    if 'key' in request.cookies:
        pass

复制代码
```

#### session

```
from flask import session
配置 SECRET_KEY：
      app.config['SECRET_KEY']="thisisarandomstring"
增：
    session['key'] = value
删：
    del session['key']
查：
    value = session['key']
    value = session.get('key')

复制代码
```

### Models

Models这部分主要讲解以下几个部分：

- 数据库连接和基本配置
- 模型类的关系映射
- 插入数据
- 查询数据

#### 数据库连接和基本配置

```
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# 为app指定数据库的配置信息
app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:123456@localhost:3306/flask'
#指定当视图执行完毕后,自动提交数据库操作
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN']=True
# 创建 SQLAlchemy的数据库实例
db = SQLAlchemy(app)
复制代码
```

#### 模型类的关系映射

下面链接有详细的讲解这一部分： [模型类的关系映射](https://juejin.im/post/6844903732962934792)

#### 插入数据

```
#接收前端传递过来的数据
uname = request.form.get('uname')
uage = request.form.get('uage')
uemail = request.form.get('uemail')
#将数据构建成实体对象
user = Users(uname,uage,uemail)
#将数据保存回数据库
db.session.add(user)
# db.session.commit()
复制代码
```

#### 查询数据

- 基于db.session进行查询
- 基于

##### 基于db.session进行查询

```
语法
db.sessin.query().过滤器函数().执行函数()
复制代码
```

##### 基于 Models 类进行查询

```
语法：
Models.query.查询过滤器函数().查询执行函数()
复制代码
```

##### 过滤器函数

```
过滤器函数
作用:专门对数据进行筛选,返回部分行数据
1.filter()    按指定条件进行过滤(单表,多表,定值,不定值)
2.filter_by() 按等值条件进行过滤
3.limit()     按限制行数量获取结果
4.order_by()  按指定列进行排序
5.group_by()  按指定条件进行分组

过滤器函数详解：
过滤器函数详解:
1.filter()
  注意:条件必须由 实体类.属性 组成
  1.查询年龄大于 30 的人的信息
    db.session.query(Users).filter(Users.age>30).all()
  2.查询id为1的人的信息
    db.session.query(Users).filter(Users.id==1).first()
    注意:filter()做等值判断时必须使用 == 
  3.查询年龄大于30并且id大于1的用户的信息
    filter(条件1,条件2,...) : and
    db.session.query(Users).filter(Users.age>30,Users.id>1).all()
  4.查询年龄大于30或者id为1的用户的信息
    查询或者操作,需要使用or_()
    filter(or_(条件1,条件2))

    from sqlalchemy import or_
    db.session.query(Users).filter(or_(Users.age>30,Users.id==1)).all()
  5.查询 email 中包含 'w' Users的信息
    db.session.query(Users).filter(Users.email.like('%w%'))
  6.查询 id 在 [2,4] 列表中的Users的信息
    db.session.query(Users).filter(Users.id.in_([2,4])).all()
2.filter_by()
  注意:只能做等值判断,不能做不等值
  查询id为1的users的信息
  db.session.query(Users).filter_by(id=1).first()
3.limit()
  1.获取 users 表中的前2条数据
    db.session.query(Users).limit(2).all()
    select * from users limit 2
  2.获取 users 表中过滤前3条数据后剩余的前2条数据
    select * from users limit 3,2
    db.session.query(Users).limit(2).offset(3).all()
    
4.order_by()
  # 按照 id 倒序排序
  select * from users order by id desc;
  # 先按照年龄倒序排序,再按照id升序排序
  select * from users order by age desc,id asc;

  db.session.query(Users).order_by("age desc,id asc").all()
5.group_by()
  1.将 users 表中的数据按照 age 进行分组
    db.session.query(Users.age).group_by('age').all()
6.聚合函数
  1.查询users表中所有人的平均年龄
    select avg(age) from users;

    from sqlalchemy import func
    db.session.query(func.avg(Users.age).label('avgAge')).all()
  2.users表中,按年龄分组,再查每组的年龄平均值
    select age,avg(age) from users group by age

    db.session.query(func.avg(Users.age)).group_by('age').all()

  聚合函数:
    1.func.avg() : 求平均值
    2.func.sum() : 求和
    3.func.max() : 求最大值
    4.func.min() : 求最小值
    5.func.count() : 求不为空的数量
复制代码
```

##### 执行函数

```
查询执行函数
目的:在query()的基础上得到最终的数据
语法:db.session.query(Models).查询执行函数()
1.all():以列表的方式返回query对象中所有的查询数据
2.first():返回query对象中的第一个查询结果,
  如果没有结果,返回None
3.first_or_404():返回query对象中的第一个查询结果,
  如果没有结果的话则终止程序并响应404
4.count():返回query对象中的查询结果的数量
```