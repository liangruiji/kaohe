# JS笔记(19): window对象

## window 对象:

- 1. `window.navigator.userAgent`: 浏览器的 User Agent 字符串，表示浏览器的厂商和版本信息。

- 1. `window.open;` 通过新窗口打开这个网址

  - `window.open('www.jd.com','_blank');`

- 1. `window.close();` 关闭窗口

## `window.location`对象：

window.location对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法

- `Location.href`：整个 URL。
- `Location.protocol`：当前 URL 的协议，包括冒号（:）。
- `Location.host`：主机，包括冒号（:）和端口（默认的80端口和443端口会省略）。
- `Location.hostname`：主机名，不包括端口。
- `Location.port`：端口号。
- `Location.pathname`：URL 的路径部分，从根路径/开始。
- `Location.search`：查询字符串部分，从问号?开始。
- `Location.hash`：片段字符串部分，从#开始。可读可写。
- `Location.username`：域名前面的用户名。
- `Location.password`：域名前面的密码。
- `Location.origin`：URL 的协议、主机名和端口。

