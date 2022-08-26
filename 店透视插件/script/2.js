/*
 * @Author: your name
 * @Date: 2021-06-17 10:49:35
 * @LastEditTime: 2021-06-17 10:50:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /kaohe/店透视插件/script/2.js
 */
(function () {
  let interceptors = {
    response: function response(res, path) {
      var _arr = ['/mangkhut/mms/recentOrderList', '/mangkhut/mms/historyOrderList', '/sydney/api/mallScore/queryMallConfigurationList'];
      var _http = JSON.parse(localStorage.getItem('dts_response'));
      var url = res.url;
      var _flag = _arr.filter(function (item) {
        return url.indexOf(item) !== -1;
      });
      if (_flag.length) {
        res.json().then(function (body) {
          _http.unshift({
            url: path,
            body: body
          });
          localStorage.setItem('dts_response', JSON.stringify(_http));
        });
      }
    },
    request: function request(req) {
      var _arr = ['/sydney/api/hotWord/queryHotWord', '/sydney/api/activity/queryMallActivityGoodsList', '/sydney/api/saleQuality/queryGoodsEvaluateVO', '/sydney/api/goodsDataShow/queryGoodsDetailVOList', '/mangkhut/mms/recentOrderList', '/mangkhut/mms/recentOrderList', '/mangkhut/mms/historyOrderList'];
      var _http = JSON.parse(localStorage.getItem('dts_request'));
      var url = req.url,
        body = req.body;
      var _flag = _arr.filter(function (item) {
        return url.indexOf(item) !== -1;
      });
      if (_flag.length) {
        _http.unshift({
          url: url,
          body: body
        });
        localStorage.setItem('dts_request', JSON.stringify(_http));
      }
    },
  };
  (function modifyFetch(interceptors) {
    function fetch_before(_then, _path, _payload) {
      getFilterItem(_then, "before").reverse().forEach(function (_item) {
        var request = JSON.parse(JSON.stringify(_payload));
        request.url = _path;
        return _item(request);
      });
    }

    function fetch_done(_filter, _payload, _cb) {
      dealFilter(_payload, getFilterItem(_filter, "then"), _cb);
    }

    function fetch_fail(_filter, _payload, _cb) {
      dealFilter(_payload, getFilterItem(_filter, "fail"), _cb);
    }

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
    var fetch_then = [{
      'then': function then(a, b, c, d, e) {
        var response = a.clone();
        if (typeof interceptors.response === 'function') interceptors.response(response, b);
        e();
      },
      'before': function before(request) {
        if (typeof interceptors.request === 'function') interceptors.request(request);
      }
    }];
    var loop_error = "Bouncing between rejected and resolved, stopping loop",
      ori_fetch = window["fetch"];
    window._ori_fetch = ori_fetch;
    window["fetch"] = function (req_path, payload) {
      return new Promise(function (resolve, reject) {
        fetch_before(fetch_then, req_path, payload);
        var _promise = ori_fetch(req_path, payload);
        _promise.then(function (result) {
          var do_error = function do_error() {
              throw reject(loop_error), new Error(loop_error);
            },
            _callback = function _callback(res) {
              fetch_fail(fetch_then, [res, req_path, payload, do_error], function () {
                return reject(res);
              });
            };
          fetch_done(fetch_then, [result, req_path, payload, _callback], function (res) {
            return resolve(res);
          });
        });
        _promise.catch(function (result) {
          var do_error = function do_error() {
              throw reject(result), new Error(loop_error);
            },
            _callback = function _callback(res) {
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
  }(interceptors));
}())