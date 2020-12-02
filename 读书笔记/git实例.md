~~~
 ~  cd /web/www
 /web/www  ls
py_lrj  train  vue_lrj
 /web/www  vue_lrj/
 /web/www/vue_lrj   develop  ll
total 0
drwxr-xr-x 10 telking wheel 320 Oct 26 17:51 taobao
drwxr-xr-x  6 telking wheel 192 Oct 29 17:15 tianmao
 /web/www/vue_lrj   develop  git branch
 /web/www/vue_lrj   develop  git push
fatal: The current branch develop has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin develop

 ✘  /web/www/vue_lrj   develop  git push --set-upstream origin develop
error: src refspec develop does not match any.
error: failed to push some refs to 'git:vue_lrj'
 ✘  /web/www/vue_lrj   develop  git add .
 /web/www/vue_lrj   develop ✚  a
zsh: command not found: a
 ✘  /web/www/vue_lrj   develop ✚  git commit -am "d"
[develop (root-commit) 368787b] d
 16 files changed, 6725 insertions(+)
 create mode 100644 taobao/css/base.css
 create mode 100644 taobao/css/common.css
 create mode 100644 taobao/fonts/demo.css
 create mode 100644 taobao/fonts/demo_index.html
 create mode 100644 taobao/fonts/iconfont.css
 create mode 100644 taobao/fonts/iconfont.eot
 create mode 100644 taobao/fonts/iconfont.js
 create mode 100644 taobao/fonts/iconfont.json
 create mode 100644 taobao/fonts/iconfont.svg
 create mode 100644 taobao/fonts/iconfont.ttf
 create mode 100644 taobao/fonts/iconfont.woff
 create mode 100644 taobao/fonts/iconfont.woff2
 create mode 100644 taobao/index.html
 create mode 100644 taobao/test.html
 create mode 100644 tianmao/css/base.css
 create mode 100644 tianmao/index.html
 /web/www/vue_lrj   develop  git push
fatal: The current branch develop has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin develop

 ✘  /web/www/vue_lrj   develop      git push --set-upstream origin develop
Enumerating objects: 23, done.
Counting objects: 100% (23/23), done.
Delta compression using up to 4 threads
Compressing objects: 100% (22/22), done.
Writing objects: 100% (23/23), 103.88 KiB | 5.19 MiB/s, done.
Total 23 (delta 1), reused 0 (delta 0)
remote: ------------------------------------------------
remote: ---------- 测试服务器 develop 发布开始 ---------
remote: ------------------------------------------------
To git:vue_lrj
 * [new branch]      develop -> develop
Branch 'develop' set up to track remote branch 'develop' from 'origin' by rebasing.
 /web/www/vue_lrj   develop  git branch -a
 /web/www/vue_lrj   develop 
~~~

梁锐基 11-30 上午 11:45
 焕哥，git push 出现这个error: failed to push some refs to 'git:vue-tpl-cli3'错误是什么意思。

 幸焕光 11-30 上午 11:46
 你的分支名是什么？

 梁锐基 11-30 上午 11:47
 vue_lrj

 幸焕光 11-30 上午 11:49
 改下分支名

 幸焕光 11-30 上午 11:49
 git branch -m vue_lrj dev_vue_lrj

 幸焕光 11-30 上午 11:50
 因为服务器上的钩子不允许非dev_xxx开头的分支名push上来

 梁锐基 11-30 上午 11:51
 但好像我之前都push过的，也没问题

 幸焕光 11-30 上午 11:53
 不允许的

 梁锐基 11-30 上午 11:54
 你刚才说的分支名是指本地分支名吗

 幸焕光 11-30 上午 11:55
 是的