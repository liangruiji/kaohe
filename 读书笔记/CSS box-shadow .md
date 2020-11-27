```css
/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页(阴影向内) | x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;
```

向元素添加单个 box-shadow 效果时使用以下规则：

- 当给出两个、三个或四个length值时。
  - 如果只给出两个值, 那么这两个值将会被当作 `<offset-x><offset-y>` 来解释。
  - 如果给出了第三个值, 那么第三个值将会被当作`<blur-radius>`解释。
  - 如果给出了第四个值, 那么第四个值将会被当作`<spread-radius>`来解释。
- 可选，`inset`关键字。
- 可选，`<color>`值。

若要对同一个元素添加多个阴影效果，请使用逗号将每个阴影规则分隔开。