每个元素设置不同的样式标签数据

```js
//间隔设置提示文本
formatter:(p)=>{
                            // console.log(p);
                            if(p.dataIndex % 2 == 0){
                                return p.value;
                            }else {
                                return '';
                            }
                            
                        },
```

每个元素设置不同的圈圈样式

```js
//间隔设置圈圈
symbol: (a,p)=>{
                        console.log(p);
                        if(p.dataIndex % 2 == 0){
                            return 'emptyCircle';
                        }else {
                            return 'none';
                        }
```

