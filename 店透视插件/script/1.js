/*
 * @Author: your name
 * @Date: 2021-06-17 08:38:16
 * @LastEditTime: 2021-06-17 09:42:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/店透视插件/script/1.js
 */

;
(function () {


  const common_uri = ['/flow/v3/source/concerned/shop.json', '/flow/long/period/nodistinct/source/concerned/shop.json', '/flow/new/source/concerned/item.json', '/flow/long/period/nodistinct/new/source/concerned/item.json', '/flow/v3/shop/wordAide/drainageSearch.json', '/flow/v3/shop/wordAide/competitionSearch.json', '/flow/shop/wordAide/industry/', '/flow/wordAide/word/fav/list.json', '/flow/new/monitor/item/tops/rank.json', '/flow/wireless/content/list.json', '/flow/wireless/content/items.json', '/mq/supply/mkt/overview.json', '/mq/supply/mkt/trend/', '/mc/industry/', '/mc/mq/supply/mkt/sea/', '/mc/mq/monitor/cate', '/mkt/customerGroupPerspective.json', '/mc/mq/supply/deal/list.json', '/mc/mq/supply/mkt/childCate.json', '/mkt/area/province.json', '/mc/searchword/', '/mc/ci/shop/trend.json', '/mc/ci/item/trend.json', '/mc/ci/brand/trend.json', '/mc/ci/config/rival/shop/getSingleMonitoredInfo.json', '/mc/ci/config/rival/brand/getSingleMonitoredInfo.json', '/mc/ci/config/rival/item/getSingleMonitoredInfo.json', '/flow/v3/monitor/shop/trend.json', '/flow/v3/monitor/item/trend.json', '/flow/v3/monitor/brand/trend.json', '/flow/v3/monitor/shop/getSingleMonitoredInfo.json', '/flow/v3/monitor/item/getSingleMonitoredInfo.json', '/flow/v3/monitor/brand/getSingleMonitoredInfo.json', '/mc/mq/prop/', '/mc/mq/product/', '/mc/mkt/product/', '/mc/portal/listHotShops.json', '/mc/portal/listHotItems.json', '/mc/portal/listKeywords.json', '/mc/buyerPortrait/listItemsBy', '/mq/mkt/rank/', '/mc/searchPortrait/getItemPreference.json', '/mc/mq/industryCustomer', '/xsite/content/analysis/cnt/effect/', '/xsite/video/fscreen/distribution/list.json', '/xsite/content/vtask/new/detail/content/list.json', '/cc/cockpit/marcro/item/top.json', '/cc/cockpit/marcro/cate.json', '/cc/item/portal/itemList.json', '/mc/mq/supply/deal/trend.json', '/flow/v5/shop/source/tree.json', '/flow/v3/new/item/source/detail.json', '/s_content/video/single/item/relation.json', '/s_content/video/fscreen/distribution/list.json', '/s_content/tuwen/item/relate/single/list.json', '/s_content/stroll/v2/', '/s_content/sub/overview/', '/s_content/vtask/seller/', '/s_content/video/minidetail/', '/mc/mq/monitor/self/live/showTopItems.json', '/mc/mq/monitor/self/offline/showTopItems.json', '/mc/live/ci/shop/monitor/listShop.json', '/mc/ci/shop/monitor/listShop.json', '/bda/visitor/distribution/listPeriods.json', '/bda/visitor/distribution/listAreas.json', '/bda/visitor/distribution/listFeatures.json', '/bda/visitor/distribution/listBehaviors.json', '/cc/item/archive/checkProfile.json', '/cc/item/archive/compete/checkProfile.json', '/cc/category/customer/check.json', '/cc/interval/list.json', '/cc/interval/detail.json', '/ipoll/live/visitor/getRtVisitor.json', ];


  function injectScript() {



    function fetch_before(_then, _path, _payload) {

      getFilterItem(_then, "before").reverse().forEach(function (_item) {
        return _item(_path, _payload);
      });
    }

    function fetch_done(_filter, _payload, _cb) {
      dealFilter(_payload, getFilterItem(_filter, "then"), _cb);
    }

    function fetch_fail(_filter, _payload, _cb) {
      dealFilter(_payload, getFilterItem(_filter, "fail"), _cb);
    }
    // 把对象的中key过滤出来
    function getFilterItem(_filter, key) {
      return _filter.filter(function (item) {
        return item["hasOwnProperty"](key);
      }).map(function (el) {
        return el[key];
      });
    }

    function dealFilter(_payload, _filter, _cb) {
      var filter = _filter[0];
      filter ? filter.apply(undefined, _payload["concat"]([function (_response) {
        _response && (_payload[0] = _response), dealFilter(_payload, _filter["slice"](1), _cb);
      }])) : _cb(_payload[0]);
    }

    function handleData(response) {
      if (response.url.indexOf('/ipoll/live/visitor/getRtVisitor.json?') != -1 && response.url.indexOf('srcgrpname') != -1) {
        response.json().then(function (res) {
          window.postMessage({
            type: 'dts_live',
            path: response.url,
            data: res
          }, '/')
        });
      }
      var assistant = [...common_uri]
      if (/market_monitor/.test(location.pathname)) {
        assistant.push('/monitor/list.json')
      }
      for (var i = 0; i < assistant.length; i++) {
        var _reg = new RegExp(assistant[i]);
        if (_reg.test(response.url)) {
          ;
          (function (i) {
            response.json().then(function (res) {
              console.log(640, response.url, arr[i], i);
              let _url = response.url;
              const _res = common_uri.find(uri => uri.indexOf(uri) !== -1);
              if (_url.indexOf('/mq/mkt/rank/') != -1) {
                let _params = '';
                try {
                  _params += _url.match(/dateRange=([0-9-%C]+)&?/)[1];
                  _params += _url.match(/device=([0-9-]+)?/)[1];
                  _params += _url.match(/sellerType=([0-9-]+)?/)[1];
                  _params += _url.match(/token=([0-9a-zA-Z]+)?/)[1];
                  _params += _url.match(/cateId=([0-9a-zA-Z]+)?/)[1];
                } catch (e) {}
                _url = _url.replace('/v2', '')
                res.mc_key = _params;
              }
              if (_res) {
                _url = _url.replace(/(.+\\.com)|(&_=.+)/g, '')
              }
              let _vv = localStorage.__vv__,
                _esuri = escape(_url);
              _vv = _vv ? _vv.split('|') : [];
              if (localStorage[_url]) {
                let _idx = _vv.indexOf(_esuri);
                _vv.splice(_idx, 1);
              }
              _vv.push(_esuri);
              localStorage.setItem('__vv__', _vv.join('|'));
              localStorage.setItem(_url, JSON.stringify(res));
            });
          })(i);
        }
      }
      var arr = ['/mc/common/getShopCate.json', '/mc/ci/config/rival/shop/getMonitoredList.json', '/mc/ci/config/rival/item/getMonitoredList.json', '/mc/ci/config/rival/brand/getMonitoredList.json', '/flow/v3/monitor/shop/listAll.json', '/flow/v3/monitor/item/listAll.json', '/mc/ci/config/rival/item/getMonitoredListExcludeGreatShop.json', '/mc/ci/config/rival/shop/getMonitoredListExcludeGreatShop.json', '/mc/ci/config/rival/brand/getMonitoredListExcludeGreatShop.json', '/flow/new/source/shop/list.json', '/cc/category/property/propertyList.json'];
      for (var i = 0; i < arr.length; i++) {
        var _reg = new RegExp(arr[i]);
        if (_reg.test(response.url)) {
          ;
          (function (i) {
            response.json().then(function (res) {
              console.log(arr, arr[i], i);
              localStorage.setItem(arr[i], JSON.stringify(res));
            });
          })(i);
        }
      }
    }
    var fetch_then = [{
      'then': function (a, b, c, d, e) {
        var response = a.clone();
        handleData(response);
        e();
      }
    }];
    var loop_error = "Bouncing between rejected and resolved, stopping loop",
      ori_fetch = window["fetch "];
    window._ori_fetch = ori_fetch;
    window["fetch "] = function (req_path, payload) {
      return new Promise(function (resolve, reject) {
        fetch_before(fetch_then, req_path, payload);
        var _promise = ori_fetch(req_path, payload);
        _promise.then(function (result) {
          var do_error = function () {
              throw reject(loop_error), new Error(loop_error);
            },
            _callback = function (res) {
              fetch_fail(fetch_then, [res, req_path, payload, do_error], function () {
                return reject(res);
              });
            };
          fetch_done(fetch_then, [result, req_path, payload, _callback], function (res) {
            return resolve(res);
          });
        });
        _promise.catch(function (result) {
          var do_error = function () {
              throw reject(result), new Error(loop_error);
            },
            _callback = function (res) {
              fetch_done(fetch_then, [res, req_path, payload, do_error], function (res) {
                return resolve(res);
              });
            };
          fetch_fail(fetch_then, [result, req_path, payload, _callback], function () {
            return reject(result);
          });
        });
      });
    };
  }
  injectScript();

  window.onbeforeunload = function () {
    var custom = ['/mc/live/ci/shop/monitor/listShop.json', '/mc/ci/shop/monitor/listShop.json', '/mc/ci/config/rival/shop/getMonitoredList.json', '/mc/ci/config/rival/item/getMonitoredList.json', '/mc/ci/config/rival/brand/getMonitoredList.json', '/flow/v3/monitor/shop/listAll.json', '/flow/v3/monitor/item/listAll.json', '/mc/ci/config/rival/item/getMonitoredListExcludeGreatShop.json', '/mc/ci/config/rival/shop/getMonitoredListExcludeGreatShop.json', '/mc/ci/config/rival/brand/getMonitoredListExcludeGreatShop.json', '/flow/new/source/shop/list.json', '/cc/category/property/propertyList.json', ];
    for (var i = 0; i < custom.length; i++) {
      localStorage.removeItem(custom[i]);
    }
    var match_keys = [...common_uri]
    if (/market_monitor/.test(location.pathname)) {
      match_keys.push('/monitor/list.json')
    }
    Object.keys(localStorage).forEach(key => {
      match_keys.forEach(m => {
        if (key.indexOf(m) != -1) localStorage.removeItem(key);
      })
    })
    localStorage.removeItem('__vv__');
  }
})()