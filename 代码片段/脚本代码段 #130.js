function ll(S, T='') {
    var U = T.split('.')
    var V = S
    var W = null
    for (var X = 0, Y = U.length; X < Y; X++) {
        var Z = U[X]
        if (!V)
            break
        if (X === Y - 1) {
            W = V[Z]
            break
        }
        V = V[Z]
    }
    return W
}
class getReact {
    // 获得参数
    // 用法 new F($('#item-rank .sycm-cc-item-rank-table .contentContainer')[0x0])
    constructor(G, H) {
        this._instance = null
        this._rootInstance = null
        var I = Object.keys(G).reverse().find(function(N) {
            return N.startsWith('__reactInternalInstance$')
        })

        if (G.hasOwnProperty(I)) {
            this._rootInstance = G[I]
        }
        if (G.hasOwnProperty(I) && G[I].hasOwnProperty('_currentElement') && G[I]._currentElement.hasOwnProperty('_owner') && G[I]._currentElement._owner.hasOwnProperty('_instance')) {
            this['_instance'] = G[I]['_currentElement']['_owner']['_instance']
            return this
        }

        if (G[I] && G[I].hasOwnProperty('return')) {
            if (!H) {
                for (var J = G[I].return; J.memoizedProps && J.memoizedProps.hasOwnProperty('children') && J.memoizedProps.children; )
                    J = J['return']
                this._instance = J
                this._instance.props = J.memoizedProps
                this._instance.state = J.memoizedState
                return this
            }
            let K = function(N) {
                for (var O = N.return; 'string' == typeof O.type; )
                    O = O.return
                return O
            }
            let L = K(G[I])
            for (let M = 0; M < H; M++)
                L = K(L)
            this._instance = L
            this._instance.props = L.memoizedProps
            this._instance.state = L.memoizedState
            return this
        }
        console.error('元素组件实例获取失败')
        return this
    }

    getInstance() {
        return this._instance
    }

    getInstanceProps() {
        return this._instance.props
    }

    getRootInstance() {
        return this._rootInstance
    }

    getRivalShops() {
        var G = this.getInstanceProps()
          , H = []
        return (G['hasOwnProperty']('selfShopInfo') && G['selfShopInfo']instanceof Object && 0x0 < Object.keys(G['selfShopInfo'])['length'] && H['push']({
            id: String(G['selfShopInfo']['runAsUserId']),
            name: G['selfShopInfo']['runAsUserName'],
            pictUrl: G['selfShopInfo']['runAsUserImg'],
            linkUrl: null,
            key: 'selfShop',
            label: '本店',
            color: '#2062e6',
            className: 'td-2062e6',
        }),
        G['hasOwnProperty']('rivalShop1') && G['rivalShop1']instanceof Object && 0x0 < Object.keys(G['rivalShop1'])['length'] && H['push']({
            id: String(G['rivalShop1']['value']),
            name: G['rivalShop1']['text'],
            pictUrl: G['rivalShop1']['img'],
            linkUrl: Object(C['m'])('//' + G['rivalShop1']['shop']['linkUrl']),
            key: 'rivalShop1',
            label: '竞店1',
            color: '#f3d024',
            className: 'td-f3d024',
        }),
        G['hasOwnProperty']('rivalShop2') && G['rivalShop2']instanceof Object && 0x0 < Object.keys(G['rivalShop2'])['length'] && H['push']({
            id: String(G['rivalShop2']['value']),
            name: G['rivalShop2']['text'],
            pictUrl: G['rivalShop2']['img'],
            linkUrl: Object(C['m'])('//' + G['rivalShop2']['shop']['linkUrl']),
            key: 'rivalShop2',
            label: '竞店2',
            color: '#ef7026',
            className: 'td-ef7026',
        }),
        H)
    }

    getRivalItems() {
        var G = this.getInstanceProps()
          , H = []
        return (G['hasOwnProperty']('selfItem') && G['selfItem']instanceof Object && 0x0 < Object.keys(G['selfItem'])['length'] && H['push']({
            id: String(G['selfItem']['item']['itemId'] || G['selfItem']['item']['id']),
            name: G['selfItem']['item']['title'],
            pictUrl: G['selfItem']['item']['pictUrl'] || G['selfItem']['item']['picUrl'],
            linkUrl: G['selfItem']['item']['detailUrl'] || G['selfItem']['item']['url'],
            key: 'selfItem',
            label: '本店商品',
            color: '#2062e6',
            className: 'td-2062e6',
        }),
        G['hasOwnProperty']('rivalItem1') && G['rivalItem1']instanceof Object && 0x0 < Object.keys(G['rivalItem1'])['length'] && H['push']({
            id: String(G['rivalItem1']['item']['itemId']),
            name: G['rivalItem1']['item']['name'] || G['rivalItem1']['item']['title'],
            pictUrl: G['rivalItem1']['item']['picUrl'] || G['rivalItem1']['item']['pictUrl'],
            linkUrl: G['rivalItem1']['item']['linkUrl'] || G['rivalItem1']['item']['detailUrl'],
            key: 'rivalItem1',
            label: '竞品1',
            color: '#f3d024',
            className: 'td-f3d024',
        }),
        G['hasOwnProperty']('rivalItem2') && G['rivalItem2']instanceof Object && 0x0 < Object.keys(G['rivalItem2'])['length'] && H['push']({
            id: String(G['rivalItem2']['item']['itemId']),
            name: G['rivalItem2']['item']['name'] || G['rivalItem2']['item']['title'],
            pictUrl: G['rivalItem2']['item']['picUrl'] || G['rivalItem2']['item']['pictUrl'],
            linkUrl: G['rivalItem2']['item']['linkUrl'] || G['rivalItem2']['item']['detailUrl'],
            key: 'rivalItem2',
            label: '竞品2',
            color: '#ef7026',
            className: 'td-ef7026',
        }),
        H)
    }

    getRivalBrands() {
        var G = this['getInstanceProps']()
          , H = []
        return (G['hasOwnProperty']('rivalBrand1') && G['rivalBrand1']instanceof Object && 0x0 < Object.keys(G['rivalBrand1'])['length'] && H['push']({
            id: String(G['rivalBrand1']['shop']['brandId']),
            name: G['rivalBrand1']['shop']['name'],
            pictUrl: G['rivalBrand1']['img'],
            key: 'rivalBrand1',
            label: '品牌1',
            color: '#2062e6',
            className: 'td-2062e6',
        }),
        G['hasOwnProperty']('rivalBrand2') && G['rivalBrand2']instanceof Object && 0x0 < Object.keys(G['rivalBrand2'])['length'] && H['push']({
            id: String(G['rivalBrand2']['shop']['brandId']),
            name: G['rivalBrand2']['shop']['name'],
            pictUrl: G['rivalBrand2']['img'],
            key: 'rivalBrand2',
            label: '品牌2',
            color: '#f3d024',
            className: 'td-f3d024',
        }),
        H)
    }

    getCacheMap(G, H) {
        let I = this.getInstanceProps()
        let J = H ? this.ll(I, H) : I
        return Object.keys(J).filter(function(K) {
            return G.includes(K)
        }).map(function(K) {
            return {
                name: K,
                value: J[K],
            }
        }).map(function(K) {
            return K['name'] + '=' + K['value']
        })
    }

    getRivalItemsById(G) {
        var H = this['getInstanceProps']()
          , I = this['getRivalItems']()
          , J = H['recommendedItems'] && H['recommendedItems']['data'] && Array['isArray'](H['recommendedItems']['data']) ? H['recommendedItems']['data'] : []
          , K = I['find'](function(P) {
            return '本店商品' === P['label']
        })
        K && (J['some'](function(P) {
            return String(P['item']['itemId']) === String(K['id'])
        }) || J['push']({
            img: K['pictUrl'],
            text: K['name'],
            value: K['id'],
            item: {
                detailUrl: K['linkUrl'],
                itemId: K['id'],
                pictUrl: K['pictUrl'],
                title: K['name'],
            },
        }))
        var L = H['rivalItems'] && H['rivalItems']['data'] && Array['isArray'](H['rivalItems']['data']) ? H['rivalItems']['data'] : []
          , M = J['concat'](L)
          , N = []
        G['forEach'](function(P) {
            var Q = M['find'](function(S) {
                return String(S['item']['itemId']) === String(P)
            })
            if (Q) {
                Q = Q['item']
                var R = {
                    id: String(Q['itemId']),
                    name: Q['name'] || Q['title'],
                    pictUrl: Q['pictUrl'] || Q['picUrl'],
                    linkUrl: 'https://detail.tmall.com/item.htm?id=' + Q['itemId'],
                }
                Q['hasOwnProperty']('shop') && (R['shopDetails'] = {
                    name: Q['shop']['name'],
                    linkUrl: Q['shop']['linkUrl'],
                }),
                N['push'](R)
            }
        })
        var O = {
            self: 0x1,
            rival: 0x1,
            color: 0x0,
        }
        return (N['forEach'](function(P) {
            !(function Q(R) {
                var S = I['find'](function(W) {
                    return String(W['id']) === String(R['id'])
                })
                if (S)
                    (R['key'] = S['key']),
                    (R['label'] = S['label']),
                    (R['color'] = S['color']),
                    (R['className'] = S['className'])
                else {
                    var T = J['some'](function(W) {
                        return String(W['item']['itemId']) === String(R['id'])
                    })
                      , U = null
                      , V = null
                    T ? ((U = '本店商品' + (0x1 === O['self'] ? '' : O['self'])),
                    (V = 'selfShop' + (0x1 === O['self'] ? '' : O['self'])),
                    O['self']++) : ((U = '竞品' + O['rival']),
                    (V = 'rivalShop' + O['rival']),
                    O['rival']++),
                    I['some'](function(W) {
                        return W['label'] === U
                    }) ? Q(R) : ((R['key'] = V),
                    (R['label'] = U),
                    (R['color'] = D['a'][O['color'] % 0xf]),
                    (R['className'] = 'td-' + D['a'][O['color'] % 0xf]['replace']('#', '')),
                    O['color']++)
                }
            }
            )(P)
        }),
        N['sort'](function(P, Q) {
            return 0x0 <= Q['label']['indexOf']('本店商品') ? 0x1 : 0x0 <= P['label']['indexOf']('本店商品') ? -0x1 : 0x0
        }),
        N['sort'](function(P, Q) {
            if (P['label']['replace'](/\d+/g, '') !== Q['label']['replace'](/\d+/g, ''))
                return 0x0
            var R = Object(C['t'])(P['label'], /(\d+)/) || 0x1
              , S = Object(C['t'])(Q['label'], /(\d+)/) || 0x1
            return parseInt(R) < parseInt(S) ? -0x1 : 0x1
        }),
        N)
    }

    getRivalShopsById(G) {
        var H = this
          , I = this['getInstanceProps']()
          , J = this['getRivalShops']()
          , K = I['shops'] && I['shops']['data'] && Array['isArray'](I['shops']['data']) ? I['shops']['data'] : []
        K = K['map'](function(P) {
            return P['shop']
        })
        var L = I['selfShopInfo'] ? I['selfShopInfo'] : []
          , M = [J['find'](function(P) {
            return String(P['id']) === String(L['runAsUserId'])
        }), ]['concat'](v()(K))
          , N = []
        G['forEach'](function(P) {
            var Q = M['find'](function(S) {
                return String(S['userId'] || S['id'] || S['sellerId']) === String(P)
            })
            if (Q) {
                var R = {
                    id: String(Q['userId'] || Q['id'] || Q['sellerId']),
                    name: Q['name'] || Q['title'],
                    pictUrl: Q['picUrl'] || Q['pictUrl'],
                    linkUrl: Q['linkUrl'] || Q['shopUrl'],
                }
                N['push'](R)
            }
        })
        var O = {
            self: 0x1,
            rival: 0x1,
            color: 0x0,
        }
        return (N['forEach'](function(P) {
            ;(function Q(R) {
                var S, T, U = J['find'](function(V) {
                    return String(V['id']) === String(R['id'])
                })
                U ? ((R['key'] = U['key']),
                (R['label'] = U['label']),
                (R['color'] = U['color']),
                (R['className'] = U['className'])) : ((S = '竞店' + O['rival']),
                (T = 'rivalShop' + O['rival']),
                O['rival']++,
                J['some'](function(V) {
                    return V['label'] === S
                }) ? Q['call'](H, R) : ((R['key'] = T),
                (R['label'] = S),
                (R['color'] = D['a'][O['color'] % 0xf]),
                (R['className'] = 'td-' + D['a'][O['color'] % 0xf]['replace']('#', '')),
                O['color']++))
            }
            ['call'](H, P))
        }),
        N['sort'](function(P, Q) {
            return 0x0 <= Q['label']['indexOf']('本店') ? 0x1 : 0x0 <= P['label']['indexOf']('本店') ? -0x1 : 0x0
        }),
        N['sort'](function(P, Q) {
            return P['label']['replace'](/\d/g, '') === Q['label']['replace'](/\d/g, '') ? (Object(C['t'])(P['label'], /(\d+)/) || 0x1) < (Object(C['t'])(Q['label'], /(\d+)/) || 0x1) ? -0x1 : 0x1 : 0x0
        }),
        N)
    }

    ll(S, T='') {
        var U = T.split('.')
        var V = S
        var W = null
        for (var X = 0, Y = U.length; X < Y; X++) {
            var Z = U[X]
            if (!V)
                break
            if (X === Y - 1) {
                W = V[Z]
                break
            }
            V = V[Z]
        }
        return W
    }
}

window.addEventListener('message', function(event) {
    if (event.data.action && event.data.action.includes('getReact')) {
        let hasErr = false
        let arr = event.data.action.split('.')
        arr.shift()
        let params = event.data.params
        let data = new getReact(document.querySelector(params.select))
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i]
            if (item.includes('(')) {
                let startIndex = item.indexOf('(')
                let endIndex = item.lastIndexOf(')')
                let name = item.slice(0, startIndex)
                if (name && typeof data[name] == 'function') {
                    let fun_params = item.slice(startIndex + 1, endIndex)
                    if (fun_params) {
                        fun_params = fun_params.split(',')
                        fun_params = fun_params.map(param=>{
                            let key = param.trim()
                            if (params.hasOwnProperty(key)) {
                                return params[key]
                            } else {
                                return undefined
                            }
                        }
                        )
                        data = data[name](...fun_params)
                    } else {
                        data = data[name]()
                    }
                } else {
                    console.error(`没有 ${name} 函数，${i + 1}`)
                    hasErr = true
                    break
                }
            } else {
                if (data.hasOwnProperty(item)) {
                    data = data[item]
                } else {
                    console.error(`没有 ${item} 属性，${i + 1}`)
                    hasErr = true
                    break
                }
            }
        }
        if (hasErr)
            return
        // .getInstanceProps().tableData.params
        console.log('>>>>>>', data)
        window.postMessage({
            action: 'ReactBack',
            data: JSON.stringify(data),
        }, '*', )
    }
}, false, )
