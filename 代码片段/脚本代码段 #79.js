function time(time=+new Date()) {
    var date = new Date(time + 8 * 3600 * 1000);
    // 增加8小时
    return date.toJSON().substr(0, 10).replace('T', ' ');
}

function getDateList(start, end) {
    let arr = []
    start = +new Date(start)
    end = +new Date(end)
    while (start <= end) {
        let str = time(start)
        arr.push(str)
        start = start + 3600 * 24 * 1000
    }
    return arr

}
function getDateRangeList(start, end) {
    let arr = []

    let dateList = getDateList(start, end)
    console.log(dateList)
    let index = dateList.findIndex(i=>{
        if (new Date(i).getDay() == 1)
            return true
    }
    )
    console.log(index)

    while (index <= dateList.length) {
        if (dateList.length < 7)
            break
        if (index != 0 && index != 7) {
            let startArr = dateList.splice(0, index)
            startArr.map(i=>{
                arr.push(`${i}|${i}`)
            }
            )
            index = 7
        } else {
            index = 7
            let weekArr = dateList.splice(0, index)
            arr.push(`${weekArr[0]}|${weekArr[6]}`)
        }

    }
    if (dateList.length > 0) {
        dateList.map(i=>{
            arr.push(`${i}|${i}`)
        }
        )
    }
    console.log(arr)
    return arr
}
