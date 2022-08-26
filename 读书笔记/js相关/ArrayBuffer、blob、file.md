[TOC]



#### ArrayBuffer

##### 基本概念

1. `ArrayBuffer` 是核心对象，是所有的**基础**，是原始的二进制数据,—— 对固定长度的连续内存空间的引用。

2. 如要操作 `ArrayBuffer`，我们需要使用“视图”对象。

3. 视图对象本身并不存储任何东西。它是一副“眼镜”，透过它来解释存储在 `ArrayBuffer` 中的字节。
4. Uint8Array、Uint16Array等通用术语是 TypedArray



##### 获得方式

~~~js
// 1.自己创建
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer
// 2.fetch请求获得arrayBuffer
fetch(url).then(function(o) {
    return o.arrayBuffer()
}).then((res)=>{
console.log('我是ArrayBuffer实例',res)
})
// 3.请求获得arrayBuffer
var method = 'get';
var url = '';
var xhr = new XMLHttpRequest();
xhr.open(method, url, true);
xhr.responseType = 'arraybuffer';
//设置ajax的响应类型为arraybuffer
xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
xhr.onload = function() //当请求完成，响应就绪进入
{
    if (this.status == 200){
        var arraybuffer = this.response;
        //获取响应返回的arraybuffer对象
        console.log(arraybuffer)
        } 
    }
}
;
xhr.send(JSON.stringify({
    name: '',
    status: ''
}));
//附带参数发送请求

~~~

##### 操作

~~~js
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer
let view = new Uint32Array(buffer); // 将 buffer 视为一个 32 位整数的序列
// 让我们写入一个值
view[0] = 123456;
~~~

##### TypedArray(9种视图)

- **`Uint8Array`** —— 将 `ArrayBuffer` 中的每个字节视为 0 到 255 之间的单个数字（每个字节是 8 位，因此只能容纳那么多）。这称为 “8 位无符号整数”。
- **`Uint16Array`** —— 将每 2 个字节视为一个 0 到 65535 之间的整数。这称为 “16 位无符号整数”。
- **`Uint32Array`** —— 将每 4 个字节视为一个 0 到 4294967295 之间的整数。这称为 “32 位无符号整数”。
- **`Float64Array`** —— 将每 8 个字节视为一个 `5.0x10-324` 到 `1.8x10308` 之间的浮点数。



###### 创建TypedArray

~~~js
new TypedArray(buffer, [byteOffset], [length]); // 传入ArrayBuffer，可选为起始位置
new TypedArray(object); // 传入Array，或任何类数组对象，则会创建一个相同长度的类型化数组，并复制其内容
new TypedArray(typedArray); // 传入TypedArray，创建一个相同长度的类型化数组，并复制其内容。如果需要的话，数据在此过程中会被转换为新的类型
new TypedArray(length); 
new TypedArray();
~~~

创建TypedArray时，除第一种情况（已提供 `ArrayBuffer`）外，其他所有情况都会自动创建 `ArrayBuffer`

~~~js
// TypedArray 访问 ArrayBuffer
arr.buffer
~~~

###### TypedArray 方法

`TypedArray` 具有常规的 `Array` 方法，但有个明显的例外。

我们可以遍历（iterate），`map`，`slice`，`find` 和 `reduce` 等。

但有几件事我们做不了：

- 没有 `splice` —— 我们无法“删除”一个值，因为类型化数组是缓冲区（buffer）上的视图，并且缓冲区（buffer）是固定的、连续的内存区域。我们所能做的就是分配一个零值。
- 无 `concat` 方法。

还有两种其他方法：

- `arr.set(fromArr, [offset])` 从 `offset`（默认为 0）开始，将 `fromArr` 中的所有元素复制到 `arr`。
- `arr.subarray([begin, end])` 创建一个从 `begin` 到 `end`（不包括）相同类型的新视图。这类似于 `slice` 方法（同样也支持），但不复制任何内容 —— 只是创建一个新视图，以对给定片段的数据进行操作。

有了这些方法，我们可以复制、混合类型化数组，从现有数组创建新数组等。

##### DataView

DataView是在 `ArrayBuffer` 上的一种特殊的超灵活“未类型化”视图。

- 对于类型化的数组，构造器决定了其格式。整个数组应该是统一的。第 i 个数字是 `arr[i]`。
- 通过 `DataView`，我们可以使用 `.getUint8(i)` 或 `.getUint16(i)` 之类的方法访问数据。我们在调用方法时选择格式，而不是在构造的时候。

~~~
// 4 个字节的二进制数组，每个都是最大值 255
let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

let dataView = new DataView(buffer);

// 在偏移量为 0 处获取 8 位数字
alert( dataView.getUint8(0) ); // 255

// 现在在偏移量为 0 处获取 16 位数字，它由 2 个字节组成，一起解析为 65535
alert( dataView.getUint16(0) ); // 65535（最大的 16 位无符号整数）

// 在偏移量为 0 处获取 32 位数字
alert( dataView.getUint32(0) ); // 4294967295（最大的 32 位无符号整数）

dataView.setUint32(0, 0); // 将 4 个字节的数字设为 0，即将所有字节都设为 0
~~~

当我们将混合格式的数据存储在同一缓冲区（buffer）中时，`DataView` 非常有用。例如，当我们存储一个成对序列（16 位整数，32 位浮点数）时，用 `DataView` 可以轻松访问它们。



#### Blob

`ArrayBuffer` 和视图（view）都是 ECMA 标准的一部分，是 JavaScript 的一部分。
在浏览器中，还有其他更高级的对象，特别是 `Blob`

`Blob` 由一个可选的字符串 `type`（通常是 MIME 类型）和 `blobParts` 组成 —— 一系列其他 `Blob` 对象，字符串和 `BufferSource`。

###### 构造函数语法

```javascript
new Blob(blobParts, options);
```

- **`blobParts`** 是 `Blob`/`BufferSource`/`String` 类型的值的数组。

- `options`

  可选对象：

  - **`type`** —— `Blob` 类型，通常是 MIME 类型，例如 `image/png`，
  - **`endings`** —— 是否转换换行符，使 `Blob` 对应于当前操作系统的换行符（`\r\n` 或 `\n`）。默认为 `"transparent"`（啥也不做），不过也可以是 `"native"`（转换）。

```javascript
// 从字符串创建 Blob
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// 请注意：第一个参数必须是一个数组 [...]
// 从类型化数组（typed array）和字符串创建 Blob
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```



我们可以用 `slice` 方法来提取 `Blob` 片段：

```javascript
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** —— 起始字节，默认为 0。
- **`byteEnd`** —— 最后一个字节（专有，默认为最后）。
- **`contentType`** —— 新 blob 的 `type`，默认与源 blob 相同。

参数值类似于 `array.slice`，也允许是负数。



###### `Blob` 对象是不可改变的

我们无法直接在 `Blob` 中更改数据，但我们可以通过 `slice` 获得 `Blob` 的多个部分，从这些部分创建新的 `Blob` 对象，将它们组成新的 `Blob`，等。

这种行为类似于 JavaScript 字符串：我们无法更改字符串中的字符，但可以生成一个新的改动过的字符串。



###### Blob 用作 URL  URL.createObjectURL()

`URL.createObjectURL` 取一个 `Blob`，并为其创建一个唯一的 URL， URL 存储了一个 URL → `Blob` 映射，可以访问 `Blob`

如果我们创建一个 URL，那么即使我们不再需要该 `Blob` 了，它也会被挂在内存中。

`URL.revokeObjectURL(url)` 从内部映射中移除引用，没有其他引用时，浏览器会自动释放内存

~~~js
// <a download="hello.txt" href='#' id="link">下载</a>
let blob = new Blob(["Hello, world!"], {
    type: 'text/plain'
  });
$('#link').attr('href', URL.createObjectURL(blob))
~~~



###### Blob 转换为 base64

可以在 “data-url” 中使用此编码

[“data-url”](https://developer.mozilla.org/zh/docs/Web/http/Data_URIs) 的形式为 `data:[<mediatype>][;base64],<data>`。我们可以在任何地方使用这种 url，和使用“常规” url 一样。

~~~js
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

let reader = new FileReader();
reader.readAsDataURL(blob); // 将 Blob 转换为 base64 并调用 onload

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
~~~

这两种从 `Blob` 创建 URL 的方法都可以用。但通常 `URL.createObjectURL(blob)` 更简单快捷。

###### 对比

URL.createObjectURL(blob)

- 如果介意内存，我们需要撤销（revoke）它们
- 直接访问 `Blob`，无需“编码/解码”

Blob 转换为 data url

- 无需撤销（revoke）任何操作。
- 对大的 `Blob` 进行编码时，性能和内存会有损耗。

###### Blob 转换为 ArrayBuffer

~~~js
// 从 blob 获取 arrayBuffer
let fileReader = new FileReader();

fileReader.readAsArrayBuffer(blob);

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
~~~

#### TextDecoder 和 TextEncoder，作用：解码（将缓冲区的字节转化为字符串） 或 编码（将字符串转换为字节）

##### TextDecoder（解码）

内建的 [TextDecoder](https://encoding.spec.whatwg.org/#interface-textdecoder) 对象在给定缓冲区（buffer）和编码格式（encoding）的情况下，能够将值读取到实际的 JavaScript 字符串中。

##### 构建函数

```javascript
let decoder = new TextDecoder([label], [options]);
```

- **`label`** —— 编码格式，默认为 `utf-8`，但同时也支持 `big5`，`windows-1251` 等许多其他编码格式。

- `options`

  —— 可选对象：

  - **`fatal`** —— 布尔值，如果为 `true` 则为无效（不可解码）字符抛出异常，否则（默认）用字符 `\uFFFD` 替换无效字符。
  - **`ignoreBOM`** —— 布尔值，如果为 `true` 则 BOM（可选的字节顺序 unicode 标记），很少需要使用。

……然后解码：

```javascript
let str = decoder.decode([input], [options]);
```

- **`input`** —— 要被解码的 `BufferSource`。

- `options`

  —— 可选对象：

  - **`stream`** —— 对于解码流，为 true，则将传入的数据块（chunk）作为参数重复调用 `decoder`。在这种情况下，多字节的字符可能偶尔会在块与块之间被分割。这个选项告诉 `TextDecoder` 记住“未完成”的字符，并在下一个数据块来的时候进行解码。

##### eg解码

~~~js
let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
let str= new TextDecoder().decode(uint8Array); // Hello
~~~

可以通过为其创建子数组视图来解码部分缓冲区

~~~js
let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);
// 该字符串位于中间
// 在不复制任何内容的前提下，创建一个新的视图
let binaryString = uint8Array.subarray(1, -1);
let str = new TextDecoder().decode(binaryString); // Hello
~~~

##### TextEncoder（编码）

TextEncoder做相反的事情 —— 将字符串转换为字节。

构建函数

```javascript
let encoder = new TextEncoder();
```

只支持 `utf-8` 编码。

它有两种方法：

- **`encode(str)`** —— 从字符串返回 `Uint8Array`。
- **`encodeInto(str, destination)`** —— 将 `str` 编码到 `destination` 中，该目标必须为 `Uint8Array`。

###### eg编码

~~~js
let encoder = new TextEncoder();
let uint8Array = encoder.encode("Hello");
~~~

#### File 和 FileReader

##### File

[File](https://www.w3.org/TR/FileAPI/#dfn-file) 对象继承自 `Blob`，并扩展了与文件系统相关的功能。

有两种方式可以获取它。

第一种，与 `Blob` 类似，有一个构造器：

```javascript
new File(fileParts, fileName, [options])
```

- **`fileParts`** —— Blob/BufferSource/String 类型值的数组。

- **`fileName`** —— 文件名字符串。

- `options` 

  —— 可选对象：

  - **`lastModified`** —— 最后一次修改的时间戳（整数日期）。

第二种，更常见的是，我们从 `<input type="file">` 或拖放或其他浏览器接口来获取文件。在这种情况下，file 将从操作系统（OS）获得 this 信息。

由于 `File` 是继承自 `Blob` 的，所以 `File` 对象具有相同的属性，附加：

- `name` —— 文件名，
- `lastModified` —— 最后一次修改的时间戳。

这就是我们从 `<input type="file">` 中获取 `File` 对象的方式：

```html
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];
  alert(`File name: ${file.name}`); // 例如 my.png
  alert(`Last modified: ${file.lastModified}`); // 例如 1552830408824
}
</script>
```

##### FileReader

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) 是一个对象

作用：是从 `Blob`（因此也从 `File`）对象中读取数据。

构造函数：

```javascript
let reader = new FileReader(); // 没有参数
```

主要方法:

- **`readAsArrayBuffer(blob)`** —— 将数据读取为二进制格式的 `ArrayBuffer`。
- **`readAsText(blob, [encoding])`** —— 将数据读取为给定编码（默认为 `utf-8` 编码）的文本字符串。
- **`readAsDataURL(blob)`** —— 读取二进制数据，并将其编码为 base64 的 data url。
- **`abort()`** —— 取消操作。

`read*` 方法的选择，取决于我们喜欢哪种格式，以及如何使用数据。

- `readAsArrayBuffer` —— 用于二进制文件，执行低级别的二进制操作。对于诸如切片（slicing）之类的高级别的操作，`File` 是继承自 `Blob` 的，所以我们可以直接调用它们，而无需读取。
- `readAsText` —— 用于文本文件，当我们想要获取字符串时。
- `readAsDataURL` —— 当我们想在 `src` 中使用此数据，并将其用于 `img` 或其他标签时。正如我们在 [Blob](https://zh.javascript.info/blob) 一章中所讲的，还有一种用于此的读取文件的替代方案：`URL.createObjectURL(file)`。

读取过程中，有以下事件：

- `loadstart` —— 开始加载。
- `progress` —— 在读取过程中出现。
- `load` —— 读取完成，没有 error。
- `abort` —— 调用了 `abort()`。
- `error` —— 出现 error。
- `loadend` —— 读取完成，无论成功还是失败。

读取完成后，我们可以通过以下方式访问读取结果：

- `reader.result` 是结果（如果成功）
- `reader.error` 是 error（如果失败）。

使用最广泛的事件无疑是 `load` 和 `error`。

eg

~~~JS
let reader = new FileReader();
reader.readAsDataURL(blob); // 将 Blob 转换为 base64 并调用 onload
reader.onload = function () {
	// reader.result; 是 data url
};
~~~

###### 总结

`File` 对象继承自 `Blob`。

`File` 对象获得的两种方式，构建函数或input标签中获得

我们可以使用`FileReader` 对象将 `File`  或blob 转换为其他格式：

- `readAsArrayBuffer(blob)` —— 转换为 `ArrayBuffer`，
- `readAsText(blob, [encoding])` —— 转换为字符串（`TextDecoder` 的一个替代方案），
- `readAsDataURL(blob)` —— 转换为 base64 的 data url。

要通过网络发送一个 `File`，那也很容易：像 `XMLHttpRequest` 或 `fetch` 等网络 API 本身就接受 `File` 对象。

