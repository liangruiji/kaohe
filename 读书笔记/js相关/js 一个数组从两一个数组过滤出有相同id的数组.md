~~~
  let projectsId = this.localProject.map(item => item.id)
      // 缓存的projects和this.user.projects的差集
      let difference = this.user.projects.filter(item => {
        return !projectsId.includes(item.id)
      })
~~~

