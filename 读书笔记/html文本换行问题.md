## html文本换行问题

- 强制不换行：white-space:nowrap;
- 超出部分隐藏：overflow: hidden;
- 隐藏部分用省略号代替：overflow: hidden; text-overflow: ellipsis;
- 自动换行：word-wrap: break-word; （ word-break: normal; ）
- 强制断开英文单词实现换行：word-break: break-all;

~~~html
<style>
        .box1{
            /* 超出隐藏 */
            white-space:nowrap;
            overflow: hidden;
            height: 60px;
            width: 100px;
            border: 2px solid black;
            margin-bottom: 10px;
        }
        .box2{
            /* 隐藏部分用省略号代替 */
            white-space:nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 60px;
            width: 100px;
            border: 2px solid black;
            margin-bottom: 10px;
        }
        .box3{
            /* 自动换行 */
            word-wrap: break-word;
            word-break: normal;
            height: 200px;
            width: 100px;
            border: 2px solid black;
            margin-bottom: 10px;
        }
        .box4{
            /* 强制拆开英文单词实现换行 */
            word-break:break-all;
            height: 200px;
            width: 100px;
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <div class="box1">Every night in my dreams, I see you, I feel you.</div>
    <div class="box2">Every night in my dreams, I see you, I feel you.</div>
    <div class="box3">Every night in my dreams, I see you, I feel you.</div>
    <div class="box4">Every night in my dreams, I see you, I feel you.</div>
</body>
~~~



