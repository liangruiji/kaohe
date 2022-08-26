var str = '{"name":"小明","age":18}';

将字符串转化json对象：

1. var json = JSON.parse(str);
2. var json = eval("(" + str + ")");
3. var json = (new Function("return " + str))();
4. jq插件的使用parseJSON()

##### JSON.parse()

注意事项:

json格式字符串必须是写在一排的，

且括号外面用单引号，

里面的每一个字符串用双引号

在属性名上加上双引号，只能用双引号，不能用单引号；