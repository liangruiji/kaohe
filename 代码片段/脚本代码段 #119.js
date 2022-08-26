var modjs = '(' + function() {

    var oFetch = window.fetch

    window.fetch = function(url, options) {
        return new Promise(function(resolve, reject) {
            oFetch(url, options).then(function(res) {
                resolve(res.clone())
                if (res.ok) {
                    Promise.resolve(url.indexOf('.json') >= 0 ? res.json() : res).then(function(result) {
                        if (res.url.indexOf('https://sycm.taobao.com/mc/ci/config/rival/' + activeKey + '/getSingleMonitoredInfo.json') == 0) {
                            if (result.code == 0) {
                                window.postMessage({
                                    act: 'xws_rival_getSingleMonitoredInfo',
                                    xws_data: result.data,
                                }, '*', )
                            }
                        }
                    })
                }
            })
        }
        )
    }
}
.toString() + ')()'
