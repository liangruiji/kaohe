import moment from 'moment' // momentjs时间库
import 'moment/locale/zh-cn'

function l(e) {
  return null !== e && 'object' === typeof e
}

function c(e, t) {
  for (var n = (t = t || '').split('.'), r = e, a = null, i = 0, o = n.length; i < o; i++) {
    var s = n[i]
    if (!r) break
    if (i === o - 1) {
      a = r[s]
      break
    }
    r = r[s]
  }
  return a
}

function u(e) {
  return null == e || '' === e || '超出范围' === e || '暂无转化' === e
}

function isNumber(e) {
  return null != e && '' !== e && !isNaN(e)
}

function numRound(e, t) {
  if (isNaN(e)) return e
  t = Math.pow(10, t)
  e = parseFloat(e) * t + 1e-10
  return (e = Math.round(e) / t)
}

function getPropByColumn(t) {
  for (var n = [], r = 0; r < t.length; r++)
    n.push(t[r].prop), t[r].hasOwnProperty('children') && Array.isArray(t[r].children) && (n = n.concat(e(t[r].children)))
  return n
}

function globalFilter(e, n, t) {
  var r = new RegExp('.*'.concat(t, '.*'))
  return e.filter(function(t) {
    return n.some(function(e) {
      return t.value.hasOwnProperty(e) && null !== t.value[e] && void 0 !== t.value[e] && r.test(t.value[e].toString())
    })
  })
}

function stringFilter(e, o, t, n) {
  return e.filter(function(a) {
    var i = []
    return (
      t.forEach(function(e) {
        var t,
          n,
          r = new RegExp('.*'.concat(e.keyword, '.*'))
        'fuzzy' === e.mode
          ? i.push(r.test((null !== (t = a.value[o]) && void 0 !== t ? t : '').toString()))
          : 'nequal' === e.mode
          ? i.push(!r.test((null !== (n = a.value[o]) && void 0 !== n ? n : '').toString()))
          : i.push((null !== (n = a.value[o]) && void 0 !== n ? n : '').toString() === e.keyword.toString())
      }),
      null !== a.value[o] &&
        void 0 !== a.value[o] &&
        ('and' === n
          ? i.every(function(e) {
              return e
            })
          : i.some(function(e) {
              return e
            }))
    )
  })
}

function numberFilter(e, n) {
  var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
    a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
    i = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : null
  return e.filter(function(e) {
    var t = !1
    return (
      null === r && null === a && null === i
        ? (t = !0)
        : (null !== r && null === a && null === i && parseFloat(e.value[n]) > parseFloat(r) && (t = !0),
          null !== a && null === r && null === i && parseFloat(e.value[n]) === parseFloat(a) && (t = !0),
          null !== i && null === r && null === a && parseFloat(e.value[n]) < parseFloat(i) && (t = !0),
          null === a && null !== r && null !== i && r <= i && parseFloat(e.value[n]) > parseFloat(r) && parseFloat(e.value[n]) < parseFloat(i) && (t = !0),
          null === a && null !== r && null !== i && i < r && (parseFloat(e.value[n]) > parseFloat(r) || parseFloat(e.value[n]) < parseFloat(i)) && (t = !0)),
      t
    )
  })
}

function checkboxFilter(e, t, n) {
  return e.filter(function(e) {
    return e.value.hasOwnProperty(t) && n.includes(e.value[t])
  })
}

function dayFilter(e, a, t) {
  var i = t[0].getTime(),
    o = t[1].getTime()
  return e.filter(function(e) {
    if (e.value.hasOwnProperty(a) && e.value[a]) {
      var t = e.value[a].match(/\d{4}(-|\/|.)\d{1,2}\1\d{1,2}/g)
      if (t && 0 < t.length)
        for (var n = 0; n < t.length; n++) {
          r = ((r = t[n]), new Date(r.replace(/[-]/g, '/') + ' 00:00:00').getTime())
          if (r && i <= r && r <= o) return !0
        }
    }
    var r
    return !1
  })
}

function weekFilter(e, t, n) {
  var r = moment.unix(n.getTime() / 1e3).format('YYYY 第ww周')
  return e.filter(function(e) {
    return e.value.hasOwnProperty(t) && e.value[t].toString() === r.toString()
  })
}

function monthFilter(e, t, n) {
  var r = n[0].getTime(),
    a = n[1].getTime(),
    i = new RegExp('\\d{4}(\\-|\\/|.)\\d{1,2}')
  return e.filter(function(e) {
    if (e.value.hasOwnProperty(t) && e.value[t] && i.test(e.value[t])) {
      e = ((e = e.value[t]), new Date(e.replace(/[-]/g, '/') + '/1 00:00:00').getTime())
      if (e && r <= e && e <= a) return !0
    }
    return !1
  })
}

function markFilter(e, t, n, r) {
  var a = []
  return (
    r.mark_note && (a = f(e, 'mark_note', t, r.mark_note)),
    r.mark_priority && (a = m(r.mark_note ? a : e, 'mark_priority', r.mark_priority)),
    (a = r.keyword ? m(e, 'mark_priority', String(r.keyword)) : a)
  )
}

function parseGtLtStr(e) {
  if ('string' == typeof e && /(<|>)\d+/.test(e)) {
    if (e.startsWith('>')) return parseFloat(e.replace('>', ''))
    if (e.startsWith('<')) return 0 - parseFloat(e.replace('<', ''))
  }
  return e
}

function orderBy(r, a, o, s, i) {
  if (!a && !s && (!i || (Array.isArray(i) && !i.length))) return r
  o = 'string' == typeof o ? ('descending' === o ? -1 : 1) : o && o < 0 ? -1 : 1
  var n = s
    ? null
    : function(t, n) {
        return i
          ? (i = !Array.isArray(i) ? [i] : i).map(function(e) {
              return 'string' == typeof e ? c(t, e) : e(t, n, r)
            })
          : ('$key' !== a && l(t) && '$value' in t && (t = t.$value), [l(t) ? c(t, a) : t])
      }
  return (
    r.forEach(function(e) {
      e.children && e.children.length && (e.children = t(e.children, a, o, s, i))
    }),
    r
      .map(function(e, t) {
        return {
          value: e,
          index: t,
          key: n ? n(e, t) : null,
        }
      })
      .sort(function(e, t) {
        return (
          ((function(e, t) {
            if (s) return s(e.value, t.value)
            for (var n = 0, r = e.key.length; n < r; n++) {
              var a = e.key[n],
                i = t.key[n]
              if (u(a) || u(i)) return u(a) ? +o : -1 * o
              if ((a = parseGtLtStr(a)) < (i = parseGtLtStr(i))) return -1
              if (i < a) return 1
            }
            return 0
          })(e, t) || e.index - t.index) * o
        )
      })
      .map(function(e) {
        return e.value
      })
  )
}

function getMinMaxByData(t, r) {
  var a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
  return (
    t.forEach(function(n) {
      r.forEach(function(e) {
        var t
        a.hasOwnProperty(e) ||
          (a[e] = {
            min: null,
            max: null,
          }),
          n.hasOwnProperty(e) &&
            null !== n[e] &&
            void 0 !== n[e] &&
            '' !== n[e] &&
            !isNaN(n[e]) &&
            ((t = parseFloat(n[e])),
            (a[e].min = null === a[e].min || t < a[e].min ? t : a[e].min),
            (a[e].max = null === a[e].max || t > a[e].max ? t : a[e].max))
      }),
        n.hasOwnProperty('children') && Array.isArray(n.children) && (a = e(n.children, r, a))
    }),
    a
  )
}

function getNumStripeData(t, r) {
  var a = []
  return (
    t.forEach(function(t) {
      var n = {}
      Object.keys(r).forEach(function(e) {
        t.hasOwnProperty(e) && null !== t[e] && void 0 !== t[e] && '' !== t[e] && !isNaN(t[e]) && (n[e] = numRound((parseFloat(t[e]) / r[e].max) * 100, 2))
      }),
        a.push(n),
        t.hasOwnProperty('children') && Array.isArray(t.children) && (a = a.concat(e(t.children, r)))
    }),
    a
  )
}

function getSlotNamesByColumns(e) {
  var n = []
  return (
    e.forEach(function(e) {
      e.hasOwnProperty('slot') && n.push(e.slot),
        e.hasOwnProperty('slotHeader') && n.push(e.slotHeader),
        e.hasOwnProperty('children') && Array.isArray(e.children) && (n = n.concat(t(e.children)))
    }),
    n
  )
}

function getColumnByProp(t, n) {
  for (var r = 0; r < t.length; r++) {
    if (t[r].prop === n) return t[r]
    if (t[r].hasOwnProperty('children') && Array.isArray(t[r].children)) {
      var a = e(t[r].children, n)
      if (a) return a
    }
  }
  return null
}

function cloneArray(e) {
  return e.map(function(e) {
    e = Object.assign({}, e)
    return e.hasOwnProperty('children') && Array.isArray(e.children) && (e.children = cloneArray(e.children)), e
  })
}

function getAllColumns(e) {
  var n = []
  return (
    e.forEach(function(e) {
      e.children ? (n.push(e), n.push.apply(n, t(e.children))) : n.push(e)
    }),
    n
  )
}

function convertToRows(e) {
  function r(t, e) {
    var n
    e && ((t.level = e.level + 1), a < t.level && (a = t.level)),
      t.children
        ? ((n = 0),
          t.children.forEach(function(e) {
            r(e, t), (n += e.colSpan)
          }),
          (t.colSpan = n))
        : (t.colSpan = 1)
  }
  var a = 1
  e.forEach(function(e) {
    e.level = 1
    r(e)
  })
  for (var t = [], n = 0; n < a; n++) t.push([])
  return (
    getAllColumns(e).forEach(function(e) {
      e.children ? (e.rowSpan = 1) : (e.rowSpan = a - e.level + 1), t[e.level - 1].push(e)
    }),
    t
  )
}

function handleUrlProtocol(e) {
  // eslint-disable-next-line no-useless-escape
  return (/http[s]*\:/.test(e) ? e : 'http:'.concat(e)).replace(/^http[s]*\:\/*/, 'http://')
}

function transformToFloat(e) {
  if ('' === e) return null
  return /^[-]{0,1}[0-9]+.?[0-9]*$/.test(e) ? parseFloat(e) : e
}

function getElColPaddingClassName(e) {
  var t = e.className || '',
    n = 0
  return (
    e.sortable && e.filterType ? (n += 43) : (e.sortable || e.filterType) && (n += 25),
    e.showOverflowTooltip || (n += 2),
    e.tips && (n += 15),
    n && ((t += t ? ' ' : ''), (t += 'col-padding-right-'.concat(n))),
    t
  )
}

function handlerValueFilter(e, t, n) {
  let i = {
    thousands: function(e) {
      var t = /(?=(?!\b)(\d{3})+\.?\b)/g
      return (
        e &&
        e.toString().replace(/(^|\s)\d+(?=\.?\d*($|\s))/g, function(e) {
          return e.replace(t, ',')
        })
      )
    },
    undefinedText: function(e) {
      return 'number' == typeof e || e ? e : '-'
    },
    percent: function(e) {
      return !('string' == typeof e && 3 < e.length && e.includes(',') && 'number' == typeof +e.replace(/,/g, '')) &&
        (null == e || '' === e || isNaN(e) || 0 === parseFloat(e))
        ? e
        : ''.concat(e, '%')
    },
    numToIndexCode: function(e, t) {
      if ('number' != typeof e && !e) return '-'
      var n = parseGtLtStr(e)
      n = isPercents(t.label) && null != n && '' !== n && !isNaN(n) && 0 !== parseFloat(n)
      return ''.concat(this.thousands(e)).concat(n ? '%' : '')
    },
  }
  let o = function(e, t) {
    var r = e
    return (
      t.valueFilter &&
        Array.isArray(t.valueFilter) &&
        0 < t.valueFilter.length &&
        t.valueFilter.forEach(function(e) {
          e = i[e] || null
          e && (r = e.call(i, r, t))
        }),
      r
    )
  }
  return o(e, t, n)
}

function formatIndexNum(e, t) {
  return '-' === (e = 'string' == typeof e ? e.replace(/,/g, '') : e)
    ? null
    : (isNumber(e) &&
        ((e = parseFloat(e)),
        t &&
          (MULTIPLY_HUNDRED_ROUNDS.includes(t)
            ? (e = numRound(100 * e, 2))
            : DIVIDE_HUNDRED_ROUNDS.includes(t)
            ? (e = numRound(e / 100, 2))
            : ROUNDS.includes(t) && (e = numRound(e, 2)))),
      e)
}

function computeDeriveIndex(e, t, n) {
  var r = n[t]
  return (
    '支付人数' === t &&
      (e.hasOwnProperty(n['流量指数']) && e.hasOwnProperty(n['支付转化指数'])
        ? (e[r] = e[n['流量指数']] && e[n['支付转化指数']] ? numRound(e[n['流量指数']] * (e[n['支付转化指数']] / 100), 0) : 0)
        : e.hasOwnProperty(n['流量指数']) && e.hasOwnProperty(n['支付转化率'])
        ? (e[r] = e[n['流量指数']] && e[n['支付转化率']] ? numRound(e[n['流量指数']] * (e[n['支付转化率']] / 100), 0) : 0)
        : e.hasOwnProperty(n['点击人气']) &&
          e.hasOwnProperty(n['支付转化率']) &&
          (e[r] = e[n['点击人气']] && e[n['支付转化率']] ? numRound(e[n['点击人气']] * e[n['支付转化率']], 0) : 0)),
    e
  )
}

function isPercents(e) {
  return 0 <= PERCENT_INDEX_TRUE_NAMES.indexOf(e)
}

function isDays(e) {
  return 0 <= DAY_INDEX_TRUE_NAMES.indexOf(e)
}

// var r = n('uFwe'),
//   a = n('HaE+'),
//   t = n('NFKh'), // CryptoJS库
//   o = n.n(t), // CryptoJS库
//   // s = n("EPBW"),
//   // c = n("NYxa"),
//   u = n('b/SL'), // date-fns 库
//   d = n('LvDl') // lodash 库

function decode(t) {
  var e = o.a.enc.Utf8.parse('w28Cz694s63kBYk4'),
    n = o.a.enc.Utf8.parse('4kYBk36s496zC82w')
  try {
    return o.a.AES.decrypt(o.a.enc.Base64.stringify(o.a.enc.Hex.parse(t)), e, {
      iv: n,
      padding: o.a.pad.Pkcs7,
    }).toString(o.a.enc.Utf8)
  } catch (e) {
    return JSON.stringify(t)
  }
}

function getTableDataByUrl(n, o, s) {
  return new Promise(function(i) {
    var t = new XMLHttpRequest()
    t.open('GET', n, !0),
      (t.responseType = 'blob'),
      (t.onload = function() {
        var a = new FileReader()
        ;(a.onload = function() {
          var e,
            t,
            n = XLSX.read(a.result, {
              type: 'binary',
            }),
            r = []
          for (e in n.Sheets)
            n.Sheets.hasOwnProperty(e) &&
              ((t = n.Sheets[e]['!ref'].split(':')),
              o && (t[0] = o),
              s && (t[1] = s),
              (r = r.concat(
                XLSX.utils.sheet_to_json(n.Sheets[e], {
                  range: t.join(':'),
                }),
              )))
          i(r)
        }),
          a.readAsBinaryString(t.response)
      }),
      t.send()
  })
}

function getSelfUserIdByLabel() {
  var e = document.querySelector('meta[name=microdata]')
  if (e)
    for (var t = e.content, n = ['userId', 'runAsUserId'], r = 0; r < n.length; r++) {
      var a = t.match(new RegExp(''.concat(n[r], '\\=(\\d+)')))
      if (a && 1 < a.length) return a[1]
    }
  return null
}

function thousands(e) {
  var t = /(?=(?!\b)(\d{3})+\.?\b)/g
  return (
    e &&
    e.toString().replace(/(^|\s)\d+(?=\.?\d*($|\s))/g, function(e) {
      return e.replace(t, ',')
    })
  )
}

function numToIndexCode(e) {
  var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null
  if ('number' != typeof e && !e) return '-'
  var n = t && isPercents(t) && null != e && '' !== e && !isNaN(e) && 0 !== parseFloat(e)

  t = t && isDays(t) && null != e && '' !== e && !isNaN(e) && 0 !== parseFloat(e)
  return ''
    .concat(g(e))
    .concat(n ? '%' : '')
    .concat(t ? '天' : '')
}

function setTableMinHeight(e) {
  var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 460
  return !b(e) || e < t ? t : e
}
// var deviceMap = {
//   0: '所有终端',
//   1: 'PC端',
//   2: '无线端',
// }
// var sellerTypeMap = {
//   '-1': '全部',
//   1: '天猫',
//   0: '淘宝',
// }

// function encrypt(e) {
//   var t = o.a.enc.Utf8.parse('201707eggplant99'),
//     n = o.a.enc.Utf8.parse('1234567890123412')
//   return o.a.AES.encrypt(e, t, {
//     iv: n,
//     mode: o.a.mode.CBC,
//     padding: o.a.pad.Pkcs7,
//   }).toString()
// }

// function decrypt(e) {
//   var t = o.a.enc.Utf8.parse('201707eggplant99'),
//     n = o.a.enc.Utf8.parse('1234567890123412')
//   return o.a.AES.decrypt(e, t, {
//     iv: n,
//     padding: o.a.pad.Pkcs7,
//   }).toString(o.a.enc.Utf8)
// }

// function sortByProp(n, r) {
//   return (
//     (r = null == r || r ? 1 : -1),
//     function(e, t) {
//       return (e = e[n]) < (t = t[n]) ? -1 * r : t < e ? +r : 0
//     }
//   )
// }

// function sortByArr(n, r) {
//   return Array.isArray(n)
//     ? ((r = n),
//       function(e, t) {
//         if (!r.includes(e) || !r.includes(t)) {
//           if (!r.includes(e) && !r.includes(t)) {
//             if (e < t) return 1
//             if (t < e) return -1
//           }
//           return r.includes(e) ? 1 : -1
//         }
//         ;(e = r.indexOf(e)), (t = r.indexOf(t))
//         return e === t ? 0 : e < t ? 1 : -1
//       })
//     : function(e, t) {
//         if (!r.includes(e[n]) || !r.includes(t[n])) {
//           if (!r.includes(e[n]) && !r.includes(t[n])) {
//             if (e[n] < t[n]) return 1
//             if (e[n] > t[n]) return -1
//           }
//           return r.includes(e[n]) ? 1 : -1
//         }
//         ;(e = r.indexOf(e[n])), (t = r.indexOf(t[n]))
//         return e === t ? 0 : e < t ? 1 : -1
//       }
// }

// function regExpMatch(e, t) {
//   t = e.match(t)
//   return !!(t && 1 < t.length) && t[1]
// }

// function getValueByPath(e, t) {
//   for (var n = (t = t || '').split('.'), r = e, a = null, i = 0, o = n.length; i < o; i++) {
//     var s = n[i]
//     if (!r) break
//     if (i === o - 1) {
//       a = r[s]
//       break
//     }
//     r = r[s]
//   }
//   return a
// }

// function getQueryString(e) {
//   ;(e = new RegExp('(^|&)' + e + '=([^&]*)(&|$)', 'i')), (e = window.location.search.substr(1).match(e))
//   return null != e ? unescape(e[2]) : null
// }

// function parseUrlByReg(e) {
//   var r = {}
//   return (
//     decodeURIComponent(e).replace(/([^?&=]+)=([^&#]+)/g, function(e, t, n) {
//       return (r[t] = n)
//     }),
//     r
//   )
// }

// function generateId() {
//   return Math.floor(1e4 * Math.random())
// }

// function forceToNum(e) {
//   if (void 0 === e) return '-'
//   e = String(e)
//   var t = Number(e)
//   if (isNaN(t)) {
//     if (new RegExp(/^([\d.]+)([\u4e00-\u9fa5]*)[+]*$/gi).test(e)) {
//       var n = Number(RegExp.$1)
//       switch (RegExp.$2 || '') {
//         case '千':
//           return 1e3 * n
//         case '万':
//           return 1e4 * n
//         default:
//           return n
//       }
//     }
//     return 0
//   }
//   return t
// }

// function getColor(e) {
//   return CHART_COLORS[e % (CHART_COLORS.length - 1)]
// }

// function restTime(e) {
//   if (!e) return ''
//   var t = e / 864e5,
//     n = Math.floor(t),
//     e = 24 * (t - n),
//     t = Math.floor(e)
//   return n + '天' + t + '小时' + Math.floor(60 * (e - t)) + '分钟'
// }

// function splitItemId(e) {
//   if ('string' != typeof e) return null
//   return (e.split(/[(\r\n\s)\r\n\s]+/) || [])
//     .map(function(e) {
//       return /[?&]+id=(\d+)/.test(e) ? RegExp.$1 : /^\d+$/.test(e) ? e : void 0
//     })
//     .filter(function(e) {
//       return e
//     })
// }

// function splitWord(e) {
//   if ('string' != typeof e) return null
//   return (
//     (null === (e = e.split(/[(\r\n)\r\n]+/)) || void 0 === e
//       ? void 0
//       : e.filter(function(e) {
//           return e
//         })) || []
//   )
// }

// function statTotalData(n) {
//   return n.map(function(e, t) {
//     return n.slice(0, t + 1).reduce(function(e, t) {
//       return e + (0 | t)
//     }, 0)
//   })
// }

// function formatMoney(e) {
//   return isNaN(e) || null == e ? e : (e / 100).toFixed(2)
// }

// function getCateIds(e, t) {
//   for (var n = [], r = t, a = !1; 0 < r.length; ) {
//     for (var i = [], o = 0; o < r.length; o++) {
//       var s = r[o]
//       if (a) n.push(s.category_id), (i = [].concat(Array.from(i), Array.from(s.children || [])))
//       else {
//         if (s.category_id === e) {
//           ;(i = s.children || []), (a = !0), n.push(s.category_id)
//           break
//         }
//         i = [].concat(Array.from(i), Array.from(s.children || []))
//       }
//     }
//     r = i
//   }
//   return (n = n.join(','))
// }

// function validatePhone(e) {
//   return /(^0?[1][0-9][0-9]{9}$)/.test(e)
// }

// function diffObj(e, t) {
//   return (function r(e, a) {
//     return d.transform(e, function(e, t, n) {
//       d.isEqual(t, a[n]) || (e[n] = d.isObject(t) && d.isObject(a[n]) ? r(t, a[n]) : t)
//     })
//   })(e, t)
// }

// function isEmpty(e) {
//   if (null == e) return !0
//   if ('boolean' == typeof e) return !1
//   if ('number' == typeof e) return !e
//   if (e instanceof Error) return '' === e.message
//   switch (Object.prototype.toString.call(e)) {
//     case '[object String]':
//     case '[object Array]':
//       return !e.length
//     case '[object File]':
//     case '[object Map]':
//     case '[object Set]':
//       return !e.size
//     case '[object Object]':
//       return !Object.keys(e).length
//   }
//   return !1
// }

// function getItemHrefByItemId(e) {
//   return e ? 'https://item.taobao.com/item.htm?id='.concat(e) : ''
// }

// function getShopHrefByShopId(e) {
//   return e ? 'https://shop'.concat(e, '.taobao.com') : ''
// }

// function isUrl(e) {
//   return new RegExp(
//     '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
//     'i',
//   ).test(e)
// }

// function divideHoundred(e) {
//   return null === e ? null : isNaN(e) ? e : p(e / 100, 2)
// }

// function getDateText(e, t) {
//   var n = {
//     recent7: '7日',
//     recent30: '30日',
//     week: '周',
//     month: '月',
//     today: '今日',
//   }
//   if (n.hasOwnProperty(e)) return n[e]
//   e = Object(u.format)(Object(u.subDays)(new Date(), 1), 'yyyy-MM-dd')
//   return t.includes(e) ? '昨日' : null === (t = t.split('|')) || void 0 === t ? void 0 : t[0]
// }

// function getSwitchApiUrl() {
//   window.localStorage.getItem('switch-api')
//   return ENV_API.PROD
// }

// function getExportDateText() {
//   var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
//     t = null
//   return {
//     date_range: (e.date_range || '').replace('|', '_'),
//     date_type: (t =
//       e.date_type && e.is_live
//         ? '1' === e.is_live && 'day' === e.date_type
//           ? '分时'
//           : {
//               today: '实时',
//               live: '分时',
//               day: '日',
//               recent2hour: '近2小时',
//               recent7: '7天',
//               recent30: '30天',
//               recent15: '15天',
//               week: '周',
//               month: '月',
//               custom: '自定义',
//             }[e.date_type]
//         : t),
//   }
// }

// function asyncPool(e, t, n) {
//   return Q.apply(this, arguments)
// }

// function Q() {
//   return (Q = Object(a.default)(
//     regeneratorRuntime.mark(function e(a, i, o) {
//       var s, l, t, c, n
//       return regeneratorRuntime.wrap(
//         function(e) {
//           for (;;)
//             switch ((e.prev = e.next)) {
//               case 0:
//                 ;(s = []),
//                   (l = []),
//                   (t = Object(r.default)(i)),
//                   (e.prev = 3),
//                   (n = regeneratorRuntime.mark(function e() {
//                     var t, n, r
//                     return regeneratorRuntime.wrap(function(e) {
//                       for (;;)
//                         switch ((e.prev = e.next)) {
//                           case 0:
//                             if (
//                               ((t = c.value),
//                               (n = Promise.resolve().then(function() {
//                                 return o(t, i)
//                               })),
//                               s.push(n),
//                               !(a <= i.length))
//                             ) {
//                               e.next = 9
//                               break
//                             }
//                             if (
//                               ((r = n.then(function() {
//                                 return l.splice(l.indexOf(r), 1)
//                               })),
//                               l.push(r),
//                               l.length >= a)
//                             )
//                               return (e.next = 9), Promise.race(l)
//                             e.next = 9
//                             break
//                           case 9:
//                           case 'end':
//                             return e.stop()
//                         }
//                     }, e)
//                   })),
//                   t.s()
//               case 6:
//                 if ((c = t.n()).done) {
//                   e.next = 10
//                   break
//                 }
//                 return e.delegateYield(n(), 't0', 8)
//               case 8:
//                 e.next = 6
//                 break
//               case 10:
//                 e.next = 15
//                 break
//               case 12:
//                 ;(e.prev = 12), (e.t1 = e.catch(3)), t.e(e.t1)
//               case 15:
//                 return (e.prev = 15), t.f(), e.finish(15)
//               case 18:
//                 return e.abrupt('return', Promise.all(s))
//               case 19:
//               case 'end':
//                 return e.stop()
//             }
//         },
//         e,
//         null,
//         [[3, 12, 15, 18]],
//       )
//     }),
//   )).apply(this, arguments)
// }

const INDEX_MAP = {
  交易指数: 'tradeIndex',
  流量指数: 'uvIndex',
  支付转化指数: 'payRateIndex',
  搜索热度: 'sePvIndex',
  客群指数: 'payByrCntIndex',
  访问人气: 'uvHits',
  搜索人气: 'seIpvUvHits',
  加购热度: 'cartHot',
  加购人气: 'cartHits',
  收藏人气: 'cltHits',
  浏览热度: 'pvHot',
  收藏热度: 'cltHot',
}

const ALIAS_MAP = {
  交易指数: '交易金额',
  流量指数: '访客人数',
  支付转化指数: '支付转化率',
  搜索热度: '搜索次数',
  客群指数: '支付人数',
  访问人气: '访问人数',
  搜索人气: '搜索人数',
  加购热度: '加购次数',
  加购人气: '加购人数',
  收藏人气: '收藏人数',
  浏览热度: '浏览量',
  收藏热度: '收藏次数',
}
let PERCENT_INDEX_TRUE_NAMES = ['支付转化率', '收货占比', '动销率', '最高佣金比例', '纠纷退款率', '退款自主完结率', '近30天退款率', '近30天处罚']
let DAY_INDEX_TRUE_NAMES = ['退货退款自主完结时长', '仅退款自主完结时长']
// MULTIPLY_HUNDRED_ROUNDS = ['支付转化率', '动销率']
// DIVIDE_HUNDRED_ROUNDS = ['直通车参考价']
// ROUNDS = ['搜索飙升指数']
// TOTAL_INDEX_NAMES = ['交易指数']
// DERIVE_INDEX_NAMES = []
// RATE_INDEX_NAMES = ['支付转化率']
// RELY_INDEX_NAMES = ['流量指数']

// CHART_COLORS = [
//   '#1890FF',
//   '#41D9C7',
//   '#2FC25B',
//   '#FACC14',
//   '#E6965C',
//   '#223273',
//   '#7564CC',
//   '#8543E0',
//   '#5C8EE6',
//   '#13C2C2',
//   '#5CA3E6',
//   '#3436C7',
//   '#B381E6',
//   '#F04864',
//   '#D598D9',
// ]
// RANK_PAGE_SIZE = 10
// TMALL_SHOP_TYPE = ['旗舰店', '专卖店', '专营店', '大药房', '天猫超市', '其它', '官方旗舰']
// ENV_API = {
//   TEST: {
//     NODE_ENV: 'TEST',
//     VUE_APP_BASEURL: 'https://monitor-test.amingtool.com/index.php/index',
//     VUE_APP_USER_BASEURL: 'https://testpdd.amingtool.com',
//     VUE_APP_PY_BASEURL: 'https://api-test.amingtool.com',
//     VUE_APP_WEBSOCKET_URL: 'monitor-test.amingtool.com:2358',
//   },
//   PROD: {
//     NODE_ENV: 'PROD',
//     VUE_APP_BASEURL: 'https://monitor.amingtool.com/index.php/index',
//     VUE_APP_USER_BASEURL: 'https://pdd.amingtool.com',
//     VUE_APP_PY_BASEURL: 'https://api.amingtool.com',
//     VUE_APP_WEBSOCKET_URL: 'monitor.amingtool.com:2358',
//   },
// }
let columnMap = [
  {
    label: '开店时间',
    prop: 'start',
    minWidth: 160,
    sortable: !1,
    filters: 'day',
  },
  {
    label: '粉丝数量',
    minWidth: 160,
    prop: 'fans',
    sortable: !1,
    filters: '',
  },
  {
    label: '店铺评价信息',
    prop: 'evaluate_info',
    minWidth: 'byLabel',
    sortable: !1,
    filters: '',
  },
  {
    label: '商品视频图',
    prop: 'video_img',
    minWidth: 'byLabel',
    sortable: !1,
    filters: '',
  },
  {
    label: '商品所在地区',
    prop: 'area',
    minWidth: 'byLabel',
    sortable: !1,
    filters: 'string',
  },
  {
    label: '上新时间',
    prop: 'starts',
    minWidth: 80,
    sortable: !1,
    filters: 'day',
  },
  {
    label: '上架时间',
    prop: 'dateRange',
    minWidth: 160,
    sortable: !1,
    filters: 'day',
  },
  {
    label: '监控时间',
    prop: 'add_dateline',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'day',
  },
  {
    label: '周期',
    prop: 'dateRange',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
  },
  {
    label: '品牌分类',
    prop: 'brandType',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
  },
  {
    label: '监控开始时间',
    prop: 'start_time',
    minWidth: 100,
    sortable: !0,
    filters: 'day',
  },
  {
    label: '监控状态',
    prop: 'monitorStatus',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
  },
  {
    label: '商品标题',
    prop: 'itemTitle',
    minWidth: 350,
    sortable: !0,
    filters: 'string',
  },
  {
    label: '商品链接',
    prop: 'href',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
  },
  {
    label: '淘客信息',
    prop: 'taobao_nick',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
  },
  {
    label: '店铺标题',
    prop: 'shopTitle',
    minWidth: 160,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '商品信息',
    prop: 'itemTitle',
    minWidth: 160,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '品牌信息',
    prop: 'brandTitle',
    minWidth: 160,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '品牌简介',
    prop: 'brandDesc',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '品牌id',
    prop: 'brandId',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '所在地',
    prop: 'address',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '商品id',
    prop: 'itemId',
    minWidth: 100,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '活动id',
    prop: 'activityId',
    minWidth: 100,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '商品状态',
    prop: 'itemStatus',
    minWidth: 100,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '店铺id',
    prop: 'shopId',
    minWidth: 100,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '类别',
    prop: 'category',
    minWidth: 100,
    sortable: !1,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '价格区间',
    prop: 'price',
    minWidth: 100,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '商品图片地址',
    prop: 'pictUrl',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
    minWidth: 160,
  },
  {
    label: '一口价',
    prop: 'price',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
  },
  {
    label: '价格',
    prop: 'price',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
  },
  {
    label: '券后价',
    prop: 'price_after_coupon',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
  },
  {
    label: '类目名',
    prop: 'cateName',
    minWidth: 150,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
    showOverflowTooltip: !1,
  },
  {
    label: '属性名',
    prop: 'attrName',
    minWidth: 150,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
    showOverflowTooltip: !1,
  },
  {
    label: '完整类目名',
    prop: 'cateAllName',
    minWidth: 150,
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
    hidden: !0,
  },
  {
    prop: 'priceSegName',
    label: '价格带',
    minWidth: 100,
    sortable: !1,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '日期',
    prop: 'dateRange',
    minWidth: 160,
    sortable: !0,
    filters: 'day',
  },
  {
    label: '时间',
    prop: 'time',
    minWidth: 100,
    sortable: !0,
    filters: 'day',
  },
  {
    label: '订单时间',
    prop: 'orderTime',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'day',
  },
  {
    label: '定时上架时间',
    prop: 'onShelvesTime',
    minWidth: 160,
    sortable: !1,
    filters: 'day',
  },
  {
    label: '地域名',
    prop: 'area',
    minWidth: 160,
    sortable: !1,
    filters: '',
  },
  {
    label: '店铺类型',
    prop: 'shopType',
    minWidth: 160,
    sortable: !1,
    filters: 'string',
  },
  {
    label: '行业关键词',
    prop: 'keywords',
    minWidth: 160,
    sortable: !1,
    filters: '',
  },
  {
    label: '搜索排序类型',
    prop: 'sort_type',
    minWidth: 120,
    sortable: !1,
    filters: '',
  },
  {
    label: '排名类型',
    prop: 'rank_type',
    minWidth: 120,
    sortable: !0,
    filters: 'string',
  },
  {
    label: '地址',
    prop: 'address',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
  },
  {
    label: '排名',
    minWidth: 100,
    prop: 'rank',
    sortable: !0,
    filters: 'number',
    valueFilter: ['undefinedText'],
  },
  {
    label: 'sku名称',
    minWidth: 100,
    prop: 'skuName',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '排序',
    minWidth: 'byLabel',
    prop: 'rank',
    sortable: !0,
    filters: 'number',
    valueFilter: ['undefinedText'],
  },
  {
    label: '序号',
    minWidth: 60,
    prop: 'index',
    sortable: !0,
    filters: 'number',
    valueFilter: ['undefinedText'],
  },
  {
    label: '关键词',
    minWidth: 100,
    prop: 'keywords',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '市场动态',
    minWidth: 100,
    prop: 'dynamic',
    sortable: !0,
    filters: 'string',
  },
  {
    label: '监控范围',
    minWidth: 100,
    prop: 'range',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '位置',
    minWidth: 100,
    prop: 'position',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '活动信息',
    minWidth: 'byLabel',
    prop: 'activityName',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '活动价格',
    minWidth: 'byLabel',
    prop: 'activityPrice',
    sortable: !0,
    filters: 'number',
    valueFilter: ['undefinedText'],
  },
  {
    label: '活动类型',
    minWidth: 'byLabel',
    prop: 'activityType',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '活动状态',
    minWidth: 'byLabel',
    prop: 'activityStatus',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '活动已售',
    minWidth: 'byLabel',
    prop: 'activitySold',
    sortable: !0,
    filters: 'number',
    valueFilter: ['undefinedText'],
  },
  {
    label: '活动开始时间',
    minWidth: 'byLabel',
    prop: 'activityStartTime',
    sortable: !0,
    filters: 'day',
    valueFilter: ['undefinedText'],
  },
  {
    label: '活动结束时间',
    minWidth: 'byLabel',
    prop: 'activityEndTime',
    sortable: !0,
    filters: 'day',
    valueFilter: ['undefinedText'],
  },
  {
    label: '推广方式',
    minWidth: 'byLabel',
    prop: 'pub_source',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '推广top3商品',
    minWidth: 'byLabel',
    prop: 'top3',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '计划类型',
    minWidth: 'byLabel',
    prop: 'planType',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '优惠券',
    minWidth: 'byLabel',
    prop: 'coupon',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '运费',
    minWidth: 'byLabel',
    prop: 'view_fee',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '三项分',
    minWidth: 'byLabel',
    prop: 'dsr_scores',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '会员版本',
    minWidth: 'byLabel',
    prop: 'packName',
    sortable: !0,
    filters: '',
    valueFilter: ['undefinedText'],
  },
  {
    label: '会员时长',
    minWidth: 'byLabel',
    prop: 'monthsMap',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '订单状态',
    minWidth: 'byLabel',
    prop: 'orderStatus',
    sortable: !1,
    filters: '',
    valueFilter: ['undefinedText'],
  },
  {
    label: '扩容类型',
    minWidth: 'byLabel',
    prop: 'coupon5',
    sortable: !1,
    filters: '',
    valueFilter: ['undefinedText'],
  },
  {
    label: '直播信息',
    minWidth: 'byLabel',
    prop: 'live',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '直播间类型',
    minWidth: 'byLabel',
    prop: 'channel_name',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '直播开始时间',
    minWidth: 'byLabel',
    prop: 'start_time',
    sortable: !0,
    filters: 'day',
    valueFilter: ['undefinedText'],
  },
  {
    label: '直播结束时间',
    minWidth: 'byLabel',
    prop: 'end_time',
    sortable: !0,
    filters: 'day',
    valueFilter: ['undefinedText'],
  },
  {
    label: '直播时长',
    minWidth: 'byLabel',
    prop: 'time',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '直播状态',
    minWidth: 'byLabel',
    prop: 'status_txt',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '直播id',
    prop: 'live_id',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '讲解时长',
    prop: 'talkTime',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '发布时间',
    prop: 'publishTime',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'day',
    valueFilter: ['undefinedText'],
  },
  {
    label: '内容标题',
    prop: 'contentTitle',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '微淘类型',
    prop: 'microType',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '上新最多类目',
    prop: 'moreCategory',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '上新最多品牌',
    prop: 'moreBrand',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '上新最多店铺',
    prop: 'moreShop',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '店铺体验',
    prop: 'shopStarType',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '团长',
    prop: 'team',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'string',
    valueFilter: ['undefinedText'],
  },
  {
    label: '昨日上新数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '7日上新数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '30日上新数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '当前月销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: '',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '总收藏',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '总评论数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '每日评论数',
    minWidth: 'byLabel',
    sortable: !1,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '支付件数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '支付金额',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '每日销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '每日收藏数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '上新数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '收货人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '监控商品数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '昨日总销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '30日总销量',
    minWidth: 'byLabel',
    sortable: !1,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '当前收获人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '收藏人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '评价数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '问大家数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '同款数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '相似款数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '月付款人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '月累计支付人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '月累计支付件数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '月支付件数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '月支付金额',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '月客单价',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '客单价',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '搜索指数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '直通车均价',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '飙升度',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '竞争度',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '人均支付件数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '收货占比',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '物流评分',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '服务评分',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '描述评分',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '今日销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '日销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '预估销售额',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '佣金',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '2小时销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '2小时销售额(预估)',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '15分钟销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '15分钟销售额(预估)',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '2小时分享回流',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '出单指数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '推广量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '收入(元)',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '30日推广量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '30日支出佣金',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '最大日推广量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '月销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '今日获得佣金',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '支付人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '粉丝数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '上新商品数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '商品数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '卖家信用',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '动销率',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '昨日付款人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '7日付款人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '30日付款人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '累计支付人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '淘客占比',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '订单金额',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '扩容数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '点卡抵扣',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '扩容有效期',
    minWidth: 'byLabel',
    sortable: !1,
    filters: '',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '同款商品数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '相似商品数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '评论数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '付款人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '实际支付金额',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '定时上架商品数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '总月付款人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '总月支付件数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '总商品数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '总收货人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '预售件数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '支付定金',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '总成本',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '利润',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '品牌数量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '3日上新商品数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '7日上新商品数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '30日上新商品数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '种草人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '今日实时销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '昨日上新商品数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '观看人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '上架商品数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '评论人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '点赞数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '总销量',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '总收藏人数',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
  {
    label: '热推值',
    minWidth: 'byLabel',
    sortable: !0,
    filters: 'number',
    valueFilter: ['numToIndexCode', 'undefinedText'],
    align: 'right-by-header',
    numStripe: !1,
  },
]

export {
  isNumber,
  numRound,
  getPropByColumn,
  globalFilter,
  stringFilter,
  numberFilter,
  checkboxFilter,
  dayFilter,
  weekFilter,
  monthFilter,
  markFilter,
  parseGtLtStr,
  orderBy,
  getMinMaxByData,
  getNumStripeData,
  getSlotNamesByColumns,
  getColumnByProp,
  cloneArray,
  getAllColumns,
  convertToRows,
  handleUrlProtocol,
  transformToFloat,
  getElColPaddingClassName,
  handlerValueFilter,
  formatIndexNum,
  computeDeriveIndex,
  decode,
  getTableDataByUrl,
  getSelfUserIdByLabel,
  thousands,
  numToIndexCode,
  setTableMinHeight,
  ALIAS_MAP,
  INDEX_MAP,
  columnMap,
}
