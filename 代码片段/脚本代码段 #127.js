let dd = {
    'interval': null,
    'tasks': [],
    '_start': function() {
        var l = this;
        this.interval = setInterval(()=> {
            if (this.tasks.length === 0) {
                clearInterval(this.interval)
                this.interval = null
                return false;
            }

            for (var m = this.tasks.length - 1; 0 <= m; m--) {
                if (!this.tasks[m].isDelete && this.tasks[m].attempts <= 1000) {
                    try {
                        this.tasks[m].method(this.tasks[m]);
                    } catch (o) {
                        throw this.tasks[m].hasOwnProperty('errorCallback') && this.tasks[m]['errorCallback'](this.tasks[m]),
                        this.tasks.splice(m, 1),
                        o;
                    }
                    this.tasks[m].attempts++;
                }
                if (this.tasks[m].isDelete || 1000 < this.tasks[m].attempts) {
                    if (this.tasks[m].hasOwnProperty('errorCallback') && 'function' == typeof this.tasks[m].errorCallback && 1000 < this.tasks[m].attempts) {
                        this.tasks[m].errorCallback(this.tasks[m])
                        this.tasks.splice(m, 1)
                    }

                }

            }
        }, 100);
    },
    'addTask': function(l, m) {
        this.tasks.push({
            'method': l,
            'errorCallback': m,
            'attempts': false,
            'isDelete': false,
            'delete': function() {
                this.isDelete = true;
            }
        }),
        this.interval || this._start();
    }
};

let filterLocalStorage = {
    'find': function(q, r=[], s=[]) {
        var u = this['select'](q, r, s, true);
        if (u.length === 0)
            return null
        if (u.length > 1) {
            console['error']('查询到多条数据，请检查参数是否正确', q, r, s, u)
            return null
        }
        return u[0].value
    },
    'select': function(q, u=[], v=[], w, x) {
        for (var y = [], z = 0; z < localStorage.length; z++) {
            var key = localStorage.key(z);
            if (this.checkKey(key, q, u, v)) {
                var B = localStorage.getItem(key);
                B = JSON.parse(B)
                B = JSON.parse(B.substring(B.indexOf('|') + 1, B.length))['value']['_d']
                B = x ? this.decode(B) : B
                w ? y.push({
                    'key': key,
                    'params': p(key),
                    'value': B
                }) : y.push(B);
            }
        }
        return y;
    },
    'checkKey': function(q, s, u=[], v=[]) {
        if (!new RegExp('^' + s).test(q))
            return false;
        let w = true
        for (var x = 0; x < u.length; x++) {
            var y = u[x].replace(/([\"\-|$()*+.\[\]?\\\/^{}])/g, '\$1');
            if (!new RegExp('([&]|[?])' + y + '([&]|$)').test(q)) {
                w = false;
                break;
            }
        }
        if (w)
            for (var z = 0; z < v.length; z++)
                if (q['indexOf'](v[z]) >= 0) {
                    w = false;
                    break;
                }
        return w;
    },
    'decode': function(q) {
        return JSON.parse(Object(m['c'])(q));
        // 解码
    },
    'delete': function(q, r) {
        for (var s = 0; s < localStorage.length; s++) {
            var u = localStorage.key(s);
            if (u.includes(q)) {
                if (!this.checkKey(u, q, r)) {
                    localStorage.removeItem(u)
                }
            }

        }
    }
}
let p = function(q) {
        var r = q['split']('?')[0x1];
        return r ? JSON['parse']('{\x22' + decodeURIComponent(r)['replace'](/"/g, '\x5c\x22')['replace'](/&/g, '","')['replace'](/=/g, '":"')['replace'](/\+/g, '\x20') + '\x22}') : {};
    }

function ll(S, T='') {
    var U = T.split('.')
    var V = S
    var W = null
    for (var X = 0, Y = U.length; X < Y; X++) {
        var Z = U[X];
        if (!V)
            break;
        if (X === Y - 1) {
            W = V[Z];
            break;
        }
        V = V[Z];
    }
    return W;
}
class F {
    // 获得参数
    // 用法 new F($('#item-rank .sycm-cc-item-rank-table .contentContainer')[0x0])
    constructor(G, H) {
        this['_instance'] = null,
        this['_rootInstance'] = null;
        var I = Object.keys(G)['reverse']()['find'](function(N) {
            return N['startsWith']('__reactInternalInstance$');
        });
        if (G['hasOwnProperty'](I) && (this['_rootInstance'] = G[I]),
        G['hasOwnProperty'](I) && G[I]['hasOwnProperty']('_currentElement') && G[I]['_currentElement']['hasOwnProperty']('_owner') && G[I]['_currentElement']['_owner']['hasOwnProperty']('_instance'))
            return this['_instance'] = G[I]['_currentElement']['_owner']['_instance'],
            this;
        if (G[I] && G[I]['hasOwnProperty']('return')) {
            if (!H) {
                for (var J = G[I]['return']; J['memoizedProps'] && J['memoizedProps']['hasOwnProperty']('children') && J['memoizedProps']['children']; )
                    J = J['return'];
                return this['_instance'] = J,
                this['_instance']['props'] = J['memoizedProps'],
                this['_instance']['state'] = J['memoizedState'],
                this;
            }
            for (var K = function(N) {
                for (var O = N['return']; 'string' == typeof O['type']; )
                    O = O['return'];
                return O;
            }, L = K(G[I]), M = 0x0; M < H; M++)
                L = K(L);
            return this['_instance'] = L,
            this['_instance']['props'] = L['memoizedProps'],
            this['_instance']['state'] = L['memoizedState'],
            this;
        }
        return console.error('元素组件实例获取失败'),
        this;
    }

    getInstance() {
        return this._instance;
    }

    getInstanceProps() {
        return this._instance.props;
    }

    getRootInstance() {
        return this._rootInstance;
    }

    getRivalShops() {
        var G = this.getInstanceProps()
          , H = [];
        return G['hasOwnProperty']('selfShopInfo') && G['selfShopInfo']instanceof Object && 0x0 < Object.keys(G['selfShopInfo'])['length'] && H['push']({
            'id': String(G['selfShopInfo']['runAsUserId']),
            'name': G['selfShopInfo']['runAsUserName'],
            'pictUrl': G['selfShopInfo']['runAsUserImg'],
            'linkUrl': null,
            'key': 'selfShop',
            'label': '本店',
            'color': '#2062e6',
            'className': 'td-2062e6'
        }),
        G['hasOwnProperty']('rivalShop1') && G['rivalShop1']instanceof Object && 0x0 < Object.keys(G['rivalShop1'])['length'] && H['push']({
            'id': String(G['rivalShop1']['value']),
            'name': G['rivalShop1']['text'],
            'pictUrl': G['rivalShop1']['img'],
            'linkUrl': Object(C['m'])('//' + G['rivalShop1']['shop']['linkUrl']),
            'key': 'rivalShop1',
            'label': '竞店1',
            'color': '#f3d024',
            'className': 'td-f3d024'
        }),
        G['hasOwnProperty']('rivalShop2') && G['rivalShop2']instanceof Object && 0x0 < Object.keys(G['rivalShop2'])['length'] && H['push']({
            'id': String(G['rivalShop2']['value']),
            'name': G['rivalShop2']['text'],
            'pictUrl': G['rivalShop2']['img'],
            'linkUrl': Object(C['m'])('//' + G['rivalShop2']['shop']['linkUrl']),
            'key': 'rivalShop2',
            'label': '竞店2',
            'color': '#ef7026',
            'className': 'td-ef7026'
        }),
        H;
    }

    getRivalItems() {
        var G = this.getInstanceProps()
          , H = [];
        return G['hasOwnProperty']('selfItem') && G['selfItem']instanceof Object && 0x0 < Object.keys(G['selfItem'])['length'] && H['push']({
            'id': String(G['selfItem']['item']['itemId'] || G['selfItem']['item']['id']),
            'name': G['selfItem']['item']['title'],
            'pictUrl': G['selfItem']['item']['pictUrl'] || G['selfItem']['item']['picUrl'],
            'linkUrl': G['selfItem']['item']['detailUrl'] || G['selfItem']['item']['url'],
            'key': 'selfItem',
            'label': '本店商品',
            'color': '#2062e6',
            'className': 'td-2062e6'
        }),
        G['hasOwnProperty']('rivalItem1') && G['rivalItem1']instanceof Object && 0x0 < Object.keys(G['rivalItem1'])['length'] && H['push']({
            'id': String(G['rivalItem1']['item']['itemId']),
            'name': G['rivalItem1']['item']['name'] || G['rivalItem1']['item']['title'],
            'pictUrl': G['rivalItem1']['item']['picUrl'] || G['rivalItem1']['item']['pictUrl'],
            'linkUrl': G['rivalItem1']['item']['linkUrl'] || G['rivalItem1']['item']['detailUrl'],
            'key': 'rivalItem1',
            'label': '竞品1',
            'color': '#f3d024',
            'className': 'td-f3d024'
        }),
        G['hasOwnProperty']('rivalItem2') && G['rivalItem2']instanceof Object && 0x0 < Object.keys(G['rivalItem2'])['length'] && H['push']({
            'id': String(G['rivalItem2']['item']['itemId']),
            'name': G['rivalItem2']['item']['name'] || G['rivalItem2']['item']['title'],
            'pictUrl': G['rivalItem2']['item']['picUrl'] || G['rivalItem2']['item']['pictUrl'],
            'linkUrl': G['rivalItem2']['item']['linkUrl'] || G['rivalItem2']['item']['detailUrl'],
            'key': 'rivalItem2',
            'label': '竞品2',
            'color': '#ef7026',
            'className': 'td-ef7026'
        }),
        H;

    }

    getRivalBrands() {
        var G = this['getInstanceProps']()
          , H = [];
        return G['hasOwnProperty']('rivalBrand1') && G['rivalBrand1']instanceof Object && 0x0 < Object.keys(G['rivalBrand1'])['length'] && H['push']({
            'id': String(G['rivalBrand1']['shop']['brandId']),
            'name': G['rivalBrand1']['shop']['name'],
            'pictUrl': G['rivalBrand1']['img'],
            'key': 'rivalBrand1',
            'label': '品牌1',
            'color': '#2062e6',
            'className': 'td-2062e6'
        }),
        G['hasOwnProperty']('rivalBrand2') && G['rivalBrand2']instanceof Object && 0x0 < Object.keys(G['rivalBrand2'])['length'] && H['push']({
            'id': String(G['rivalBrand2']['shop']['brandId']),
            'name': G['rivalBrand2']['shop']['name'],
            'pictUrl': G['rivalBrand2']['img'],
            'key': 'rivalBrand2',
            'label': '品牌2',
            'color': '#f3d024',
            'className': 'td-f3d024'
        }),
        H;
    }
    getCacheMap(G, H) {
        var I = this['getInstanceProps']()
          , J = H ? ll(I, H) : I;
        return Object.keys(J)['filter'](function(K) {
            return G['includes'](K);
        })['map'](function(K) {
            return {
                'name': K,
                'value': J[K]
            };
        })['map'](function(K) {
            return K['name'] + '=' + K['value'];
        });
    }

    getRivalItemsById(G) {
        var H = this['getInstanceProps']()
          , I = this['getRivalItems']()
          , J = H['recommendedItems'] && H['recommendedItems']['data'] && Array['isArray'](H['recommendedItems']['data']) ? H['recommendedItems']['data'] : []
          , K = I['find'](function(P) {
            return '本店商品' === P['label'];
        });
        K && (J['some'](function(P) {
            return String(P['item']['itemId']) === String(K['id']);
        }) || J['push']({
            'img': K['pictUrl'],
            'text': K['name'],
            'value': K['id'],
            'item': {
                'detailUrl': K['linkUrl'],
                'itemId': K['id'],
                'pictUrl': K['pictUrl'],
                'title': K['name']
            }
        }));
        var L = H['rivalItems'] && H['rivalItems']['data'] && Array['isArray'](H['rivalItems']['data']) ? H['rivalItems']['data'] : []
          , M = J['concat'](L)
          , N = [];
        G['forEach'](function(P) {
            var Q = M['find'](function(S) {
                return String(S['item']['itemId']) === String(P);
            });
            if (Q) {
                Q = Q['item'];
                var R = {
                    'id': String(Q['itemId']),
                    'name': Q['name'] || Q['title'],
                    'pictUrl': Q['pictUrl'] || Q['picUrl'],
                    'linkUrl': 'https://detail.tmall.com/item.htm?id=' + Q['itemId']
                };
                Q['hasOwnProperty']('shop') && (R['shopDetails'] = {
                    'name': Q['shop']['name'],
                    'linkUrl': Q['shop']['linkUrl']
                }),
                N['push'](R);
            }
        });
        var O = {
            'self': 0x1,
            'rival': 0x1,
            'color': 0x0
        };
        return N['forEach'](function(P) {
            !function Q(R) {
                var S = I['find'](function(W) {
                    return String(W['id']) === String(R['id']);
                });
                if (S)
                    R['key'] = S['key'],
                    R['label'] = S['label'],
                    R['color'] = S['color'],
                    R['className'] = S['className'];
                else {
                    var T = J['some'](function(W) {
                        return String(W['item']['itemId']) === String(R['id']);
                    })
                      , U = null
                      , V = null;
                    T ? (U = '本店商品' + (0x1 === O['self'] ? '' : O['self']),
                    V = 'selfShop' + (0x1 === O['self'] ? '' : O['self']),
                    O['self']++) : (U = '竞品' + O['rival'],
                    V = 'rivalShop' + O['rival'],
                    O['rival']++),
                    I['some'](function(W) {
                        return W['label'] === U;
                    }) ? Q(R) : (R['key'] = V,
                    R['label'] = U,
                    R['color'] = D['a'][O['color'] % 0xf],
                    R['className'] = 'td-' + D['a'][O['color'] % 0xf]['replace']('#', ''),
                    O['color']++);
                }
            }(P);
        }),
        N['sort'](function(P, Q) {
            return 0x0 <= Q['label']['indexOf']('本店商品') ? 0x1 : 0x0 <= P['label']['indexOf']('本店商品') ? -0x1 : 0x0;
        }),
        N['sort'](function(P, Q) {
            if (P['label']['replace'](/\d+/g, '') !== Q['label']['replace'](/\d+/g, ''))
                return 0x0;
            var R = Object(C['t'])(P['label'], /(\d+)/) || 0x1
              , S = Object(C['t'])(Q['label'], /(\d+)/) || 0x1;
            return parseInt(R) < parseInt(S) ? -0x1 : 0x1;
        }),
        N;
    }
    getRivalShopsById(G) {
        var H = this
          , I = this['getInstanceProps']()
          , J = this['getRivalShops']()
          , K = I['shops'] && I['shops']['data'] && Array['isArray'](I['shops']['data']) ? I['shops']['data'] : [];
        K = K['map'](function(P) {
            return P['shop'];
        });
        var L = I['selfShopInfo'] ? I['selfShopInfo'] : []
          , M = [J['find'](function(P) {
            return String(P['id']) === String(L['runAsUserId']);
        })]['concat'](v()(K))
          , N = [];
        G['forEach'](function(P) {
            var Q = M['find'](function(S) {
                return String(S['userId'] || S['id'] || S['sellerId']) === String(P);
            });
            if (Q) {
                var R = {
                    'id': String(Q['userId'] || Q['id'] || Q['sellerId']),
                    'name': Q['name'] || Q['title'],
                    'pictUrl': Q['picUrl'] || Q['pictUrl'],
                    'linkUrl': Q['linkUrl'] || Q['shopUrl']
                };
                N['push'](R);
            }
        });
        var O = {
            'self': 0x1,
            'rival': 0x1,
            'color': 0x0
        };
        return N['forEach'](function(P) {
            (function Q(R) {
                var S, T, U = J['find'](function(V) {
                    return String(V['id']) === String(R['id']);
                });
                U ? (R['key'] = U['key'],
                R['label'] = U['label'],
                R['color'] = U['color'],
                R['className'] = U['className']) : (S = '竞店' + O['rival'],
                T = 'rivalShop' + O['rival'],
                O['rival']++,
                J['some'](function(V) {
                    return V['label'] === S;
                }) ? Q['call'](H, R) : (R['key'] = T,
                R['label'] = S,
                R['color'] = D['a'][O['color'] % 0xf],
                R['className'] = 'td-' + D['a'][O['color'] % 0xf]['replace']('#', ''),
                O['color']++));
            }
            ['call'](H, P));
        }),
        N['sort'](function(P, Q) {
            return 0x0 <= Q['label']['indexOf']('本店') ? 0x1 : 0x0 <= P['label']['indexOf']('本店') ? -0x1 : 0x0;
        }),
        N['sort'](function(P, Q) {
            return P['label']['replace'](/\d/g, '') === Q['label']['replace'](/\d/g, '') ? (Object(C['t'])(P['label'], /(\d+)/) || 0x1) < (Object(C['t'])(Q['label'], /(\d+)/) || 0x1) ? -0x1 : 0x1 : 0x0;
        }),
        N;
    }

}

// let aa = new F($("#sycm-operator-core-index-chart\\$true"))
let aa = new F($("#customerAnalysis"))

// dd.addTask(function(hh) {
//     url = aa.getInstanceProps().urls.trend
//     CacheMap = aa.getCacheMap(['includeRival', 'device', 'dateType', 'dateRange'], 'trendData.params')
//     console.log(CacheMap)
//     let yy = filterLocalStorage.select(url, CacheMap, [], true)
//     hh.delete()
//     console.log(yy)
// }, function() {})
