# git

1. git init 始化本地仓库

2. git add . 加入暂存取

3. git status 查看状态，本地仓库与文件比较

4. git commit -m <这次提交的信息> 提交到本地仓库

5. 关联本地仓库与github仓库 

   ```
   git remote add origin https://github.com/daoke0818/testGit2.git
   ```

    

6. ```
   //第一次push
   git push -u origin master
   //后面推送
   git push origin master
   ```

git log 查看日志，能看到什么人什么时间提交了怎么样的commit，包含一个唯一的哈希值











我也遇到了fatal: Could not read from remote repository. Please make sure you have the correct access rights and the repository exists.的问题，以下来自我的笔记：

廖老师是通过 git@github.com:michaelliao/learngit.git 关联的，我在win7和win10上测试推送时都不能成功，https的才可以。如果已经用git@关联，则可以在.git目录下的config文件中，把 url = 后面的内容改为https类型的即可。 https类型的格式为： $ git remote add origin https://github.com/daoke0818/testGit2.git

**另外我发现：**

如果在第一步中创建时已经初始化过项目，则这时会提醒 error: failed to push some refs to 'https://github.com/daoke0818/testGit2.git' hint: Updates were rejected because the remote contains work that you do hint: not have locally. This is usually caused by another repository pushing hint: to the same ref. You may want to first integrate the remote changes hint: (e.g., 'git pull ...') before pushing again. hint: See the 'Note about fast-forwards' in 'git push --help' for details.

因为远程库中已经存在readme文件了，所以需要先pull下来。命令如下： $ git pull origin master

这时又会报错： From https://github.com/daoke0818/testGit

branch master -> FETCH_HEAD fatal: refusing to merge unrelated histories 说这两个库有不相干的历史记录而无法合并，这时我们可以加上一个参数 --allow-unrelated-histories 即可成功pull： $ git pull origin master --allow-unrelated-histories

但是这时会可能会提示必须输入提交的信息，默认会打开vim编辑器，先按 i 切换到插入模式，写完后 Esc→：→wq 即可保存退出编辑器。如果不进入vim编辑器，则会自动生成一个合并代码的commit。然后再使用前面的命令push将本地提交推送到远程仓库。后面如果本地还有commit，就可以直接用 git push origin master 推送。