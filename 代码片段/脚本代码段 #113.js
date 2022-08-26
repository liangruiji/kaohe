const data1 = {
    "dataType": "moduleData",
    "argString": "{\"memberId\":\"b2b-32469117117b9d4\",\"appName\":\"pcmodules\",\"resourceName\":\"wpOfferColumn\",\"type\":\"view\",\"version\":\"1.0.0\",\"appdata\":{\"sortType\":\"wangpu_score\",\"sellerRecommendFilter\":false,\"mixFilter\":false,\"tradenumFilter\":false,\"quantityBegin\":null,\"pageNum\":1,\"count\":30}}"
}

// let data = new FormData()

// data.append("dataType","moduleData")
// data.append("argString","moduleData")

fetch('https://h5api.m.1688.com/h5/mtop.1688.shop.data.get/1.0/?jsv=2.6.2&appKey=12574478&t=1650876188936&sign=469ebad05015229c4f20c8302f364313&api=mtop.1688.shop.data.get&v=1.0&type=json&valueType=string&dataType=json&timeout=10000', {
    method: 'POST',
    // or 'PUT'
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type':'multipart/form-data',
        "accept": "application/json"
    },
    mode: 'no-cors',
    body: JSON.stringify(data1),
}).then(response=>{
    console.log(response)
    console.log(response.text())
    // return response.json()
}
).then(data=>{// console.log('Success:', data);
}
).catch((error)=>{
    console.error('Error:', error);
}
)
// exports.genFetch = function(e, a) {
//     return function(t, c) {
//         e.request({
//             api: "mtop.1688.shop.data.get",
//             data: {
//                 dataType: "moduleData",
//                 argString: JSON.stringify({
//                     memberId: a.memberId,
//                     appName: "pcmodules",
//                     resourceName: "wpOfferColumn",
//                     type: "view",
//                     version: "1.0.0",
//                     appdata: t
//                 })
//             },
//             v: "1.0",
//             ecode: 0,
//             type: "POST",
//             valueType: "string",
//             dataType: "json",
//             timeout: 1e4
//         }, function(e) {
//             e && e.data && (e = e.data),
//             c(!!e.content, e.content, t)
//         }, function(e) {
//             c(!1, e, t)
//         })
//     }
// }
