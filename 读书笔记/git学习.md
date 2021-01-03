# git学习

https://note.youdao.com/ynoteshare1/index.html?id=4653994abae090b764e7fb65a039a7fe&type=note

https://www.liaoxuefeng.com/wiki/896043488029600/898732864121440

git pull 开始工作之前先运行下git pull命令，将远程仓库的代码拉取下来然后同步本地仓库的代码，上班时候和开始进入开发前必须要做的

 运行”yarn install”安装包

gIt log  显示提交日志

git checkout -b dev-feat-ID1002594 新建dev-feat-ID1002594分支并切换到dev-feat-ID1002594 

在dev-feat-ID1002594分支开发

- 执行 **git add .** 将更改的文件推入索引区
- 执行 **git cz** 

git checkout develop  切换分支到develop

git pull # 将其他同事的工作合并过来，防止冲突

git merge dev_feat_ID1002594 合并分支将dev_feat_ID1002594内容合并到当前develop分支

shift + z +z保存

git push 上传到测试服，没问题就到发布到正式服

shift + z +z保存

release 库名 发布到正式服



然后删除本地功能分支

git branch -d dev-feat-ID1002594







其他

删除远程分支

git push -d origin dev-xxx

改下分支名
 git branch -m vue_lrj dev_vue_lrj

查看本地分支追踪的远程分支

git branch -vv

更改本地分支追踪的远程分支

git branch --set-upstream-to=origin/远程分支名 本地分支名

或

git branch --set-upstream 本地分支名 origin/远程分支名



git提交冲突

git merge合并分支时出现

原因

别人和你修改了同一个文件的同一个地方

解决

1.git status，查看双方修改的文件提示

2.打开VSCode点击侧边栏的源代码管理 -> 展开合并更改 -> 里面的就是双方都有改动的文件也就是冲突文件 -> 然后按照场景选择保留“当前更改”还是“传入的更改”

 3.git add .

4.git cz

5git push

