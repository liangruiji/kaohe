var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(script);

var xlsxScript = document.createElement("script");
xlsxScript.type = "text/javascript";
xlsxScript.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.min.js";
document.getElementsByTagName('head')[0].appendChild(xlsxScript);
var timeOut = new Promise((resolve,reject)=>{
    setTimeout(function() {
        $(document).ready(function() {
            resolve()
        });
    }, 3000)
}
)

timeOut.then(()=>{
    var method = 'get';
    //请求方法
    var url = 'https://sycm.taobao.com/cc/item/view/excel/top.json?spm=a21ag.23983127.item-rank.4.417050a5oXtG1N&dateRange=2021-08-25%7C2021-08-31&dateType=recent7&pageSize=10&page=1&order=desc&orderBy=payAmt&dtUpdateTime=false&dtMaxAge=0&device=0&compareType=cycle&keyword=&follow=false&cateId=&cateLevel=&indexCode=payAmt%2CpayItmCnt%2CsucRefundAmt%2CitemCartCnt%2CitmUv';
    //请求url
    var xhr = new XMLHttpRequest();
    //定义一个XMLHttpRequest对象
    xhr.open(method, url, true);
    xhr.responseType = 'arraybuffer';
    //设置ajax的响应类型为blob
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.onload = function() //当请求完成，响应就绪进入
    {
        if (this.status == 200) //当响应状态码为200时进入
        {
            var blob = this.response;
            //获取响应返回的blob对象
            console.log(blob)
            var workbook = XLSX.read(blob, {
                type: 'array'
            });
            //             console.log(workbook)
            const result = [];
            for (let i = 0; i < workbook.SheetNames.length; i++) {
                let rangeList = workbook.Sheets[workbook.SheetNames[i]]['!ref']['split'](':')
                // 获取表的有效范围
                rangeList[0] = 'A5'
                const newData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]], {
                    range: rangeList['join'](':')
                });
                result.push(...newData)
            }
            console.log('result', result)
        }
    }
    ;
    xhr.send(JSON.stringify({
        name: '',
        status: ''
    }));
    //附带参数发送请求
}
)
