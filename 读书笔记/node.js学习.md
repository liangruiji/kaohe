##### 运行模式

###### 1脚本模式

终端通过node 文件名.js来运行

~~~
node 测试.js
~~~

###### 2交互模式

终端运行node命令，进入交互模式

~~~
node
console.log("已进入交互模式")
~~~

##### 创建node.js应用

###### 1引入http模块

###### 2创建服务器

~~~js
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
	//  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n')
})

server.listen(port, hostname, () => {
  // 终端打印如下信息
  console.log(`Server running at http://${hostname}:${port}/`)
})
~~~

新版的nodejs已经集成了npm，**npm -v**可以查看npm的版本

##### 使用npm命令安装模块

`npm` 是 Node.js 标准的软件包管理器。

~~~shell
npm install <Module Name>
npm install express        # 本地安装
npm install express -g   # 全局安装
npm uninstall <package-name> # 卸载模块
npm uninstall -S <package-name> # --save 卸载模块，且移除 package.json 文件中的引用。
npm uninstall -D <package-name> # --save-dev 卸载模块，且移除 package.json 文件中的引用。
npm ls # 查看包是否还存在
npm update express # 更新模块
npm search express # 搜索模块

npm list # 查看所有已安装的 npm 软件包
npm list --depth=0 # 仅获取顶层的软件包
npm install <package>@<version> # 可以使用 @ 语法来安装 npm 软件包的旧版本
npm view <package> versions # 列出软件包所有的以前的版本。
~~~

如果你遇到了使用 npm 安 装node_modules 总是提示报错：报错: **npm resource busy or locked.....**。

可以先删除以前安装的 node_modules :

~~~
npm cache clean
npm install
~~~

##### 引入模块

~~~
var http = require('http');

~~~

##### 导出模块

~~~
exports.world = function() {
  console.log('Hello World');
}
module.exports = function() {
  // ...
}
~~~

全局对象global

**__filename** 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

**__dirname** 表示当前执行脚本所在的目录。

process 是一个全局变量，即 global 对象的属性。

它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。



##### 事件触发器

Node.js 也提供了使用`events` 模块构建类似系统的选项。

`emit` 用于触发事件，通过将参数作为额外参数传给 `emit()` 来将参数传给事件处理程序。

`on` 用于添加回调函数（会在事件被触发时执行）。

~~~
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()
eventEmitter.on('start', ('参数1'，'参数2') => {
  console.log('开始')
})
eventEmitter.emit('start','参数1'，'参数2')
~~~

##### 发送请求

###### GET请求

~~~js
const https = require('https')
const options = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()
~~~

###### POST请求

~~~js
const https = require('https')

const data = JSON.stringify({
  todo: '做点事情'
})

const options = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
~~~

###### 使用axios库

~~~js
const axios = require('axios')

axios
  .post('http://nodejs.cn/todos', {
    todo: '做点事情'
  })
  .then(res => {
    console.log(`状态码: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })
~~~

###### 获取 HTTP 请求的正文数据

~~~js
// 请求
const axios = require('axios')
axios.post('http://nodejs.cn/todos', {
  todo: '做点事情'
})
// 服务器端代码 使用 Express 模块
const express = require('express')
const app = express()
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())
app.post('/todos', (req, res) => {
  console.log(req.body.todo)
})
~~~

当使用 `http.createServer()` 初始化 HTTP 服务器时，服务器会在获得所有 HTTP 请求头（而不是请求正文时）时调用回调。

在连接回调中传入的 `request` 对象是一个流。

因此，必须监听要处理的主体内容，并且其是按数据块处理的。

首先，通过监听流的 `data` 事件来获取数据，然后在数据结束时调用一次流的 `end` 事件：

~~~js
// 服务器端代码 使用使用原生http
const server = http.createServer((req, res) => {
  // 可以访问 HTTP 请求头
  req.on('data', chunk => {
    console.log(`可用的数据块: ${chunk}`)
  })
  req.on('end', () => {
    //数据结束
  })
})
~~~

##### fs模块



- `fs.access()`: 检查文件是否存在，以及 Node.js 是否有权限访问。
- `fs.appendFile()`: 追加数据到文件。如果文件不存在，则创建文件。
- `fs.chmod()`: 更改文件（通过传入的文件名指定）的权限。相关方法：`fs.lchmod()`、`fs.fchmod()`。
- `fs.chown()`: 更改文件（通过传入的文件名指定）的所有者和群组。相关方法：`fs.fchown()`、`fs.lchown()`。
- `fs.close()`: 关闭文件描述符。
- `fs.copyFile()`: 拷贝文件。
- `fs.createReadStream()`: 创建可读的文件流。
- `fs.createWriteStream()`: 创建可写的文件流。
- `fs.link()`: 新建指向文件的硬链接。
- `fs.mkdir()`: 新建文件夹。
- `fs.mkdtemp()`: 创建临时目录。
- `fs.open()`: 设置文件模式。
- `fs.readdir()`: 读取目录的内容。
- `fs.readFile()`: 读取文件的内容。相关方法：`fs.read()`。
- `fs.readlink()`: 读取符号链接的值。
- `fs.realpath()`: 将相对的文件路径指针（`.`、`..`）解析为完整的路径。
- `fs.rename()`: 重命名文件或文件夹。
- `fs.rmdir()`: 删除文件夹。
- `fs.stat()`: 返回文件（通过传入的文件名指定）的状态。相关方法：`fs.fstat()`、`fs.lstat()`。
- `fs.symlink()`: 新建文件的符号链接。
- `fs.truncate()`: 将传递的文件名标识的文件截断为指定的长度。相关方法：`fs.ftruncate()`。
- `fs.unlink()`: 删除文件或符号链接。
- `fs.unwatchFile()`: 停止监视文件上的更改。
- `fs.utimes()`: 更改文件（通过传入的文件名指定）的时间戳。相关方法：`fs.futimes()`。
- `fs.watchFile()`: 开始监视文件上的更改。相关方法：`fs.watch()`。
- `fs.writeFile()`: 将数据写入文件。相关方法：`fs.write()`。

关于 `fs` 模块的特殊之处是，所有的方法默认情况下都是异步的，但是通过在前面加上 `Sync` 也可以同步地工作，同步的 API 则可以这样使用，并使用 try/catch 块来处理错误。

###### open

~~~js
const fs = require('fs')
fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  //fd 是文件描述符。
})
~~~

fs.open("文件路径","标志符",回调函数)

标志符：用于声明打开文件的用途

常用的标志有：

- `r`打开文件用于读取。
- `r+` 打开文件用于读写。
- `w+` 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
- `a` 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
- `a+` 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。

###### openSync

~~~js
const fs = require('fs')
try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r')
   //fd 是文件描述符。
} catch (err) {
  console.error(err)
}
~~~

###### stat

fs.stat("文件路径",callback("错误消息","文件属性"){})

~~~js
const fs = require('fs')
fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  //可以访问 `stats` 中的文件属性
  stats.isFile() //true
  stats.isDirectory() //false
  stats.isSymbolicLink() //false
  stats.size //1024000 //= 1MB
})
~~~

###### statSync

~~~js
const fs = require('fs')
try {
  const stats = fs.statSync('/Users/joe/test.txt')
} catch (err) {
  console.error(err)
}

~~~

###### readFile

~~~js
const fs = require('fs')

fs.readFile('/Users/joe/test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
~~~

###### readFileSync

~~~js
const fs = require('fs')

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}
~~~

`fs.readFile()` 和 `fs.readFileSync()` 都会在返回数据之前将文件的全部内容读取到内存中。

这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响。

在这种情况下，更好的选择是使用流来读取文件的内容。

###### writeFile

~~~js
const fs = require('fs')

const content = '一些内容'

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //文件写入成功。
})

fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {}) // 通过指定标志来修改默认的行为：
~~~

###### writeFileSync

~~~js
const fs = require('fs')

const content = '一些内容'

try {
  const data = fs.writeFileSync('/Users/joe/test.txt', content)
  //文件写入成功。
} catch (err) {
  console.error(err)
}


~~~

###### appendFile

~~~
const content = '一些内容'

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //完成！
})
~~~

###### access 检查文件夹是否存在

使用 `fs.access()` 检查文件夹是否存在以及 Node.js 是否具有访问权限。

###### mkdir 创建新的文件夹

~~~js
const fs = require('fs')

const folderName = '/Users/joe/test'

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}
~~~

###### readdir 读取目录的内容

~~~js
const fs = require('fs')
const path = require('path')
const folderPath = '/Users/joe'
fs.readdirSync(folderPath)

fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})
~~~

过滤结果以仅返回文件（排除文件夹）：

~~~js
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile()
}

fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})
.filter(isFile)
~~~

###### rename 重命名文件夹

第一个参数是当前的路径，第二个参数是新的路径：

~~~js
const fs = require('fs')

fs.rename('/Users/joe', '/Users/roger', err => {
  if (err) {
    console.error(err)
    return
  }
  //完成
})

try {
  fs.renameSync('/Users/joe', '/Users/roger')
} catch (err) {
  console.error(err)
}
~~~

###### rmdir 删除文件夹

删除包含内容的文件夹可能会更复杂，最好安装 [`fs-extra`](https://www.npmjs.com/package/fs-extra) 模块，该模块非常受欢迎且维护良好。 它是 `fs` 模块的直接替代品，在其之上提供了更多的功能。

~~~js
const fs = require('fs-extra')

const folder = '/Users/joe'

fs.remove(folder, err => {
  console.error(err)
})

fs.remove(folder)
  .then(() => {
    //完成
  })
  .catch(err => {
    console.error(err)
  })

async function removeFolder(folder) {
  try {
    await fs.remove(folder)
    //完成
  } catch (err) {
    console.error(err)
  }
}

const folder = '/Users/joe'
removeFolder(folder)
~~~



##### path模块

`path` 模块提供了许多非常实用的函数来访问文件系统并与文件系统进行交互。

- path.basename()  返回路径的最后一部分。 第二个参数可以过滤掉文件的扩展名

- path.dirname()  返回路径的目录部分

- path.extname()  返回路径的扩展名部分。

- path.isAbsolute()  如果是绝对路径，则返回 true。

- path.join()  连接路径的两个或多个部分：

- path.normalize()  当包含类似 `.`、`..` 或双斜杠等相对的说明符时，则尝试计算实际的路径

- path.parse()  解析对象的路径为组成其的片段：

- path.relative()  接受 2 个路径作为参数。 基于第一个路径，返回从第一个路径到第二个路径的相对路径。

- path.resolve()  获得相对路径的绝对路径计算

- path.sep  作为路径段分隔符，在 Windows 上是 `\`，在 Linux/macOS 上是 `/`

- path.delimiter   作为路径定界符，在 Windows 上是 `;`，在 Linux/macOS 上是 `:`

  



~~~js
const path = require('path')
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe  获取文件的父文件夹。
path.basename(notes) // notes.txt  获取文件名部分。
path.extname(notes) // .txt        获取文件的扩展名。

path.basename(notes, path.extname(notes)) //notes  通过为 basename 指定第二个参数来获取不带扩展名的文件名

const name = 'joe'
path.join('/', 'users', name, 'notes.txt') // '/users/joe/notes.txt'

path.resolve('joe.txt') //'/Users/joe/joe.txt' 获得相对路径的绝对路径
path.resolve('tmp', 'joe.txt') //'/Users/joe/tmp/joe.txt' 
path.resolve('/etc', 'joe.txt') //'/etc/joe.txt'

// 如果第一个参数以斜杠开头，则表示它是绝对路径
path.resolve('/etc', 'joe.txt') //'/etc/joe.txt' 
// path.normalize() 是另一个有用的函数，当包含诸如 .、.. 或双斜杠之类的相对说明符时，其会尝试计算实际的路径：
path.normalize('/users/joe/..//test.txt') //'/users/test.txt'
~~~

