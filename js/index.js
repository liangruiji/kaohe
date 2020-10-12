window.onload = function () {
    lunbo();
    time();
    slider();
    smoothed();
    pie();

}

function lunbo(params) {
    var item2 = document.querySelector('.item_2');
    var ul = item2.querySelector('ul');
    var ol = item2.querySelector('ol');
    var leftBtn = item2.querySelector('.icon1');
    var rightBtn = item2.querySelector('.icon2');
    // console.log(ul.children.length);
    console.log(ul.children[0].offsetWidth);
    var w = ul.children[0].offsetWidth;


    // 遍历ul，动态建立方形索引，添加属性index，添加方形索引的点击事件
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        // li.index = i;
        ol.appendChild(li);

        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                this.className = 'current';
                var index = this.getAttribute('index');
                num = index;
                square = index;
                // console.log(typeof num);

                // var index = this.index;
                // console.log(ul.offsetLeft);
                // ul.style.left = -index * w + 'px';
                animate(ul, -index * w);
            }

        })
    }
    //给第一个方形索引设置类名，复制第一张图到ul的最后面
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0;
    var square = 0;
    var flag = true; //节流，使一次按钮动画完成后，按钮才有效
    //左按钮监听事件
    leftBtn.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * w + 'px';
            }
            num--;
            // ul.style.left = -num * w + 'px';
            animate(ul, -num * w, function () {
                flag = true;
            });

            square--;
            if (square == -1) {
                square = ol.children.length - 1;
            }
            squareChange();
            // console.log(square);
        }
    })

    //右按钮监听事件
    rightBtn.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num === 5) {
                num = 0;
                ul.style.left = 0 + "px";
            }
            num++;
            // console.log(num);
            animate(ul, -num * w, function () {
                flag = true;
            });

            square++;
            if (square === ol.children.length) {
                square = 0;
            }
            // console.log(square);
            squareChange();
        }
    })
    
    //设置自动轮播，添加右按钮事件的定时器
    var timer = setInterval(function () {
        //手动调用点击事件
        rightBtn.click();
    }, 3000);
    
    //鼠标悬浮，清定时器
    item2.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;
    })
    
    //鼠标离开，设置定时器
    item2.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            //手动调用点击事件
            rightBtn.click();
        }, 3000);

    })
    
    //动画函数
    function animate(obj, target, callback) {
        // console.log(callback);  callback = function() {}  调用的时候 callback()

        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - obj.offsetLeft) / 20;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                // if (callback) {
                //     // 调用函数
                //     callback();
                // }

                callback && callback();
            }

            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';

            // console.log(obj.offsetLeft+'+'+step+':'+obj.style.left);

        }, 15);
    }

    //添加方块索引的类名
    function squareChange() {
        // 先清除其余的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的current类名
        ol.children[square].className = 'current';
    }
}
//时间
function time() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var temp = hour > 12 ? hour - 12 : hour;
    // if(hour === 0){
    //     temp = '12';
    // }
    temp += minute < 10 ? ':0' + minute : ':' + minute;
    temp += hour >= 12 ? 'pm' : 'am'

    var showTime = document.querySelector('.showtime');
    showTime.children[1].innerHTML = temp;
    showTime.children[2].innerHTML = temp;
    console.log(temp);
}
// 下滑快
function slider() {
    var tabList = document.querySelector(".tab_list");
    var ul = tabList.querySelector('ul');
    var num = 0;

    var slidero = document.createElement('li');
    slidero.className = 'slider';
    slidero.style.width = ul.children[0].offsetWidth - 20 + 'px';
    ul.appendChild(slidero);
    // ul.style.backgroundColor = '#449900';
    for (var i = 0; i < ul.children.length - 1; i++) {
        ul.children[i].setAttribute('index', i);
        ul.children[i].addEventListener('click', function (e) {
            stopDefault(e);
            num = this.getAttribute('index');
            console.log(this.offsetLeft);
            slidero.style.width = this.offsetWidth - 20 + "px";
            animate(slidero, this.offsetLeft + 20);
            // console.log(slidero.offsetLeft);

        })
        ul.children[i].addEventListener('mouseenter', function () {
            slidero.style.width = this.offsetWidth - 20 + "px";
            animate(slidero, this.offsetLeft + 20);
        })
        ul.children[i].addEventListener('mouseleave', function () {
            console.log(num);
            slidero.style.width = ul.children[num].offsetWidth - 20 + "px";
            animate(slidero, ul.children[num].offsetLeft + 20);
        })
    }
    //动画函数
    function animate(obj, target, callback) {
        // console.log(callback);  callback = function() {}  调用的时候 callback()

        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                // if (callback) {
                //     // 调用函数
                //     callback();
                // }
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            obj.style.left = obj.offsetLeft + step + 'px';
            // console.log(obj.offsetLeft);

        }, 15);
    }

    function stopDefault(e) {
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false; //兼容IE
    }


}

//月数据
function smoothed() {
    var monthxAxis = [];
    var monthSeries = [];
    var month = new XMLHttpRequest();
    month.open('get', 'https://edu.telking.com/api/?type=month');
    month.send();
    month.onload = function () {
        // console.log("wolaile");
        // console.log(month.responseText);
        var json = JSON.parse(month.responseText); //JSON.parse() 将 json 字符串转换为json对象
        monthxAxis = json.data.xAxis;
        monthSeries = json.data.series;
        
        // console.log(monthxAxis);

        var myChart = echarts.init(document.querySelector('.line'));
        var option = {
            title: {
                text: '曲线图数据展示',
                left: 'center',
                top: '34',
                textStyle: {
                    fontSize: 20
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                top: '100',
                left: '3%',
                right: '4%',
                bottom: '7%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                data: monthxAxis,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval:1
                }

            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value} 人'
                },
                
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dotted',
                        color: '#ccc' // 分割线颜色
                    }
                }
            }],
            series: [{
                    name: '人数',
                    type: 'line',
                    stack: '总量',
                    color: '#4587ef',
                    label: {
                        
                        show: true,
                        formatter:(p)=>{
                            // console.log(p);
                            if(p.dataIndex % 2 == 0){
                                return p.value;
                            }else {
                                return '';
                            }
                        },
                    },
                    symbol: (a,p)=>{
                        // console.log(p);
                        if(p.dataIndex % 2 == 0){
                            return 'emptyCircle';
                        }else {
                            return 'none';
                        }
                    },
                    lineStyle: {
                        width: 2
                    },
                    areaStyle: {
                        
                        color: "#e3e5ff"
                    },
                    data: monthSeries,
                    smooth: true
                },
            ]
        };
        myChart.setOption(option);

    }

}
//周数据
function pie() {
    var weekxAxis = [];
    var weekSeries = [];
    var pieDate = [];
    var week = new XMLHttpRequest();
    week.open('get', 'https://edu.telking.com/api/?type=week');
    week.send();
    week.onload = function () {
        var json = JSON.parse(week.responseText);
        weekxAxis = json.data.xAxis;
        weekSeries = json.data.series;
        var myPie = echarts.init(document.querySelector('.chart .pie'));
        var myBar = echarts.init(document.querySelector('.chart .bar'));

        for(var i = 0;i<weekxAxis.length;i++){
            pieDate[i] = {name:weekxAxis[i],value:weekSeries[i]};

        }
        // console.log(pieDate);
        var pieOption = {
            title: {
                text: '饼状图数据展示',
                // subtext: '',
                left: 'center',
                top: '48',
                textStyle: {
                    fontSize: 20
                }
            },
            
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [{
                name: '人数',
                type: 'pie',
                radius: '60%',
                center: ['50%', '61%'],
                selectedMode: 'single',
                data: pieDate,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        
        var barOption = {
            color: ["#3398DB"],
            tooltip: {
                trigger: "axis",
                axisPointer: {
                type: "shadow"
                }
            },
            title: {
                text: '柱状图数据展示',
                // subtext: '', 附标题
                left: 'center',
                top: '48',
                textStyle: {
                    fontSize: 20
                }
            },
            grid: {
                top: '107',
                // left: '3%',
                // right: '4%',
                bottom: '10%',
                // 是否显示刻度标签 如果是true 就显示 否则反之
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: weekxAxis,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                name: '人数',
                type: 'value',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dotted',
                    }
                }
            },
            series: [{
                data: weekSeries,
                type: 'bar',
                barWidth: "18",
            }]
        };
        myPie.setOption(pieOption);
        myBar.setOption(barOption);



    }
}