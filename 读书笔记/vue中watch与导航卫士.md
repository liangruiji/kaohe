我们在监听路由变化的时候一般会选择使用watch, 但是,如果我们希望通过监听路由的变化来控制一些页面的访问权限,watch就不那么好用了.

为什么这么说呢?
假设我希望控制用户访问index主页的权限,当我监听到路由是去到index的,就要判断用户是否有权限,.
如果用户从index跳到index的话,此时watch就失效了,无法监听,因为他不认为路由发生了变化

此时我们可以使用导航守卫来实现这个监听,它可以监听到从index到index的跳转,仍然成功的拦截到没有权限的用户
(简单的总结,勿喷)

