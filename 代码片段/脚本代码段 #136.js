function parseQuery() {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    var result = {}
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        result[key] = value;
    }
    return result;
}

var query = parseQuery()

var exParams = {};
exParams.queryParams = window.location.search.substring(1);
var queryKeys = Object.keys(query);
for (var i = 0; i < queryKeys.length; i++) {
    var key = queryKeys[i];
    exParams[encodeURIComponent(key)] = encodeURIComponent(query[key]);
}

var mtopParams = {
    id: query.id,
    detail_v: '3.3.2',
    exParams: JSON.stringify(exParams),
};

window.detailRequest = window.lib.mtop.request({
    api: 'mtop.taobao.pcdetail.data.get',
    v: '1.0',
    data: mtopParams,
    ttid: '2022@taobao_litepc_9.20.0',
    isSec: '0',
    ecode: '0',
    AntiFlood: true,
    AntiCreep: true,
    H5Request: true,
}).then(function(response) {
    return (response && response.data) || {}
}).catch(function(e) {
    return Promise.reject(e);
});
