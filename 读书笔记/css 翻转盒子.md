## css 翻转盒子

思路：一个固定的盒子，和一个翻转的盒子，当鼠标悬浮在固定的盒子上时，需要翻转的盒子翻转

如果翻转效果是两面都有东西，则需要在翻转的盒子里创建两个盒子做绝对定位，一个做正面，一个做反面，反面翻转，保持翻转效果需要

```html
    <div class="xf">
        <div class="xz">
            <div class="first">
                1235887575757
            </div>
            <div class="second">
                456
            </div>irst
        </div>
    </div>
```

```css
        .xf {
            margin: 200px auto;
            /* perspective: 500px; */
            width: 400px;
            border-radius: 50%;
            /* background-color: #000000; */
        }
        .xz {
            position: relative;
            /* width: 400px; */
            height: 400px;
            border-radius: 50%;
            transform-style: preserve-3d;
            transition: all 2s;
            background-color: pink;
            /* 设置overflow: hidden;会出问题 */
        }
        .first,
        .second {
            position: absolute;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            text-align: center;
            line-height: 400px;
        }
        .f {
            z-index: 1;
            background-color: gold;
        }
        .s {
            background-color: purple;
            transform: translate(-50%,-50%) rotateY(180deg);
        }

        .xf:hover .xz {
            transform: rotateY(270deg);
        }

```

