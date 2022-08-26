

![](/web/www/kaohe/读书笔记/img/上传图片到阿里.jpg)

https://s.taobao.com/search?q=&imgfile=&app=imgsearch&tfsid=O1CN01b5j0gF1ihOpLLvspu_!!2-imgsearch.png&js=1&stats_click=search_radio_all%253A1&initiative_id=staobaoz_20211016&ie=utf8

把这个tfsid复制下来，拼接上https://img.alicdn.com/bao/uploaded/i4/*****.png

O1CN01b5j0gF1ihOpLLvspu_!!2-imgsearch.png





同一个按钮组件，插入两次，判断按下的按钮是哪一个

1.实例vue的时候，为每个按钮加入不同的属性值来判断，在vue中判断

~~~
 new VueObj({
                el: item_el[i],
                render: h => h(XwsIndustryBuyPreference),
                mounted() {
                  $(this.$el).attr('iid', i)
                },
              })
 // let pageId = $(this.$el)
      //   .attr('pageId')
      //   .replace(/-/g, '.')
~~~

2.用渲染函数传入props属性，在vue中判断

~~~
 new VueObj({
              el: `.xws-vue-user-info`,
              render: h =>
                h(XwsUserInfo, {
                  props: {
                    name: '我的小旺神',
                  },
                }),
            })
 paops:{name:{type:String}}
this.name
~~~



获得元素计算属性对象

~~~
function getStyle(ele, cla) {
  return window.getComputedStyle ? window.getComputedStyle(ele, cla || null) : ele.currentStyle
}

~~~

根据字段顺序排序数组

~~~javascript
type:['ff','gg','dd']
list:[{name:'dd'},{name:'ff'},{name:'gg'}]
list.filter(function(e) {
    return ~type.indexOf(e.name) // 或者 return type.includes(e.name) 
}).sort(function(a, b) {
    return type.indexOf(a.name) - type.indexOf(b.name)
})
~~~

去除左右两边的引号

~~~
.replace(/^\"|\"$/g,'')
~~~

获得缓存key，最后的为刚使用的

~~~
let keyList = localStorage.getItem("__q__").replace(/^"|"$/g,'').split(/[|]/)
keyList = keyList.map((item)=>{return unescape(item)})
~~~

解码格式化函数jsonFormat

 localStorage.key

判断是数字



tolocalestring()

数组对象根据id去重

查看事件监听

getEventListeners(window)

Unicode码的字符

blob开头的网址



~~~js
function loadOptions(o) {
    for (var t = 0; t < o.length; t++)
        if (location.href.includes(o[t].host)) {
            loadCss(o[t].css.local.map(function(o) {
                return chrome.extension.getURL(o)
            })),
            loadCss(o[t].css.remote)
            var e = []
            o[t].js.local["in"] && (e = e.concat(o[t].js.local["in"].map(function(o) {
                return chrome.extension.getURL(o)
            }))),
            o[t].js.remote["in"] && (e = e.concat(o[t].js.remote["in"])),
            loadJsIn(e)
            var n = []
            o[t].js.local.out && (n = n.concat(o[t].js.local.out.map(function(o) {
                return chrome.extension.getURL(o)
            }))),
            o[t].js.remote.out && (n = n.concat(o[t].js.remote.out)),
            loadJsOut(n)
            break
        }
}
function loadCss(o) {
    if (o)
        for (var t = 0; t < o.length; t++) {
            var e = document.createElement("link")
            e.type = "text/css",
            e.rel = "stylesheet",
            e.href = o[t],
            document.head.appendChild(e)
        }
}
function loadJsIn(o) {
    return o && 0 != o.length ? new Promise(function(t, e) {
        var n = function i(e) {
            var n = o[e]
              , s = document.createElement("script")
            s.type = "text/javascript",
            s.onload = function() {
                e++,
                e === o.length ? t() : i(e),
                this.parentNode.removeChild(this)
            }
            ,
            s.src = n,
            s.charset = "UTF-8",
            document.documentElement.append(s)
        }
        n(0)
    }
    ) : void 0
}
function loadJsOut(urls) {
    urls && Promise.all(urls.map(function(o) {
        return fetch(o).then(function(o) {
            return o.text()
        })
    })).then(function(res) {
        for (var i = 0; i < res.length; i++)
            eval(res[i])
    })
}
var storage = {
    amingtool: {
        version: "0.0.0",
        code: "",
        options: []
    }
}
  , updateUrl = "https://amingtool.zhishuchacha.com/index/Upgrade/index8_0_1"
chrome.storage.local.get(storage, function(items) {
    if ("0.0.0" == items.amingtool.version)
        fetch(updateUrl, {
            method: "POST",
            body: JSON.stringify({
                v: "0.0.0"
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(function(o) {
            return o.json()
        }).then(function(o) {
            chrome.storage.local.set(o, function() {
                loadOptions(o.amingtool.options)
            })
        })["catch"](function(o) {
            return console.log(o)
        })
    else
        try {
            for (var i = 0; i < items.amingtool.options.length; i++)
                location.href.includes(items.amingtool.options[i].host) && fetch(updateUrl, {
                    method: "POST",
                    body: JSON.stringify({
                        v: items.amingtool.version
                    }),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                }).then(function(o) {
                    return o.json()
                }).then(function(res) {
                    items.amingtool.version !== res.amingtool.version ? chrome.storage.local.set(res, function() {
                        try {
                            eval(res.amingtool.code)
                        } catch (err) {
                            console.log(err)
                        }
                        loadOptions(res.amingtool.options)
                    }) : loadOptions(items.amingtool.options)
                })["catch"](function(o) {
                    console.log(o),
                    loadOptions(items.amingtool.options)
                })
        } catch (err) {
            fetch(updateUrl, {
                method: "POST",
                body: JSON.stringify({
                    v: "0.0.0"
                }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }).then(function(o) {
                return o.json()
            }).then(function(o) {
                chrome.storage.local.set(o, function() {
                    loadOptions(o.amingtool.options)
                })
            })["catch"](function(o) {
                return console.log(o)
            })
        }
})

~~~



~~~
小旺神工具函数
percentFormat() 
~~~

~~~
 var method = 'get';//请求方法
    var url = 'https://sycm.taobao.com/cc/cockpit/marcro/item/excel/top.json?spm=a21ag.12100459.item-rank.3.506c50a53UeoJV&dateRange=2021-06-08%7C2021-06-08&dateType=day&pageSize=10&page=1&order=desc&orderBy=payAmt&dtUpdateTime=false&keyword=&follow=false&cateId=&cateLevel=&guideCateId=&device=0&indexCode=itmUv%2CitemCartCnt%2CpayItmCnt%2CpayAmt';//请求url
    var xhr = new XMLHttpRequest();//定义一个XMLHttpRequest对象
    xhr.open(method, url, true);
    xhr.responseType = 'arraybuffer';//设置ajax的响应类型为blob
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.onload = function ()//当请求完成，响应就绪进入
    {
        if (this.status == 200)//当响应状态码为200时进入
        {
            var blob = this.response;//获取响应返回的blob对象
           console.log(blob)

    var workbook = XLSX.read(blob, {type: 'array'});
      console.log(workbook)
  const result = [];
            for (let i = 0; i < workbook.SheetNames.length; i++) {
                const newData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]],{range:5});
                result.push(...newData)
            }
            console.log('result', result)

            
        }
    };
    xhr.send(JSON.stringify({
        name: '',
        status: ''
    }));//附带参数发送请求
~~~

对比模式组件

~~~js
column
{
    "label": [
        {
            "label": "日期",
            "prop": "date",
            "sortable": true,
            "minWidth": 95
        }
    ],
    "items": [
        {
            "label": "<span style=\"background: #2062e6;color:#ffffff;border-radius: 6px;padding: 1px 5px;\">本店</span>",
            "prop": "my",
            "style": "background:#EEFCF7"
        },
        {
            "label": "<span style=\"background: #F1D047;color:#ffffff;border-radius: 6px;padding: 1px 5px;\">本店30天前</span>",
            "prop": "myPre",
            "style": "background:#FDFBEF"
        },
        {
            "label": "<span class=\"xws-analysis-label\" style=\"background: #ef7026;color:#ffffff;border-radius: 6px;padding: 1px 5px;\">同行同层平均</span>",
            "prop": "rivalAvg",
            "style": "background:#FEF5F0"
        },
        {
            "label": "<span class=\"xws-analysis-label\" style=\"background: #409EFF;color:#ffffff;border-radius: 6px;padding: 1px 5px;\">同行同层优秀</span>",
            "prop": "rivalGood",
            "style": "background:#EFF7FF"
        }
    ]
}
~~~

~~~js
table-data
{
    "date": "2021-07-12",
    "my_uv": 34093,
    "my_pv": 76941,
    "my_bounceRate": "-",
    "my_avgPv": "-",
    "my_stayTime": "-",
    "my_oldUv": "-",
    "my_newUv": "-",
    "my_shopCltByrCnt": "-",
    "my_liveRoomUv": "-",
    "my_shortVideoUv": "-",
    "my_imageUv": "-",
    "my_shopVisitUv": "-",
    "myPre_uv": 43981,
    "myPre_pv": 106823,
    "myPre_bounceRate": "-",
    "myPre_avgPv": "-",
    "myPre_stayTime": "-",
    "myPre_oldUv": "-",
    "myPre_newUv": "-",
    "myPre_shopCltByrCnt": "-",
    "myPre_liveRoomUv": "-",
    "myPre_shortVideoUv": "-",
    "myPre_imageUv": "-",
    "myPre_shopVisitUv": "-",
    "rivalAvg_uv": 11975,
    "rivalAvg_pv": 32246,
    "rivalAvg_bounceRate": "-",
    "rivalAvg_avgPv": "-",
    "rivalAvg_stayTime": "-",
    "rivalAvg_oldUv": "-",
    "rivalAvg_newUv": "-",
    "rivalAvg_shopCltByrCnt": "-",
    "rivalAvg_liveRoomUv": "-",
    "rivalAvg_shortVideoUv": "-",
    "rivalAvg_imageUv": "-",
    "rivalAvg_shopVisitUv": "-",
    "rivalGood_uv": 28382,
    "rivalGood_pv": 74374,
    "rivalGood_bounceRate": "-",
    "rivalGood_avgPv": "-",
    "rivalGood_stayTime": "-",
    "rivalGood_oldUv": "-",
    "rivalGood_newUv": "-",
    "rivalGood_shopCltByrCnt": "-",
    "rivalGood_liveRoomUv": "-",
    "rivalGood_shortVideoUv": "-",
    "rivalGood_imageUv": "-",
    "rivalGood_shopVisitUv": "-"
}
~~~





箭头默认用灰色，鼠标hover到这行的时候，用蓝色 #1790ff


流量-店铺来源-竞店对比里可以爬指数数据

竞争-竞店分析-日-入店来源可以爬指数数据

y = (10 ln(x+1)+30) x**0.5



e.exports = JSON.parse('{"cards":

indexes: {

namespace

urls: {



{

label:'dataKey'

op:[

{

}

]

Type:'0'

}



Id=;bucUserName=;loginUserId=3979790082;loginUserName=;mainUserId=293034738;mainUserName=;runAsUserId=64128306;
Id=;bucUserName=;loginUserId=3979790082;loginUserName=;mainUserId=293034738;mainUserName=;runAsUserId=293034738;

window.goldlog

T.getRequestHeader()  

T = (r(x),n(557))

生意参谋 transit-id

~~~
let a = new JSEncrypt()
a.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ50kaClQ5XTQfzkHAW9Ehi+iXQKUwVWg1R0SC3uYIlVmneu6AfVPEj6ovMmHa2ucq0qCUlMK+ACUPejzMZbcRAMtDAM+o0XYujcGxJpcc6jHhZGO0QSRK37+i47RbCxcdsUZUB5AS0BAIQOTfRW8XUrrGzmZWtiypu/97lKVpeQIDAQAB")
transit-id = a.encrypt('w28Cz694s63kBYk4')
~~~

~~~
var n = document.getElementById("microdata") || document.querySelector('[name="microdata"]');
n && (n = n.content.split(";").reduce(function(e, t) {
                var n = t.split("=");
                if (n[0]) {
                    var r;
                    try {
                        r = JSON.parse(n[1])
                    } catch (i) {
                        r = n[1]
                    }
                    e[n[0]] = r
                }
                return e
            }, {})
~~~



