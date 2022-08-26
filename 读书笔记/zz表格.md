de-table

de-table-header template table-title
de-table-body template table-empty

de-table-footer progress-wrap progress-main  el-progress

~~~
{%- extends "frontend/admin_layout.html" -%}
{%- from "frontend/_macros.html" import user_center with context -%}
{% block title %}小旺神-旺豆消耗记录{% endblock %}
{% block keywords %}小旺神-旺豆消耗记录{% endblock %}
{%- block description -%}小旺神-旺豆消耗记录{%- endblock -%}
{% block css %}
	<style>
		#wd_consume_mobile {
            width: 160px;
            height: 34px;
            outline: none;
            padding: 3px 3px 3px 5px;
        }

        .wd_consume_search_input {
            margin-right: 30px;
        }
	</style>
{% endblock %}

{% block content %}
    <div class="content-side l">
        <div class="content-box">
			<h4 class="content-title">旺豆消耗记录</h4>
            <div class="btn-group">
                <button type="button" class="btn btn-default" data-targe="today">今天</button>
                <button type="button" class="btn btn-default" data-targe="recent7">近7天</button>
                <button type="button" class="btn btn-default" data-targe="recent15">近15天</button>
            </div>
            <div class="tab-content">
                <div id="main" style="width: 1000px;height:300px;"></div>
                <div id="main1" style="width: 1000px;height:300px;"></div>
            </div>

        </div>
    </div>

{% endblock %}

{% block js %}
	<script>

    function initChart(){
        let myChart = echarts.init($('#main')[0]);

        myChart.setOption({
            color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
            tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
            xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
            yAxis: {
                    type: 'category',
                    data: ['批量评价透视', '验号', '查排名', '蓝海词']
                },
            series : [
                {
                    name: '消耗旺豆数',
                    type: 'bar',
                    data:[
                    4000,3000,2000,1000
                    ],
                },
                {
                    name: '功能使用次数',
                    type: 'bar',
                    data:[
                    1000,2000,1000,1000
                    ],
                }
            ]
        })
        let myChartTrend = echarts.init($('#main1')[0]);

        myChartTrend.setOption({
            color:['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
            legend: {
                    data: ['消耗旺豆数','功能使用次数']
                },
            tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
            xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
            yAxis: {
                    type: 'value'
                },
            series : [
                {
                    name: '消耗旺豆数',
                    type: 'line',
                    data:[
                    4000,3000,2000,1000,500,800,7000
                    ],
                    smooth: true
                },
                {
                    name: '功能使用次数',
                    type: 'line',
                    data:[
                    1000,2000,1000,1000,500,800,7000
                    ],
                }
            ]
        })
    }

    function handle(dateType) {
        initChart()
    }
    handle()
    $('.btn-group .btn').on('click',function () {
        let dateType = $(this).attr('data-targe') || 'today'
        handle(dateType)

    })

	</script>
{% endblock %}

~~~

![image-20220506172915279](/Users/telking/Library/Application Support/typora-user-images/image-20220506172915279.png)

![image-20220506173328128](/Users/telking/Library/Application Support/typora-user-images/image-20220506173328128.png)

![image-20220506173652566](/Users/telking/Library/Application Support/typora-user-images/image-20220506173652566.png)

https://s.taobao.com/search?ie=utf8&style=grid&q=%E8%BF%9E%E8%A1%A3%E8%A3%99&sort=default&s=0&n_rt=json

https://s.taobao.com/search?q=%E8%BF%9E%E8%A1%A3%E8%A3%99&uniq=&sort=default&s=0&filter=reserve_price%5B%2C%5D&spm=a21bo.21814703.201856-fline.3.5af911d9jRjr7X&pvid=d0f2ec2810bcec0d5a16d5283ce59f67

https://s.taobao.com/search?data-key=s&data-value=132&ajax=true&_ksTS=1651830760834_775&callback=jsonp776&spm=a21bo.21814703.201856-fline.1.319b11d9f0t7Yo&q=%E8%BF%9E%E8%A1%A3%E8%A3%99&refpid=420460_1006&source=tbsy&style=grid&tab=all&pvid=d0f2ec2810bcec0d5a16d5283ce59f66&bcoffset=0&p4ppushleft=3%2C44&s=88

~~~
xws/sensitive/  

fn_name = request.form.get('fn_name', '')
    if fn_name:
        Help.usage_count(fn_name)
~~~



~~~
  fn_name = request.args.get('fn_name', '')
            if fn_name:
                Help.usage_count(fn_name)
~~~

~~~
  fn_name = params.get('fn_name', '')
        if fn_name:
            Help.usage_count(fn_name)
~~~

~~~
  this.upDataUseCount('主图对比')
~~~

~~~
func_module_check      
result = func(count, limit, try_num)
                if result.get('code', '') == 200:
                    Help.usage_count(params.get('fn_name', ''))
                return result
~~~

~~~
@crx.route('/usage/count/', methods=['POST', 'GET'])
@Help.allow_cross_domain
@login_required
def usage_count():
    params = request.args if request.method == "GET" else request.form
    info = params.get('info')
    if not info:
        return {'code': 1500, 'msg': '缺少必要参数！'}
    ret = Decrypt(decrypt_key).decrypt(info)
    try:
        ret = json.loads(ret)
    except:
        return {'code': 1410, 'msg': '数据错误，请刷新页面重试！'}
    fn_name = ret.get('fn_name')
    if not fn_name:
        return {'code': 1500, 'msg': '缺少必要参数！'}
    if fn_name and fn_name != 'undefined':
       Help.usage_count(fn_name)
    return {'code': 200}

~~~

~~~
   use_up_wd_conut
   
   @staticmethod
    def usage_count(fn_name):
        """
        # 将使用功能次数记录进行存储
        :param fn_name: 使用的功能的名字
        :return:
        """
        print(fn_name)
        if not fn_name:
            return True
        if fn_name and fn_name != 'undefined':
            zero_time = Help.zero_time()
            mongo_usage_count = mongo.XDATA.usage_count
            mongo_item = mongo_usage_count.find_one({'fn': fn_name, 't': zero_time})
            print(mongo_item)
            if mongo_item:
                if mongo_item.get('m'):
                    update_data = {}
                    update_data['$inc'] = {'m': 1}
                    mongo_usage_count.update_one({'fn': fn_name, 't': zero_time}, update_data)
            else:
                mongo_usage_count.insert_one({'fn': fn_name, 't': zero_time, 'm': 1})

        return True
~~~

~~~

   footmark_check
   func_api_check
   result = func(**args)
                     if result.get('code', '') == 200:
                    Help.usage_count(params.get('fn_name', ''))
                return result
~~~

~~~
 func_module_check
 result = func(count, limit, try_num)
                if result.get('code', '') == 200:
                    Help.usage_count(params.get('fn_name', ''))
                return result
~~~

~~~
batch_item_check
 fn_name = Help.xws_funs().get(func_name)[0]['fn']
~~~

~~~
// 以下代码只需要在以下页面执行,注意，还有可能淘宝也有这样的隐藏店铺，但是目前暂时还没有示例
// 宝贝详情页 eg:https://item.tmall.com/item.htm?id=xxxx
// 店铺首页 eg:https://zinvge.tmall.com/
// 店铺店内搜索页 eg:https://mengyihui.tmall.com/search.htm
// 店铺类目页 eg:https://weinata.tmall.com/category.htm
// 当前我这里作为测试，没有进行域名，页面等条件判断
const script = document.createElement('script')
script.innerHTML = `
    (function() {
        var _apply = Function.prototype.apply;
        var newApply = function(thisArg, argsArray) {
            original();
            var fun_str = this.toString();
            if(fun_str.indexOf("window.location = '//jie.taobao.com'") > 0){
                console.log("发现跳转代码，已屏蔽跳转！")
                overridden();
                return undefined;
            }
            var result = _apply.call(this, thisArg, argsArray);
            overridden();
            return result;
        }
    
        function original(){
            Function.prototype.apply = _apply;
        }
    
        function overridden(){
            Function.prototype.apply = newApply;
        }
        overridden();
     window.__globalsDebugger__ = (function createGlobalsDebugger() {
    const globalsToInspect = [];
    const inspectedGlobals = [];
    function addGlobalToInspect(globalName) {
        if (!globalsToInspect.includes(globalName)) {
            globalsToInspect.push(globalName);
        }
   
        Object.defineProperty(window, globalName, {
            get: function() {
                return window['__globals-debugger-proxy-for-'+globalName+'__'];
            },
            set: function(value) {
           
                if (!inspectedGlobals.includes(globalName)) {
                    inspectedGlobals.push(globalName);
                
                }
    window['__globals-debugger-proxy-for-'+globalName+'__'] = value;
             if(value.header.includes('很抱歉，您查看的商品找不到了')){
              window['__globals-debugger-proxy-for-'+globalName+'__'] = {};
    }
            
            },
            configurable: true,
        });
    }


    return {
        addGlobalToInspect,
    };
}
)();
__globalsDebugger__.addGlobalToInspect("SHOP_DC")

    })();
    document.querySelector("#mysettimeout").remove();
`
script.type = 'text/javascript'
script.id = 'mysettimeout'
document.documentElement.appendChild(script)

document.addEventListener('DOMContentLoaded', event => {
  let aa = $('#page #content .tshop-pbsm-shop-nav-ch .skin-box-bd ul.menu-list').css('zIndex')
  if (aa > 10000) {
    $('#page #content .tshop-pbsm-shop-nav-ch .skin-box-bd ul.menu-list').attr('style', 'display:none!important')
  }
  let bb = $('#page #content div .tmg').css('zIndex')
  if (bb > 10000) {
    $('#page #content div .tmg').attr('style', 'display:none!important')
  }
  let cc = $('#ft .tmbug').css('zIndex')
  if (cc > 10000) {
    $('#ft .tmbug').attr('style', 'display:none!important')
  }
  let dd = $('#page #content div .tmgs').css('zIndex')
  if (dd > 10000) {
    $('#page #content div .tmgs').attr('style', 'display:none!important')
  }
  var hd = document.querySelector('#hd')
  if (hd != null) {
    var bd = document.querySelector('#hd+#bd')
    var ft = document.querySelector('#hd+#ft')
    if (bd == null) {
      bd = document.querySelector('#bd')
      hd.parentElement.insertBefore(bd, hd.nextElementSibling)
    }
    if (ft == null) {
      ft = document.querySelector('#ft')
      hd.parentElement.insertBefore(ft, bd.nextElementSibling)
    }
  }
})

~~~

~~~
[ {
            '$match': {
fn:'v37',
                't': {
                    '$gte': 1654041600,
                    '$lte': 1656374400
                }
            }
        },
        {
            '$project': {
                't': {
                    '$dateToString': {
                        'format': '%Y-%m-%d',
                        'date': {
                            '$toDate': {
                                '$add': [{'$multiply': ['$t', 1000]}, 28800000]
                            }
                        }
                    }
                },
                'wd': '$wd',
                'fn': '$fn'
            }
        },
        {
            '$group': {
                '_id': {
                    'fn': '$fn',
                    't': '$t',
                },
                'total': {
                    '$sum': 1
                },
                'wd': {
                    '$sum': '$wd'
                }
            }
        },
        {
            '$sort': {
                '_id.t': 1
            }
        }]
~~~

