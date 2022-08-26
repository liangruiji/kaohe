"use strict";

var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e;
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(e) {
  return void 0 === e ? "undefined" : _typeof2(e);
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e);
};

!function(e) {
  function t(o) {
    if (n[o]) return n[o].exports;
    var r = n[o] = {
      i: o,
      l: !1,
      exports: {}
    };
    return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
  }
  var n = {};
  t.m = e, t.c = n, t.d = function(e, n, o) {
    t.o(e, n) || Object.defineProperty(e, n, {
      enumerable: !0,
      get: o
    });
  }, t.r = function(e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, t.t = function(e, n) {
    if (1 & n && (e = t(e)), 8 & n) return e;
    if (4 & n && "object" == (void 0 === e ? "undefined" : _typeof(e)) && e && e.__esModule) return e;
    var o = Object.create(null);
    if (t.r(o), Object.defineProperty(o, "default", {
      enumerable: !0,
      value: e
    }), 2 & n && "string" != typeof e) for (var r in e) t.d(o, r, function(t) {
      return e[t];
    }.bind(null, r));
    return o;
  }, t.n = function(e) {
    var n = e && e.__esModule ? function() {
      return e.default;
    } : function() {
      return e;
    };
    return t.d(n, "a", n), n;
  }, t.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, t.p = "", t(t.s = 5);
}({
  5: function _(module, exports) {
    function _classCallCheck(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
        Object.defineProperty(e, o.key, o);
      }
    }
    function _createClass(e, t, n) {
      return t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e;
    }
    !function() {
      var Utils = function() {
        function e() {
          _classCallCheck(this, e);
        }
        return _createClass(e, null, [ {
          key: "insert_local_style",
          value: function(e) {
            return new Promise(function(t) {
              chrome.tabs.insertCSS(null, {
                file: e
              }, function(e) {
                t("ok");
              });
            });
          }
        }, {
          key: "insert_code_style",
          value: function(e) {
            return new Promise(function(t) {
              chrome.tabs.insertCSS(null, {
                code: e
              }, function(e) {
                t("ok");
              });
            });
          }
        }, {
          key: "insert_cdn_style",
          value: function(e) {
            return new Promise(function(t) {
              jQuery.ajax({
                url: e,
                dataType: "text",
                success: function(e) {
                  chrome.tabs.insertCSS(null, {
                    code: e
                  }, function(e) {
                    t("ok");
                  });
                }
              });
            });
          }
        }, {
          key: "inject_local_script",
          value: function(e) {
            return new Promise(function(t) {
              chrome.tabs.executeScript(null, {
                file: e
              }, function(e) {
                t("ok");
              });
            });
          }
        }, {
          key: "inject_code_script",
          value: function(e) {
            return new Promise(function(t) {
              chrome.tabs.executeScript(null, {
                code: e
              }, function(e) {
                t("ok");
              });
            });
          }
        }, {
          key: "inject_cdn_script",
          value: function(e) {
            return new Promise(function(t) {
              jQuery.ajax({
                url: e,
                dataType: "text",
                success: function(e) {
                  chrome.tabs.executeScript(null, {
                    code: e
                  }, function(e) {
                    t("ok");
                  });
                }
              });
            });
          }
        }, {
          key: "getUrlTextData",
          value: function(e) {
            return new Promise(function(t) {
              jQuery.ajax({
                url: e,
                dataType: "text",
                success: function(e) {
                  t(e);
                }
              });
            });
          }
        }, {
          key: "getData",
          value: function(e, t) {
            return new Promise(function(n) {
              var o = {
                url: e,
                type: "GET",
                dataType: "json",
                success: function(e) {
                  n(e);
                }
              }, r = jQuery.extend(!0, o, t);
              jQuery.ajax(r);
            });
          }
        }, {
          key: "postData",
          value: function(e, t) {
            return new Promise(function(n) {
              var o = {
                url: e,
                type: "POST",
                dataType: "json",
                success: function(e) {
                  n(e);
                }
              }, r = jQuery.extend(!0, o, t);
              jQuery.ajax(r);
            });
          }
        }, {
          key: "ajaxData",
          value: function(e) {
            return new Promise(function(t) {
              var n = e || {};
              n.error = function() {
                t(null);
              }, n.success = function(e) {
                t(e);
              }, jQuery.ajax(n);
            });
          }
        } ]), e;
      }();
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        var type = request.type, data = request.data;
        switch (type) {
          case "open_url":
          chrome.tabs.create({
            url: data[0]
          });
          break;

          case "ajax_data":
          Utils.ajaxData(data[0]).then(function(e) {
            sendResponse({
              data: e
            });
          });
          break;
          // TODO 获得  iconv.js
          // 'type': get_text_data,
          //  'data': ['https://assets.diantoushi.com/diantoushi/iconv.js']
          case "get_text_data":
          Utils.getUrlTextData(data[0]).then(function(e) {
            sendResponse({
              data: e
            });
          });
          break;

          case "get_data":
          var _obj = data[1] ? data[1] : {};
          Utils.getData(data[0], _obj).then(function(e) {
            sendResponse({
              data: e
            });
          });
          break;

          case "post_data":
          var _obj = data[1] ? data[1] : {};
          Utils.postData(data[0], _obj).then(function(e) {
            sendResponse({
              data: e
            });
          });
          break;

          case "run_in_background":
          new Promise(function(resolve) {
            eval(data[0]);
          }).then(function(e) {
            sendResponse({
              data: e
            });
          });
          break;

          case "all_in_background":
          eval(data[0]);
          break;

          case "insert_local_style":
          case "insert_code_style":
          case "insert_cdn_style":
          case "inject_local_script":
          case "inject_code_script":
          case "inject_cdn_script":
          if ("function" == typeof Utils[type] && data.length) {
            for (var queue = [], i = 0; i < data.length; i++) queue.push(Utils[type](data[i]));
            Promise.all(queue).then(function(e) {
              sendResponse({
                code: e.length
              });
            });
          }
        }
        return !0;
      }), chrome.runtime.onInstalled && chrome.runtime.onInstalled.addListener instanceof Function && chrome.runtime.onInstalled.addListener(function(e) {
        if (e) {
          var t = window.navigator, n = t ? t.userAgent : "", o = {
            extTime: +new Date(),
            ua: n
          };
          switch (e.reason) {
            case "install":
            o.extAction = "install", chrome.storage.local.set(o);
            break;

            case "update":
            o.extAction = "update", chrome.storage.local.set(o);
          }
        }
      });
    }();
  }
});