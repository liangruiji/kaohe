01.git push 出现这个error: failed to push some refs to 'git:vue-tpl-cli3'错误是什么意思。
 改下分支名
 git branch -m vue_lrj dev_vue_lrj
 因为服务器上的钩子不允许非dev_xxx开头的分支名push上来

~~~shell
 /web/www/vue-todo   develop  git push
To git:vue-tpl-cli3
 ! [rejected]        develop -> develop (non-fast-forward)
error: failed to push some refs to 'git:vue-tpl-cli3'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
~~~

2.train库runs后报错

故障：Address already in use
原因：已经有相同的程序运行着，端口不能重复使用，需要运行下面的命令清除

```
ps -e | grep flask | grep -v grep | awk '{ print $1 }' | xargs sudo kill
```

3.将公司内部库拉取下来在本地建立版本库(以train库为例)

- git clone git:train /web/www/train # 将代码从远程版本服务器上clone下来，git:train表示从git服务器上clone一个名字为train的版本库到/web/www/train位置
- cd /web/www/train # 进入仓库目录
- git checkout -t remotes/origin/develop # 建立develop分支跟踪，将Git服务器上的develop分支在本地生成一个develop分支，并且关联起来，可以使用git branch -a查看其它的远程分支

