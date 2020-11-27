## 配置

基本步骤很简单，仅需获取扩展：



```jsx
from flask import Flask
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__)
app.config.from_pyfile('the-config.cfg')
db = MongoEngine(app)
```

或者，若你想在应用初始化之前配置数据库，下方是一个应用工厂的列子：



```jsx
from flask import Flask
from flask.ext.mongoengine import MongoEngine
db = MongoEngine()
...
app = Flask(__name__)
app.config.from_pyfile('the-config.cfg')
db.init_app(app)
```

默认情况下，Flask-MongoEngine假设**mongod**实例运行在**本地主机**的**27017端口**上，并且你将连接名为**test**的数据库。

如果MongoDB运行在别处，你需要在app.config的*'MONGODB_SETTINGS'*字典中配置**主机**和**端口**：



```bash
app.config['MONGODB_SETTINGS'] = {
  'db': 'project1',
  'host': '192.168.1.35', 
  'port': 12345
}
```

如果数据库需要身份验证，app.config['MONGODB_SETTINGS']字典需要提供**username**、**password**参数：



```bash
app.config['MONGODB_SETTINGS'] = {
  'db': 'project1', 
  'username':'webapp', 
  'password':'pwd123'
}
```

也支持Uri风格的连接，仅需在app.config['MONGODB_SETTINGS']字典中将**host**值设为uri。**注意，自uri获取的数据库名称优先级高于本地设置**：



```rust
app.config['MONGODB_SETTINGS'] = {
  'db': 'project1', 
  'host': 'mongodb://localhost/database_name'
}
```

连接配置也可以通过带有MONGODB_前缀的字典单独设置：



```bash
app.config['MONGODB_DB'] = 'project1'
app.config['MONGODB_HOST'] = '192.168.1.35'
app.config['MONGODB_PORT'] = 12345
app.config['MONGODB_USERNAME'] = 'webapp'
app.config['MONGODB_PASSWORD'] = 'pwd123'
```

## 定制查询集

flask-mongoengine位MongoEngine的默认查询集附加了下列方法：

- **get_or_404**:类似于.get(),但若对象不存在，返回404中止。
- **first_or_404**:类似于.first(),并做404判断。
- **paginate**:为查询集分页。需要俩个参数，*page*和*per_page*。
- **paginate_field**:用查询集中某个文档的字段分页。参数：*field_name*, *doc_id*, *page*, *per_page*.

例子：



```python
# 404 if object doesn't exist
def view_todo(todo_id):
    todo = Todo.objects.get_or_404(_id=todo_id)
..

# Paginate through todo
def view_todos(page=1):
    paginated_todos = Todo.objects.paginate(page=page, per_page=10)

# Paginate through tags of todo
def view_todo_tags(todo_id, page=1):
    todo = Todo.objects.get_or_404(_id=todo_id)
    paginated_tags = todo.paginate_field('tags', page, per_page=10)
```

分页对象包含以下属性： iter_pages, next, prev, has_next, has_prev, next_num, prev_num.

在模板中：



```xml
{% macro render_pagination(pagination, endpoint) %}
  <div class=pagination>
  {%- for page in pagination.iter_pages() %}
    {% if page %}
      {% if page != pagination.page %}
        <a href="{{ url_for(endpoint, page=page) }}">{{ page }}</a>
      {% else %}
        <strong>{{ page }}</strong>
      {% endif %}
    {% else %}
      <span class=ellipsis>…</span>
    {% endif %}
  {%- endfor %}
  </div>
{% endmacro %}
```

## MongoEngine 和 WTForms

你可以这样使用MongoEngine 和 WTForms：



```python
from flask.ext.mongoengine.wtf import model_form

class User(db.Document): 
  email = db.StringField(required=True) 
  first_name = db.StringField(max_length=50) 
  last_name = db.StringField(max_length=50)

class Content(db.EmbeddedDocument): 
  text = db.StringField() 
  lang = db.StringField(max_length=3)

class Post(db.Document): 
  title = db.StringField(max_length=120, required=True, validators=[validators.InputRequired(message=u'Missing title.'),]) 
  author = db.ReferenceField(User) 
  tags = db.ListField(db.StringField(max_length=30)) 
  content = db.EmbeddedDocumentField(Content)

PostForm = model_form(Post)

def add_post(request): 
  form = PostForm(request.POST) 
  if request.method == 'POST' and form.validate(): 
    # do something 
    redirect('done') 
  return render_template('add_post.html', form=form)
```



作者：森与渊
链接：https://www.jianshu.com/p/b929b3671240
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。