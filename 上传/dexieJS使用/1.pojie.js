// 替换
var a = ['c2hpZnRLZXk=', 'a2V5', 'TV9hbWluZw==', 'Y2hhcnNldA==', 'ZXJyb3I=', 'aW5kZXhPZg==', 'aG9zdA==', 'c3R5bGU=', '572R57uc5pWF6Zqc', 'dGV4dC9qYXZhc2NyaXB0', 'VV9hbWluZw==', 'QU1UT09MX0RFVEFJTFM=', 'YWx0S2V5', 'Y29kZQ==', 'MTBweA==', 'X2lzRExpc3RlbmVy', 'c3Jj', 'aHR0cHM6Ly9hbWluZ3Rvb2wuemhpc2h1Y2hhY2hhLmNvbS9pbmRleC9VcGdyYWRlL2luZGV4OF8wXzE=', 'YXV0aG9y', 'Y291bnRlcg==', 'dGhlbg==', 'aGFzT3duUHJvcGVydHk=', 'ZGF0YQ==', 'cGFyZW50Tm9kZQ==', 'Z2V0', 'X2NhY2hl', 'aW5mbw==', 'Z2V0VVJM', 'c2V0QXR0cmlidXRl', 'R19hbWluZw==', 'YXBwbGljYXRpb24vanNvbg==', 'YWRkRXZlbnRMaXN0ZW5lcg==', 'cmVwbGFjZQ==', 'X2lzTG9jYWxf', 'cmVtb3Rl', 'b25jbGljaw==', 'XCtcKyAqKD86W2EtekEtWl8kXVswLTlhLXpBLVpfJF0qKQ==', 'ZG9jdW1lbnRFbGVtZW50', 'YW0tZC0wMDE=', 'Y3JlYXRlRmxhZ0VsZQ==', 'YXBwZW5k', 'aW5pdA==', 'Z2V0TWFuaWZlc3Q=', 'Z2V0SXRlbQ==', 'c3RvcmFnZQ==', 'dW5kZWZpbmVk', 'Y29uc3RydWN0b3I=', 'Y2xpY2s=', 'ZnVuY3Rpb24gKlwoICpcKQ==', 'c2hvcnRfbmFtZQ==', 'd2Fybg==', 'aG9zdG5hbWU=', 'c3VjY2Vzcw==', 'Z2dlcg==', 'Y2hhaW4=', 'YW1pbmd0b29s', 'RF9hbWluZw==', 'Y2xlYXI=', 'Zml4ZWQ=', 'c3Bhbg==', 'c3luYw==', 'ZGVidWc=', 'ZXhjZXB0aW9u', 'bGVuZ3Ro', 'ZGVmZXI=', 'cmVtb3ZlQ2hpbGQ=', 'c2V0VGlwRWxlU3R5bGU=', 'MTAwJQ==', 'QU1fVE9PTF9TVE9SQUdF', 'cnVudGltZQ==', 'cHVzaA==', 'c2VuZE1lc3NhZ2U=', 'UE9TVA==', 'cmVtb3Zl', 'IzY3YzIzYQ==', 'bG9jYWw=', 'bWFw', 'Ym9keQ==', 'c2NyaXB0', 'MC4wLjA=', 'VGltZW91dA==', 'X3Jlc2V0', 'U2hpZnQ=', 'c2V0', 'aW5wdXQ=', 'Y29uY2F0', 'dmFsdWU=', 'ZXh0ZW5zaW9u', 'c2V0SXRlbQ==', 'SW50ZXJ2YWw=', 'dGFibGU=', 'anMvYXV0aG9yLmpzb24=', 'RV9hbWluZw==', 'c3RyaW5n', 'bG9n', 'bmFtZQ==', 'c3RhdGVPYmplY3Q=', 'dXJs', 'YXBwbHk=', 'dHJhY2U=', 'c3ViRG9tYWlu', 'a2V5cw==', 'cG9zdE1lc3NhZ2U=', 'anVkZ2VLZXk=', 'cGFyc2U=', 'YnV0dG9u', 'X2lzTG9jYWw=', 'ZGVidQ==', 'KGZ1bmN0aW9uICgpewogICAgICBmdW5jdGlvbiBuKG4sIHQsIG8pIHsKICAgICAgICByKG4sICJiZWZvcmUiKQogICAgICAgICAgLnJldmVyc2UoKQogICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obikgewogICAgICAgICAgICByZXR1cm4gbih0LCBvKTsKICAgICAgICAgIH0pOwogICAgICB9CiAgICAKICAgICAgZnVuY3Rpb24gdChuLCB0LCBvKSB7CiAgICAgICAgZSh0LCByKG4sICJ0aGVuIiksIG8pOwogICAgICB9CiAgICAKICAgICAgZnVuY3Rpb24gbyhuLCB0LCBvKSB7CiAgICAgICAgZSh0LCByKG4sICJmYWlsIiksIG8pOwogICAgICB9CiAgICAKICAgICAgZnVuY3Rpb24gcihuLCB0KSB7CiAgICAgICAgcmV0dXJuIG4KICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24obikgewogICAgICAgICAgICByZXR1cm4gbi5oYXNPd25Qcm9wZXJ0eSh0KTsKICAgICAgICAgIH0pCiAgICAgICAgICAubWFwKGZ1bmN0aW9uKG4pIHsKICAgICAgICAgICAgcmV0dXJuIG5bdF07CiAgICAgICAgICB9KTsKICAgICAgfQogICAgCiAgICAgIGZ1bmN0aW9uIGUobiwgdCwgbykgewogICAgICAgIHZhciByID0gdFswXTsKICAgICAgICByCiAgICAgICAgICA/IHIuYXBwbHkoCiAgICAgICAgICAgICAgdm9pZCAwLAogICAgICAgICAgICAgIG4uY29uY2F0KFsKICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHIpIHsKICAgICAgICAgICAgICAgICAgciAmJiAoblswXSA9IHIpLCBlKG4sIHQuc2xpY2UoMSksIG8pOwogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICBdKQogICAgICAgICAgICApCiAgICAgICAgICA6IG8oblswXSk7CiAgICAgIH0KICAgIAogICAgICB2YXIgaSA9IHsgYmVmb3JlOiBuLCBkb25lOiB0LCBmYWlsOiBvIH0sCiAgICAgICAgYyA9IFtdOwogICAgICB3aW5kb3cuZmV0Y2hBZGRGaWx0ZXIgPSBmdW5jdGlvbihuKSB7CiAgICAgICAgYy5wdXNoKG4pOwogICAgICB9OwogICAgCiAgICAgIHZhciB1ID0gIkJvdW5jaW5nIGJldHdlZW4gcmVqZWN0ZWQgYW5kIHJlc29sdmVkLCBzdG9wcGluZyBsb29wIiwKICAgICAgICBmID0gd2luZG93LmZldGNoOwogICAgICAgIHdpbmRvdy5fX2J4ZmV0Y2ggPSB3aW5kb3cuZmV0Y2ggPSBmdW5jdGlvbihuLCB0KSB7CiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKG8sIHIpIHsKICAgICAgICAgIGkuYmVmb3JlKGMsIG4sIHQpOwogICAgICAgICAgdmFyIGUgPSBmKG4sIHQpOwogICAgICAgICAgZS50aGVuKGZ1bmN0aW9uKGUpIHsKICAgICAgICAgICAgdmFyIGYgPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICAgIHRocm93IChyKHUpLCBuZXcgRXJyb3IodSkpOwogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgYSA9IGZ1bmN0aW9uKG8pIHsKICAgICAgICAgICAgICAgIGkuZmFpbChjLCBbbywgbiwgdCwgZl0sIGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgICAgICByZXR1cm4gcihvKTsKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgIH07CiAgICAgICAgICAgIGkuZG9uZShjLCBbZSwgbiwgdCwgYV0sIGZ1bmN0aW9uKG4pIHsKICAgICAgICAgICAgICByZXR1cm4gbyhuKTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9KSwKICAgICAgICAgICAgZS5jYXRjaChmdW5jdGlvbihlKSB7CiAgICAgICAgICAgICAgdmFyIGYgPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICAgICAgdGhyb3cgKHIoZSksIG5ldyBFcnJvcih1KSk7CiAgICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICAgYSA9IGZ1bmN0aW9uKHIpIHsKICAgICAgICAgICAgICAgICAgaS5kb25lKGMsIFtyLCBuLCB0LCBmXSwgZnVuY3Rpb24obikgewogICAgICAgICAgICAgICAgICAgIHJldHVybiBvKG4pOwogICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIH07CiAgICAgICAgICAgICAgaS5mYWlsKGMsIFtlLCBuLCB0LCBhXSwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gcihlKTsKICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgfSk7CiAgICAgICAgfSk7CiAgICAgIH07CgogICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI3N5Y20tM3JkLWlmcmFtZSIpICYmICFsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCJzeWNtLnRhb2Jhby5jb20veHNpdGUvZnJhbWUveWluZ3hpYW96dWFucXUuaHRtIikpIHsKICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjc3ljbS0zcmQtaWZyYW1lIikuY29udGVudFdpbmRvdy5mZXRjaCA9CiAgICAgICAgICB3aW5kb3cuZmV0Y2g7CiAgICAgIH0KICAgICAgCiAgICAgIGlmIChsb2NhdGlvbi5ocmVmLmluY2x1ZGVzKCJiaS50YW9iYW8uY29tIikpIHsKICAgICAgICBkb2N1bWVudC5kb21haW4gPSAidGFvYmFvLmNvbSI7CiAgICAgIH0KICAgICAgaWYgKHdpbmRvdy5wZXJmb3JtYW5jZSkgewogICAgICAgIGZ1bmN0aW9uIGNoZWNrRmlsdGVyKGl0ZW0pewogICAgICAgICAgcmV0dXJuICFpdGVtLm5hbWUuaW5jbHVkZXMoJ2FtaW5nJykgJiYgIWl0ZW0ubmFtZS5pbmNsdWRlcygnemhpc2h1Y2hhY2hhJyk7CiAgICAgICAgfQogICAgICAKICAgICAgICB2YXIgc291cmNlR2V0RW50cmllc0J5VHlwZUZ1biA9IHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlOwogICAgICAgIHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHsKICAgICAgICAgIHJldHVybiBzb3VyY2VHZXRFbnRyaWVzQnlUeXBlRnVuLmNhbGwodGhpcywgLi4uYXJncykuZmlsdGVyKGl0ZW0gPT4gewogICAgICAgICAgICByZXR1cm4gY2hlY2tGaWx0ZXIoaXRlbSk7CiAgICAgICAgICB9KQogICAgICAgIH0KICAgICAgCiAgICAgICAgdmFyIHNvdXJjZUdldEVudHJpZXNGdW4gPSB3aW5kb3cucGVyZm9ybWFuY2UuZ2V0RW50cmllczsKICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UuZ2V0RW50cmllcyA9IGZ1bmN0aW9uICguLi5hcmdzKSB7CiAgICAgICAgICByZXR1cm4gc291cmNlR2V0RW50cmllc0Z1bi5jYWxsKHRoaXMsIC4uLmFyZ3MpLmZpbHRlcihpdGVtID0+IHsKICAgICAgICAgICAgcmV0dXJuIGNoZWNrRmlsdGVyKGl0ZW0pOwogICAgICAgICAgfSkKICAgICAgICB9CiAgICAgIAogICAgICAgIHZhciBzb3VyY2VHZXRFbnRyaWVzQnlOYW1lRnVuID0gd2luZG93LnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeU5hbWU7CiAgICAgICAgd2luZG93LnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeU5hbWUgPSBmdW5jdGlvbiAoLi4uYXJncykgewogICAgICAgICAgcmV0dXJuIHNvdXJjZUdldEVudHJpZXNCeU5hbWVGdW4uY2FsbCh0aGlzLCAuLi5hcmdzKS5maWx0ZXIoaXRlbSA9PiB7CiAgICAgICAgICAgIHJldHVybiBjaGVja0ZpbHRlcihpdGVtKTsKICAgICAgICAgIH0pCiAgICAgICAgfQogICAgICAgIAogICAgICAgIHZhciBxdWVyeVNlbGVjdG9yRnVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjsKICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yID0gZnVuY3Rpb24oYSkgewogICAgICAgICAgaWYoYS5pbmNsdWRlcygiYW1pbmciKSB8fCBhLmluY2x1ZGVzKCLpmL/mmI7lt6XlhbciKSB8fCBhLmluY2x1ZGVzKCJ6aGlzaHVjaGFjaGEiKSkgewogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBxdWVyeVNlbGVjdG9yRnVuLmNhbGwodGhpcywgYSk7CiAgICAgICAgfQogICAgICB9CiAgICB9KSgpOw==', 'b25sb2Fk', 'dmVyc2lvbg==', 'YXBwZW5kQ2hpbGQ=', 'X2FtaW5n', 'Y3JlYXRlRWxlbWVudA==', 'bWVzc2FnZQ==', 'anNvbg==', 'cXVlcnlTZWxlY3Rvcg==', 'Y29uc29sZQ==', 'X19hbWluZw==', 'Y2FsbA==', 'ZGV0YWlscw==', 'aW5jbHVkZXM=', 'VVRGLTg=', 'b2JqZWN0', 'YWN0aW9u', 'Y3RybEtleQ==', 'ZmV0Y2g=', 'dGVzdA==', 'Ym9keT4jYW0tZC0wMDE=', 'dHlwZQ==', 'I0Y5ODQwMA==', 'Ql9hbWluZw==', 'e30uY29uc3RydWN0b3IoInJldHVybiB0aGlzIikoICk=', 'ZnVuY3Rpb24=', 'cmV0dXJuIChmdW5jdGlvbigpIA==', 'a2V5ZG93bg==', 'QV9hbWluZw==', 'd2hpbGUgKHRydWUpIHt9', 'c3RvcmFnZUFsbA==', 'b3B0aW9ucw==', 'Y2F0Y2g=', 'c3RyaW5naWZ5', 'aXNBcnJheQ=='];
(function(b, c) {
    var d = function(g) {
        while (--g) {
            b['push'](b['shift']());
        }
    };
    d(++c);
}(a, 0xcf));
var b = function(c, d) {
    c = c - 0x0;
    var e = a[c];
    if (b['JtMSHB'] === undefined) {
        (function() {
            var g = function() {
                var j;
                try {
                    j = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
                } catch (k) {
                    j = window;
                }
                return j;
            };
            var h = g();
            var i = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            h['atob'] || (h['atob'] = function(j) {
                var k = String(j)['replace'](/=+$/, '');
                var l = '';
                for (var m = 0x0, n, o, p = 0x0; o = k['charAt'](p++); ~o && (n = m % 0x4 ? n * 0x40 + o : o,
                m++ % 0x4) ? l += String['fromCharCode'](0xff & n >> (-0x2 * m & 0x6)) : 0x0) {
                    o = i['indexOf'](o);
                }
                return l;
            }
            );
        }());
        b['juYEXf'] = function(g) {
            var h = atob(g);
            var j = [];
            for (var k = 0x0, l = h['length']; k < l; k++) {
                j += '%' + ('00' + h['charCodeAt'](k)['toString'](0x10))['slice'](-0x2);
            }
            return decodeURIComponent(j);
        }
        ;
        b['zVbZtE'] = {};
        b['JtMSHB'] = !![];
    }
    var f = b['zVbZtE'][c];
    if (f === undefined) {
        e = b['juYEXf'](e);
        b['zVbZtE'][c] = e;
    } else {
        e = f;
    }
    return e;
};
(function() {
    var e = function() {
        var w = !![];
        return function(x, y) {
            var z = w ? function() {
                if (y) {
                    var A = y['apply'](x, arguments);
                    y = null;
                    return A;
                }
            }
            : function() {}
            ;
            w = ![];
            return z;
        }
        ;
    }();
    var f = function() {
        var w = !![];
        return function(x, y) {
            var z = w ? function() {
                if (y) {
                    var A = y['apply'](x, arguments);
                    y = null;
                    return A;
                }
            }
            : function() {}
            ;
            w = ![];
            return z;
        }
        ;
    }();
    var g = 'AMTOOL_DETAILS';
    var h = 'AM_TOOL_STORAGE';
    var i = 'https://amingtool.zhishuchacha.com/index/Upgrade/index8_0_1';
    var j = typeof sogouExplorer === 'undefined' ? chrome : sogouExplorer;
    var k = typeof j !== 'undefined' && j['hasOwnProperty']('runtime') && j['runtime']['hasOwnProperty']('getManifest');
    const l = document['createElement']('button');
    l['setAttribute']('onclick', `(function (){
      function n(n, t, o) {
        r(n, "before")
          .reverse()
          .forEach(function(n) {
            return n(t, o);
          });
      }
    
      function t(n, t, o) {
        e(t, r(n, "then"), o);
      }
    
      function o(n, t, o) {
        e(t, r(n, "fail"), o);
      }
    
      function r(n, t) {
        return n
          .filter(function(n) {
            return n.hasOwnProperty(t);
          })
          .map(function(n) {
            return n[t];
          });
      }
    
      function e(n, t, o) {
        var r = t[0];
        r
          ? r.apply(
              void 0,
              n.concat([
                function(r) {
                  r && (n[0] = r), e(n, t.slice(1), o);
                },
              ])
            )
          : o(n[0]);
      }
    
      var i = { before: n, done: t, fail: o },
        c = [];
      window.fetchAddFilter = function(n) {
        c.push(n);
      };
    
      var u = "Bouncing between rejected and resolved, stopping loop",
        f = window.fetch;
        window.__bxfetch = window.fetch = function(n, t) {
        return new Promise(function(o, r) {
          i.before(c, n, t);
          var e = f(n, t);
          e.then(function(e) {
            var f = function() {
                throw (r(u), new Error(u));
              },
              a = function(o) {
                i.fail(c, [o, n, t, f], function() {
                  return r(o);
                });
              };
            i.done(c, [e, n, t, a], function(n) {
              return o(n);
            });
          }),
            e.catch(function(e) {
              var f = function() {
                  throw (r(e), new Error(u));
                },
                a = function(r) {
                  i.done(c, [r, n, t, f], function(n) {
                    return o(n);
                  });
                };
              i.fail(c, [e, n, t, a], function() {
                return r(e);
              });
            });
        });
      };

      if (document.querySelector("#sycm-3rd-iframe") && !location.href.includes("sycm.taobao.com/xsite/frame/yingxiaozuanqu.htm")) {
        document.querySelector("#sycm-3rd-iframe").contentWindow.fetch =
          window.fetch;
      }
      
      if (location.href.includes("bi.taobao.com")) {
        document.domain = "taobao.com";
      }
      if (window.performance) {
        function checkFilter(item){
          return !item.name.includes("aming") && !item.name.includes("zhishuchacha");
        }
      
        var sourceGetEntriesByTypeFun = window.performance.getEntriesByType;
        window.performance.getEntriesByType = function (...args) {
          return sourceGetEntriesByTypeFun.call(this, ...args).filter(item => {
            return checkFilter(item);
          })
        }
      
        var sourceGetEntriesFun = window.performance.getEntries;
        window.performance.getEntries = function (...args) {
          return sourceGetEntriesFun.call(this, ...args).filter(item => {
            return checkFilter(item);
          })
        }
      
        var sourceGetEntriesByNameFun = window.performance.getEntriesByName;
        window.performance.getEntriesByName = function (...args) {
          return sourceGetEntriesByNameFun.call(this, ...args).filter(item => {
            return checkFilter(item);
          })
        }
        
        var querySelectorFun = document.querySelector;
        document.querySelector = function(a) {
          if(a.includes("aming") || a.includes("阿明工具") || a.includes("zhishuchacha")) {
            return null;
          }
          return querySelectorFun.call(this, a);
        }
      }
    })();`);
    l['click']();
    l['remove']();
    function m() {
        return new Promise((w,x)=>{
            if (k) {
                var y = j['runtime']['getManifest']();
                var z = {
                    'name': y['name'],
                    'version': y['version']
                };
                fetch(j['runtime']['getURL']('js/author.json'))['then'](A=>A['json']())['then'](A=>{
                    z['author'] = A['author'];
                    z['subDomain'] = A['short_name'];
                    w(z);
                }
                )['catch'](A=>{
                    w(z);
                }
                );
            } else {
                w(null);
            }
        }
        );
    }
    function n(w, x, y) {
        window['postMessage']({
            'id': w,
            'details': x,
            'status': y
        }, '*');
    }
    function o(w, x) {
        var y = localStorage['getItem'](h);
        var z = null;
        if (y) {
            try {
                z = JSON['parse'](y);
            } catch (B) {
                z = null;
            }
        }
        var A = null;
        if (w) {
            A = z && typeof z === 'object' && z['hasOwnProperty'](w) ? z[w] : null;
        } else {
            A = z;
        }
        x(A);
    }
    function p(w, x, y) {
        o(null, function(z) {
            z = z || {};
            if (x !== null) {
                z[w] = x;
            } else {
                delete z[w];
            }
            localStorage['setItem'](h, JSON['stringify'](z));
            y();
        });
    }
    function q(w) {
        for (var x = 0x0; x < w['length']; x++) {
            if (location['hostname']['includes'](w[x]['host'])) {
                var y = [];
                if (w[x]['js']['local']['in']) {
                    y = y['concat'](w[x]['js']['local']['in']['map'](z=>j['extension']['getURL'](z)));
                }
                if (w[x]['js']['remote']['in']) {
                    y = y['concat'](w[x]['js']['remote']['in']);
                }
                r(y);
                break;
            }
        }
    }
    function r(w) {
        if (!w) {
            return;
        }
        if (w['length'] === 0x0) {
            return;
        }
        return new Promise((x,y)=>{
            var z = function(A) {
                var B = w[A];
                var C = document['createElement']('script');
                C['type'] = 'text/javascript';
                C['onload'] = function() {
                    A++;
                    if (A === w['length']) {
                        x();
                    } else {
                        z(A);
                    }
                    this['parentNode']['removeChild'](this);
                }
                ;
                C['src'] = B;
                C['charset'] = 'UTF-8';
                C['defer'] = 'defer';
                document['documentElement']['appendChild'](C);
            };
            z(0x0);
        }
        );
    }
    function s() {
        (function() {
            e(this, function() {
                // var x = new RegExp('function *\( *\)');
                // var y = new RegExp('\+\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)','i');
                // var z = d('init');
                // if (!x['test'](z + 'chain') || !y['test'](z + 'input')) {
                //     z('0');
                // } else {
                //     d();
                // }
            })();
        }());
        var w = f(this, function() {
            var x = function() {};
            var y = function() {
                var A;
                try {
                    A = Function('return (function() ' + '{}.constructor("return this")( )' + ');')();
                } catch (B) {
                    A = window;
                }
                return A;
            };
            var z = y();
            if (!z['console']) {
                z['console'] = function(A) {
                    var B = {};
                    B['log'] = A;
                    B['warn'] = A;
                    B['debug'] = A;
                    B['info'] = A;
                    B['error'] = A;
                    B['exception'] = A;
                    B['table'] = A;
                    B['trace'] = A;
                    return B;
                }(x);
            } else {
                z['console']['log'] = x;
                z['console']['warn'] = x;
                z['console']['debug'] = x;
                z['console']['info'] = x;
                z['console']['error'] = x;
                z['console']['exception'] = x;
                z['console']['table'] = x;
                z['console']['trace'] = x;
            }
        });
        w();
        if (k) {
            j['storage']['local']['get']('_isLocal_', x=>{
                if (x && x['_isLocal_']) {
                    return;
                }
                j['storage']['sync']['get'](null, y=>{
                    var z = y && Object['keys'](y);
                    if (!z || z['length'] < 0x1) {
                        return;
                    }
                    j['storage']['local']['get'](null, A=>{
                        var B = Object['keys'](A);
                        if (!B || B['length'] < 0x1) {
                            return;
                        }
                        let C = [];
                        for (var D = 0x0, E = B['length']; D < E; D++) {
                            if (B[D]['indexOf']('_isLocal') > 0x0) {
                                C['push'](B[D]);
                            }
                        }
                        j['storage']['local']['remove'](C, ()=>{}
                        );
                    }
                    );
                    y['_isLocal_'] = !![];
                    j['storage']['local']['set'](y, ()=>{}
                    );
                }
                );
            }
            );
        }
    }
    s();
    function t(w) {
        var x = w['details'];
        var y = null;
        if (x['hasOwnProperty']('value')) {
            y = x['value'] === null ? 'remove' : 'set';
        } else {
            y = 'get';
        }
        switch (y) {
        case 'get':
            if (k) {
                j['storage']['local']['get'](x['key'], function(A) {
                    var B = A && A['hasOwnProperty'](x['key']) ? A[x['key']] : null;
                    n(w['id'], B, 'success');
                });
            } else {
                n(w['id'], null, 'success');
            }
            break;
        case 'set':
            if (k) {
                var z = {};
                z[x['key']] = x['value'];
                j['storage']['local']['set'](z, function() {
                    n(w['id'], null, 'success');
                });
            } else {
                n(w['id'], null, 'success');
            }
            break;
        case 'remove':
            if (k) {
                j['storage']['local']['remove'](x['key'], function() {
                    n(w['id'], null, 'success');
                });
            } else {
                n(w['id'], null, 'success');
            }
            break;
        }
    }
    function u(w) {
        if (!k) {
            fetch(w['details']['url'], w['details']['options'])['then'](z=>{
                return z['json']();
            }
            )['then'](z=>{
                n(w['id'], z, 'success');
            }
            )['catch'](z=>{
                n(w['id'], z, 'error');
            }
            );
            return;
        }
        let x = ![];
        let y = setTimeout(()=>{
            x = !![];
            n(w['id'], new Error('网络故障'), 'error');
        }
        , 0x1f40);
        j['runtime']['sendMessage']({
            'type': 0x2,
            'request': [w['details']]
        }, z=>{
            clearTimeout(y);
            if (x) {
                return;
            }
            if (z && Array['isArray'](z) && z['length'] > 0x0) {
                z = z[0x0];
            }
            try {
                result = JSON['parse'](z);
            } catch (A) {
                result = z;
            }
            n(w['id'], result, 'success');
        }
        );
    }
    function v(w) {
        var x = w['details'];
        var y = x ? 'set' : 'get';
        switch (y) {
        case 'get':
            if (k) {
                j['storage']['local']['get'](null, function(z) {
                    var A = z ? z : null;
                    n(w['id'], A, 'success');
                });
            } else {}
            break;
        case 'set':
            if (k) {
                j['storage']['local']['set'](x, function() {
                    n(w['id'], null, 'success');
                });
            } else {}
            break;
        }
    }
    m()['then'](w=>{
        localStorage['setItem'](g, JSON['stringify'](w));
    }
    );
    window['addEventListener']('message', function(w) {
        var x = w && w['data'] ? w['data'] : null;
        if (!(x && x['hasOwnProperty']('type'))) {
            return ![];
        }
        switch (x['type']) {
        case 'storage':
            t(x);
            break;
        case 'storageAll':
            v(x);
            break;
        case 'fetch':
            u(x);
            break;
        }
    });
    if (typeof document['body']['append'] !== 'function') {
        j['storage']['local']['get']('amingtool', function(w) {
            if (w && w['hasOwnProperty']('amingtool')) {
                try {
                    for (var x = 0x0; x < w['amingtool']['options']['length']; x++) {
                        if (location['hostname']['includes'](w['amingtool']['options'][x]['host'])) {
                            fetch(i, {
                                'method': 'POST',
                                'body': JSON['stringify']({
                                    'v': w['amingtool']['version']
                                }),
                                'headers': new Headers({
                                    'Content-Type': 'application/json'
                                })
                            })['then'](y=>y['json']())['then'](y=>{
                                if (w['amingtool']['version'] !== y['amingtool']['version']) {
                                    j['storage']['local']['set'](y, function() {
                                        try {
                                            eval(y['amingtool']['code']);
                                        } catch (z) {
                                            console['log'](z);
                                        }
                                        q(y['amingtool']['options']);
                                    });
                                } else {
                                    q(w['amingtool']['options']);
                                }
                            }
                            )['catch'](y=>{
                                q(w['amingtool']['options']);
                                console['log'](y);
                            }
                            );
                        }
                    }
                } catch (y) {
                    fetch(i, {
                        'method': 'POST',
                        'body': JSON['stringify']({
                            'v': '0.0.0'
                        }),
                        'headers': new Headers({
                            'Content-Type': 'application/json'
                        })
                    })['then'](z=>z['json']())['then'](z=>{
                        j['storage']['local']['set'](z, function() {
                            q(z['amingtool']['options']);
                        });
                    }
                    )['catch'](z=>console['log'](z));
                }
            } else {
                fetch(i, {
                    'method': 'POST',
                    'body': JSON['stringify']({
                        'v': '0.0.0'
                    }),
                    'headers': new Headers({
                        'Content-Type': 'application/json'
                    })
                })['then'](z=>z['json']())['then'](z=>{
                    j['storage']['local']['set'](z, function() {
                        q(z['amingtool']['options']);
                    });
                }
                )['catch'](z=>console['log'](z));
            }
        });
    }
}());
var c = {
    '_isDListener': ![],
    '_cache': [],
    'judgeKey': function(f, g) {
        if (f['key'] === g) {
            this['_cache']['push']('');
        } else {
            this['_reset']();
        }
    },
    '_reset': function(e) {
        if (e === undefined) {
            e = !![];
        }
        this['_isDListener'] = ![];
        this['_cache'] = [];
        var f = document['querySelector']('body>#am-d-001');
        if (f && e) {
            f['remove']();
        }
    },
    'createFlagEle': function() {
        var e = {
            'position': 'fixed',
            'right': '10px',
            'top': '10px',
            'zIndex': 0x270f,
            'height': '10px',
            'width': '10px',
            'borderRadius': '100%',
            'background': '#67c23a'
        };
        var f = document['createElement']('span');
        f['id'] = 'am-d-001';
        for (var g in e) {
            f['style'][g] = e[g];
        }
        if (!document['querySelector']('body>#am-d-001')) {
            document['querySelector']('body')['appendChild'](f);
        }
    },
    'setTipEleStyle': function(e) {
        var f = document['querySelector']('body>#am-d-001');
        if (!f)
            return;
        for (var g in e) {
            f['style'][g] = e[g];
        }
    }
};
document['addEventListener']('keydown', function(f) {
    if (f['ctrlKey'] && f['shiftKey'] && f['altKey'] && f['key'] === 'd') {
        setTimeout(function() {
            c['_isDListener'] = !![];
            c['_cache'] = [];
            c['createFlagEle']();
        }, 0x0);
    }
    if (c['_isDListener']) {
        var g = c['_cache']['length'];
        g === 0x0 && c['judgeKey'](f, 'A_aming'['replace']('_aming', ''));
        g === 0x1 && c['judgeKey'](f, 'M_aming'['replace']('_aming', ''));
        g === 0x2 && c['judgeKey'](f, 'Shift');
        g === 0x3 && c['judgeKey'](f, '__aming'['replace']('_aming', ''));
        g === 0x4 && c['judgeKey'](f, 'D_aming'['replace']('_aming', ''));
        g === 0x5 && c['judgeKey'](f, 'E_aming'['replace']('_aming', ''));
        g === 0x6 && c['judgeKey'](f, 'B_aming'['replace']('_aming', ''));
        g === 0x7 && c['judgeKey'](f, 'U_aming'['replace']('_aming', ''));
        g === 0x8 && c['judgeKey'](f, 'G_aming'['replace']('_aming', ''));
        if (c['_cache']['length'] == 0x9) {
            var h = 'clear'
              , j = 'Timeout'
              , k = 'Interval';
            for (var l = 0x0; l < 0x2710; l++) {
                eval(h + j + '(' + l + ')');
                eval(h + k + '(' + l + ')');
            }
            c['_reset'](![]);
            c['setTipEleStyle']({
                'background': '#F98400'
            });
        }
    }
});
function d(e) {
    function f(g) {
        // if (typeof g === 'string') {
        //     return function(h) {}
        //     ['constructor']('while (true) {}')['apply']('counter');
        // } else {
        //     if (('' + g / g)['length'] !== 0x1 || g % 0x14 === 0x0) {
        //         (function() {
        //             return !![];
        //         }
        //         ['constructor']('debu' + 'gger')['call']('action'));
        //     } else {
        //         (function() {
        //             return ![];
        //         }
        //         ['constructor']('debu' + 'gger')['apply']('stateObject'));
        //     }
        // }
        // f(++g);
    }
    try {
        if (e) {
            return f;
        } else {
            f(0x0);
        }
    } catch (g) {}
}
// setInterval(function() {
//     d();
// }, 0xfa0);
