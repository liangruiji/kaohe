# ECharts数据可视化

学习目的：

1. 可视化面板布局适配屏幕
2.   利用ECharts 实现柱状图展示



核心技术： 

- 基于 flexible.js + rem 智能大屏适配

- VScode cssrem插件 
- Flex 布局
- Less 使用 
-  基于ECharts 数据可视化展示 
-  ECharts 柱状图数据设置 
-  ECharts 地图引入

背景图要和盒子大小变化设置bg-size = 100%

### 五步使用ECharts

1. 下载引用
2. 准备有大小的dom容器

3. 初始化ECharts实例对象

```
	var myc = echarts.init(dom对象)
```

4. 指定配置与数据option

```
	var option = {
		
	}
```

5. 将配置设置给ECharts实例对象

```
	myc.setOption(option)
```

6. 图标随屏幕自适应

```

```

