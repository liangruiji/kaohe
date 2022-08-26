[TOC]



##### 入口

###### 字符串语法

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js',
};
```

相当于

~~~js
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
  },
};
~~~

###### 数组语法

~~~js
module.exports = {
  entry: ['./src/file_1.js', './src/file_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
~~~

###### 对象语法

~~~js
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
};
~~~

~~~js
module.exports = {
  entry: {
    a2: 'dependingfile.js',
    b2: {
      dependOn: 'a2', // 当前入口点依赖的入口点。必须在加载此入口点之前加载它们
      filename: '', // 
      import: './src/app.js', // 启动时加载的模块
      library: '',
      runtime:'',
      publicPath:''
    },
  },
};
// 注意
// 1. runtime并且dependOn不应在单个条目上一起使用
// 2. 确保runtime不能指向现有的入口点名称
// 3. dependOn不能是循环的
~~~



##### 输出

配置`output`配置选项告诉 webpack 如何将编译后的文件写入磁盘。请注意，虽然可以有多个`entry`点，但只`output`指定了一种配置。

###### 单入口

~~~
module.exports = {
  output: {
    filename: 'bundle.js',
  },
};
~~~

###### 多入口

~~~
module.exports = {
  //...
  output: {
    filename: '[name].bundle.js',
  },
};
module.exports = {
  //...
  output: {
    filename: '[id].bundle.js',
  },
};
module.exports = {
  //...
  output: {
    filename: '[contenthash].bundle.js',
  },
};

~~~

###### 模板字符串

Substitutions available on Compilation-level:

| Template   | Description                  |
| :--------- | :--------------------------- |
| [fullhash] | The full hash of compilation |
| [hash]     | Same, but deprecated         |

Substitutions available on Chunk-level:

| Template      | Description                                                  |
| :------------ | :----------------------------------------------------------- |
| [id]          | The ID of the chunk                                          |
| [name]        | The name of the chunk, if set, otherwise the ID of the chunk |
| [chunkhash]   | The hash of the chunk, including all elements of the chunk   |
| [contenthash] | The hash of the chunk, including only elements of this content type (affected by `optimization.realContentHash`) |

Substitutions available on Module-level:

| Template      | Description                           |
| :------------ | :------------------------------------ |
| [id]          | The ID of the module                  |
| [moduleid]    | Same, but deprecated                  |
| [hash]        | The hash of the module                |
| [modulehash]  | Same, but deprecated                  |
| [contenthash] | The hash of the content of the module |

Substitutions available on File-level:

| Template   | Description                                                  |
| :--------- | :----------------------------------------------------------- |
| [file]     | Filename and path, without query or fragment                 |
| [query]    | Query with leading `?`                                       |
| [fragment] | Fragment with leading `#`                                    |
| [base]     | Only filename (including extensions), without path           |
| [filebase] | Same, but deprecated                                         |
| [path]     | Only path, without filename                                  |
| [name]     | Only filename without extension or path                      |
| [ext]      | Extension with leading `.` (not available for [output.filename](https://webpack.js.org/configuration/output/#outputfilename)) |

Substitutions available on URL-level:

| Template | Description |
| :------- | :---------- |
| [url]    | URL         |

##### 装载机

加载器是应用于模块源代码的转换。允许您在您`import`或“加载”文件时预处理文件。

###### 使用

配置：在**webpack.config.js**文件中指定它们。

内联：在每个`import`语句中明确指定它们。

~~~js
// 载器从右到左（或从下到上）执行
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
~~~

