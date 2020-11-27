~~~python
from flask import Blueprint, request
from mongoengine import *
import time
api = Blueprint('api', __name__)
# 链接数据库
connect('todolist')
# 定义数据库文档对象，实例化文档对象时会自动验证字段
class Todo(Document):
    cont = StringField(required=True,null=False)
    status = StringField(required=True)
    group = StringField(required=True)
    update_time = IntField(default=int(time.time()))

    def to_json(self):
        return {
            "id":   self.id,
            "cont": self.cont,
            "status": self.status,
            "group": self.group,
            "update_time": self.update_time
        }

#添加todo
@api.route('/',methods=['POST'])
def api_add():  
    # 获得前端发送的form表单并转为字典
		todoform = request.form.to_dict()
    # 实例化文档对象，会自动是否符合规定的字段
		newtodo =Todo(cont=todoform['cont'],status=todoform['status'],group=todoform['group'],update_time=int(time.time()))
		# 实例化文档对象调用save()即可保存在数据库
    result =newtodo.save()
    # 获得todo文档的集合
		todolist = Todo.objects.all()
    # 遍历文档的集合，每个文档调用在文档对象中的方法to_json()，转为json，并保存在列表a中
    a = []
    for i in range(len(todolist)):
        b = todolist[i].to_json()
        a.append(b)
   	# 路由响应返回a到前端
    return a
  # 修改
   id = todoform['id']
        editcon = {'cont':todoform['cont'],'status':todoform['status'],'group':todoform['group'],'update_time':int(time.time())}
        result = Todo.objects.filter(pk=id).update_one(**editcon)
   # 删除     
   todoform = request.form.to_dict()
   id = todoform['id']
   result = Todo.objects.filter(pk=id).delete()
~~~

