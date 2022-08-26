##### css transform

[TOC]



###  语法

##### **transform：变形函数1	！变形函数2；**



#### 1. 平移函数

##### translate(x，！y)	

##### translate3d(x，y，z) 	

x y值为数字或百分比 ，z轴不能是百分比



#### 2.  缩放函数

##### scale(x，!y)

##### scale3d(x，y，z)

值为为缩放系数



#### 3. 旋转函数

##### rotate(z角度)

##### rotateX(x角度)

##### rotateY(y角度)

##### rotateZ(z角度)

##### rotate3d(x，y，z，向量(x,y,z)的角度)	看向量箭头顺时针旋转，左手法则

值为数字+角度单位（deg|grad|rad|turn）



#### 4. 倾斜函数

##### skewX(角度)

##### skewY(角度)

##### skew(x角度，y角度)



#### 5. 视域函数

##### perspective(d)

d为眼睛到屏幕的距离 如500px~1250px



#### 6. 矩阵函数

##### matrix(a，b，c，d，e，f)

以六个值确定的4*4变换矩阵指定2d平面的最终变形结果，计算很复杂，少人使用

**matrix3d(16个值)**

以十六个值确定的4*4变换矩阵指定3d平面的最终变形结果，计算很复杂，少人使用



### 移动变形原点

#### transform-origin:	(x，y，！z)；

旋转、缩放的中心

默认值 50% 50%

值可为

1. 上下左右关键字
2. 自身百分比宽高
3. 像素值



### 修改3d变形方式

#### transform-style:	flat|preserve-3d；

注意：写在父级，影响子元素的3d空间，preserve-3d保留子元素的3d空间



### 修改视域：眼睛到屏幕的距离

#### prespective：(距离)；



### 修改移动视域原点：眼睛在目标元素的位置

perspective：x y；

默认值：50% 50%

值可为

1. 上下左右关键字
2. 自身百分比宽高
3. 像素值



### 修改元素背面的可见性

backface-visibility：visible|hidden

默认值：visible 可见的