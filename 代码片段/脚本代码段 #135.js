// KISSY.Env.mods['item-detail/config/index'].exports.getDescConfig()
// let i = KISSY.Env.mods['kg/rate/0.1.5/mod/config'].exports
// KISSY.Env.mods['kg/rate/0.1.5/mod/data/_http'].exports(true, '/detailCommon.htm', {
//     auctionNumId: i.itemId,
//     userNumId: i.sellerId
// }, {
//     jsonpCallback: "json_tbc_rate_summary",
//     cache: !0
// }).then((res)=>{
//     console.log(res)
// }
// )
  function t() {
        var e = window.ua;
        return window.UA_Opt.Token = KISSY.now() + ":" + Math.random(),
        window.UA_Opt.reload(),
        e
    }

// let aa = {
//     url: "/detailCommon.htm",
//     data: {
//     auctionNumId: 631988231615,
//     userNumId: 1735053830
// },
   
//     timeout: 5,
//     success: function(e) {
//         console.log(e)
//     },
//     error: function() {
      
//     }
// }
// let bb = {
//     jsonpCallback: "json_tbc_rate_summary",
//     cache: false
// }

// aa =Object.assign(aa,bb)

// KISSY.Env.mods['io'].exports(aa)

// let cc ={
//     "url": "//s.taobao.com/search?spm=a21bo.jianhua.201856-fline.10.4c9111d94fOgwv&q=%E7%94%B7%E9%9E%8B&refpid=430144_1006&source=tbsy&style=grid&tab=all&pvid=d0f2ec2810bcec0d5a16d5283ce59f69&bcoffset=0&s=176",
//     "cache": false,
//     "dataType": "jsonp",
//     "crossDomain": true,
//     "data": {
//         "data-key": "s",
//         "data-value": "220",
//         "ajax": true
//     },
//   'jsonpCallback':'kk',
//     "timeout": 10
// }
// cc.data.ua = t()
// KISSY.Env.mods['io/base'].exports(cc)


  let cc ={
    "url": `//s.taobao.com/search?spm=a21bo.jianhua.201856-fline.10.4c9111d94fOgwv&q=%E7%94%B7%E9%9E%8B&refpid=430144_1006&source=tbsy&style=grid&tab=all&pvid=d0f2ec2810bcec0d5a16d5283ce59f69&bcoffset=0&s=${2*44}`,
    "cache": false,
    "dataType": "jsonp",
    "crossDomain": true,
    "data": {
        "data-key": "s",
        "data-value": "220",
        "ajax": true
    },
  'jsonpCallback':'kk',
    "timeout": 10
}
let aa = KISSY.Env.mods['io/base'].exports(cc)

console.log(aa.responseData)