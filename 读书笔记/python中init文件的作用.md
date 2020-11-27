1.标识该目录是一个python的模块包（module package）

2.`__init__.py` 里的代码在包被导入时会被执行一次

3.执行import时，当前目录是不会变的，还是需要完整的包名。

4.from x import *会导入`__init__.py`中变量`__all__`中的模块，

