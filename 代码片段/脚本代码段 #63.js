function aa(x) {
    return Math.log((x + 1) ** (10 * (x ** 0.5)) * Math.E ** (30 * x ** 0.5))
}
function bb(x) {
    return (10 * Math.log(x + 1) + 30) * x ** 0.5
}
function cc(x) {
    return (10 * x ** 0.5) * Math.log(x + 1) + Math.log(Math.E ** (30 * x ** 0.5))
}

function dd(x) {
    return Math.log(Math.E ** (30 * x ** 0.5))
}

function ee() {
    let index
    $(".oui-dt-calendar-date .oui-dt-calendar-date-column td").map(function(i) {
        if ($(this).hasClass("focused-element")) {
            index = i
        }
    })
    $(".oui-dt-calendar-date .oui-dt-calendar-date-column td").eq(index + 1).click()
}
function gg() {

    let index
    $(".rangeRight .oui-dt-calendar-date .oui-dt-calendar-date-column td").map(function(i) {
        if ($(this).hasClass("focused-element")) {
            index = i
        }
    })
    $(".rangeRight .oui-dt-calendar-date .oui-dt-calendar-date-column td").eq(index + 1).click()
    $('.rangeConfirmBtn').click()
    count++
    if (count >= 31) {
        clearInterval(timer)
        count = 1
        console.log('>>>>>>>.')
    }
}
let timer
let count = 1
function ff(run) {

    if (run) {
        clearInterval(timer)
        timer = null
        timer = setInterval(gg, 6000)
    } else {
        clearInterval(timer)
        timer = null
    }

}

var modjss = '(' + function() {

    var option = {
        jq: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js',
    }

    for (let i in option) {
        if (!document.querySelector('#jq')) {
            let script = document.createElement('script')
            script.id = 'jq'
            script.type = 'text/javascript'
            script.src = option[i]
            document.getElementsByTagName('head')[0].appendChild(script)
            script.onload = ()=>{
                console.dir(i)
            }
        }
    }
    function ajaxEventTrigger() {

        if (this['responseURL'].indexOf('https://sycm.taobao.com/csp/api/core/monitor/competition/self') >= 0) {
            if (JSON.parse(this['response'])['code'] == 200) {
                const result = JSON.parse(this['response'])['data']
                let value = JSON.stringify(result)
                let key = 'xws/service/coreCompetition/self'
                sessionStorage.setItem(key, value)
                window.setTimeout(function() {
                    let dataOne = []
                    let dataTwo = []
                    if (!window.obj) {
                        // 咨询人数指数
                        window.obj = {}
                    }

                    if (!window.obj1) {
                        // 客服销售人数指数
                        window.obj1 = {}
                    }
                    if (!window.obj2) {
                        // 客服销售额指数
                        window.obj2 = {}
                    }
                    if (!window.obj3) {
                        // 询单转化率指数
                        window.obj3 = {}
                    }
                    if (!window.obj4) {
                        // 客服客单价指数
                        window.obj4 = {}
                    }
                    $(`.Card_wrapper__ETKVJ`).eq(0).find('.DashBoard_value__1lNvf').map(function() {
                        dataOne.push($(this).text().replace(/,/g, ''), )
                    })
                    $(`.Card_wrapper__ETKVJ`).eq(2).find('.Card_content__1aHVl > .Monitor_table__ydSai.FilteredTable_wrappper__3USWp .ant-table-cell').map(function() {
                        dataTwo.push($(this).text().replace(/,/g, ''), )
                    })
                    console.log(dataOne[4], ':', dataTwo[1])
                    window.obj[dataOne[4]] = dataTwo[1]
                    window.obj1[dataOne[2]] = dataTwo[2]
                    window.obj2[dataOne[0]] = dataTwo[3]
                    window.obj3[dataOne[3]] = dataTwo[4]
                    window.obj4[dataOne[7]] = dataTwo[5]

                    window.objall = {
                        obj,
                        obj1,
                        obj2,
                        obj3,
                        obj4,
                    }
                }, 1500)
            }
        }

    }

    var oldXHR = window.XMLHttpRequest

    function newXHR() {
        var realXHR = new oldXHR()

        realXHR.addEventListener('load', function() {
            ajaxEventTrigger.call(this, 'ajaxLoad')
        }, false, )

        return realXHR
    }

    window.XMLHttpRequest = newXHR
}
.toString() + ')();'
if (!document.querySelector('#_0xb630xfs')) {
    ss.type = 'text/javascript'

    ss.setAttribute('id', '_0xb630xfs')

    ss.textContent = modjss
    let abc = $('#sycm-3rd-iframe').contents().find('body')

    $(abc).append(ss)
}
