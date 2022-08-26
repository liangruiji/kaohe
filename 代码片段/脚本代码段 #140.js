var responseData = ''
// 发送请求
function getData() {
    var url = "https://s.taobao.com/search?data-key=s&data-value=132&ajax=true&_ksTS=1660830934514_1029&spm=a21bo.jianhua.201856-fline.10.5af911d9RV6Mku&q=%E7%94%B7%E9%9E%8B&refpid=430144_1006&source=tbsy&style=grid&tab=all&pvid=d0f2ec2810bcec0d5a16d5283ce59f69&bcoffset=0&p4ppushleft=3%2C44&s=88";
    getJSONP(url, function(response) {
        // 保存响应数据
        responseData = response;
    });
}
;
// 解析数据
function parseDate() {
    alert(responseData);
}
;
// 根据指定的URL发送一个JSONP请求
// 然后把解析得到的响应数据传递给回调函数
// 在URL中添加一个名为jsonp的查询参数，用于指定该请求的回调函数的名称
function getJSONP(url, callback) {
    if (!url) {
        return;
    }
    // 为本次请求创建一个唯一的回调函数名称
    var name = 'LIGANG' + generateMixed(6);
    var cbname = 'getJSONP\.' + name;
    //作为getJSONP函数的属性

    // 将回调函数名称以表单编码的形式添加到URL的查询部分中
    // 使用jsonp作为参数名，一些支持JSONP的服务可能使用其他的参数名，比如callback
    if (url.indexOf('?') === -1) {
        url += '?callback=' + cbname 
        //作为查询部分添加参数，请求数据可以动态生成
    } else {
        url += '&callback=' + cbname 
        //作为新的参数添加它
    }
    // 创建script元素用于发送请求
    var script = document.createElement('script');

    //定义被脚本执行的回调函数
    getJSONP[name] = function(e) {
        try {
            callback && callback(e);
        } catch (e) {//
        } finally {
            //最后删除该函数与script元素
            delete getJSONP[name];
            script.parentNode.removeChild(script);
        }
    }
    ;
    // 立即发送HTTP请求
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

// 生成指定位数的随机字符串
function generateMixed(n) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}
getData()