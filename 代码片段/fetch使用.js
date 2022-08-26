// let url = 'https://edu.telking.com/edu/todo/add/'
function aa() {
    var result = $("#result").val()
    var url = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=2c02e546-648c-4047-8c85-7035431529ff"

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //     body: JSON.stringify({
        //         cont: '我阿杰又来了',
        //         status: 'on',
        //         group: '你不讲武德'
        //     })
        mode: "no-cors",
        body: JSON.stringify({
            "msgtype": "text",
            "text": {
                "content": result
            }
        })

    }).then(o=>{
        Promise.resolve(o.clone().json()).then(function(i) {
            console.log(i)
        })

    }
    )
}
aa()
